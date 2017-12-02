gulp = require "gulp"
del = require "del"
pug = require "gulp-pug"
stylus = require "gulp-stylus"
coffeescript = require "coffeescript"
coffee = require "gulp-coffee"
webserver = require "gulp-webserver"

browsers = [
  "Chrome >= 62"
  "ChromeAndroid >= 61"
  "Safari >= 11"
  "iOS >= 11"
]

module = do ->
  fs = require "fs"
  JSON.parse fs.readFileSync "package.json"

promise = (f) -> new Promise f

run = do ->
  {exec} = require('child_process')
  (command) ->
    promise (yay, aww) ->
      exec command, (error, stdout, stderr) ->
        if error
          aww error
        else
          yay [stdout, stderr]

gulp.task "npm:js", ->
  gulp
  .src "src/**/*.coffee", sourcemaps: true
  .pipe coffee
    coffee: coffeescript
    transpile:
      presets: [[ "env", targets: node: "6.10" ]]
  .pipe gulp.dest "lib"

gulp.task "npm:js:test", do ->

  compile = ->
    gulp.src "test/**/*.coffee", sourcemaps: true
    .pipe coffee
      coffee: coffeescript
      transpile:
        presets: [[ "env", targets: node: "6.10" ]]
    .pipe gulp.dest "lib/test"

  test = ->
    [stdout, stderr] = await run "node lib/test/index.js"
    console.log stdout
    if stderr.length > 0
      console.error stderr

  gulp.series "npm:js", compile, test

gulp.task "npm:publish",
  gulp.series "npm:js",
  -> await run "npm publish"

gulp.task "esm:js", ->
  {version} = module
  gulp
  .src "src/**/*.coffee", sourcemaps: true
  .pipe coffee
    coffee: coffeescript
    transpile:
      presets: [[ "env",
        targets: {browsers}
        modules: false ]]
  .pipe gulp.dest "www/v#{version}/lib"

gulp.task "esm:js:test", do ->

  compile = ->
    {version} = module
    gulp.src "test/**/*.coffee", sourcemaps: true
    .pipe coffee
      coffee: coffeescript
      transpile:
        presets: [[ "env",
          targets: {browsers}
          modules: false ]]
    .pipe gulp.dest "www/v#{version}/lib/test"

  test = ->
    [stdout, stderr] = await run "node lib/test/index.js"
    console.log stdout
    if stderr.length > 0
      console.error stderr

  gulp.series "esm:js", compile, test

gulp.task "esm:publish",
  gulp.series "esm:js",
  # For now, we just copy to the Web site
  # -> await run "h9 publish production"
  do ({version} = module,
    path = " ../pandastrike.com/www/open-source/fairmont/") ->
    -> await run "rsync -a ./www/ #{path}/core"

gulp.task "git:tag", ->
  {version} = module
  await run "git tag -am #{version} #{version}"
  await run "git push --tags"

gulp.task "test",
  gulp.parallel "esm:js:test", "npm:js:test"

gulp.task "publish",
  gulp.series (gulp.parallel "esm:js", "npm:js"),
    (gulp.parallel "esm:publish", "npm:publish"),
    "git:tag"

gulp.task "www:server", ->
  gulp
  .src "build"
  .pipe webserver
      livereload: true
      port: 8000
      extensions: [ "html" ]

gulp.task "www:clean", ->
  del "build"

gulp.task "www:html", ->
  gulp
  .src [ "www/**/*.pug" ]
  .pipe pug {}
  .pipe gulp.dest "build"

gulp.task "www:css", ->
  gulp
  .src "www/**/*.styl"
  .pipe stylus()
  .pipe gulp.dest "build"

gulp.task "www:js", ->
  gulp
  .src "www/**/*.coffee", sourcemaps: true
  .pipe coffee
    coffee: coffeescript
    transpile:
      presets: [[ "env",
        targets: {browsers}
        modules: false ]]
  .pipe gulp.dest "www"

gulp.task "www:images", ->
  gulp
  .src [ "www/images/**/*" ]
  .pipe gulp.dest "build/images"


# watch doesn't take a task name for some reason
# so we need to first define this as a function
build = gulp.series "www:clean",
  gulp.parallel "www:html", "www:css", "www:js", "www:images"

gulp.task "www:build", build

gulp.task "www:watch", ->
  gulp.watch [ "www/**/*" ], build

gulp.task "www",
  gulp.series "www:build",
    gulp.parallel "www:watch", "www:server"

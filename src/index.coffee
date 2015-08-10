# See https://github.com/pandastrike/fairmont/wiki/API-Reference#core-functions

noOp = ->

identity = (x) -> x

wrap = (x) -> -> x

curry = (f) ->
  do cf = (ax = [])->
    (bx...) ->
      cx = ax.concat bx
      if cx.length < f.length then (cf cx) else (f cx...)

_ = {}

partial = (f, ax...) ->
  (bx...) ->
    bx = [].concat bx
    f (((if a == _ then bx.shift() else a) for a in ax).concat bx)...

flip = (f) ->
  switch f.length
    when 1 then f
    when 2 then (y, x) -> f(x, y)
    when 3 then (z, y, x) -> f(x, y, z)
    else (ax...) -> f(ax.reverse()...)

compose = (fx..., f) ->
  if fx.length == 0
    f
  else
    g = compose fx...
    (ax...) ->
      if (fax = f ax...)?.then? then (fax.then g) else (g fax)

pipe = flip compose

spread = (f) -> (ax) -> f ax...

unary = (f) -> (x) -> f(x)

binary = (f) -> (x,y) -> f(x,y)

ternary = (f) -> (x,y,z) -> f(x,y,z)

negate = (f) -> -> !(f arguments...)

module.exports = {noOp, identity, wrap, curry, _, partial,
  flip, compose, pipe, spread, unary, binary, ternary,
  negate}

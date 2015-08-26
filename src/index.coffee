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

substitute = curry (ax, bx) ->
  i = 0
  for a in ax
    if a == _
      bx[i++]
    else
      a

partial = (f, ax...) ->
  (bx...) -> f (substitute ax, bx)...

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

apply = (f, args...) -> (f args...)

negate = (f) -> -> !(f arguments...)

module.exports = {noOp, identity, wrap, curry, _, substitute, partial,
  flip, compose, pipe, spread, unary, binary, ternary,
  apply, negate}

noOp = ->

identity = (x) -> x

wrap = (x) -> -> x

arity  = (N, f) ->
  switch N
    when 0 then  -> f.apply @, arguments
    when 1 then  (a0) -> f.apply @, arguments
    when 2 then  (a0, a1)  -> f.apply @, arguments
    when 3 then  (a0, a1, a2) -> f.apply @, arguments
    when 4 then  (a0, a1, a2, a3) -> f.apply @, arguments
    when 5 then  (a0, a1, a2, a3, a4) -> f.apply @, arguments
    when 6 then  (a0, a1, a2, a3, a4, a5) -> f.apply @, arguments
    when 7 then  (a0, a1, a2, a3, a4, a5, a6) -> f.apply @, arguments
    when 8 then  (a0, a1, a2, a3, a4, a5, a6, a7) -> f.apply @, arguments
    when 9 then  (a0, a1, a2, a3, a4, a5, a6, a7, a8) -> f.apply @, arguments
    when 10
      (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) -> f.apply @, arguments
    else
      throw new Error "First argument to arity must be a non-negative
        integer no greater than ten"


unary = (f) -> arity 1, f

binary = (f) -> arity 2, f

ternary = (f) -> arity 3, f

curry = (f) ->
  arity f.length, (ax...) ->
    if ax.length >= f.length
      f ax...
    else
      length = f.length - ax.length
      if length == 1
        (x) -> f ax..., x
      else
        curry arity length, (bx...) -> f ax..., bx...

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

wait = (f) -> (x) -> if x?.then? then (x.then (a) -> f a) else (f x)

flow = (fx...) ->
  if fx.length == 0
    undefined
  else if fx.length == 1 && !fx[0]?
    undefined
  else if fx.length == 1 && fx[0]?[Symbol.iterator]?
    flow fx[0]...
  else
    (ax...) ->
      [start, gx...] = fx
      result = start ax...
      result = (wait g) result for g in gx
      result

apply = (f, args...) -> (f args...)

negate = (f) -> -> !(f arguments...)

given = (args..., f) -> f args...

tee = (f) ->
  arity (Math.max f.length, 1), (a, bx...) ->
    if (k = (f a, bx...))?.then?
      k.then -> a
    else
      a

rtee = (f) ->
  arity (Math.max f.length, 1), (ax..., b) ->
    if (k = (f ax..., b))?.then?
      k.then -> b
    else
      b

once = (f) ->
  do (k=undefined) ->
    -> if k? then k else (k = f())

memoize = (f) ->
  do (cache={}) -> (args...) -> cache[args] ?= f args...

export {noOp, identity, wrap,
  unary, binary, ternary,
  curry, _, substitute,
  partial, flip, compose, pipe, spread, wait, flow,
  apply, negate, once, tee, rtee, given, memoize}

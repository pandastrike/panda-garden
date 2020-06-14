import {arity, unary, binary, ternary} from "./arity"
import {curry} from "./curry"
import {pipeWith, spipeWith} from "./pipe-with"

identity = (x) -> x

wrap = (x) -> -> x

_ = {}

substitute = curry (ax, bx) ->
  i = 0
  for a in ax
    if a == _
      bx[i++]
    else
      a

partial = (f, ax) ->
  arity (f.length - ax.length),
    (bx...) -> f (substitute ax, bx)...

spread = (f) -> (ax) -> f ax...

variadic = (f) -> (ax...) -> f ax

flip = (f) ->
  switch f.length
    when 0
      (ax...) -> f.apply @, ax.reverse()
    when 1
      (a0) -> f.call @, a0
    when 2
      (a0, a1)  -> f.call @, a1, a0
    when 3
      (a0, a1, a2) -> f.call @, a2, a1, a0
    when 4
      (a0, a1, a2, a3) -> f.call @, a3, a2, a1, a0
    when 5
      (a0, a1, a2, a3, a4) -> f.call @, a4, a3, a2, a1, a0
    when 6
      (a0, a1, a2, a3, a4, a5) -> f.call @, a5, a4, a3, a2, a1, a0
    when 7
      (a0, a1, a2, a3, a4, a5, a6) -> f.call @, a6, a4, a3, a2, a1, a0
    when 8
      (a0, a1, a2, a3, a4, a5, a6, a7) ->
        f.call @, a7, a6, a5, a4, a3, a2, a1, a0
    when 9
      (a0, a1, a2, a3, a4, a5, a6, a7, a8) ->
        f.call @, a8, a7, a6, a5, a4, a3, a2, a1, a0
    when 10
      (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) ->
        f.call @, a9, a8, a7, a6, a5, a4, a3, a2, a1, a0
    else
      throw new Error "First argument to flip must be a function
        with an arity no greater than ten"


pipe = spipeWith identity

flow = pipeWith identity

compose = flip pipe

wait = (f) -> arity f.length, (ax...) -> (Promise.all ax).then (ax) -> f ax...


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

negate = (f) -> (ax...) -> !(f ax...)

once = (f) ->
  do (k=undefined) ->
    -> if k? then k else (k = f())

memoize = (f) ->
  do (cache={}) -> (args...) -> cache[args] ?= f args...

call = (f, ax...) -> (f ax...)

apply = (f, ax) -> (f ax...)

export {identity, wrap,
  arity, unary, binary, ternary,
  curry, _, substitute,
  partial, spread, variadic, flip,
  pipe, compose, pipeWith, spipeWith, wait, flow,
  tee, rtee,
  negate,
  once, memoize,
  call, apply}

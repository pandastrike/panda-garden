# Based on _arity from Rambda:
# https://github.com/ramda/ramda/blob/v0.26.1/source/internal/_arity.js
arity  = (N, f) ->
  switch N
    when 0
      (ax...) -> f.apply @, ax
    when 1
      (a0) -> f.apply @, arguments
    when 2
      (a0, a1)  -> f.apply @, arguments
    when 3
      (a0, a1, a2) -> f.apply @, arguments
    when 4
      (a0, a1, a2, a3) -> f.apply @, arguments
    when 5
      (a0, a1, a2, a3, a4) -> f.apply @, arguments
    when 6
      (a0, a1, a2, a3, a4, a5) -> f.apply @, arguments
    when 7
      (a0, a1, a2, a3, a4, a5, a6) -> f.apply @, arguments
    when 8
      (a0, a1, a2, a3, a4, a5, a6, a7) -> f.apply @, arguments
    when 9
      (a0, a1, a2, a3, a4, a5, a6, a7, a8) -> f.apply @, arguments
    when 10
      (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) -> f.apply @, arguments
    else
      throw new Error "First argument to arity must be a non-negative
        integer no greater than ten"

unary = (f) -> arity 1, f

binary = (f) -> arity 2, f

ternary = (f) -> arity 3, f

export {arity, unary, binary, ternary}

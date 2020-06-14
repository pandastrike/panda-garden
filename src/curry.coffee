import {arity} from "./arity"

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

export {curry}

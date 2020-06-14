import {curry} from "./curry"

prototype = (value) -> if value? then Object.getPrototypeOf value

isPrototype = curry (p, value) -> p? && p == prototype value

isType = curry (type, value) -> isPrototype type?.prototype, value

isTransitivePrototype = curry (p, value) ->
  p? && (p == (q = prototype value) || (q? && isTransitivePrototype p, q))

isKind = curry (type, value) -> isTransitivePrototype type?.prototype, value


export {isKind, isType}

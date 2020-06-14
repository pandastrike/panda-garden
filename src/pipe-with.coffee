# Inspired by Rambda: https://ramdajs.com/docs/#pipeWith
import {arity} from "./arity"
import {curry} from "./curry"
import {isKind, isType} from "./type"


containsPromise = (ax) ->
  for a in ax
    return true if isType Promise, a
  false


validate = ({name, c, fx}) ->
  unless isKind Function, c
    throw new Error """
      garden::#{name} The outer combinator must be Function or AsyncFunction.
      Provided: #{JSON.stringify c, null, 2}
    """

  unless fx
    throw new Error """
      garden::#{name} Specify combinators in an array or array-like structure.
      Provided: #{JSON.stringify fx, null, 2}
    """

  try
    fx = Array.from fx
  catch e
   throw new Error """
    garden::#{name} Specify combinators in an array or array-like structure.
    Provided: #{fx}
    Parse Failure: #{e.stack}
   """

  index = 0
  for f in fx
    unless isKind Function, f
      throw new Error """
        garden::#{name}: Combinator at index #{index} must be Function or AsyncFunction.
        Provided at index #{index}: #{JSON.stringify f, null, 2}
      """
    index++

report = ({name, index, f, ax, error}) ->
  throw new Error """
    garden::#{name}: Exception caught in composition.

    At index #{index}: #{if f.name then f.name else f.toString()[0..100]}
    Current stack: #{JSON.stringify ax, null, 2}

    Original error: #{error.stack}
  """

asyncCheck = ({name, ax, index}) ->
  if containsPromise ax
    throw new Error "garden::#{name}: Combinator at index #{index} returned a promise. #{name} is unable to instrument asynchronous composition."

pipeWith = curry (c, fx) ->
  name = "pipeWith"
  validate {name, c, fx}

  (ax...) ->
    index = 0
    for f in fx
      try
        ax = [ await (c f) ax... ]
        index++
      catch error
        report {name, index, f, ax, error}

    return ax[0]

spipeWith = curry (c, fx) ->
  name = "spipeWith"
  validate {name, c, fx}

  (ax...) ->
    index = 0
    for f in fx
      try
        ax = [ (c f) ax... ]
      catch error
        report {name, index, f, ax, error}

      asyncCheck {name, ax, index}
      index++

    return ax[0]

export {pipeWith, spipeWith}

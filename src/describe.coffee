import {isKind, isType} from "./type"

dictionary =

  pipeWith: ([c, fx]) ->

    unless isKind Function, c
      throw new Error "garden: pipeWith:
        The outer combinator must be Function or AsyncFunction.
        Provided: #{JSON.stringify c, null, 2}
      "

    unless fx?
      throw new Error "garden: pipeWith:
        Specify combinators in an array or array-like structure.
        Provided: #{JSON.stringify fx, null, 2}
      "

    try
      fx = Array.from fx
    catch e
     throw new Error "garden: pipeWith:
       Specify combinators in an array or array-like structure.
       Provided: #{fx}
       #{e}"

    for f, i in fx

      unless isKind Function, f
        throw new Error "garden: pipeWith:
          Combinator at index #{i} must be Function or AsyncFunction.
          Provided at index #{i}: #{JSON.stringify f, null, 2}"

      if f.name? && f.name != ""
        f._ = name: f.name
      else
        f._ = name: "anonymous-#{i}"

describe = (name, ax) ->
  dictionary[name] ax


export {describe}

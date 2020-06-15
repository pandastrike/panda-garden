import {isType} from "./type"

dictionary =

  pipeWith: ([c, fx]) ->

    unless isType Function, c
      throw new Error """
        garden: pipeWith: \
        The outer combinator must be Function.
        Provided: #{JSON.stringify c, null, 2}
      """

    unless fx?
      throw new Error """
        garden: pipeWith: \
        Specify combinators in an array or array-like structure.
        Provided: #{JSON.stringify fx, null, 2}
      """

    try
      fx = Array.from fx
    catch e
      throw new Error """
        garden: pipeWith: \
        Specify combinators in an array or array-like structure.
        Provided: #{fx}
        #{e}
      """

describe = (name, ax) -> dictionary[name] ax


export {describe}

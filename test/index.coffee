assert = require "assert"
Amen = require "amen"

Amen.describe "Core functions", (context) ->

  {noOp, identity, wrap, curry, _, partial,
    flip, compose, pipe, spread, unary, binary, ternary,
    negate} = require "../src"

  context.test "noOp"

  context.test "identity"

  context.test "wrap"

  context.test "curry"

  context.test "partial", ->
    {pow} = Math
    square = partial pow, _, 2
    assert (square 3) == 9

  context.test "flip", ->
    {pow} = Math
    square =  (curry flip pow)(2)
    assert (square 3) == 9

  context.test "compose"

  context.test "pipe"

  context.test "spread"

  context.test "unary"

  context.test "binary"

  context.test "ternary"

  context.test "negate", ->
    f = -> false
    g = negate f
    assert g()

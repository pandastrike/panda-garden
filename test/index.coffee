assert = require "assert"
Amen = require "amen"

Amen.describe "Core functions", (context) ->

  {noOp, identity, wrap, curry, _, substitute, partial,
    flip, compose, pipe, apply, spread,
    unary, binary, ternary,
    negate} = require "../src"

  context.test "noOp", ->
    assert (noOp 7) == undefined

  context.test "identity", ->
    assert (identity 7) == 7

  context.test "wrap", ->
    f = wrap 7
    assert f() == 7

  context.test "curry", ->
    slice = curry (begin, end, array) -> array.slice begin, end
    truncate1 = slice 1
    assert truncate1.length == 2
    truncate1_4 = truncate1 4
    assert truncate1_4.length == 1
    x = truncate1_4 [1..5]
    assert x.length == 3
    assert x[0] == 2
    assert x[1] == 3
    assert x[2] == 4

  context.test "substitute", ->
    ax = substitute [1, _, 3], [2]
    assert ax[1] == 2

  context.test "partial", ->
    {pow} = Math
    square = partial pow, _, 2
    assert (square 3) == 9

  context.test "flip", ->
    pow = curry flip Math.pow
    square =  pow 2
    assert (square 3) == 9

  context.test "compose", ->
    inverse = (x) -> 1/x
    square = (x) -> x * x
    inverseSquare = compose inverse, square
    assert inverseSquare 5 == 1/25

  context.test "compose (promise)", ->
    _when = require "when"
    inverse = (x) -> _when 1/x
    square = (x) -> x * x
    inverseSquare = compose inverse, square
    assert (inverseSquare 5).then?
    assert (yield inverseSquare 5) == 1/25

  context.test "pipe", ->
    a = (x) -> x + "a"
    b = (x) -> x + "b"
    ab = pipe a, b
    assert (ab "S") == "Sab"

  context.test "apply", ->
    assert (apply identity, 1) == 1

  context.test "spread", ->
    cat = (a, b) -> a + b
    catPair = spread cat
    assert (catPair ["a", "b"]) == "ab"

  context.test "unary", ->
    f = -> arguments[0]
    assert (f "a") == "a"

  context.test "binary", ->
    f = ->
      [a,b] = arguments
      a + b
    g = curry binary f
    a = g "a"
    assert (a "b") == "ab"

  context.test "ternary", ->
    f = ->
      [a,b,c] = arguments
      a + b + c
    g = curry ternary f
    ab = g "a", "b"
    assert (ab "c") == "abc"

  context.test "negate", ->
    _false = -> false
    _true = negate _false
    assert _true()

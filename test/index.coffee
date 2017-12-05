import {print, test} from "amen"
import {noOp, identity, wrap, curry, _, substitute, partial,
  flip, compose, pipe, apply, spread,
  unary, binary, ternary,
  negate, once, given} from "../index.js"
import assert from "assert"

do ->
  print await test "Core functions", [

    test "noOp", -> assert (noOp 7) == undefined
    test "identity", -> assert (identity 7) == 7
    test "wrap", -> assert (wrap 7)() == 7

    test "curry", [
        test "nullary function", -> assert (curry -> 0)() == 0
        test "unary function", -> assert (curry (x) -> x)(1) == 1
        test "binary function", ->
          assert (curry (x,y) -> x + y)(1)(2) == 3
        test "tertiary function", ->
          assert (curry (x,y,z) -> x + y + z)(1)(2)(3) == 6
        test "n-ary function", ->
          assert (curry (w,x,y,z) -> w+x+y+z)(1)(2)(3)(4) == 10
    ]

    test "substitute", ->
      assert (substitute [1, _, 3], [2])[1] == 2

    test "partial", ->
      square = partial Math.pow, _, 2
      assert (square 3) == 9

    test "flip", ->
      square =  (curry flip Math.pow)(2)
      assert (square 3) == 9

    test "compose", ->
      inverse = (x) -> 1/x
      square = (x) -> x * x
      inverseSquare = compose inverse, square
      assert inverseSquare 5 == 1/25

    test "compose (promise)", ->
      inverse = (x) -> Promise.resolve 1/x
      square = (x) -> x * x
      inverseSquare = compose inverse, square
      assert (inverseSquare 5).then?
      assert (yield inverseSquare 5) == 1/25

    test "pipe", ->
      a = (x) -> x + "a"
      b = (x) -> x + "b"
      ab = pipe a, b
      assert (ab "S") == "Sab"

    test "apply", ->
      assert (apply identity, 1) == 1

    test "spread", ->
      assert (spread (a, b) -> a + b)(["a", "b"]) == "ab"

    test "unary", -> assert (unary ->).length == 1
    test "binary", -> assert (binary ->).length == 2
    test "ternary", -> assert (ternary ->).length == 3

    test "negate", ->
      assert (negate -> false)()

    test "once", ->
      (f = do (i=0) -> once -> i++)()
      assert f() == 0

    test "given", ->
      a = b = c = 0
      given (a = 3, b = 2) -> c = a * b
      assert c == 6 && a == b == 0
  ]

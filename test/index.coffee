import assert from "assert"
import {print, test, success} from "amen"

import {noOp, identity, wrap,
  unary, binary, ternary,
  curry, _, substitute, partial,
  flip, compose, pipe, apply, spread, wait, flow,
  negate, once, given, memoize, tee, rtee} from "../src/index"

do ->

  print await test "Core functions", [

    test "noOp", -> assert (noOp 7) == undefined
    test "identity", -> assert (identity 7) == 7
    test "wrap", -> assert (wrap 7)() == 7

    test "unary", -> assert (unary ->).length == 1
    test "binary", -> assert (binary ->).length == 2
    test "ternary", -> assert (ternary ->).length == 3

    test "curry", [
        test "nullary function", ->
          g = curry -> 0
          assert g.length == 0
          assert g() == 0
        test "unary function", ->
          g = curry (x) -> x
          assert g.length == 1
          assert (g 1) == 1
        test "binary function", ->
          g = curry (x,y) -> x + y
          assert g.length == 2
          assert (g 1, 2) == 3
        test "ternary function", ->
          g = curry (x,y,z) -> x + y + z
          assert g.length == 3
          assert (g 1, 2, 3) == 6
        test "returns curried function", ->
          g = curry (w,x,y,z) -> w + x + y + z
          assert g.length == 4
          h = g 1
          assert h.length == 3
          i = h 2
          assert i.length == 2
          j = i 3
          assert j.length == 1
          assert (j 4) == 10
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

    test "tee", [
      test "nullary function", ->
        f = -> 1
        g = tee f
        assert g.length == 1
        assert (g 5) == 5
      test "unary function", ->
        f = tee (x) -> 1/x
        assert f.length == 1
        assert (f 5) == 5
      test "binary function", ->
        f = tee (x, y) -> x + y
        assert f.length == 2
        assert (f 5, 10) == 5
      test "ternary function", ->
        f = tee (x, y, z) -> x + y + z
        assert f.length == 3
        assert (f 5, 10, 15) == 5
    ]

    test "tee (promise)", [
      test "nullary function", ->
        f = tee -> Promise.resolve 1
        assert f.length == 1
        assert (await f 5) == 5
      test "unary function", ->
        f = tee (x) -> Promise.resolve 1/x
        assert f.length == 1
        assert (await f 5) == 5
      test "binary function", ->
        f = tee (x, y) -> Promise.resolve x + y
        assert f.length == 2
        assert (await f 5, 10) == 5
      test "ternary function", ->
        f = tee (x, y, z) -> Promise.resolve x + y + z
        assert f.length == 3
        assert (await f 5, 10, 15) == 5
    ]

    test "rtee", [
      test "nullary function", ->
        f = rtee -> 1
        assert f.length == 1
        assert (f 5) == 5
      test "unary function", ->
        f = rtee (x) -> 1/x
        assert f.length == 1
        assert (f 5) == 5
      test "binary function", ->
        f = rtee (x, y) -> x + y
        assert f.length == 2
        assert (f 5, 10) == 10
      test "ternary function", ->
        f = rtee (x, y, z) -> x + y + z
        assert f.length == 3
        assert (f 5, 10, 15) == 15
    ]

    test "rtee (promise)", [
      test "nullary function", ->
        f = rtee -> Promise.resolve 1
        assert f.length == 1
        assert (await f 5) == 5
      test "unary function", ->
        f = rtee (x) -> Promise.resolve 1/x
        assert f.length == 1
        assert (await f 5) == 5
      test "binary function", ->
        f = rtee (x, y) -> Promise.resolve x + y
        assert f.length == 2
        assert (await f 5, 10) == 10
      test "ternary function", ->
        f = rtee (x, y, z) -> Promise.resolve x + y + z
        assert f.length == 3
        assert (await f 5, 10, 15) == 15
    ]

    test "wait", ->
      square = wait (x) -> Math.pow x, 2
      assert (square 2) == 4
      assert (await square Promise.resolve 2) == 4

    test "pipe", [
      test "sync works", ->
        a = (x) -> x + "a"
        b = (x) -> x + "b"
        c = (x) -> x + "c"
        alpha = pipe a, b, c
        assert (alpha "S") == "Sabc"

      test "async waits for antecedants (depreciated)", ->
        a = (x) -> Promise.resolve x + "a"
        b = (x) -> Promise.resolve x + "b"
        c = (x) -> Promise.resolve x + "c"
        alpha = pipe a, b, c
        assert (await alpha "S") == "Sabc"
    ]

    test "flow", [
      test "sync works", ->
        a = (x) -> x + "a"
        b = (x) -> x + "b"
        c = (x) -> x + "c"
        alpha = pipe a, b, c
        assert (alpha "S") == "Sabc"

      test "async waits for antecedants", ->
        a = (x) -> Promise.resolve x + "a"
        b = (x) -> Promise.resolve x + "b"
        c = (x) -> Promise.resolve x + "c"
        alpha = flow a, b, c
        assert (await alpha "S") == "Sabc"

      test "spreads array input", ->
        a = (x) -> Promise.resolve x + "a"
        b = (x) -> Promise.resolve x + "b"
        c = (x) -> Promise.resolve x + "c"
        alpha = flow [a, b, c]
        assert (await alpha "S") == "Sabc"

      test "defaults to undefined", ->
        alpha = flow()
        assert alpha == undefined

        alpha = flow undefined
        assert alpha == undefined
    ]

    test "apply", ->
      assert (apply identity, 1) == 1

    test "spread", ->
      assert (spread (a, b) -> a + b)(["a", "b"]) == "ab"

    test "negate", ->
      assert (negate -> false)()

    test "once", ->
      (f = do (i=0) -> once -> i++)()
      assert f() == 0

    test "given", ->
      assert (given (a = 3, b = 2) -> a * b) == 6 && !a? && !b?
      assert (given 3, 2, (a,b) -> a * b) == 6

    test "memoize", do ->
      count = 0
      f = memoize (x, y) -> count++; x
      [
        test "runs the function", ->
          assert f(1, 2) == 1 && count == 1
        test "but only once for a given argument", ->
          assert f(1, 2) == 1 && count == 1
        test "without affecting any other arguments", ->
          assert f(2, 1) == 2 && count == 2
      ]
  ]

  process.exit if success then 0 else 1

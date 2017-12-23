"use strict";

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _amen = require("amen");

var _index = require("../lib/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator(function* () {
  return (0, _amen.print)((yield (0, _amen.test)("Core functions", [(0, _amen.test)("noOp", function () {
    var _rec = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt((0, _index.noOp)(7), "arguments/0/left") === _rec._capt(void 0, "arguments/0/right"), "arguments/0"), {
      content: "assert(noOp(7) === void 0)",
      filepath: "index.coffee",
      line: 13
    }));
  }), (0, _amen.test)("identity", function () {
    var _rec2 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt((0, _index.identity)(7), "arguments/0/left") === 7, "arguments/0"), {
      content: "assert(identity(7) === 7)",
      filepath: "index.coffee",
      line: 14
    }));
  }), (0, _amen.test)("wrap", function () {
    var _rec3 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt((0, _index.wrap)(7)(), "arguments/0/left") === 7, "arguments/0"), {
      content: "assert(wrap(7)() === 7)",
      filepath: "index.coffee",
      line: 15
    }));
  }), (0, _amen.test)("curry", [(0, _amen.test)("nullary function", function () {
    var _rec4 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec4._expr(_rec4._capt(_rec4._capt((0, _index.curry)(function () {
      return 0;
    })(), "arguments/0/left") === 0, "arguments/0"), {
      content: "assert(curry(function () { return 0; })() === 0)",
      filepath: "index.coffee",
      line: 18
    }));
  }), (0, _amen.test)("unary function", function () {
    var _rec5 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec5._expr(_rec5._capt(_rec5._capt((0, _index.curry)(function (x) {
      return x;
    })(1), "arguments/0/left") === 1, "arguments/0"), {
      content: "assert(curry(function (x) { return x; })(1) === 1)",
      filepath: "index.coffee",
      line: 19
    }));
  }), (0, _amen.test)("binary function", function () {
    var _rec6 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec6._expr(_rec6._capt(_rec6._capt((0, _index.curry)(function (x, y) {
      return x + y;
    })(1)(2), "arguments/0/left") === 3, "arguments/0"), {
      content: "assert(curry(function (x, y) { return x + y; })(1)(2) === 3)",
      filepath: "index.coffee",
      line: 21
    }));
  }), (0, _amen.test)("tertiary function", function () {
    var _rec7 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec7._expr(_rec7._capt(_rec7._capt((0, _index.curry)(function (x, y, z) {
      return x + y + z;
    })(1)(2)(3), "arguments/0/left") === 6, "arguments/0"), {
      content: "assert(curry(function (x, y, z) { return x + y + z; })(1)(2)(3) === 6)",
      filepath: "index.coffee",
      line: 23
    }));
  }), (0, _amen.test)("n-ary function", function () {
    var _rec8 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec8._expr(_rec8._capt(_rec8._capt((0, _index.curry)(function (w, x, y, z) {
      return w + x + y + z;
    })(1)(2)(3)(4), "arguments/0/left") === 10, "arguments/0"), {
      content: "assert(curry(function (w, x, y, z) { return w + x + y + z; })(1)(2)(3)(4) === 10)",
      filepath: "index.coffee",
      line: 25
    }));
  })]), (0, _amen.test)("substitute", function () {
    var _rec9 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt((0, _index.substitute)(_rec9._capt([1, _rec9._capt(_index._, "arguments/0/left/object/arguments/0/elements/1"), 3], "arguments/0/left/object/arguments/0"), _rec9._capt([2], "arguments/0/left/object/arguments/1")), "arguments/0/left/object")[1], "arguments/0/left") === 2, "arguments/0"), {
      content: "assert(substitute([1, _, 3], [2])[1] === 2)",
      filepath: "index.coffee",
      line: 29
    }));
  }), (0, _amen.test)("partial", function () {
    var _rec10 = new _powerAssertRecorder();

    var square;
    square = (0, _index.partial)(Math.pow, _index._, 2);
    return (0, _powerAssert2.default)(_rec10._expr(_rec10._capt(_rec10._capt(square(3), "arguments/0/left") === 9, "arguments/0"), {
      content: "assert(square(3) === 9)",
      filepath: "index.coffee",
      line: 33
    }));
  }), (0, _amen.test)("flip", function () {
    var _rec11 = new _powerAssertRecorder();

    var square;
    square = (0, _index.curry)((0, _index.flip)(Math.pow))(2);
    return (0, _powerAssert2.default)(_rec11._expr(_rec11._capt(_rec11._capt(square(3), "arguments/0/left") === 9, "arguments/0"), {
      content: "assert(square(3) === 9)",
      filepath: "index.coffee",
      line: 37
    }));
  }), (0, _amen.test)("compose", function () {
    var _rec12 = new _powerAssertRecorder();

    var inverse, inverseSquare, square;
    inverse = function (x) {
      return 1 / x;
    };
    square = function (x) {
      return x * x;
    };
    inverseSquare = (0, _index.compose)(inverse, square);
    return (0, _powerAssert2.default)(_rec12._expr(_rec12._capt(inverseSquare(_rec12._capt(5 === _rec12._capt(1 / 25, "arguments/0/arguments/0/right"), "arguments/0/arguments/0")), "arguments/0"), {
      content: "assert(inverseSquare(5 === 1 / 25))",
      filepath: "index.coffee",
      line: 43
    }));
  }), (0, _amen.test)("compose (promise)", function* () {
    var _rec13 = new _powerAssertRecorder(),
        _rec14 = new _powerAssertRecorder();

    var inverse, inverseSquare, square;
    inverse = function (x) {
      return Promise.resolve(1 / x);
    };
    square = function (x) {
      return x * x;
    };
    inverseSquare = (0, _index.compose)(inverse, square);
    (0, _powerAssert2.default)(_rec13._expr(_rec13._capt(_rec13._capt(_rec13._capt(inverseSquare(5), "arguments/0/left/object").then, "arguments/0/left") != null, "arguments/0"), {
      content: "assert(inverseSquare(5).then != null)",
      filepath: "index.coffee",
      line: 49,
      generator: true
    }));
    return (0, _powerAssert2.default)(_rec14._expr(_rec14._capt(_rec14._capt((yield inverseSquare(5)), "arguments/0/left") === _rec14._capt(1 / 25, "arguments/0/right"), "arguments/0"), {
      content: "assert((yield inverseSquare(5)) === 1 / 25)",
      filepath: "index.coffee",
      line: 50,
      generator: true
    }));
  }), (0, _amen.test)("pipe", function () {
    var _rec15 = new _powerAssertRecorder();

    var a, ab, b;
    a = function (x) {
      return x + "a";
    };
    b = function (x) {
      return x + "b";
    };
    ab = (0, _index.pipe)(a, b);
    return (0, _powerAssert2.default)(_rec15._expr(_rec15._capt(_rec15._capt(ab("S"), "arguments/0/left") === "Sab", "arguments/0"), {
      content: "assert(ab(\"S\") === \"Sab\")",
      filepath: "index.coffee",
      line: 56
    }));
  }), (0, _amen.test)("apply", function () {
    var _rec16 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec16._expr(_rec16._capt(_rec16._capt((0, _index.apply)(_rec16._capt(_index.identity, "arguments/0/left/arguments/0"), 1), "arguments/0/left") === 1, "arguments/0"), {
      content: "assert(apply(identity, 1) === 1)",
      filepath: "index.coffee",
      line: 59
    }));
  }), (0, _amen.test)("spread", function () {
    var _rec17 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec17._expr(_rec17._capt(_rec17._capt((0, _index.spread)(function (a, b) {
      return a + b;
    })(_rec17._capt(["a", "b"], "arguments/0/left/arguments/0")), "arguments/0/left") === "ab", "arguments/0"), {
      content: "assert(spread(function (a, b) { return a + b; })([\"a\", \"b\"]) === \"ab\")",
      filepath: "index.coffee",
      line: 62
    }));
  }), (0, _amen.test)("unary", function () {
    var _rec18 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec18._expr(_rec18._capt(_rec18._capt(_rec18._capt((0, _index.unary)(function () {}), "arguments/0/left/object").length, "arguments/0/left") === 1, "arguments/0"), {
      content: "assert(unary(function () {}).length === 1)",
      filepath: "index.coffee",
      line: 64
    }));
  }), (0, _amen.test)("binary", function () {
    var _rec19 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec19._expr(_rec19._capt(_rec19._capt(_rec19._capt((0, _index.binary)(function () {}), "arguments/0/left/object").length, "arguments/0/left") === 2, "arguments/0"), {
      content: "assert(binary(function () {}).length === 2)",
      filepath: "index.coffee",
      line: 65
    }));
  }), (0, _amen.test)("ternary", function () {
    var _rec20 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec20._expr(_rec20._capt(_rec20._capt(_rec20._capt((0, _index.ternary)(function () {}), "arguments/0/left/object").length, "arguments/0/left") === 3, "arguments/0"), {
      content: "assert(ternary(function () {}).length === 3)",
      filepath: "index.coffee",
      line: 66
    }));
  }), (0, _amen.test)("negate", function () {
    var _rec21 = new _powerAssertRecorder();

    return (0, _powerAssert2.default)(_rec21._expr(_rec21._capt((0, _index.negate)(function () {
      return false;
    })(), "arguments/0"), {
      content: "assert(negate(function () { return false; })())",
      filepath: "index.coffee",
      line: 69
    }));
  }), (0, _amen.test)("once", function () {
    var _rec22 = new _powerAssertRecorder();

    var f;
    (f = function (i) {
      return (0, _index.once)(function () {
        return i++;
      });
    }(0))();
    return (0, _powerAssert2.default)(_rec22._expr(_rec22._capt(_rec22._capt(f(), "arguments/0/left") === 0, "arguments/0"), {
      content: "assert(f() === 0)",
      filepath: "index.coffee",
      line: 73
    }));
  }), (0, _amen.test)("given", function () {
    var _rec23 = new _powerAssertRecorder(),
        _rec24 = new _powerAssertRecorder();

    (0, _powerAssert2.default)(_rec23._expr(_rec23._capt(_rec23._capt(_rec23._capt(_rec23._capt((0, _index.given)(function (a = 3, b = 2) {
      return a * b;
    }), "arguments/0/left/left/left") === 6, "arguments/0/left/left") && _rec23._capt(_rec23._capt(_rec23._capt(typeof a, "arguments/0/left/right/left/left") === "undefined", "arguments/0/left/right/left") || _rec23._capt(_rec23._capt(a, "arguments/0/left/right/right/left") === null, "arguments/0/left/right/right"), "arguments/0/left/right"), "arguments/0/left") && _rec23._capt(_rec23._capt(_rec23._capt(typeof b, "arguments/0/right/left/left") === "undefined", "arguments/0/right/left") || _rec23._capt(_rec23._capt(b, "arguments/0/right/right/left") === null, "arguments/0/right/right"), "arguments/0/right"), "arguments/0"), {
      content: "assert(given(function (a = 3, b = 2) { return a * b; }) === 6 && (typeof a === \"undefined\" || a === null) && (typeof b === \"undefined\" || b === null))",
      filepath: "index.coffee",
      line: 76
    }));
    return (0, _powerAssert2.default)(_rec24._expr(_rec24._capt(_rec24._capt((0, _index.given)(3, 2, function (a, b) {
      return a * b;
    }), "arguments/0/left") === 6, "arguments/0"), {
      content: "assert(given(3, 2, function (a, b) { return a * b; }) === 6)",
      filepath: "index.coffee",
      line: 77
    }));
  }), (0, _amen.test)("memoize", function () {
    var count, f;
    count = 0;
    f = (0, _index.memoize)(function (x, y) {
      count++;
      return x;
    });
    return [(0, _amen.test)("runs the function", function () {
      var _rec25 = new _powerAssertRecorder();

      return (0, _powerAssert2.default)(_rec25._expr(_rec25._capt(_rec25._capt(_rec25._capt(f(1, 2), "arguments/0/left/left") === 1, "arguments/0/left") && _rec25._capt(_rec25._capt(count, "arguments/0/right/left") === 1, "arguments/0/right"), "arguments/0"), {
        content: "assert(f(1, 2) === 1 && count === 1)",
        filepath: "index.coffee",
        line: 84
      }));
    }), (0, _amen.test)("but only once for a given argument", function () {
      var _rec26 = new _powerAssertRecorder();

      return (0, _powerAssert2.default)(_rec26._expr(_rec26._capt(_rec26._capt(_rec26._capt(f(1, 2), "arguments/0/left/left") === 1, "arguments/0/left") && _rec26._capt(_rec26._capt(count, "arguments/0/right/left") === 1, "arguments/0/right"), "arguments/0"), {
        content: "assert(f(1, 2) === 1 && count === 1)",
        filepath: "index.coffee",
        line: 86
      }));
    }), (0, _amen.test)("without affecting any other arguments", function () {
      var _rec27 = new _powerAssertRecorder();

      return (0, _powerAssert2.default)(_rec27._expr(_rec27._capt(_rec27._capt(_rec27._capt(f(2, 1), "arguments/0/left/left") === 2, "arguments/0/left") && _rec27._capt(_rec27._capt(count, "arguments/0/right/left") === 2, "arguments/0/right"), "arguments/0"), {
        content: "assert(f(2, 1) === 2 && count === 2)",
        filepath: "index.coffee",
        line: 88
      }));
    })];
  }())])));
})();
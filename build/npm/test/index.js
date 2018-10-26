"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _amen = require("amen");

var _index = require("../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  (0, _amen.print)((await (0, _amen.test)("Core functions", [(0, _amen.test)("noOp", function () {
    return (0, _assert.default)((0, _index.noOp)(7) === void 0);
  }), (0, _amen.test)("identity", function () {
    return (0, _assert.default)((0, _index.identity)(7) === 7);
  }), (0, _amen.test)("wrap", function () {
    return (0, _assert.default)((0, _index.wrap)(7)() === 7);
  }), (0, _amen.test)("curry", [(0, _amen.test)("nullary function", function () {
    return (0, _assert.default)((0, _index.curry)(function () {
      return 0;
    })() === 0);
  }), (0, _amen.test)("unary function", function () {
    return (0, _assert.default)((0, _index.curry)(function (x) {
      return x;
    })(1) === 1);
  }), (0, _amen.test)("binary function", function () {
    return (0, _assert.default)((0, _index.curry)(function (x, y) {
      return x + y;
    })(1)(2) === 3);
  }), (0, _amen.test)("tertiary function", function () {
    return (0, _assert.default)((0, _index.curry)(function (x, y, z) {
      return x + y + z;
    })(1)(2)(3) === 6);
  }), (0, _amen.test)("n-ary function", function () {
    return (0, _assert.default)((0, _index.curry)(function (w, x, y, z) {
      return w + x + y + z;
    })(1)(2)(3)(4) === 10);
  })]), (0, _amen.test)("substitute", function () {
    return (0, _assert.default)((0, _index.substitute)([1, _index._, 3], [2])[1] === 2);
  }), (0, _amen.test)("partial", function () {
    var square;
    square = (0, _index.partial)(Math.pow, _index._, 2);
    return (0, _assert.default)(square(3) === 9);
  }), (0, _amen.test)("flip", function () {
    var square;
    square = (0, _index.curry)((0, _index.flip)(Math.pow))(2);
    return (0, _assert.default)(square(3) === 9);
  }), (0, _amen.test)("compose", function () {
    var inverse, inverseSquare, square;

    inverse = function (x) {
      return 1 / x;
    };

    square = function (x) {
      return x * x;
    };

    inverseSquare = (0, _index.compose)(inverse, square);
    return (0, _assert.default)(inverseSquare(5 === 1 / 25));
  }), (0, _amen.test)("compose (promise)", function* () {
    var inverse, inverseSquare, square;

    inverse = function (x) {
      return Promise.resolve(1 / x);
    };

    square = function (x) {
      return x * x;
    };

    inverseSquare = (0, _index.compose)(inverse, square);
    (0, _assert.default)(inverseSquare(5).then != null);
    return (0, _assert.default)((yield inverseSquare(5)) === 1 / 25);
  }), (0, _amen.test)("tee", function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return 1 / x;
    });
    return (0, _assert.default)(5, f(5));
  }), (0, _amen.test)("tee (promise)", async function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return Promise.resolve(1 / x);
    });
    return (0, _assert.default)(5, (await f(5)));
  }), (0, _amen.test)("pipe", function () {
    var a, ab, b;

    a = function (x) {
      return x + "a";
    };

    b = function (x) {
      return x + "b";
    };

    ab = (0, _index.pipe)(a, b);
    return (0, _assert.default)(ab("S") === "Sab");
  }), (0, _amen.test)("apply", function () {
    return (0, _assert.default)((0, _index.apply)(_index.identity, 1) === 1);
  }), (0, _amen.test)("spread", function () {
    return (0, _assert.default)((0, _index.spread)(function (a, b) {
      return a + b;
    })(["a", "b"]) === "ab");
  }), (0, _amen.test)("unary", function () {
    return (0, _assert.default)((0, _index.unary)(function () {}).length === 1);
  }), (0, _amen.test)("binary", function () {
    return (0, _assert.default)((0, _index.binary)(function () {}).length === 2);
  }), (0, _amen.test)("ternary", function () {
    return (0, _assert.default)((0, _index.ternary)(function () {}).length === 3);
  }), (0, _amen.test)("negate", function () {
    return (0, _assert.default)((0, _index.negate)(function () {
      return false;
    })());
  }), (0, _amen.test)("once", function () {
    var f;
    (f = function (i) {
      return (0, _index.once)(function () {
        return i++;
      });
    }(0))();
    return (0, _assert.default)(f() === 0);
  }), (0, _amen.test)("given", function () {
    (0, _assert.default)((0, _index.given)(function (a = 3, b = 2) {
      return a * b;
    }) === 6 && (typeof a === "undefined" || a === null) && (typeof b === "undefined" || b === null));
    return (0, _assert.default)((0, _index.given)(3, 2, function (a, b) {
      return a * b;
    }) === 6);
  }), (0, _amen.test)("memoize", function () {
    var count, f;
    count = 0;
    f = (0, _index.memoize)(function (x, y) {
      count++;
      return x;
    });
    return [(0, _amen.test)("runs the function", function () {
      return (0, _assert.default)(f(1, 2) === 1 && count === 1);
    }), (0, _amen.test)("but only once for a given argument", function () {
      return (0, _assert.default)(f(1, 2) === 1 && count === 1);
    }), (0, _amen.test)("without affecting any other arguments", function () {
      return (0, _assert.default)(f(2, 1) === 2 && count === 2);
    })];
  }())])));
  return process.exit(_amen.success ? 0 : 1);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9keW9kZXIvcmVwb3MvcGFuZGEtZ2FyZGVuL3Rlc3QvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7QUFLRyxDQUFBLGtCQUFBO0FBRUQsb0JBQU0sTUFBTSxnQkFBQSxnQkFBQSxFQUF1QixDQUVqQyxnQkFBQSxNQUFBLEVBQWEsWUFBQTtXQUFHLHFCQUFRLGlCQUFELENBQUMsQ0FBRCxLQUFZLEtBQW5CLENBQUEsQztBQUZpQixHQUVqQyxDQUZpQyxFQUdqQyxnQkFBQSxVQUFBLEVBQWlCLFlBQUE7V0FBRyxxQkFBUSxxQkFBRCxDQUFDLENBQUQsS0FBUCxDQUFBLEM7QUFIYSxHQUdqQyxDQUhpQyxFQUlqQyxnQkFBQSxNQUFBLEVBQWEsWUFBQTtXQUFHLHFCQUFRLGlCQUFELENBQUMsQ0FBRCxPQUFQLENBQUEsQztBQUppQixHQUlqQyxDQUppQyxFQU1qQyxnQkFBQSxPQUFBLEVBQWMsQ0FDVixnQkFBQSxrQkFBQSxFQUF5QixZQUFBO1dBQUcscUJBQVEsa0JBQU0sWUFBQTthQUFHLEM7QUFBVixLQUFDLENBQUQsT0FBUCxDQUFBLEM7QUFEbEIsR0FDVixDQURVLEVBRVYsZ0JBQUEsZ0JBQUEsRUFBdUIsWUFBQTtXQUFHLHFCQUFRLGtCQUFNLFVBQUEsQ0FBQSxFQUFBO2FBQU8sQztBQUFkLEtBQUMsQ0FBRCxDQUFBLENBQUEsTUFBUCxDQUFBLEM7QUFGaEIsR0FFVixDQUZVLEVBR1YsZ0JBQUEsaUJBQUEsRUFBd0IsWUFBQTtXQUN0QixxQkFBUSxrQkFBTSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7YUFBUyxDQUFBLEdBQUksQztBQUFwQixLQUFDLENBQUQsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxNQUFQLENBQUEsQztBQUpRLEdBR1YsQ0FIVSxFQUtWLGdCQUFBLG1CQUFBLEVBQTBCLFlBQUE7V0FDeEIscUJBQVEsa0JBQU0sVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEs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QUEsS0FBQTthQUFTLEM7QUFBM0IsS0FBQSxDQUFKO1dBQ0EsQ0FDRSxnQkFBQSxtQkFBQSxFQUEwQixZQUFBO2FBQ3hCLHFCQUFPLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFnQixLQUFBLEtBQXZCLENBQUEsQztBQUZKLEtBQ0UsQ0FERixFQUdFLGdCQUFBLG9DQUFBLEVBQTJDLFlBQUE7YUFDekMscUJBQU8sQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQWdCLEtBQUEsS0FBdkIsQ0FBQSxDO0FBSkosS0FHRSxDQUhGLEVBS0UsZ0JBQUEsdUNBQUEsRUFBOEMsWUFBQTthQUM1QyxxQkFBTyxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBZ0IsS0FBQSxLQUF2QixDQUFBLEM7QUFOSixLQUtFLENBTEYsQztBQS9FK0IsR0E0RWQsRUFBbkIsQ0E1RWlDLENBQXZCLENBQVo7U0F5RkEsT0FBTyxDQUFQLElBQUEsQ0FBYSxnQkFBQSxDQUFBLEdBQWIsQ0FBQSxDO0FBM0ZGLENBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuaW1wb3J0IHtwcmludCwgdGVzdCwgc3VjY2Vzc30gZnJvbSBcImFtZW5cIlxuXG5pbXBvcnQge25vT3AsIGlkZW50aXR5LCB3cmFwLCBjdXJyeSwgXywgc3Vic3RpdHV0ZSwgcGFydGlhbCxcbiAgZmxpcCwgY29tcG9zZSwgcGlwZSwgYXBwbHksIHNwcmVhZCxcbiAgdW5hcnksIGJpbmFyeSwgdGVybmFyeSxcbiAgbmVnYXRlLCBvbmNlLCBnaXZlbiwgbWVtb2l6ZSwgdGVlfSBmcm9tIFwiLi4vc3JjL2luZGV4XCJcblxuZG8gLT5cblxuICBwcmludCBhd2FpdCB0ZXN0IFwiQ29yZSBmdW5jdGlvbnNcIiwgW1xuXG4gICAgdGVzdCBcIm5vT3BcIiwgLT4gYXNzZXJ0IChub09wIDcpID09IHVuZGVmaW5lZFxuICAgIHRlc3QgXCJpZGVudGl0eVwiLCAtPiBhc3NlcnQgKGlkZW50aXR5IDcpID09IDdcbiAgICB0ZXN0IFwid3JhcFwiLCAtPiBhc3NlcnQgKHdyYXAgNykoKSA9PSA3XG5cbiAgICB0ZXN0IFwiY3VycnlcIiwgW1xuICAgICAgICB0ZXN0IFwibnVsbGFyeSBmdW5jdGlvblwiLCAtPiBhc3NlcnQgKGN1cnJ5IC0+IDApKCkgPT0gMFxuICAgICAgICB0ZXN0IFwidW5hcnkgZnVuY3Rpb25cIiwgLT4gYXNzZXJ0IChjdXJyeSAoeCkgLT4geCkoMSkgPT0gMVxuICAgICAgICB0ZXN0IFwiYmluYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgICAgYXNzZXJ0IChjdXJyeSAoeCx5KSAtPiB4ICsgeSkoMSkoMikgPT0gM1xuICAgICAgICB0ZXN0IFwidGVydGlhcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBhc3NlcnQgKGN1cnJ5ICh4LHkseikgLT4geCArIHkgKyB6KSgxKSgyKSgzKSA9PSA2XG4gICAgICAgIHRlc3QgXCJuLWFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGFzc2VydCAoY3VycnkgKHcseCx5LHopIC0+IHcreCt5K3opKDEpKDIpKDMpKDQpID09IDEwXG4gICAgXVxuXG4gICAgdGVzdCBcInN1YnN0aXR1dGVcIiwgLT5cbiAgICAgIGFzc2VydCAoc3Vic3RpdHV0ZSBbMSwgXywgM10sIFsyXSlbMV0gPT0gMlxuXG4gICAgdGVzdCBcInBhcnRpYWxcIiwgLT5cbiAgICAgIHNxdWFyZSA9IHBhcnRpYWwgTWF0aC5wb3csIF8sIDJcbiAgICAgIGFzc2VydCAoc3F1YXJlIDMpID09IDlcblxuICAgIHRlc3QgXCJmbGlwXCIsIC0+XG4gICAgICBzcXVhcmUgPSAgKGN1cnJ5IGZsaXAgTWF0aC5wb3cpKDIpXG4gICAgICBhc3NlcnQgKHNxdWFyZSAzKSA9PSA5XG5cbiAgICB0ZXN0IFwiY29tcG9zZVwiLCAtPlxuICAgICAgaW52ZXJzZSA9ICh4KSAtPiAxL3hcbiAgICAgIHNxdWFyZSA9ICh4KSAtPiB4ICogeFxuICAgICAgaW52ZXJzZVNxdWFyZSA9IGNvbXBvc2UgaW52ZXJzZSwgc3F1YXJlXG4gICAgICBhc3NlcnQgaW52ZXJzZVNxdWFyZSA1ID09IDEvMjVcblxuICAgIHRlc3QgXCJjb21wb3NlIChwcm9taXNlKVwiLCAtPlxuICAgICAgaW52ZXJzZSA9ICh4KSAtPiBQcm9taXNlLnJlc29sdmUgMS94XG4gICAgICBzcXVhcmUgPSAoeCkgLT4geCAqIHhcbiAgICAgIGludmVyc2VTcXVhcmUgPSBjb21wb3NlIGludmVyc2UsIHNxdWFyZVxuICAgICAgYXNzZXJ0IChpbnZlcnNlU3F1YXJlIDUpLnRoZW4/XG4gICAgICBhc3NlcnQgKHlpZWxkIGludmVyc2VTcXVhcmUgNSkgPT0gMS8yNVxuXG4gICAgdGVzdCBcInRlZVwiLCAtPlxuICAgICAgZiA9IHRlZSAoeCkgLT4gMS94XG4gICAgICBhc3NlcnQgNSwgKGYgNSlcblxuICAgIHRlc3QgXCJ0ZWUgKHByb21pc2UpXCIsIC0+XG4gICAgICBmID0gdGVlICh4KSAtPiBQcm9taXNlLnJlc29sdmUgMS94XG4gICAgICBhc3NlcnQgNSwgKGF3YWl0IGYgNSlcblxuICAgIHRlc3QgXCJwaXBlXCIsIC0+XG4gICAgICBhID0gKHgpIC0+IHggKyBcImFcIlxuICAgICAgYiA9ICh4KSAtPiB4ICsgXCJiXCJcbiAgICAgIGFiID0gcGlwZSBhLCBiXG4gICAgICBhc3NlcnQgKGFiIFwiU1wiKSA9PSBcIlNhYlwiXG5cbiAgICB0ZXN0IFwiYXBwbHlcIiwgLT5cbiAgICAgIGFzc2VydCAoYXBwbHkgaWRlbnRpdHksIDEpID09IDFcblxuICAgIHRlc3QgXCJzcHJlYWRcIiwgLT5cbiAgICAgIGFzc2VydCAoc3ByZWFkIChhLCBiKSAtPiBhICsgYikoW1wiYVwiLCBcImJcIl0pID09IFwiYWJcIlxuXG4gICAgdGVzdCBcInVuYXJ5XCIsIC0+IGFzc2VydCAodW5hcnkgLT4pLmxlbmd0aCA9PSAxXG4gICAgdGVzdCBcImJpbmFyeVwiLCAtPiBhc3NlcnQgKGJpbmFyeSAtPikubGVuZ3RoID09IDJcbiAgICB0ZXN0IFwidGVybmFyeVwiLCAtPiBhc3NlcnQgKHRlcm5hcnkgLT4pLmxlbmd0aCA9PSAzXG5cbiAgICB0ZXN0IFwibmVnYXRlXCIsIC0+XG4gICAgICBhc3NlcnQgKG5lZ2F0ZSAtPiBmYWxzZSkoKVxuXG4gICAgdGVzdCBcIm9uY2VcIiwgLT5cbiAgICAgIChmID0gZG8gKGk9MCkgLT4gb25jZSAtPiBpKyspKClcbiAgICAgIGFzc2VydCBmKCkgPT0gMFxuXG4gICAgdGVzdCBcImdpdmVuXCIsIC0+XG4gICAgICBhc3NlcnQgKGdpdmVuIChhID0gMywgYiA9IDIpIC0+IGEgKiBiKSA9PSA2ICYmICFhPyAmJiAhYj9cbiAgICAgIGFzc2VydCAoZ2l2ZW4gMywgMiwgKGEsYikgLT4gYSAqIGIpID09IDZcblxuICAgIHRlc3QgXCJtZW1vaXplXCIsIGRvIC0+XG4gICAgICBjb3VudCA9IDBcbiAgICAgIGYgPSBtZW1vaXplICh4LCB5KSAtPiBjb3VudCsrOyB4XG4gICAgICBbXG4gICAgICAgIHRlc3QgXCJydW5zIHRoZSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGFzc2VydCBmKDEsIDIpID09IDEgJiYgY291bnQgPT0gMVxuICAgICAgICB0ZXN0IFwiYnV0IG9ubHkgb25jZSBmb3IgYSBnaXZlbiBhcmd1bWVudFwiLCAtPlxuICAgICAgICAgIGFzc2VydCBmKDEsIDIpID09IDEgJiYgY291bnQgPT0gMVxuICAgICAgICB0ZXN0IFwid2l0aG91dCBhZmZlY3RpbmcgYW55IG90aGVyIGFyZ3VtZW50c1wiLCAtPlxuICAgICAgICAgIGFzc2VydCBmKDIsIDEpID09IDIgJiYgY291bnQgPT0gMlxuICAgICAgXVxuICBdXG5cbiAgcHJvY2Vzcy5leGl0IGlmIHN1Y2Nlc3MgdGhlbiAwIGVsc2UgMVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/dyoder/repos/panda-garden/test/index.coffee
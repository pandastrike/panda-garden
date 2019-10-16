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
  }), (0, _amen.test)("unary", function () {
    return (0, _assert.default)((0, _index.unary)(function () {}).length === 1);
  }), (0, _amen.test)("binary", function () {
    return (0, _assert.default)((0, _index.binary)(function () {}).length === 2);
  }), (0, _amen.test)("ternary", function () {
    return (0, _assert.default)((0, _index.ternary)(function () {}).length === 3);
  }), (0, _amen.test)("curry", [(0, _amen.test)("nullary function", function () {
    var g;
    g = (0, _index.curry)(function () {
      return 0;
    });
    (0, _assert.default)(g.length === 0);
    return (0, _assert.default)(g() === 0);
  }), (0, _amen.test)("unary function", function () {
    var g;
    g = (0, _index.curry)(function (x) {
      return x;
    });
    (0, _assert.default)(g.length === 1);
    return (0, _assert.default)(g(1) === 1);
  }), (0, _amen.test)("binary function", function () {
    var g;
    g = (0, _index.curry)(function (x, y) {
      return x + y;
    });
    (0, _assert.default)(g.length === 2);
    return (0, _assert.default)(g(1, 2) === 3);
  }), (0, _amen.test)("ternary function", function () {
    var g;
    g = (0, _index.curry)(function (x, y, z) {
      return x + y + z;
    });
    (0, _assert.default)(g.length === 3);
    return (0, _assert.default)(g(1, 2, 3) === 6);
  }), (0, _amen.test)("n-ary function", function () {
    var g;
    g = (0, _index.curry)(function (w, x, y, z) {
      return w + x + y + z;
    });
    (0, _assert.default)(g.length === 0);
    return (0, _assert.default)(g(1, 2, 3, 4) === 10);
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
  }), (0, _amen.test)("tee", [(0, _amen.test)("nullary function", function () {
    var f;
    f = (0, _index.tee)(function () {
      return 1;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5) === 5);
  }), (0, _amen.test)("unary function", function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return 1 / x;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5) === 5);
  }), (0, _amen.test)("binary function", function () {
    var f;
    f = (0, _index.tee)(function (x, y) {
      return x + y;
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)(f(5, 10) === 5);
  }), (0, _amen.test)("ternary function", function () {
    var f;
    f = (0, _index.tee)(function (x, y, z) {
      return x + y + z;
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)(f(5, 10, 15) === 5);
  }), (0, _amen.test)("n-ary function", function () {
    var f;
    f = (0, _index.tee)(function (x, y, z, a) {
      return x + y + z + a;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5, 10, 15, 20) === 5);
  })]), (0, _amen.test)("tee (promise)", [(0, _amen.test)("nullary function", async function () {
    var f;
    f = (0, _index.tee)(function () {
      return Promise.resolve(1);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("unary function", async function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return Promise.resolve(1 / x);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("binary function", async function () {
    var f;
    f = (0, _index.tee)(function (x, y) {
      return Promise.resolve(x + y);
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)((await f(5, 10)) === 5);
  }), (0, _amen.test)("ternary function", async function () {
    var f;
    f = (0, _index.tee)(function (x, y, z) {
      return Promise.resolve(x + y + z);
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)((await f(5, 10, 15)) === 5);
  }), (0, _amen.test)("n-ary function", async function () {
    var f;
    f = (0, _index.tee)(function (x, y, z, a) {
      return Promise.resolve(x + y + z + a);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5, 10, 15, 20)) === 5);
  })]), (0, _amen.test)("rtee", [(0, _amen.test)("nullary function", function () {
    var f;
    f = (0, _index.rtee)(function () {
      return 1;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5) === 5);
  }), (0, _amen.test)("unary function", function () {
    var f;
    f = (0, _index.rtee)(function (x) {
      return 1 / x;
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)(f(5) === 5);
  }), (0, _amen.test)("binary function", function () {
    var f;
    f = (0, _index.rtee)(function (x, y) {
      return x + y;
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)(f(5, 10) === 10);
  }), (0, _amen.test)("ternary function", function () {
    var f;
    f = (0, _index.rtee)(function (x, y, z) {
      return x + y + z;
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)(f(5, 10, 15) === 15);
  }), (0, _amen.test)("n-ary function", function () {
    var f;
    f = (0, _index.rtee)(function (x, y, z, a) {
      return x + y + z + a;
    });
    (0, _assert.default)(f.length === 0);
    return (0, _assert.default)(f(5, 10, 15, 20) === 20);
  })]), (0, _amen.test)("rtee (promise)", [(0, _amen.test)("nullary function", async function () {
    var f;
    f = (0, _index.rtee)(function () {
      return Promise.resolve(1);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("unary function", async function () {
    var f;
    f = (0, _index.rtee)(function (x) {
      return Promise.resolve(1 / x);
    });
    (0, _assert.default)(f.length === 1);
    return (0, _assert.default)((await f(5)) === 5);
  }), (0, _amen.test)("binary function", async function () {
    var f;
    f = (0, _index.rtee)(function (x, y) {
      return Promise.resolve(x + y);
    });
    (0, _assert.default)(f.length === 2);
    return (0, _assert.default)((await f(5, 10)) === 10);
  }), (0, _amen.test)("ternary function", async function () {
    var f;
    f = (0, _index.rtee)(function (x, y, z) {
      return Promise.resolve(x + y + z);
    });
    (0, _assert.default)(f.length === 3);
    return (0, _assert.default)((await f(5, 10, 15)) === 15);
  }), (0, _amen.test)("n-ary function", async function () {
    var f;
    f = (0, _index.rtee)(function (x, y, z, a) {
      return Promise.resolve(x + y + z + a);
    });
    (0, _assert.default)(f.length === 0);
    return (0, _assert.default)((await f(5, 10, 15, 20)) === 20);
  })]), (0, _amen.test)("wait", async function () {
    var square;
    square = (0, _index.wait)(function (x) {
      return Math.pow(x, 2);
    });
    (0, _assert.default)(square(2) === 4);
    return (0, _assert.default)((await square(Promise.resolve(2))) === 4);
  }), (0, _amen.test)("pipe", [(0, _amen.test)("sync works", function () {
    var a, alpha, b, c;

    a = function (x) {
      return x + "a";
    };

    b = function (x) {
      return x + "b";
    };

    c = function (x) {
      return x + "c";
    };

    alpha = (0, _index.pipe)(a, b, c);
    return (0, _assert.default)(alpha("S") === "Sabc");
  }), (0, _amen.test)("async waits for antecedants (depreciated)", async function () {
    var a, alpha, b, c;

    a = function (x) {
      return Promise.resolve(x + "a");
    };

    b = function (x) {
      return Promise.resolve(x + "b");
    };

    c = function (x) {
      return Promise.resolve(x + "c");
    };

    alpha = (0, _index.pipe)(a, b, c);
    return (0, _assert.default)((await alpha("S")) === "Sabc");
  })]), (0, _amen.test)("flow", [(0, _amen.test)("sync works", function () {
    var a, alpha, b, c;

    a = function (x) {
      return x + "a";
    };

    b = function (x) {
      return x + "b";
    };

    c = function (x) {
      return x + "c";
    };

    alpha = (0, _index.pipe)(a, b, c);
    return (0, _assert.default)(alpha("S") === "Sabc");
  }), (0, _amen.test)("async waits for antecedants", async function () {
    var a, alpha, b, c;

    a = function (x) {
      return Promise.resolve(x + "a");
    };

    b = function (x) {
      return Promise.resolve(x + "b");
    };

    c = function (x) {
      return Promise.resolve(x + "c");
    };

    alpha = (0, _index.flow)(a, b, c);
    return (0, _assert.default)((await alpha("S")) === "Sabc");
  }), (0, _amen.test)("spreads array input", async function () {
    var a, alpha, b, c;

    a = function (x) {
      return Promise.resolve(x + "a");
    };

    b = function (x) {
      return Promise.resolve(x + "b");
    };

    c = function (x) {
      return Promise.resolve(x + "c");
    };

    alpha = (0, _index.flow)([a, b, c]);
    return (0, _assert.default)((await alpha("S")) === "Sabc");
  }), (0, _amen.test)("defaults to undefined", function () {
    var alpha;
    alpha = (0, _index.flow)();
    (0, _assert.default)(alpha === void 0);
    alpha = (0, _index.flow)(void 0);
    return (0, _assert.default)(alpha === void 0);
  })]), (0, _amen.test)("apply", function () {
    return (0, _assert.default)((0, _index.apply)(_index.identity, 1) === 1);
  }), (0, _amen.test)("spread", function () {
    return (0, _assert.default)((0, _index.spread)(function (a, b) {
      return a + b;
    })(["a", "b"]) === "ab");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1nYXJkZW4vdGVzdC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQU1HLENBQUEsa0JBQUE7QUFFRCxvQkFBTSxNQUFNLGdCQUFBLGdCQUFBLEVBQXVCLENBRWpDLGdCQUFBLE1BQUEsRUFBYSxZQUFBO1dBQUcscUJBQVEsaUJBQUQsQ0FBQyxDQUFELEtBQVksS0FBbkIsQ0FBQSxDO0FBRmlCLEdBRWpDLENBRmlDLEVBR2pDLGdCQUFBLFVBQUEsRUFBaUIsWUFBQTtXQUFHLHFCQUFRLHFCQUFELENBQUMsQ0FBRCxLQUFQLENBQUEsQztBQUhhLEdBR2pDLENBSGlDLEVBSWpDLGdCQUFBLE1BQUEsRUFBYSxZQUFBO1dBQUcscUJBQVEsaUJBQUQsQ0FBQyxDQUFELE9BQVAsQ0FBQSxDO0FBSmlCLEdBSWpDLENBSmlDLEVBTWpDLGdCQUFBLE9BQUEsRUFBYyxZQUFBO1dBQUcscUJBQVEsa0JBQU0sWUFBQSxDQUFQLENBQUMsQ0FBRCxDQUFBLE1BQUEsS0FBUCxDQUFBLEM7QUFOZ0IsR0FNakMsQ0FOaUMsRUFPakMsZ0JBQUEsUUFBQSxFQUFlLFlBQUE7V0FBRyxxQkFBUSxtQkFBTyxZQUFBLENBQVIsQ0FBQyxDQUFELENBQUEsTUFBQSxLQUFQLENBQUEsQztBQVBlLEdBT2pDLENBUGlDLEVBUWpDLGdCQUFBLFNBQUEsRUFBZ0IsWUFBQTtXQUFHLHFCQUFRLG9CQUFRLFlBQUEsQ0FBVCxDQUFDLENBQUQsQ0FBQSxNQUFBLEtBQVAsQ0FBQSxDO0FBUmMsR0FRakMsQ0FSaUMsRUFVakMsZ0JBQUEsT0FBQSxFQUFjLENBQ1YsZ0JBQUEsa0JBQUEsRUFBeUIsWUFBQTtBQUN2QixRQUFBLENBQUE7QUFBQSxJQUFBLENBQUEsR0FBSSxrQkFBTSxZQUFBO2FBQUcsQztBQUFULEtBQUEsQ0FBSjtBQUNBLHlCQUFPLENBQUMsQ0FBRCxNQUFBLEtBQVAsQ0FBQTtXQUNB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QixLQUFBLEtBQXZCLENBQUEsQztBQU5KLEtBS0UsQ0FMRixDO0FBNU4rQixHQXlOZCxFQUFuQixDQXpOaUMsQ0FBdkIsQ0FBWjtTQXNPQSxPQUFPLENBQVAsSUFBQSxDQUFhLGdCQUFBLENBQUEsR0FBYixDQUFBLEM7QUF4T0YsQ0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQge3ByaW50LCB0ZXN0LCBzdWNjZXNzfSBmcm9tIFwiYW1lblwiXG5cbmltcG9ydCB7bm9PcCwgaWRlbnRpdHksIHdyYXAsXG4gIHVuYXJ5LCBiaW5hcnksIHRlcm5hcnksXG4gIGN1cnJ5LCBfLCBzdWJzdGl0dXRlLCBwYXJ0aWFsLFxuICBmbGlwLCBjb21wb3NlLCBwaXBlLCBhcHBseSwgc3ByZWFkLCB3YWl0LCBmbG93LFxuICBuZWdhdGUsIG9uY2UsIGdpdmVuLCBtZW1vaXplLCB0ZWUsIHJ0ZWV9IGZyb20gXCIuLi9zcmMvaW5kZXhcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IHRlc3QgXCJDb3JlIGZ1bmN0aW9uc1wiLCBbXG5cbiAgICB0ZXN0IFwibm9PcFwiLCAtPiBhc3NlcnQgKG5vT3AgNykgPT0gdW5kZWZpbmVkXG4gICAgdGVzdCBcImlkZW50aXR5XCIsIC0+IGFzc2VydCAoaWRlbnRpdHkgNykgPT0gN1xuICAgIHRlc3QgXCJ3cmFwXCIsIC0+IGFzc2VydCAod3JhcCA3KSgpID09IDdcblxuICAgIHRlc3QgXCJ1bmFyeVwiLCAtPiBhc3NlcnQgKHVuYXJ5IC0+KS5sZW5ndGggPT0gMVxuICAgIHRlc3QgXCJiaW5hcnlcIiwgLT4gYXNzZXJ0IChiaW5hcnkgLT4pLmxlbmd0aCA9PSAyXG4gICAgdGVzdCBcInRlcm5hcnlcIiwgLT4gYXNzZXJ0ICh0ZXJuYXJ5IC0+KS5sZW5ndGggPT0gM1xuXG4gICAgdGVzdCBcImN1cnJ5XCIsIFtcbiAgICAgICAgdGVzdCBcIm51bGxhcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBnID0gY3VycnkgLT4gMFxuICAgICAgICAgIGFzc2VydCBnLmxlbmd0aCA9PSAwXG4gICAgICAgICAgYXNzZXJ0IGcoKSA9PSAwXG4gICAgICAgIHRlc3QgXCJ1bmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGcgPSBjdXJyeSAoeCkgLT4geFxuICAgICAgICAgIGFzc2VydCBnLmxlbmd0aCA9PSAxXG4gICAgICAgICAgYXNzZXJ0IChnIDEpID09IDFcbiAgICAgICAgdGVzdCBcImJpbmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGcgPSBjdXJyeSAoeCx5KSAtPiB4ICsgeVxuICAgICAgICAgIGFzc2VydCBnLmxlbmd0aCA9PSAyXG4gICAgICAgICAgYXNzZXJ0IChnIDEsIDIpID09IDNcbiAgICAgICAgdGVzdCBcInRlcm5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBnID0gY3VycnkgKHgseSx6KSAtPiB4ICsgeSArIHpcbiAgICAgICAgICBhc3NlcnQgZy5sZW5ndGggPT0gM1xuICAgICAgICAgIGFzc2VydCAoZyAxLCAyLCAzKSA9PSA2XG4gICAgICAgIHRlc3QgXCJuLWFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGcgPSBjdXJyeSAodyx4LHkseikgLT4gdyArIHggKyB5ICsgelxuICAgICAgICAgIGFzc2VydCBnLmxlbmd0aCA9PSAwXG4gICAgICAgICAgYXNzZXJ0IChnIDEsIDIsIDMsIDQpID09IDEwXG4gICAgXVxuXG4gICAgdGVzdCBcInN1YnN0aXR1dGVcIiwgLT5cbiAgICAgIGFzc2VydCAoc3Vic3RpdHV0ZSBbMSwgXywgM10sIFsyXSlbMV0gPT0gMlxuXG4gICAgdGVzdCBcInBhcnRpYWxcIiwgLT5cbiAgICAgIHNxdWFyZSA9IHBhcnRpYWwgTWF0aC5wb3csIF8sIDJcbiAgICAgIGFzc2VydCAoc3F1YXJlIDMpID09IDlcblxuICAgIHRlc3QgXCJmbGlwXCIsIC0+XG4gICAgICBzcXVhcmUgPSAgKGN1cnJ5IGZsaXAgTWF0aC5wb3cpKDIpXG4gICAgICBhc3NlcnQgKHNxdWFyZSAzKSA9PSA5XG5cbiAgICB0ZXN0IFwiY29tcG9zZVwiLCAtPlxuICAgICAgaW52ZXJzZSA9ICh4KSAtPiAxL3hcbiAgICAgIHNxdWFyZSA9ICh4KSAtPiB4ICogeFxuICAgICAgaW52ZXJzZVNxdWFyZSA9IGNvbXBvc2UgaW52ZXJzZSwgc3F1YXJlXG4gICAgICBhc3NlcnQgaW52ZXJzZVNxdWFyZSA1ID09IDEvMjVcblxuICAgIHRlc3QgXCJjb21wb3NlIChwcm9taXNlKVwiLCAtPlxuICAgICAgaW52ZXJzZSA9ICh4KSAtPiBQcm9taXNlLnJlc29sdmUgMS94XG4gICAgICBzcXVhcmUgPSAoeCkgLT4geCAqIHhcbiAgICAgIGludmVyc2VTcXVhcmUgPSBjb21wb3NlIGludmVyc2UsIHNxdWFyZVxuICAgICAgYXNzZXJ0IChpbnZlcnNlU3F1YXJlIDUpLnRoZW4/XG4gICAgICBhc3NlcnQgKHlpZWxkIGludmVyc2VTcXVhcmUgNSkgPT0gMS8yNVxuXG4gICAgdGVzdCBcInRlZVwiLCBbXG4gICAgICB0ZXN0IFwibnVsbGFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlIC0+IDFcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDFcbiAgICAgICAgYXNzZXJ0IChmIDUpID09IDVcbiAgICAgIHRlc3QgXCJ1bmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlICh4KSAtPiAxL3hcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDFcbiAgICAgICAgYXNzZXJ0IChmIDUpID09IDVcbiAgICAgIHRlc3QgXCJiaW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHRlZSAoeCwgeSkgLT4geCArIHlcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDJcbiAgICAgICAgYXNzZXJ0IChmIDUsIDEwKSA9PSA1XG4gICAgICB0ZXN0IFwidGVybmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlICh4LCB5LCB6KSAtPiB4ICsgeSArIHpcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDNcbiAgICAgICAgYXNzZXJ0IChmIDUsIDEwLCAxNSkgPT0gNVxuICAgICAgdGVzdCBcIm4tYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSB0ZWUgKHgsIHksIHosIGEpIC0+IHggKyB5ICsgeiArIGFcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDFcbiAgICAgICAgYXNzZXJ0IChmIDUsIDEwLCAxNSwgMjApID09IDVcbiAgICBdXG5cbiAgICB0ZXN0IFwidGVlIChwcm9taXNlKVwiLCBbXG4gICAgICB0ZXN0IFwibnVsbGFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlIC0+IFByb21pc2UucmVzb2x2ZSAxXG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAxXG4gICAgICAgIGFzc2VydCAoYXdhaXQgZiA1KSA9PSA1XG4gICAgICB0ZXN0IFwidW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHRlZSAoeCkgLT4gUHJvbWlzZS5yZXNvbHZlIDEveFxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMVxuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSkgPT0gNVxuICAgICAgdGVzdCBcImJpbmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlICh4LCB5KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIHlcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDJcbiAgICAgICAgYXNzZXJ0IChhd2FpdCBmIDUsIDEwKSA9PSA1XG4gICAgICB0ZXN0IFwidGVybmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlICh4LCB5LCB6KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIHkgKyB6XG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAzXG4gICAgICAgIGFzc2VydCAoYXdhaXQgZiA1LCAxMCwgMTUpID09IDVcbiAgICAgIHRlc3QgXCJuLWFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gdGVlICh4LCB5LCB6LCBhKSAtPiBQcm9taXNlLnJlc29sdmUgeCArIHkgKyB6ICsgYVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMVxuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSwgMTAsIDE1LCAyMCkgPT0gNVxuICAgIF1cblxuICAgIHRlc3QgXCJydGVlXCIsIFtcbiAgICAgIHRlc3QgXCJudWxsYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlIC0+IDFcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDFcbiAgICAgICAgYXNzZXJ0IChmIDUpID09IDVcbiAgICAgIHRlc3QgXCJ1bmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gcnRlZSAoeCkgLT4gMS94XG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAxXG4gICAgICAgIGFzc2VydCAoZiA1KSA9PSA1XG4gICAgICB0ZXN0IFwiYmluYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlICh4LCB5KSAtPiB4ICsgeVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMlxuICAgICAgICBhc3NlcnQgKGYgNSwgMTApID09IDEwXG4gICAgICB0ZXN0IFwidGVybmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gcnRlZSAoeCwgeSwgeikgLT4geCArIHkgKyB6XG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAzXG4gICAgICAgIGFzc2VydCAoZiA1LCAxMCwgMTUpID09IDE1XG4gICAgICB0ZXN0IFwibi1hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHJ0ZWUgKHgsIHksIHosIGEpIC0+IHggKyB5ICsgeiArIGFcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDBcbiAgICAgICAgYXNzZXJ0IChmIDUsIDEwLCAxNSwgMjApID09IDIwXG4gICAgXVxuXG4gICAgdGVzdCBcInJ0ZWUgKHByb21pc2UpXCIsIFtcbiAgICAgIHRlc3QgXCJudWxsYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlIC0+IFByb21pc2UucmVzb2x2ZSAxXG4gICAgICAgIGFzc2VydCBmLmxlbmd0aCA9PSAxXG4gICAgICAgIGFzc2VydCAoYXdhaXQgZiA1KSA9PSA1XG4gICAgICB0ZXN0IFwidW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHJ0ZWUgKHgpIC0+IFByb21pc2UucmVzb2x2ZSAxL3hcbiAgICAgICAgYXNzZXJ0IGYubGVuZ3RoID09IDFcbiAgICAgICAgYXNzZXJ0IChhd2FpdCBmIDUpID09IDVcbiAgICAgIHRlc3QgXCJiaW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgZiA9IHJ0ZWUgKHgsIHkpIC0+IFByb21pc2UucmVzb2x2ZSB4ICsgeVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMlxuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSwgMTApID09IDEwXG4gICAgICB0ZXN0IFwidGVybmFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICBmID0gcnRlZSAoeCwgeSwgeikgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyB5ICsgelxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gM1xuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSwgMTAsIDE1KSA9PSAxNVxuICAgICAgdGVzdCBcIm4tYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgIGYgPSBydGVlICh4LCB5LCB6LCBhKSAtPiBQcm9taXNlLnJlc29sdmUgeCArIHkgKyB6ICsgYVxuICAgICAgICBhc3NlcnQgZi5sZW5ndGggPT0gMFxuICAgICAgICBhc3NlcnQgKGF3YWl0IGYgNSwgMTAsIDE1LCAyMCkgPT0gMjBcbiAgICBdXG5cbiAgICB0ZXN0IFwid2FpdFwiLCAtPlxuICAgICAgc3F1YXJlID0gd2FpdCAoeCkgLT4gTWF0aC5wb3cgeCwgMlxuICAgICAgYXNzZXJ0IChzcXVhcmUgMikgPT0gNFxuICAgICAgYXNzZXJ0IChhd2FpdCBzcXVhcmUgUHJvbWlzZS5yZXNvbHZlIDIpID09IDRcblxuICAgIHRlc3QgXCJwaXBlXCIsIFtcbiAgICAgIHRlc3QgXCJzeW5jIHdvcmtzXCIsIC0+XG4gICAgICAgIGEgPSAoeCkgLT4geCArIFwiYVwiXG4gICAgICAgIGIgPSAoeCkgLT4geCArIFwiYlwiXG4gICAgICAgIGMgPSAoeCkgLT4geCArIFwiY1wiXG4gICAgICAgIGFscGhhID0gcGlwZSBhLCBiLCBjXG4gICAgICAgIGFzc2VydCAoYWxwaGEgXCJTXCIpID09IFwiU2FiY1wiXG5cbiAgICAgIHRlc3QgXCJhc3luYyB3YWl0cyBmb3IgYW50ZWNlZGFudHMgKGRlcHJlY2lhdGVkKVwiLCAtPlxuICAgICAgICBhID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSB4ICsgXCJhXCJcbiAgICAgICAgYiA9ICh4KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIFwiYlwiXG4gICAgICAgIGMgPSAoeCkgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyBcImNcIlxuICAgICAgICBhbHBoYSA9IHBpcGUgYSwgYiwgY1xuICAgICAgICBhc3NlcnQgKGF3YWl0IGFscGhhIFwiU1wiKSA9PSBcIlNhYmNcIlxuICAgIF1cblxuICAgIHRlc3QgXCJmbG93XCIsIFtcbiAgICAgIHRlc3QgXCJzeW5jIHdvcmtzXCIsIC0+XG4gICAgICAgIGEgPSAoeCkgLT4geCArIFwiYVwiXG4gICAgICAgIGIgPSAoeCkgLT4geCArIFwiYlwiXG4gICAgICAgIGMgPSAoeCkgLT4geCArIFwiY1wiXG4gICAgICAgIGFscGhhID0gcGlwZSBhLCBiLCBjXG4gICAgICAgIGFzc2VydCAoYWxwaGEgXCJTXCIpID09IFwiU2FiY1wiXG5cbiAgICAgIHRlc3QgXCJhc3luYyB3YWl0cyBmb3IgYW50ZWNlZGFudHNcIiwgLT5cbiAgICAgICAgYSA9ICh4KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIFwiYVwiXG4gICAgICAgIGIgPSAoeCkgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyBcImJcIlxuICAgICAgICBjID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSB4ICsgXCJjXCJcbiAgICAgICAgYWxwaGEgPSBmbG93IGEsIGIsIGNcbiAgICAgICAgYXNzZXJ0IChhd2FpdCBhbHBoYSBcIlNcIikgPT0gXCJTYWJjXCJcblxuICAgICAgdGVzdCBcInNwcmVhZHMgYXJyYXkgaW5wdXRcIiwgLT5cbiAgICAgICAgYSA9ICh4KSAtPiBQcm9taXNlLnJlc29sdmUgeCArIFwiYVwiXG4gICAgICAgIGIgPSAoeCkgLT4gUHJvbWlzZS5yZXNvbHZlIHggKyBcImJcIlxuICAgICAgICBjID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSB4ICsgXCJjXCJcbiAgICAgICAgYWxwaGEgPSBmbG93IFthLCBiLCBjXVxuICAgICAgICBhc3NlcnQgKGF3YWl0IGFscGhhIFwiU1wiKSA9PSBcIlNhYmNcIlxuXG4gICAgICB0ZXN0IFwiZGVmYXVsdHMgdG8gdW5kZWZpbmVkXCIsIC0+XG4gICAgICAgIGFscGhhID0gZmxvdygpXG4gICAgICAgIGFzc2VydCBhbHBoYSA9PSB1bmRlZmluZWRcblxuICAgICAgICBhbHBoYSA9IGZsb3cgdW5kZWZpbmVkXG4gICAgICAgIGFzc2VydCBhbHBoYSA9PSB1bmRlZmluZWRcbiAgICBdXG5cbiAgICB0ZXN0IFwiYXBwbHlcIiwgLT5cbiAgICAgIGFzc2VydCAoYXBwbHkgaWRlbnRpdHksIDEpID09IDFcblxuICAgIHRlc3QgXCJzcHJlYWRcIiwgLT5cbiAgICAgIGFzc2VydCAoc3ByZWFkIChhLCBiKSAtPiBhICsgYikoW1wiYVwiLCBcImJcIl0pID09IFwiYWJcIlxuXG4gICAgdGVzdCBcIm5lZ2F0ZVwiLCAtPlxuICAgICAgYXNzZXJ0IChuZWdhdGUgLT4gZmFsc2UpKClcblxuICAgIHRlc3QgXCJvbmNlXCIsIC0+XG4gICAgICAoZiA9IGRvIChpPTApIC0+IG9uY2UgLT4gaSsrKSgpXG4gICAgICBhc3NlcnQgZigpID09IDBcblxuICAgIHRlc3QgXCJnaXZlblwiLCAtPlxuICAgICAgYXNzZXJ0IChnaXZlbiAoYSA9IDMsIGIgPSAyKSAtPiBhICogYikgPT0gNiAmJiAhYT8gJiYgIWI/XG4gICAgICBhc3NlcnQgKGdpdmVuIDMsIDIsIChhLGIpIC0+IGEgKiBiKSA9PSA2XG5cbiAgICB0ZXN0IFwibWVtb2l6ZVwiLCBkbyAtPlxuICAgICAgY291bnQgPSAwXG4gICAgICBmID0gbWVtb2l6ZSAoeCwgeSkgLT4gY291bnQrKzsgeFxuICAgICAgW1xuICAgICAgICB0ZXN0IFwicnVucyB0aGUgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBhc3NlcnQgZigxLCAyKSA9PSAxICYmIGNvdW50ID09IDFcbiAgICAgICAgdGVzdCBcImJ1dCBvbmx5IG9uY2UgZm9yIGEgZ2l2ZW4gYXJndW1lbnRcIiwgLT5cbiAgICAgICAgICBhc3NlcnQgZigxLCAyKSA9PSAxICYmIGNvdW50ID09IDFcbiAgICAgICAgdGVzdCBcIndpdGhvdXQgYWZmZWN0aW5nIGFueSBvdGhlciBhcmd1bWVudHNcIiwgLT5cbiAgICAgICAgICBhc3NlcnQgZigyLCAxKSA9PSAyICYmIGNvdW50ID09IDJcbiAgICAgIF1cbiAgXVxuXG4gIHByb2Nlc3MuZXhpdCBpZiBzdWNjZXNzIHRoZW4gMCBlbHNlIDFcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-garden/test/index.coffee
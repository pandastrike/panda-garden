"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _amen = require("amen");

var _index = require("../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  return (0, _amen.print)((await (0, _amen.test)("Core functions", [(0, _amen.test)("noOp", function () {
    return (0, _assert2.default)((0, _index.noOp)(7) === void 0);
  }), (0, _amen.test)("identity", function () {
    return (0, _assert2.default)((0, _index.identity)(7) === 7);
  }), (0, _amen.test)("wrap", function () {
    return (0, _assert2.default)((0, _index.wrap)(7)() === 7);
  }), (0, _amen.test)("curry", [(0, _amen.test)("nullary function", function () {
    return (0, _assert2.default)((0, _index.curry)(function () {
      return 0;
    })() === 0);
  }), (0, _amen.test)("unary function", function () {
    return (0, _assert2.default)((0, _index.curry)(function (x) {
      return x;
    })(1) === 1);
  }), (0, _amen.test)("binary function", function () {
    return (0, _assert2.default)((0, _index.curry)(function (x, y) {
      return x + y;
    })(1)(2) === 3);
  }), (0, _amen.test)("tertiary function", function () {
    return (0, _assert2.default)((0, _index.curry)(function (x, y, z) {
      return x + y + z;
    })(1)(2)(3) === 6);
  }), (0, _amen.test)("n-ary function", function () {
    return (0, _assert2.default)((0, _index.curry)(function (w, x, y, z) {
      return w + x + y + z;
    })(1)(2)(3)(4) === 10);
  })]), (0, _amen.test)("substitute", function () {
    return (0, _assert2.default)((0, _index.substitute)([1, _index._, 3], [2])[1] === 2);
  }), (0, _amen.test)("partial", function () {
    var square;
    square = (0, _index.partial)(Math.pow, _index._, 2);
    return (0, _assert2.default)(square(3) === 9);
  }), (0, _amen.test)("flip", function () {
    var square;
    square = (0, _index.curry)((0, _index.flip)(Math.pow))(2);
    return (0, _assert2.default)(square(3) === 9);
  }), (0, _amen.test)("compose", function () {
    var inverse, inverseSquare, square;
    inverse = function (x) {
      return 1 / x;
    };
    square = function (x) {
      return x * x;
    };
    inverseSquare = (0, _index.compose)(inverse, square);
    return (0, _assert2.default)(inverseSquare(5 === 1 / 25));
  }), (0, _amen.test)("compose (promise)", function* () {
    var inverse, inverseSquare, square;
    inverse = function (x) {
      return Promise.resolve(1 / x);
    };
    square = function (x) {
      return x * x;
    };
    inverseSquare = (0, _index.compose)(inverse, square);
    (0, _assert2.default)(inverseSquare(5).then != null);
    return (0, _assert2.default)((yield inverseSquare(5)) === 1 / 25);
  }), (0, _amen.test)("pipe", function () {
    var a, ab, b;
    a = function (x) {
      return x + "a";
    };
    b = function (x) {
      return x + "b";
    };
    ab = (0, _index.pipe)(a, b);
    return (0, _assert2.default)(ab("S") === "Sab");
  }), (0, _amen.test)("apply", function () {
    return (0, _assert2.default)((0, _index.apply)(_index.identity, 1) === 1);
  }), (0, _amen.test)("spread", function () {
    return (0, _assert2.default)((0, _index.spread)(function (a, b) {
      return a + b;
    })(["a", "b"]) === "ab");
  }), (0, _amen.test)("unary", function () {
    return (0, _assert2.default)((0, _index.unary)(function () {}).length === 1);
  }), (0, _amen.test)("binary", function () {
    return (0, _assert2.default)((0, _index.binary)(function () {}).length === 2);
  }), (0, _amen.test)("ternary", function () {
    return (0, _assert2.default)((0, _index.ternary)(function () {}).length === 3);
  }), (0, _amen.test)("negate", function () {
    return (0, _assert2.default)((0, _index.negate)(function () {
      return false;
    })());
  }), (0, _amen.test)("once", function () {
    var f;
    (f = function (i) {
      return (0, _index.once)(function () {
        return i++;
      });
    }(0))();
    return (0, _assert2.default)(f() === 0);
  }), (0, _amen.test)("given", function () {
    (0, _assert2.default)((0, _index.given)(function (a = 3, b = 2) {
      return a * b;
    }) === 6 && (typeof a === "undefined" || a === null) && (typeof b === "undefined" || b === null));
    return (0, _assert2.default)((0, _index.given)(3, 2, function (a, b) {
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
      return (0, _assert2.default)(f(1, 2) === 1 && count === 1);
    }), (0, _amen.test)("but only once for a given argument", function () {
      return (0, _assert2.default)(f(1, 2) === 1 && count === 1);
    }), (0, _amen.test)("without affecting any other arguments", function () {
      return (0, _assert2.default)(f(2, 1) === 2 && count === 2);
    })];
  }())])));
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVEsQUFBTzs7QUFFZixBQUFRLEFBQU0sQUFBVSxBQUFNLEFBQU8sQUFBRyxBQUFZLEFBQ2xELEFBQU0sQUFBUyxBQUFNLEFBQU8sQUFDNUIsQUFBTyxBQUFRLEFBQ2YsQUFBUSxBQUFNLEFBQU87Ozs7QUFFcEIsQ0FBQTsyQkFFSyxzQkFBTSxBQUFLLG1DQUVmLEFBQUssUUFBUTtXQUFHLHNCQUFRLGlCQUFELEFBQUMsQUFBSyxFQUFOLEtBQVksS0FBdEIsQUFBRztBQUZpQixBQUVqQyxHQUFBLENBRmlDLGtCQUdqQyxBQUFLLFlBQVk7V0FBRyxzQkFBUSxxQkFBRCxBQUFDLEFBQVMsRUFBVixLQUFWLEFBQUcsQUFBdUI7QUFIVixBQUdqQyxHQUFBLG1CQUNBLEFBQUssUUFBUTtXQUFHLHNCQUFRLGlCQUFELEFBQUMsQUFBSyxFQUFOLE9BQVYsQUFBRyxBQUFxQjtBQUpKLEFBSWpDLEdBQUEsbUJBRUEsQUFBSywwQkFDRCxBQUFLLG9CQUFvQjtXQUFHLHdDQUFjO2FBQUEsQUFBRztBQUFWLEFBQUMsS0FBQSxDQUFELE9BQVYsQUFBRyxBQUF5QjtBQUQzQyxBQUNWLEdBQUEsQ0FEVSxrQkFFVixBQUFLLGtCQUFrQjtXQUFHLHdDQUFjLFVBQUEsQUFBQzthQUFELEFBQU87QUFBZCxBQUFDLEtBQUEsQ0FBRCxDQUFBLEFBQWlCLE9BQTNCLEFBQUcsQUFBOEI7QUFGOUMsQUFFVixHQUFBLG1CQUNBLEFBQUssbUJBQW1CO1dBQ3RCLHdDQUFjLFVBQUEsQUFBQyxHQUFELEFBQUc7YUFBTSxJQUFULEFBQWE7QUFBcEIsQUFBQyxLQUFBLENBQUQsQ0FBQSxBQUF1QixHQUF2QixBQUEwQixPQURYLEFBQ3RCLEFBQXVDO0FBSi9CLEFBR1YsR0FBQSxtQkFFQSxBQUFLLHFCQUFxQjtXQUN4Qix3Q0FBYyxVQUFBLEFB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R0FBRixBQUFLLE9BQUwsQUFBVyxLQUFLLFVBREMsQUFDeEIsQUFBZ0M7QUFGcEMsQUFDRSxLQUFBLENBREYsa0JBR0UsQUFBSyxzQ0FBc0M7YUFDekMsc0JBQU8sRUFBQSxBQUFFLEdBQUYsQUFBSyxPQUFMLEFBQVcsS0FBSyxVQURrQixBQUN6QyxBQUFnQztBQUpwQyxBQUdFLEtBQUEsbUJBRUEsQUFBSyx5Q0FBeUM7YUFDNUMsc0JBQU8sRUFBQSxBQUFFLEdBQUYsQUFBSyxPQUFMLEFBQVcsS0FBSyxVQURxQixBQUM1QyxBQUFnQztBQVRuQixBQUdqQixBQUtFLEtBQUE7QUE5RUwsQUFFRCxBQUFNLEFBQU0sQUFBdUIsQUFvRWpDLEFBQWdCLEFBQUcsR0FBQSxFQUFuQixFQXBFVSxDQUFaLEFBQU07QUFGUixBQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcbmltcG9ydCB7cHJpbnQsIHRlc3R9IGZyb20gXCJhbWVuXCJcblxuaW1wb3J0IHtub09wLCBpZGVudGl0eSwgd3JhcCwgY3VycnksIF8sIHN1YnN0aXR1dGUsIHBhcnRpYWwsXG4gIGZsaXAsIGNvbXBvc2UsIHBpcGUsIGFwcGx5LCBzcHJlYWQsXG4gIHVuYXJ5LCBiaW5hcnksIHRlcm5hcnksXG4gIG5lZ2F0ZSwgb25jZSwgZ2l2ZW4sIG1lbW9pemV9IGZyb20gXCIuLi9zcmMvaW5kZXhcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IHRlc3QgXCJDb3JlIGZ1bmN0aW9uc1wiLCBbXG5cbiAgICB0ZXN0IFwibm9PcFwiLCAtPiBhc3NlcnQgKG5vT3AgNykgPT0gdW5kZWZpbmVkXG4gICAgdGVzdCBcImlkZW50aXR5XCIsIC0+IGFzc2VydCAoaWRlbnRpdHkgNykgPT0gN1xuICAgIHRlc3QgXCJ3cmFwXCIsIC0+IGFzc2VydCAod3JhcCA3KSgpID09IDdcblxuICAgIHRlc3QgXCJjdXJyeVwiLCBbXG4gICAgICAgIHRlc3QgXCJudWxsYXJ5IGZ1bmN0aW9uXCIsIC0+IGFzc2VydCAoY3VycnkgLT4gMCkoKSA9PSAwXG4gICAgICAgIHRlc3QgXCJ1bmFyeSBmdW5jdGlvblwiLCAtPiBhc3NlcnQgKGN1cnJ5ICh4KSAtPiB4KSgxKSA9PSAxXG4gICAgICAgIHRlc3QgXCJiaW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBhc3NlcnQgKGN1cnJ5ICh4LHkpIC0+IHggKyB5KSgxKSgyKSA9PSAzXG4gICAgICAgIHRlc3QgXCJ0ZXJ0aWFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGFzc2VydCAoY3VycnkgKHgseSx6KSAtPiB4ICsgeSArIHopKDEpKDIpKDMpID09IDZcbiAgICAgICAgdGVzdCBcIm4tYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgICAgYXNzZXJ0IChjdXJyeSAodyx4LHkseikgLT4gdyt4K3kreikoMSkoMikoMykoNCkgPT0gMTBcbiAgICBdXG5cbiAgICB0ZXN0IFwic3Vic3RpdHV0ZVwiLCAtPlxuICAgICAgYXNzZXJ0IChzdWJzdGl0dXRlIFsxLCBfLCAzXSwgWzJdKVsxXSA9PSAyXG5cbiAgICB0ZXN0IFwicGFydGlhbFwiLCAtPlxuICAgICAgc3F1YXJlID0gcGFydGlhbCBNYXRoLnBvdywgXywgMlxuICAgICAgYXNzZXJ0IChzcXVhcmUgMykgPT0gOVxuXG4gICAgdGVzdCBcImZsaXBcIiwgLT5cbiAgICAgIHNxdWFyZSA9ICAoY3VycnkgZmxpcCBNYXRoLnBvdykoMilcbiAgICAgIGFzc2VydCAoc3F1YXJlIDMpID09IDlcblxuICAgIHRlc3QgXCJjb21wb3NlXCIsIC0+XG4gICAgICBpbnZlcnNlID0gKHgpIC0+IDEveFxuICAgICAgc3F1YXJlID0gKHgpIC0+IHggKiB4XG4gICAgICBpbnZlcnNlU3F1YXJlID0gY29tcG9zZSBpbnZlcnNlLCBzcXVhcmVcbiAgICAgIGFzc2VydCBpbnZlcnNlU3F1YXJlIDUgPT0gMS8yNVxuXG4gICAgdGVzdCBcImNvbXBvc2UgKHByb21pc2UpXCIsIC0+XG4gICAgICBpbnZlcnNlID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSAxL3hcbiAgICAgIHNxdWFyZSA9ICh4KSAtPiB4ICogeFxuICAgICAgaW52ZXJzZVNxdWFyZSA9IGNvbXBvc2UgaW52ZXJzZSwgc3F1YXJlXG4gICAgICBhc3NlcnQgKGludmVyc2VTcXVhcmUgNSkudGhlbj9cbiAgICAgIGFzc2VydCAoeWllbGQgaW52ZXJzZVNxdWFyZSA1KSA9PSAxLzI1XG5cbiAgICB0ZXN0IFwicGlwZVwiLCAtPlxuICAgICAgYSA9ICh4KSAtPiB4ICsgXCJhXCJcbiAgICAgIGIgPSAoeCkgLT4geCArIFwiYlwiXG4gICAgICBhYiA9IHBpcGUgYSwgYlxuICAgICAgYXNzZXJ0IChhYiBcIlNcIikgPT0gXCJTYWJcIlxuXG4gICAgdGVzdCBcImFwcGx5XCIsIC0+XG4gICAgICBhc3NlcnQgKGFwcGx5IGlkZW50aXR5LCAxKSA9PSAxXG5cbiAgICB0ZXN0IFwic3ByZWFkXCIsIC0+XG4gICAgICBhc3NlcnQgKHNwcmVhZCAoYSwgYikgLT4gYSArIGIpKFtcImFcIiwgXCJiXCJdKSA9PSBcImFiXCJcblxuICAgIHRlc3QgXCJ1bmFyeVwiLCAtPiBhc3NlcnQgKHVuYXJ5IC0+KS5sZW5ndGggPT0gMVxuICAgIHRlc3QgXCJiaW5hcnlcIiwgLT4gYXNzZXJ0IChiaW5hcnkgLT4pLmxlbmd0aCA9PSAyXG4gICAgdGVzdCBcInRlcm5hcnlcIiwgLT4gYXNzZXJ0ICh0ZXJuYXJ5IC0+KS5sZW5ndGggPT0gM1xuXG4gICAgdGVzdCBcIm5lZ2F0ZVwiLCAtPlxuICAgICAgYXNzZXJ0IChuZWdhdGUgLT4gZmFsc2UpKClcblxuICAgIHRlc3QgXCJvbmNlXCIsIC0+XG4gICAgICAoZiA9IGRvIChpPTApIC0+IG9uY2UgLT4gaSsrKSgpXG4gICAgICBhc3NlcnQgZigpID09IDBcblxuICAgIHRlc3QgXCJnaXZlblwiLCAtPlxuICAgICAgYXNzZXJ0IChnaXZlbiAoYSA9IDMsIGIgPSAyKSAtPiBhICogYikgPT0gNiAmJiAhYT8gJiYgIWI/XG4gICAgICBhc3NlcnQgKGdpdmVuIDMsIDIsIChhLGIpIC0+IGEgKiBiKSA9PSA2XG5cbiAgICB0ZXN0IFwibWVtb2l6ZVwiLCBkbyAtPlxuICAgICAgY291bnQgPSAwXG4gICAgICBmID0gbWVtb2l6ZSAoeCwgeSkgLT4gY291bnQrKzsgeFxuICAgICAgW1xuICAgICAgICB0ZXN0IFwicnVucyB0aGUgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBhc3NlcnQgZigxLCAyKSA9PSAxICYmIGNvdW50ID09IDFcbiAgICAgICAgdGVzdCBcImJ1dCBvbmx5IG9uY2UgZm9yIGEgZ2l2ZW4gYXJndW1lbnRcIiwgLT5cbiAgICAgICAgICBhc3NlcnQgZigxLCAyKSA9PSAxICYmIGNvdW50ID09IDFcbiAgICAgICAgdGVzdCBcIndpdGhvdXQgYWZmZWN0aW5nIGFueSBvdGhlciBhcmd1bWVudHNcIiwgLT5cbiAgICAgICAgICBhc3NlcnQgZigyLCAxKSA9PSAyICYmIGNvdW50ID09IDJcbiAgICAgIF1cbiAgXVxuIl19
//# sourceURL=index.coffee
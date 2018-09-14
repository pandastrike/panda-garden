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
  }), (0, _amen.test)("tee", function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return 1 / x;
    });
    return (0, _assert2.default)(5, f(5));
  }), (0, _amen.test)("tee (promise)", async function () {
    var f;
    f = (0, _index.tee)(function (x) {
      return Promise.resolve(1 / x);
    });
    return (0, _assert2.default)(5, (await f(5)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVEsQUFBTzs7QUFFZixBQUFRLEFBQU0sQUFBVSxBQUFNLEFBQU8sQUFBRyxBQUFZLEFBQ2xELEFBQU0sQUFBUyxBQUFNLEFBQU8sQUFDNUIsQUFBTyxBQUFRLEFBQ2YsQUFBUSxBQUFNLEFBQU8sQUFBUzs7OztBQUU3QixDQUFBOzJCQUVLLHNCQUFNLEFBQUssbUNBRWYsQUFBSyxRQUFRO1dBQUcsc0JBQVEsaUJBQUQsQUFBQyxBQUFLLEVBQU4sS0FBWSxLQUF0QixBQUFHO0FBRmlCLEFBRWpDLEdBQUEsQ0FGaUMsa0JBR2pDLEFBQUssWUFBWTtXQUFHLHNCQUFRLHFCQUFELEFBQUMsQUFBUyxFQUFWLEtBQVYsQUFBRyxBQUF1QjtBQUhWLEFBR2pDLEdBQUEsbUJBQ0EsQUFBSyxRQUFRO1dBQUcsc0JBQVEsaUJBQUQsQUFBQyxBQUFLLEVBQU4sT0FBVixBQUFHLEFBQXFCO0FBSkosQUFJakMsR0FBQSxtQkFFQSxBQUFLLDBCQUNELEFBQUssb0JBQW9CO1dBQUcsd0NBQWM7YUFBQSxBQUFHO0FBQVYsQUFBQyxLQUFBLENBQUQsT0FBVixBQUFHLEFBQXlCO0FBRDNDLEFBQ1YsR0FBQSxDQURVLGtCQUVWLEFBQUssa0JBQWtCO1dBQUcsd0NBQWMsVUFBQSxBQUFDO2FBQUQsQUFBTztBQUFkLEFBQUMsS0FBQSxDQUFELENBQUEsQUFBaUIsT0FBM0IsQUFBRyxBQUE4QjtBQUY5QyxBQUVWLEdBQUEsbUJBQ0EsQUFBSyxtQkFBbUI7V0FDdEIsd0NBQWMsVUFBQSxBQUFDLEdBQUQsQUFBRzthQUFNLElBQVQsQUFBYTtBQUFwQixBQUFDLEtBQUEsQ0FBRCxDQUFBLEFBQXVCLEdBQXZCLEFBQTBCLE9BRFgsQUFDdEIsQUFBdUM7QUFKL0IsQUFHVixHQUFBLG1CQUVBLEFBQUsscUJBQXFCO1dBQ3hCLHdDQUFjLFVBQUEsQUFBQyxHQUFELEFBQUcsR0FBSCxBQUFLO2FBQU0sSUFBQSxBQUFJLElBQWYsQUFBbUI7QUFBMUIsQUFBQyxLQUFBLENBQUQsQ0FBQSxBQUE2QixHQUE3QixBQUFnQyxHQUFoQyxBQUFtQyxPQURsQixBQUN4QixBQUFnRDtBQU54QyxBQUtWLEdBQUEsbUJBRUEsQUFBSyxrQkFBa0I7V0FDckIsd0NBQWMsVUFBQSxBQUFDLEdBQUQsQUFBRyxHQUFILEFBQUssR0FBTCxBQUFPO2FBQU0sSUFBQSxBQUFFLElBQUYsQUFBSSxJQUFqQixBQUFtQjtBQUExQixBQUFDLEtBQUEsQ0FBRCxDQUFBLEFBQTZCLEdBQTdCLEFBQWdDLEdBQWhDLEFBQW1DLEdBQW5DLEFBQXNDLE9BRHhCLEFBQ3JCLEFBQW1EO0FBZHhCLEFBTWpDLEFBQWMsQUFPVixHQUFBLEVBUEosbUJBV0EsQUFBSyxjQUFjO1dBQ2pCLHNCQUFRLHVCQUFXLENBQUEsQUFBQyxHQUFELEFBQUksVUFBZixBQUFXLEFBQU8sSUFBSSxDQUF2QixBQUFDLEFBQXNCLEFBQUMsQUFBSSxHQUE1QixDQUFBLEFBQTRCLE9BRGxCLEFBQ2pCLEFBQXlDO0FBbEJWLEFBaUJqQyxHQUFBLG1CQUdBLEFBQUssV0FBVyxZQUNkO1FBQUE7QUFBQSxhQUFTLG9CQUFRLEFBQUksS0FBWixBQUFhLEtBQWIsQUFBa0IsVUFBbEIsQUFBcUI7V0FDOUIsc0JBQVEsT0FBRCxBQUFDLEFBQU8sRUFBUixLQUZPLEFBRWQsQUFBcUI7QUF0QlUsQUFvQmpDLEdBQUEsbUJBSUEsQUFBSyxRQUFRLFlBQ1g7UUFBQTtBQUFBLGFBQVcsa0JBQU0saUJBQUssQUFBSSxLQUFoQixBQUFDLEFBQU0sQUFBVSxLQUFqQixDQUFBLEFBQXNCO1dBQ2hDLHNCQUFRLE9BQUQsQUFBQyxBQUFPLEVBQVIsS0FGSSxBQUVYLEFBQXFCO0FBMUJVLEFBd0JqQyxHQUFBLG1CQUlBLEFBQUssV0FBVyxZQUNkO1FBQUEsU0FBQSxlQUFBO0FBQUEsY0FBVSxVQUFBLEFBQUM7YUFBTSxJQUFQLEFBQVM7O0FBQ25CLGFBQVMsVUFBQSxBQUFDO2FBQU0sSUFBUCxBQUFXOztBQUNwQixvQkFBZ0Isb0JBQUEsQUFBUSxTQUFSLEFBQWlCO1dBQ2pDLHNCQUFPLGNBQWMsTUFBSyxJQUpaLEFBSWQsQUFBTyxBQUFxQjtBQWhDRyxBQTRCakMsR0FBQSxtQkFNQSxBQUFLLHFCQUFxQixhQUN4QjtRQUFBLFNBQUEsZUFBQTtBQUFBLGNBQVUsVUFBQSxBQUFDO2FBQU0sQUFBTyxRQUFQLEFBQVEsUUFBUSxJQUF2QixBQUFPLEFBQWtCOztBQUNuQyxhQUFTLFVBQUEsQUFBQzthQUFNLElBQVAsQUFBVzs7QUFDcEIsb0JBQWdCLG9CQUFBLEFBQVEsU0FBUixBQUFpQjtBQUNqQywwQ0FBTyxTQUFQO1dBQ0Esc0JBQU8sQUFBQyxDQUFBLE1BQU0sY0FBUCxBQUFDLEFBQU0sQUFBYyxRQUFNLElBTFYsQUFLeEIsQUFBb0M7QUF2Q0wsQUFrQ2pDLEdBQUEsbUJBT0EsQUFBSyxPQUFPLFlBQ1Y7UUFBQTtBQUFBLHdCQUFRLFVBQUEsQUFBQzthQUFNLElBQVAsQUFBUztBQUFiLEtBQUE7V0FDSixzQkFBQSxBQUFPLEdBQUksRUFGRCxBQUVWLEFBQVcsQUFBRTtBQTNDa0IsQUF5Q2pDLEdBQUEsbUJBSUEsQUFBSyxpQkFBaUIsa0JBQ3BCO1FBQUE7QUFBQSx3QkFBUSxVQUFBLEFBQUM7YUFBTSxBQUFPLFFBQVAsQUFBUSxRQUFRLElBQXZCLEFBQU8sQUFBa0I7QUFBN0IsS0FBQTtXQUNKLHNCQUFBLEFBQU8sQUFBSSxJQUFBLE1BQU0sRUFGRyxBQUVwQixBQUFXLEFBQU0sQUFBRTtBQS9DWSxBQTZDakMsR0FBQSxtQkFJQSxBQUFLLFFBQVEsWUFDWDtRQUFBLEdBQUEsSUFBQTtBQUFBLFFBQUksVUFBQSxBQUFDO2FBQU0sSUFBUCxBQUFXOztBQUNmLFFBQUksVUFBQSxBQUFDO2FBQU0sSUFBUCxBQUFXOztBQUNmLFNBQUssaUJBQUEsQUFBSyxHQUFMLEFBQVE7V0FDYixzQkFBUSxHQUFELEFBQUMsQUFBRyxJQUFKLEtBSkksQUFJWCxBQUFtQjtBQXJEWSxBQWlEakMsR0FBQSxtQkFNQSxBQUFLLFNBQVM7V0FDWixzQkFBUSxrQkFBQSxBQUFNLGlCQUFQLEFBQUMsQUFBZ0IsRUFBakIsS0FESyxBQUNaLEFBQThCO0FBeERDLEFBdURqQyxHQUFBLG1CQUdBLEFBQUssVUFBVTtXQUNiLHlDQUFlLFVBQUEsQUFBQyxHQUFELEFBQUk7YUFBTSxJQUFWLEFBQWM7QUFBdEIsQUFBQyxLQUFBLENBQUQsQ0FBeUIsQ0FBQSxBQUFDLEtBQTFCLEFBQXlCLEFBQU0sVUFEekIsQUFDYixBQUErQztBQTNEaEIsQUEwRGpDLEdBQUEsbUJBR0EsQUFBSyxTQUFTO1dBQUcsc0JBQVEsa0JBQU0sWUFBQSxDQUFQLEFBQUMsQUFBUyxFQUFWLENBQUEsQUFBVyxXQUFyQixBQUFHLEFBQTRCO0FBN0RaLEFBNkRqQyxHQUFBLG1CQUNBLEFBQUssVUFBVTtXQUFHLHNCQUFRLG1CQUFPLFlBQUEsQ0FBUixBQUFDLEFBQVUsRUFBWCxDQUFBLEFBQVksV0FBdEIsQUFBRyxBQUE2QjtBQTlEZCxBQThEakMsR0FBQSxtQkFDQSxBQUFLLFdBQVc7V0FBRyxzQkFBUSxvQkFBUSxZQUFBLENBQVQsQUFBQyxBQUFXLEVBQVosQ0FBQSxBQUFhLFdBQXZCLEFBQUcsQUFBOEI7QUEvRGhCLEFBK0RqQyxHQUFBLG1CQUVBLEFBQUssVUFBVTtvREFDRTthQUFBLEFBQUc7QUFETCxBQUNiLEFBQU8sQUFBQyxLQUFBLENBQUQsRUFBUDtBQWxFK0IsQUFpRWpDLEdBQUEsbUJBR0EsQUFBSyxRQUFRLFlBQ1g7UUFBQTtBQUFBLEtBQUMsSUFBTyxVQUFBLEFBQUM7OEJBQWE7ZUFBQSxBQUFHO0FBQWpCLEFBQVMsT0FBQTtBQUFaLEFBQUcsS0FBQSxDQUFSLEFBQUssQUFBTTtXQUNYLHNCQUFPLFFBRkksQUFFWCxBQUFjO0FBdEVpQixBQW9FakMsR0FBQSxtQkFJQSxBQUFLLFNBQVM7QUFDWiw0Q0FBYyxVQUFDLElBQUQsQUFBSyxHQUFHLElBQVIsQUFBWTthQUFNLElBQWxCLEFBQXNCO0FBQTdCLEFBQUMsS0FBQSxDQUFELEtBQUEsQUFBbUMsQUFBTSx3Q0FBekMsQUFBZ0QsNENBQXZEO1dBQ0Esd0NBQVEsQUFBTSxHQUFOLEFBQVMsR0FBRyxVQUFBLEFBQUMsR0FBRCxBQUFHO2FBQU0sSUFBVCxBQUFhO0FBQTFCLEFBQUMsS0FBQSxDQUFELEtBRkssQUFFWixBQUF1QztBQTFFUixBQXdFakMsR0FBQSxtQkFJQSxBQUFLLFdBQWMsWUFDakI7UUFBQSxPQUFBO0FBQUEsWUFBUTtBQUNSLDRCQUFZLFVBQUEsQUFBQyxHQUFELEFBQUk7QUFBTTthQUFWLEFBQW1CO0FBQTNCLEtBQUE7NEJBRUYsQUFBSyxxQkFBcUI7YUFDeEIsc0JBQU8sRUFBQSxBQUFFLEdBQUYsQUFBSyxPQUFMLEFBQVcsS0FBSyxVQURDLEFBQ3hCLEFBQWdDO0FBRnBDLEFBQ0UsS0FBQSxDQURGLGtCQUdFLEFBQUssc0NBQXNDO2FBQ3pDLHNCQUFPLEVBQUEsQUFBRSxHQUFGLEFBQUssT0FBTCxBQUFXLEtBQUssVUFEa0IsQUFDekMsQUFBZ0M7QUFKcEMsQUFHRSxLQUFBLG1CQUVBLEFBQUsseUNBQXlDO2FBQzVDLHNCQUFPLEVBQUEsQUFBRSxHQUFGLEFBQUssT0FBTCxBQUFXLEtBQUssVUFEcUIsQUFDNUMsQUFBZ0M7QUFUbkIsQUFHakIsQUFLRSxLQUFBO0FBdEZMLEFBRUQsQUFBTSxBQUFNLEFBQXVCLEFBNEVqQyxBQUFnQixBQUFHLEdBQUEsRUFBbkIsRUE1RVUsQ0FBWixBQUFNO0FBRlIsQUFBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQge3ByaW50LCB0ZXN0fSBmcm9tIFwiYW1lblwiXG5cbmltcG9ydCB7bm9PcCwgaWRlbnRpdHksIHdyYXAsIGN1cnJ5LCBfLCBzdWJzdGl0dXRlLCBwYXJ0aWFsLFxuICBmbGlwLCBjb21wb3NlLCBwaXBlLCBhcHBseSwgc3ByZWFkLFxuICB1bmFyeSwgYmluYXJ5LCB0ZXJuYXJ5LFxuICBuZWdhdGUsIG9uY2UsIGdpdmVuLCBtZW1vaXplLCB0ZWV9IGZyb20gXCIuLi9zcmMvaW5kZXhcIlxuXG5kbyAtPlxuXG4gIHByaW50IGF3YWl0IHRlc3QgXCJDb3JlIGZ1bmN0aW9uc1wiLCBbXG5cbiAgICB0ZXN0IFwibm9PcFwiLCAtPiBhc3NlcnQgKG5vT3AgNykgPT0gdW5kZWZpbmVkXG4gICAgdGVzdCBcImlkZW50aXR5XCIsIC0+IGFzc2VydCAoaWRlbnRpdHkgNykgPT0gN1xuICAgIHRlc3QgXCJ3cmFwXCIsIC0+IGFzc2VydCAod3JhcCA3KSgpID09IDdcblxuICAgIHRlc3QgXCJjdXJyeVwiLCBbXG4gICAgICAgIHRlc3QgXCJudWxsYXJ5IGZ1bmN0aW9uXCIsIC0+IGFzc2VydCAoY3VycnkgLT4gMCkoKSA9PSAwXG4gICAgICAgIHRlc3QgXCJ1bmFyeSBmdW5jdGlvblwiLCAtPiBhc3NlcnQgKGN1cnJ5ICh4KSAtPiB4KSgxKSA9PSAxXG4gICAgICAgIHRlc3QgXCJiaW5hcnkgZnVuY3Rpb25cIiwgLT5cbiAgICAgICAgICBhc3NlcnQgKGN1cnJ5ICh4LHkpIC0+IHggKyB5KSgxKSgyKSA9PSAzXG4gICAgICAgIHRlc3QgXCJ0ZXJ0aWFyeSBmdW5jdGlvblwiLCAtPlxuICAgICAgICAgIGFzc2VydCAoY3VycnkgKHgseSx6KSAtPiB4ICsgeSArIHopKDEpKDIpKDMpID09IDZcbiAgICAgICAgdGVzdCBcIm4tYXJ5IGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgICAgYXNzZXJ0IChjdXJyeSAodyx4LHkseikgLT4gdyt4K3kreikoMSkoMikoMykoNCkgPT0gMTBcbiAgICBdXG5cbiAgICB0ZXN0IFwic3Vic3RpdHV0ZVwiLCAtPlxuICAgICAgYXNzZXJ0IChzdWJzdGl0dXRlIFsxLCBfLCAzXSwgWzJdKVsxXSA9PSAyXG5cbiAgICB0ZXN0IFwicGFydGlhbFwiLCAtPlxuICAgICAgc3F1YXJlID0gcGFydGlhbCBNYXRoLnBvdywgXywgMlxuICAgICAgYXNzZXJ0IChzcXVhcmUgMykgPT0gOVxuXG4gICAgdGVzdCBcImZsaXBcIiwgLT5cbiAgICAgIHNxdWFyZSA9ICAoY3VycnkgZmxpcCBNYXRoLnBvdykoMilcbiAgICAgIGFzc2VydCAoc3F1YXJlIDMpID09IDlcblxuICAgIHRlc3QgXCJjb21wb3NlXCIsIC0+XG4gICAgICBpbnZlcnNlID0gKHgpIC0+IDEveFxuICAgICAgc3F1YXJlID0gKHgpIC0+IHggKiB4XG4gICAgICBpbnZlcnNlU3F1YXJlID0gY29tcG9zZSBpbnZlcnNlLCBzcXVhcmVcbiAgICAgIGFzc2VydCBpbnZlcnNlU3F1YXJlIDUgPT0gMS8yNVxuXG4gICAgdGVzdCBcImNvbXBvc2UgKHByb21pc2UpXCIsIC0+XG4gICAgICBpbnZlcnNlID0gKHgpIC0+IFByb21pc2UucmVzb2x2ZSAxL3hcbiAgICAgIHNxdWFyZSA9ICh4KSAtPiB4ICogeFxuICAgICAgaW52ZXJzZVNxdWFyZSA9IGNvbXBvc2UgaW52ZXJzZSwgc3F1YXJlXG4gICAgICBhc3NlcnQgKGludmVyc2VTcXVhcmUgNSkudGhlbj9cbiAgICAgIGFzc2VydCAoeWllbGQgaW52ZXJzZVNxdWFyZSA1KSA9PSAxLzI1XG5cbiAgICB0ZXN0IFwidGVlXCIsIC0+XG4gICAgICBmID0gdGVlICh4KSAtPiAxL3hcbiAgICAgIGFzc2VydCA1LCAoZiA1KVxuXG4gICAgdGVzdCBcInRlZSAocHJvbWlzZSlcIiwgLT5cbiAgICAgIGYgPSB0ZWUgKHgpIC0+IFByb21pc2UucmVzb2x2ZSAxL3hcbiAgICAgIGFzc2VydCA1LCAoYXdhaXQgZiA1KVxuXG4gICAgdGVzdCBcInBpcGVcIiwgLT5cbiAgICAgIGEgPSAoeCkgLT4geCArIFwiYVwiXG4gICAgICBiID0gKHgpIC0+IHggKyBcImJcIlxuICAgICAgYWIgPSBwaXBlIGEsIGJcbiAgICAgIGFzc2VydCAoYWIgXCJTXCIpID09IFwiU2FiXCJcblxuICAgIHRlc3QgXCJhcHBseVwiLCAtPlxuICAgICAgYXNzZXJ0IChhcHBseSBpZGVudGl0eSwgMSkgPT0gMVxuXG4gICAgdGVzdCBcInNwcmVhZFwiLCAtPlxuICAgICAgYXNzZXJ0IChzcHJlYWQgKGEsIGIpIC0+IGEgKyBiKShbXCJhXCIsIFwiYlwiXSkgPT0gXCJhYlwiXG5cbiAgICB0ZXN0IFwidW5hcnlcIiwgLT4gYXNzZXJ0ICh1bmFyeSAtPikubGVuZ3RoID09IDFcbiAgICB0ZXN0IFwiYmluYXJ5XCIsIC0+IGFzc2VydCAoYmluYXJ5IC0+KS5sZW5ndGggPT0gMlxuICAgIHRlc3QgXCJ0ZXJuYXJ5XCIsIC0+IGFzc2VydCAodGVybmFyeSAtPikubGVuZ3RoID09IDNcblxuICAgIHRlc3QgXCJuZWdhdGVcIiwgLT5cbiAgICAgIGFzc2VydCAobmVnYXRlIC0+IGZhbHNlKSgpXG5cbiAgICB0ZXN0IFwib25jZVwiLCAtPlxuICAgICAgKGYgPSBkbyAoaT0wKSAtPiBvbmNlIC0+IGkrKykoKVxuICAgICAgYXNzZXJ0IGYoKSA9PSAwXG5cbiAgICB0ZXN0IFwiZ2l2ZW5cIiwgLT5cbiAgICAgIGFzc2VydCAoZ2l2ZW4gKGEgPSAzLCBiID0gMikgLT4gYSAqIGIpID09IDYgJiYgIWE/ICYmICFiP1xuICAgICAgYXNzZXJ0IChnaXZlbiAzLCAyLCAoYSxiKSAtPiBhICogYikgPT0gNlxuXG4gICAgdGVzdCBcIm1lbW9pemVcIiwgZG8gLT5cbiAgICAgIGNvdW50ID0gMFxuICAgICAgZiA9IG1lbW9pemUgKHgsIHkpIC0+IGNvdW50Kys7IHhcbiAgICAgIFtcbiAgICAgICAgdGVzdCBcInJ1bnMgdGhlIGZ1bmN0aW9uXCIsIC0+XG4gICAgICAgICAgYXNzZXJ0IGYoMSwgMikgPT0gMSAmJiBjb3VudCA9PSAxXG4gICAgICAgIHRlc3QgXCJidXQgb25seSBvbmNlIGZvciBhIGdpdmVuIGFyZ3VtZW50XCIsIC0+XG4gICAgICAgICAgYXNzZXJ0IGYoMSwgMikgPT0gMSAmJiBjb3VudCA9PSAxXG4gICAgICAgIHRlc3QgXCJ3aXRob3V0IGFmZmVjdGluZyBhbnkgb3RoZXIgYXJndW1lbnRzXCIsIC0+XG4gICAgICAgICAgYXNzZXJ0IGYoMiwgMSkgPT0gMiAmJiBjb3VudCA9PSAyXG4gICAgICBdXG4gIF1cbiJdfQ==
//# sourceURL=index.coffee
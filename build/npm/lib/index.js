"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _,
    apply,
    binary,
    compose,
    curry,
    flip,
    given,
    identity,
    memoize,
    negate,
    noOp,
    once,
    partial,
    pipe,
    spread,
    substitute,
    tee,
    ternary,
    unary,
    wrap,
    slice = [].slice;

exports.noOp = noOp = function () {};

exports.identity = identity = function (x) {
  return x;
};

exports.wrap = wrap = function (x) {
  return function () {
    return x;
  };
};

exports.curry = curry = function (f) {
  var g;
  return g = function (...ax) {
    if (ax.length >= f.length) {
      return f(...ax);
    } else {
      switch (f.length - ax.length) {
        case 1:
          return function (x) {
            return f(...ax, x);
          };
        case 2:
          return binary(curry(function (x, y) {
            return f(...ax, x, y);
          }));
        case 3:
          return ternary(curry(function (x, y, z) {
            return f(...ax, x, y, z);
          }));
        default:
          return function (...bx) {
            return g(...ax, ...bx);
          };
      }
    }
  };
};

exports._ = _ = {};

exports.substitute = substitute = curry(function (ax, bx) {
  var a, i, j, len, results;
  i = 0;
  results = [];
  for (j = 0, len = ax.length; j < len; j++) {
    a = ax[j];
    if (a === _) {
      results.push(bx[i++]);
    } else {
      results.push(a);
    }
  }
  return results;
});

exports.partial = partial = function (f, ...ax) {
  return function (...bx) {
    return f(...substitute(ax, bx));
  };
};

exports.flip = flip = function (f) {
  switch (f.length) {
    case 1:
      return f;
    case 2:
      return function (y, x) {
        return f(x, y);
      };
    case 3:
      return function (z, y, x) {
        return f(x, y, z);
      };
    default:
      return function (...ax) {
        return f(...ax.reverse());
      };
  }
};

exports.compose = compose = function (...fx) {
  var f, g, j, ref;
  ref = fx, fx = 2 <= ref.length ? slice.call(ref, 0, j = ref.length - 1) : (j = 0, []), f = ref[j++];
  if (fx.length === 0) {
    return f;
  } else {
    g = compose(...fx);
    return function (...ax) {
      var fax, ref1;
      if (((ref1 = fax = f(...ax)) != null ? ref1.then : void 0) != null) {
        return fax.then(g);
      } else {
        return g(fax);
      }
    };
  }
};

exports.pipe = pipe = flip(compose);

exports.spread = spread = function (f) {
  return function (ax) {
    return f(...ax);
  };
};

exports.unary = unary = function (f) {
  return function (x) {
    return f(x);
  };
};

exports.binary = binary = function (f) {
  return function (x, y) {
    return f(...arguments);
  };
};

exports.ternary = ternary = function (f) {
  return function (x, y, z) {
    return f(...arguments);
  };
};

exports.apply = apply = function (f, ...args) {
  return f(...args);
};

exports.negate = negate = function (f) {
  return function () {
    return !f(...arguments);
  };
};

exports.given = given = function (...args) {
  var f, j, ref;
  ref = args, args = 2 <= ref.length ? slice.call(ref, 0, j = ref.length - 1) : (j = 0, []), f = ref[j++];
  return f(...args);
};

exports.tee = tee = function (f) {
  return function (first, ...rest) {
    f(first, ...rest);
    return first;
  };
};

exports.once = once = function (f) {
  return function (k) {
    return function () {
      if (k != null) {
        return k;
      } else {
        return k = f();
      }
    };
  }(void 0);
};

exports.memoize = memoize = function (f) {
  return function (cache) {
    return function (...args) {
      return cache[args] != null ? cache[args] : cache[args] = f(...args);
    };
  }({});
};

exports.noOp = noOp;
exports.identity = identity;
exports.wrap = wrap;
exports.curry = curry;
exports._ = _;
exports.substitute = substitute;
exports.partial = partial;
exports.flip = flip;
exports.compose = compose;
exports.pipe = pipe;
exports.spread = spread;
exports.unary = unary;
exports.binary = binary;
exports.ternary = ternary;
exports.apply = apply;
exports.negate = negate;
exports.once = once;
exports.tee = tee;
exports.given = given;
exports.memoize = memoize;
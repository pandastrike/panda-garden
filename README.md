# Panda Garden

Panda Garden is a JavaScript library providing support for functional programming in JavaScript.

```coffee
square = partial Math.pow, _, 2
assert (square 3) == 9
```

## Installation

`npm install @pandastrike/garden`

## Roadmap

You can get an idea of what we're planning by looking at the [issues list][tickets]. If you want something that isn't there, and you think it would be a good addition, please open a ticket.

[code]:https://github.com/pandastrike/garden
[tickets]:https://github.com/pandastrike/garden/issues

## API Reference

### `identity x → x`

Returns the value of its argument. Useful when you need to pass a function that leaves a value unchaged.

### `wrap x → f`

Returns a function that returns the given value.

### `arity n, f → g`

Given an arity (the number of arguments to a function) and a function, returns a function with the given arity that will invoke the given function. Useful in conjunction with `curry` or `partial` to allow partial application of a function that may have an unknown arity.

### `unary f → g`

Equivalent to `arity 1, f`.

### `binary f → g`

Equivalent to `arity 2, f`.

### `ternary f → g`

Equivalent to `arity 3, f`.

### `curry f → g`

Returns a function that can be _curried_: arguments may be bound to a function without invoking it, returning a new (curryable) function that takes the remaining arguments.

```coffeescript
multiply = (x, y) → x * y
double = multiply 2
assert.equal 4, double 2
```

### `_`

A constant that may be used with `partial` to specificy which function arguments remain unbound.

### `substitute to, from → combined`

Substitutes the values in the `from` array for values in the `to` array whose value is the constant `_`.

```coffeescript
assert.deepEqual [1, 2, 3],
  substitute [1, _, 3], [2]
```

### `partial f, ax → g`

Returns a function that will merge the given arguments in `ax` with those provided at invocation, based on the substitution constant `_`. Similar to `curry`, but allows you to provide arguments out of order.

```coffeescript
square = partial Math.pow, _, 2
assert (square 3) == 9
```

### `spread f → g`

Given a variadic function, returns a function that takes an array.

### `variadic f → g`

Given a function that takes an array, returns a variadic function.

### `flip f → g`

Given a function, returns a function that takes the arguments in reverse.

```coffeescript
square =  (curry flip Math.pow)(2)
assert (square 3) == 9
```

### `pipe fx → g`

Given an array of functions, returns the result of composing them such that they're invoked in the order given. Same as `compose` but with the arguments reversed, so that it's easier to see the intent.

```coffeescript
# jquery style combinators
query = (selector) → document.querySelectorAll selector
text = (elements) → elements.map property "textContent"
textFor = pipe [ query, text, first ]
# ex: textFor "h1"
```

### `compose fx → g`

Given an array of functions, returns the result of composing them. See `pipe`.

### `wait f → g`

Given a function, returns a unary function that, if its argument is a promise, will wait for the promise to resolve, before calling the given function with the resolved value. If the argument is not a promise, simply calls the function with the argument. Useful when composing an function that may return a promise with a one expecting the value to which the promise resolves.

### `flow fx → g`

Given an array of possibly asynchronous functions, returns the result of composing the functions, awaiting if necessary.

```coffeescript
# gulp style combinators
flow [
  glob "**/*.css", "src"
  read
  compile
  write ".js", "build"
]
```

### `tee f → g`

Given a function, returns a function that will always return its first argument, regardless of the return value of the given function.

### `rtee f → g`

Given a function, returns a function that will always return its last argument, regardless of the return value of the given function.

### `negate f → g`

Given a predicate function, returns a function that negates the return value of the given function.

### `once f → g`

Given a function, returns a function that will ensure the given function is only called once.

### `memoize f → g`

Given a function taking a string, returns a function that will [memoize][] the results of calling the given function.

[memoize]: https://en.wikipedia.org/wiki/Memoization

### `call f, ax... → any`

Equivalent to `f.call undefined, ax...`.

### `apply f, ax → any`

Equivalent to `f.apply undefined, ax`.

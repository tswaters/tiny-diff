# Tiny Diff

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][dependency-badge]][dependency-url]
[![devDependency Status][devDependency-badge]][devDependency-url]

Deep compare two javascript objects and returns additions, removals and edits.

## Installation

```sh
npm i tiny-diff
```

## Files

The code has been transpiled to es5 syntax so it should work in most environments.

* `./dist/tiny-diff.js` - cjs bundle, transpiled to node4. referenced in package.json's main entry
* `./dist/tiny-diff.mjs` - es6 exports. transpiled to node4. referenced in package.json's module entry
* `./dist/tiny-diff.umd.js` - browser bundle, transpiled to ie8.
* `./dist/tiny-diff.umd.min.js` - browser bundle minified

This module needs the following polyfills:

* Object.entries
* Object.getOwnPropertyDescriptors
* Number.isNaN

## Usage

```js
const {diff} = require('@tswaters/tiny-diff')
// or: import {diff} from '@tswaters/tiny-diff'
// or: var diff = window.tinyDiff.diff
// or: define(...) // whatever; it's a umd export, figure it out
diff(right, left)
```

## API

diff(right: *, left: *, path: string?)

* right/left: can be any js value
* path: used internally to track the path.

returns: Diff[]

Each `Diff` has the following properties:

* _kind_ (string): One of `add`, `remove` or `update`
* _path_ (string): path to changed value
* _left_: value that was changed
* _right_: value that was changed

## Examples

Refer to the tests directory for more examples.

```js
diff({foo: {bar: 'baz'}}, {foo: {bar: 'qoz'}})
// [{ kind: 'update', path: 'foo.bar', left: 'baz', right: 'qoz'}]
```

[npm-badge]: https://badge.fury.io/js/%40tswaters%2Ftiny-diff.svg
[npm-url]: https://badge.fury.io/js/%40tswaters/tiny-diff
[travis-badge]: https://travis-ci.org/tswaters/tiny-diff.svg?branch=master
[travis-url]: https://travis-ci.org/tswaters/tiny-diff
[coveralls-badge]: https://coveralls.io/repos/github/tswaters/tiny-diff/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/tswaters/tiny-diff?branch=master
[dependency-badge]: https://david-dm.org/tswaters/tiny-diff.svg
[dependency-url]: https://david-dm.org/tswaters/tiny-diff
[devDependency-badge]: https://david-dm.org/tswaters/tiny-diff/dev-status.svg
[devDependency-url]: https://david-dm.org/tswaters/tiny-diff?type=dev

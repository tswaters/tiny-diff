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

```
./dist/tiny-diff.js - cjs module export
./dist/tiny-diff.mjs - es module export
./dist/tiny-diff.umd.js - umd browser bundle
./dist/tiny-diff.umd.minjs - minified umd browser bundle
```

`main` points at `./dist/tiny-diff.js`

This module needs the following polyfills:

* Object.entries
* Object.getOwnPropertyDescriptors
* Number.isNaN

## Usage

```js
const {diff} = require('@tswaters/tiny-diff')
// or: import {diff} from 'tiny-diff/es'
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

[npm-badge]: https://badge.fury.io/js/@tswaters/tiny-diff.svg
[npm-url]: https://badge.fury.io/js/@tswaters/tiny-diff
[travis-badge]: https://travis-ci.org/tswaters/tiny-diff.svg?branch=master
[travis-url]: https://travis-ci.org/tswaters/tiny-diff
[coveralls-badge]: https://coveralls.io/repos/github/tswaters/tiny-diff/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/tswaters/tiny-diff?branch=master
[dependency-badge]: https://david-dm.org/tswaters/tiny-diff.svg
[dependency-url]: https://david-dm.org/tswaters/tiny-diff
[devDependency-badge]: https://david-dm.org/tswaters/tiny-diff/dev-status.svg
[devDependency-url]: https://david-dm.org/tswaters/tiny-diff?type=dev

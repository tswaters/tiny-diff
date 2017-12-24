
import assert from 'assert'
import {diff} from '../src/tiny-diff'

describe('diff', () => {

  it('should handle non-complex types', () => {

    assert.deepEqual(diff('test', null), [{kind: 'update', path: '', left: 'test', right: null}])
    assert.deepEqual(diff(null, 'test'), [{kind: 'update', path: '', left: null, right: 'test'}])
    assert.deepEqual(diff('test', 'test'), [])

    assert.deepEqual(diff(1, 2), [{kind: 'update', path: '', left: 1, right: 2}])
    assert.deepEqual(diff(1, null), [{kind: 'update', path: '', left: 1, right: null}])
    assert.deepEqual(diff(2, 1), [{kind: 'update', path: '', left: 2, right: 1}])
    assert.deepEqual(diff(null, 1), [{kind: 'update', path: '', left: null, right: 1}])
    assert.deepEqual(diff(1, 1), [])

    assert.deepEqual(diff(null, null), [])
    assert.deepEqual(diff(void 0, void 0), [])
    assert.deepEqual(diff(Infinity, Infinity), [])
    assert.deepEqual(diff(NaN, NaN), [])

  })

  it('should handle dates', () => {

    assert.deepEqual(
      diff({date: new Date('2016')}, {date: new Date('2017')}),
      [
        {kind: 'update', path: 'date', left: new Date('2016'), right: new Date('2017')}
      ]
    )

    assert.deepEqual(
      diff({date: new Date('2016')}, {date: new Date('2016')}),
      []
    )

  })

  it('should handle arrays', () => {

    assert.deepEqual(diff([1, 2, 3], [1, 2, 3]), [])

    assert.deepEqual(diff([1, 2, 3], [1, 2]), [{kind: 'remove', path: '[2]', left: 3, right: null}])

    assert.deepEqual(diff([1, 2], [1, 2, 3]), [{kind: 'add', path: '[2]', left: null, right: 3}])

    assert.deepEqual(diff([1, 2, 3], [1, 2, 4]), [{kind: 'update', path: '[2]', left: 3, right: 4}])

    assert.deepEqual(diff([NaN], [NaN]), [])

    assert.deepEqual(diff([1, 2, 3], [4, 5, 6]), [
      {kind: 'update', path: '[0]', left: 1, right: 4},
      {kind: 'update', path: '[1]', left: 2, right: 5},
      {kind: 'update', path: '[2]', left: 3, right: 6}
    ])

    assert.deepEqual(diff([1, 2, 3], []), [
      {kind: 'remove', path: '[0]', left: 1, right: null},
      {kind: 'remove', path: '[1]', left: 2, right: null},
      {kind: 'remove', path: '[2]', left: 3, right: null}
    ])

    assert.deepEqual(diff([], [1, 2, 3]), [
      {kind: 'add', path: '[0]', left: null, right: 1},
      {kind: 'add', path: '[1]', left: null, right: 2},
      {kind: 'add', path: '[2]', left: null, right: 3}
    ])

  })

  it('should handle deeply nested objects', () => {

    assert.deepEqual(
      diff({a: {b: 1}, c: 2, d: {e: 100}}, {a: {b: 99}, c: 3, d: {e: 100}}),
      [
        {kind: 'update', path: 'a.b', left: 1, right: 99},
        {kind: 'update', path: 'c', left: 2, right: 3}
      ]
    )

    assert.deepEqual(
      diff({a: [{b: 1}, {c: 2}, {d: {e: 100}}]}, {a: [{b: 99}, {c: 3}, {d: {e: 100}}]}),
      [
        {kind: 'update', path: 'a[0].b', left: 1, right: 99},
        {kind: 'update', path: 'a[1].c', left: 2, right: 3}
      ]
    )

  })

  it('should handle null prototypes', () => {
    assert.deepEqual(
      diff(Object.create(null, {a: {value: 123, enumerable: true}}), {a: 123}),
      []
    )

    assert.deepEqual(
      diff(Object.create(null, {a: {value: 123, enumerable: true}}), {b: 123}),
      [
        {kind: 'remove', path: 'a', left: 123, right: null},
        {kind: 'add', path: 'b', left: null, right: 123}
      ]
    )

  })

})

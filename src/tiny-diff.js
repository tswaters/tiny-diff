
const isDate = obj => obj instanceof Date
const isObject = obj => obj !== null && typeof obj === 'object'
const hop = (obj, key) => {
  const props = Object.getOwnPropertyDescriptors(obj)
  return Object.prototype.hasOwnProperty.call(props, key)
}

const _get_path = (path, is_array) => {
  const prefix = path === '' ? '' : '.'
  const tmpl = is_array ? '[{0}]' : `${prefix}{0}`
  return key => `${path}${tmpl.replace('{0}', key)}`
}

export const diff = (left, right, path = '') => {

  const ret = []

  if (left === right) {
    return ret
  }

  const get_path = _get_path(path, Array.isArray(left))

  // for non-complex objects, inequality is simple.
  // except for NaN which doesn't compare with equality operator

  if (!isObject(left) || !isObject(right)) {
    if (Number.isNaN(left) && Number.isNaN(right)) { return ret }
    ret.push({kind: 'update', path, left, right})
    return ret
  }

  // for dates, compare their values.
  // a different date means it was updated.

  if (isDate(left) || isDate(right)) {
    if (left.valueOf() === right.valueOf()) { return ret }
    ret.push({kind: 'update', path, left, right})
    return ret
  }

  // now we're now dealing with complex objects.
  // first figure out if any items have been removed.
  // this is if something is on the left, but not on the right.

  for (const [key, value] of Object.entries(left)) {
    if (!hop(right, key)) {
      ret.push({kind: 'remove', path: get_path(key), left: value, right: null})
    }
  }

  // next, see if we have any additions/updates
  // if addition, include it.
  // otherwise updates recurse back into the function.

  for (const [key, value] of Object.entries(right)) {
    if (!hop(left, key)) {
      ret.push({kind: 'add', path: get_path(key), left: null, right: value})
    } else {
      ret.push(...diff(left[key], right[key], get_path(key)))
    }
  }

  return ret
}

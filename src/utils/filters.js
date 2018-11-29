export function getSex (sex) {
  let str = ''
  if (sex === 1) {
    str = '男'
  } else if (sex === 2) {
    str = '女'
  } else {
    str = '保密'
  }
  return str
}

export function name (str) {
  // if (str) {
  //   return str.substring(0, 1) + '*'
  // }
  return str
}

export function idCard (str) {
  if (str) {
    return str.substring(0, 6) + '********' + str.substring(14, 18)
  }
  return str
}

export function phone (str) {
  if (str) {
    return str.substring(0, 3) + '****' + str.substring(7, 11)
  }
  return str
}

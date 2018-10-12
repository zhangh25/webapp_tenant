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

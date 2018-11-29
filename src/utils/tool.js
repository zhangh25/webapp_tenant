export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
export function countDown (lasttime, duration) {
  let last = new Date(lasttime)
  let now = new Date()
  let t = last.getTime() + duration * 60 * 60 * 1000 - now.getTime()
  // let dayDiff = Math.floor(t / (24 * 3600 * 1000))// 计算出相差天数
  var leave1 = t % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
  // 计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
  // 计算相差秒数
  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  return {hours, minutes, seconds}
  // console.log('小时：', hours, '  分：', minutes, '  秒： ', seconds)
}

export function getIdCard (str) {
  if (str) {
    return str.substring(0, 6) + '********' + str.substring(14, 18)
  }
  return str
}

export function getFullname (str) {
  // if (str) {
  //   return str.substring(0, 1) + '*'
  // }
  return str
}

export function dataURLtoFile (dataurl, filename) { // 将base64转换为文件
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
}

export function getImgToBase64 (url, callback) {
  var canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    canvas.height = img.height
    canvas.width = img.width
    ctx.drawImage(img, 0, 0)
    var dataURL = canvas.toDataURL('image/png')
    callback(dataURL)
    canvas = null
  }
  img.src = url
}

export function isWeiXin () {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase()
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}
// 将图片转换为base64
// getImgToBase64('images/ruoshui.png', function (data) {
//   var myFile = dataURLtoFile(data, 'testimgtestimgtestimg')
//   console.log(myFile)
// })

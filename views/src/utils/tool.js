export const requireAll = (requireContext) => requireContext.keys().reduce((prev, next) => {
  let path = next.split('.')[ 1 ].substr(1)
  // prev[ path ] = fn.call(requireContext(next), next)
  prev[ path ] = requireContext(next).default
  return prev
}, {})

export const formatMyDate = (date, str = 'yyyy-MM-dd hh:mm:ss', isEnd = false) => {
  if (!date) {
    return
  }
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  if (date.toString() == 'Invalid Date') { return 'Invalid Date' }
  if (isEnd) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    date = new Date(date.getTime() + 1000 * 60 * 60 * 24 - 1)
  }

  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(str)) str = str.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(str)) {
      str = str.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : ((`00${o[ k ]}`).substr((`${o[ k ]}`).length)))
    }
  })

  return str
}

export default {}

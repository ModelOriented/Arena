const round = (x, p = 3) => {
  if (x === 0) return 0
  let lg = Math.round(Math.log10(Math.abs(x)))
  let k = p - lg
  return Math.round(x * (10 ** k)) / (10 ** k)
}

export default {
  addNewLines (label, width = 140) {
    let words = label.split('_').join(' ').split(' ')
    let output = ''
    let line = ''
    const limit = Math.floor(width / 7)
    words.forEach(word => {
      if (word.length > limit) {
        let n = limit - line.length - 1
        output += '<br>' + line + (n < 0 ? '' : ' ' + word.substr(0, n))
        line = word.substr(n >= 0 ? n : 0)
      } else if (word.length + line.length + 1 > limit) {
        output += '<br>' + line
        line = word
      } else line += line.length === 0 ? word : (' ' + word)
    })
    if (line.length > 0) output += '<br>' + line
    return output.split('<br>').filter(x => x.length > 0).join('<br>') // Remove first one or two <br>
  },
  round,
  formatTitle (title) {
    return title.replace(/[._-]/gi, ' ')
  },
  formatValue (x, addSign = false, space = '', k = 0) {
    let r = round(x, 3 + k)
    if (Math.abs(2 * x) >= 10 ** 6) r = round(x / (10 ** 6), 1 + k) + 'M'
    else if (Math.abs(2 * x) >= 10 ** 3) r = round(x / (10 ** 3), 2 + k) + 'K'

    if (x >= 0) return space + (addSign ? '+' : '') + r
    else return r + space
  },
  simplify (name) {
    return name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').toLowerCase()
  },
  firstCharUpper (name) {
    return name.split(' ').map(word => word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '').join(' ')
  }
}

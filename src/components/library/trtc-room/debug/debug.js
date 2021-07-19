function setData(obj, callback) {
  let that = this
  let keys = []
  let val, data
  Object.keys(obj).forEach(function(key) {
    keys = key.split('.')
    val = obj[key]
    data = that.$data
    keys.forEach(function(key2, index) {
      if (index + 1 == keys.length) {
        that.$set(data, key2, val)
      } else {
        if (!data[key2]) {
          that.$set(data, key2, {})
        }
      }
      data = data[key2]
    })
  })
  setTimeout(() => {
    callback && callback()
  }, 500)
}

module.exports = {
  setData
}

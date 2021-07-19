<template>
  <view class="van-amount" :class="{ fw600: bold }" :style="numStyle">{{
    numFormat
  }}</view>
</template>
<script>
export default {
  props: {
    num: {},
    color: {
      type: String,
      default: ''
    },
    //
    size: {
      type: [Number, String],
      default: ''
    },
    //是否加粗
    bold: {
      type: Boolean,
      default: false
    },
    //是否格式化
    isFormat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    numStyle() {
      let style = {
        color: this.color,
        fontSize: `${this.size}rpx`
      }
      return style
    },
    numFormat() {
      if (!this.isFormat) return this.num
      return this.formatMoney(this.num)
    }
  },
  methods: {
    formatMoney(s, type) {
      if (/[^0-9\.]/.test(s)) return '0'
      if (s == null || s == '') return '0'
      s = s.toString().replace(/^(\d*)$/, '$1.')
      s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
      s = s.replace('.', ',')
      var re = /(\d)(\d{3},)/
      while (re.test(s)) s = s.replace(re, '$1,$2')
      s = s.replace(/,(\d\d)$/, '.$1')
      if (type == 0) {
        // 不带小数位(默认是有小数位)
        var a = s.split('.')
        if (a[1] == '00') {
          s = a[0]
        }
      }
      return s
    }
  }
}
</script>
<style lang="scss" scoped>
.van-amount {
  display: inline-flex;
}
</style>

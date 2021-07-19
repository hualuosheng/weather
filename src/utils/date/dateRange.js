import { dateTools } from './dateTools.js'

// console.log(dateTools.format(new Date(), 'yy-mm-dd'))

/**
 * 日期范围工具类
 */
const dateRange = {
  /***
   * 获得当前时间
   */
  currentDate: () => {
    return new Date()
  },

  /***
   * 获得今天起止时间   00:00  00:00
   */
  getCurrentToday() {
    let startStop = new Array()
    let currentDate = this.currentDate()

    let lastDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)

    startStop.push(dateTools.format(lastDate, 'yyyy-mm-dd'))
    startStop.push(dateTools.format(currentDate, 'yyyy-mm-dd'))

    return startStop
  },

  /***
   * 获得本周起止时间
   */
  getCurrentWeek() {
    //起止日期数组
    let startStop = new Array()
    let currentDate = this.currentDate()
    //获取当前时间

    //返回date是一周中的某一天
    let week = currentDate.getDay()
    //返回date是一个月中的某一天
    let month = currentDate.getDate()

    //一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24
    //减去的天数
    let minusDay = week != 0 ? week - 1 : 6
    //alert(minusDay);
    //本周 周一
    let monday = new Date(currentDate.getTime() - minusDay * millisecond)
    //本周 周日
    let sunday = new Date(monday.getTime() + 6 * millisecond)
    //添加本周时间
    startStop.push(monday) //本周起始时间
    //添加本周最后一天时间
    startStop.push(sunday) //本周终止时间
    //返回
    return startStop
  },

  /***
   * 获得本月的起止时间
   */
  getCurrentMonth() {
    //起止日期数组
    let startStop = new Array()

    //获取当前时间
    let currentDate = this.currentDate()

    //获得当前月份0-11
    let currentMonth = currentDate.getMonth()
    //获得当前年份4位年
    let currentYear = currentDate.getFullYear()
    //求出本月第一天
    let firstDay = new Date(currentYear, currentMonth, 1)

    //当为12月的时候年份需要加1
    //月份需要更新为0 也就是下一年的第一个月
    if (currentMonth == 11) {
      currentYear++
      currentMonth = 0 //就为
    } else {
      //否则只是月份增加,以便求的下一月的第一天
      currentMonth++
    }

    //一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24
    //下月的第一天
    let nextMonthDayOne = new Date(currentYear, currentMonth, 1)
    //求出上月的最后一天
    let lastDay = new Date(nextMonthDayOne.getTime() - millisecond)

    //添加至数组中返回
    startStop.push(firstDay)
    startStop.push(lastDay)
    //返回
    return startStop
  }
}

export { dateRange }

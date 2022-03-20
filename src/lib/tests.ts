import { __isHoliday } from "./types"

export default {
  //
  ExactMonthDate: function (this: __isHoliday.Input, date: Date): boolean {
    const [testMonth, testDayOfMonth] = this.pattern
    return testMonth == date.getMonth() && testDayOfMonth == date.getDate()
  },

  //
  MonthsFirstDayOfWeek: function (
    this: __isHoliday.Input,
    date: Date
  ): boolean {
    const [testMonth, testDayOfWeek] = this.pattern

    let d = new Date(date.getFullYear(), testMonth, 1)

    while (d.getDay() !== testDayOfWeek) {
      d.setDate(d.getDate() + 1)
    }

    return date.getTime() == d.getTime()
  },

  //
  MonthsLastDayOfWeek: function (this: __isHoliday.Input, date: Date): boolean {
    const [testMonth, testDayOfWeek] = this.pattern

    let d = new Date(date.getFullYear(), testMonth + 1, 0)

    while (d.getDay() !== testDayOfWeek) {
      d.setDate(d.getDate() - 1)
    }

    return date.getTime() == d.getTime()
  },

  //
  MonthsNthDayOfWeek: function (this: __isHoliday.Input, date: Date): boolean {
    const [testMonth, testDayOfWeek, n] = this.pattern

    let d = new Date(date.getFullYear(), testMonth, 1)

    while (d.getDay() !== testDayOfWeek) {
      d.setDate(d.getDate() + 1)
    }

    d.setDate(d.getDate() + (n! - 1) * 7)

    return date.getTime() == d.getTime()
  },

  //
  MonthsNthToLastDayOfWeek: function (
    this: __isHoliday.Input,
    date: Date
  ): boolean {
    const [testMonth, testDayOfWeek, n] = this.pattern

    let d = new Date(date.getFullYear(), testMonth + 1, 0)

    while (d.getDay() !== testDayOfWeek) {
      d.setDate(d.getDate() - 1)
    }

    d.setDate(d.getDate() - (n! - 1) * 7)

    return date.getTime() == d.getTime()
  },
}

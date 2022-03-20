import { DateTime, DateTimeOptions } from "luxon"
import { __isHoliday } from "./types"

/**
 *
 */
export default class implements __isHoliday.IConfig {
  public holidays

  constructor(config: __isHoliday.IConfig) {
    this.holidays = config.holidays
  }

  isHoliday(date: Date = new Date()): __isHoliday.Result {
    let result = false
    let name

    for (let holiday of this.holidays) {
      result = holiday.test(date)
      name = result ? holiday.name : undefined
      if (result) break
    }

    return {
      date,
      name,
      result,
    }
  }

  //
  public static parseDateFromISO(
    text: string,
    opts?: DateTimeOptions | undefined
  ): Date {
    return new Date(DateTime.fromISO(text, opts).toISO())
  }

  //
  public static testDatesOfYear(
    year: number = new Date().getFullYear(),
    days: number = 365 // 366 for leap years
  ): Date[] {
    let dates: Date[] = []
    for (let index = 1; index <= days; index++) {
      dates.push(new Date(year, 0, index))
    }
    return dates
  }
}

/**
 *
 */
export enum Month {
  january = 0,
  february = 1,
  march = 2,
  april = 3,
  may = 4,
  june = 5,
  july = 6,
  august = 7,
  september = 8,
  october = 9,
  november = 10,
  december = 11,
}

/**
 *
 */
export enum Day {
  sunday = 0,
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
}

/**
 *
 */
export { default as Tests } from "./tests"

import { Month } from "."

declare namespace __isHoliday {
  interface IConfig {
    holidays: Input[]
  }

  type Input = {
    name: string | undefined
    pattern: [Month, number, number?]
    test: TestFunc
  }

  interface TestFunc {
    (this: Input, date: Date): boolean
  }

  type Result = {
    date: Date
    result: boolean
    name?: string
  }
}

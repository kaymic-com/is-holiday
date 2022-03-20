<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import IsHoliday, { Month, Day, Tests } from "./lib"
import { __isHoliday } from "./lib/types";

const config = reactive<__isHoliday.IConfig>({
  holidays: [
    {
      name: "New Year",
      test: Tests.ExactMonthDate,
      pattern: [Month.january, 1],
    },
    {
      name: "Dr. Martin Luther King, Jr.",
      test: Tests.MonthsNthDayOfWeek,
      pattern: [Month.january, Day.monday, 3],
    },
    {
      name: "Leap",
      test: Tests.ExactMonthDate,
      pattern: [Month.february, 29],
    },
    {
      name: "Memorial",
      test: Tests.MonthsLastDayOfWeek,
      pattern: [Month.may, Day.monday],
    },
    {
      name: "Juneteenth",
      test: Tests.ExactMonthDate,
      pattern: [Month.june, 19],
    },
    {
      name: "Indepence",
      test: Tests.ExactMonthDate,
      pattern: [Month.july, 4],
    },
    {
      name: "Labor",
      test: Tests.MonthsFirstDayOfWeek,
      pattern: [Month.september, Day.monday],
    },
    {
      name: "Thanksgiving",
      test: Tests.MonthsNthDayOfWeek,
      pattern: [Month.november, Day.thursday, 4],
    },
    {
      name: "Black Friday",
      test: Tests.MonthsNthDayOfWeek,
      pattern: [Month.november, Day.friday, 4],
    },
    {
      name: "Christmas",
      test: Tests.ExactMonthDate,
      pattern: [Month.december, 25],
    },
  ]
})

const client = new IsHoliday(config)

const testDate = ref<string>('')
const testDateIsHoliday = computed<__isHoliday.Result>(() => client.isHoliday(IsHoliday.parseDateFromISO(testDate.value)))

const testYear = ref<number>(new Date().getFullYear())
const testYearResults = computed<__isHoliday.Result[]>(() => IsHoliday.testDatesOfYear(testYear.value)
  .map((date) => client.isHoliday(date))
  .filter((x) => x.result)
)
</script>

<template>
  <main class="my-5">
    <h1>IsHoliday</h1>

    <h2>Test a Date</h2>
    <input type="date" v-model="testDate" class="form-control" />
    <pre v-if="testDate">{{ testDateIsHoliday }}</pre>

    <h2>Test a Year</h2>
    <input type="number" v-model="testYear" min="100" class="form-control" />
    <ul>
      <li
        v-for="result in testYearResults"
      >{{ new Date(result.date).toLocaleDateString() }} : {{ result.name }}</li>
    </ul>
  </main>
</template>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  padding-top: 5rem;
  margin-top: -3rem;
  margin-bottom: 2rem;
}
</style>
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      entry: "./src/lib/index.ts",
      name: "IsHoliday",
      fileName: (format) => `is-holiday.${format}.js`,
    },
  },
})

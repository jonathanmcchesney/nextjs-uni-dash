import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});

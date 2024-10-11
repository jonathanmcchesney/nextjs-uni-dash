import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Update this with your app's base URL
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    video: false, // You can enable video recording if needed
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

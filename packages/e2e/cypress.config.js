const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //baseUrl: process.env.REMOTE_URL || "http://localhost:5173",
    specPattern: "**/*.feature", // Matches your .feature files
    defaultBrowser: "chrome",
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);
      return config;
    },
  },
});

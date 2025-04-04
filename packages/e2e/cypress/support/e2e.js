// cypress/support/e2e.js
import "./commands"; // Assuming you have custom commands in 'commands.js'

// Any global setup or configuration
Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  console.error("Uncaught exception:", err);
  console.info("Test that caused the exception:", runnable);

  return false;
});

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open {string}", (url) => {
  cy.visit(url);
});

Then("Should has text {string}", (expected) => {
  cy.contains(expected);
});

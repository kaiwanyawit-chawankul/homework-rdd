import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { visitWithResumes } from "../utils";
Given("I open {string}", (url) => {
  visitWithResumes(url, false);
});

Given("I open {string} with resumes", (url) => {
  visitWithResumes(url, true);
});

Given("I open the app", () => {
  visitWithResumes("/", false);
});

Given("I open the app with resumes", () => {
  visitWithResumes("/", true);
});

Then("I select resume {string}", (resumeKey) => {
  cy.get('select[aria-label="Choose Resume"]').select(resumeKey); // 'resume2' is the value of the option you want to select
});

Then("Should has text {string}", (expected) => {
  cy.contains(expected);
});

Then("I upload resume file {string}", (fileToUpload) => {
  cy.uploadFile(fileToUpload);
});

Then("I clone resume with name {string}", (resumeKey) => {
  // Intercept the prompt and provide input
  cy.window().then((window) => {
    cy.stub(window, "prompt").returns(resumeKey); // Fill the prompt with 'John Doe'
  });

  // Intercept the alert and prevent it from showing up
  cy.on("window:alert", (alertText) => {
    expect(alertText).to.contains("Hello, John Doe"); // Assert the alert message
  });

  cy.get('button[aria-label="Clone Resume"]').click();
});

Then("I should see the correct content in preview", () => {
  cy.get("#preview-content") // Update the selector to match the one showing the uploaded content
    .should("contain", "John Doe") // A name from the JSON data
    .and("contain", "Certified Kubernetes Administrator (CKA)"); // An example certification from JSON
});

Then("I should see the correct content in info", () => {
  cy.get(".editor-link").eq(0).click();
  cy.get("#title") // Update the selector to match the one showing the uploaded content
    .should("have.value", "Software Engineer");
  cy.get("#description") // Update the selector to match the one showing the uploaded content
    .should(
      "have.value",
      "Experienced software engineer with a strong background in web development and machine learning.",
    );
});

Then("I fill data on info", () => {
  cy.get(".editor-link").eq(0).click();
  cy.get("#title").type("Software Engineer");
  cy.get("#description").type("Software Engineer");
});

Then("I fill data on contact", () => {
  cy.get(".editor-link").eq(1).click();
  cy.get("#name").type("John Doe");
  cy.get("#address").type("1234 Elm Street, Springfield, IL, 62704");
  cy.get("#mobile").type("+1 (555) 123-4567");
  cy.get("#email").type("johndoe@email.com");
});

Then("I fill data on other sections", () => {
  cy.get(".editor-link").eq(5).click();
  cy.get("#item-0-0").type("Certified Kubernetes Administrator (CKA)");
});

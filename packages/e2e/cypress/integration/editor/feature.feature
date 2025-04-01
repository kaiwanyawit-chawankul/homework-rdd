Feature: Cypress Home Page

    I want enter to Cypress home page

    Scenario: Opening a Cypress home page
        Given I open "https://www.cypress.io"
        Then Should has text "npm install cypress"
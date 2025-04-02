import "cypress-file-upload";

Cypress.Commands.add("uploadFile", (fileName) => {
  // Path to your fixture file
  const filePath = `${fileName}`;

  cy.get('input[type="file"]').attachFile(filePath);
});

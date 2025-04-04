import "cypress-file-upload";

Cypress.Commands.add("uploadFile", (fileName) => {
  // Ensure fileName is a string
  if (typeof fileName !== "string") {
    throw new Error("The fileName parameter must be a string");
  }

  // Path to your fixture file
  const filePath = fileName.trim(); // Optionally, trim any extra spaces

  // Check if the file exists or handle the case where it's not available
  if (!filePath) {
    throw new Error("File name cannot be empty");
  }

  // Upload the file using Cypress file upload
  cy.get('input[type="file"]').attachFile(filePath);
});

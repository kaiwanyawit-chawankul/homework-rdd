export const visitWithResumes = (url, withResume) => {
  if (withResume) {
    cy.fixture("example.json").then((data) => {
      // Set the data in localStorage
      cy.window().then((window) => {
        window.localStorage.setItem("resume", JSON.stringify(data)); // Adjust 'yourKey' as per your need
      });
    });

    cy.fixture("localstorage1.json").then((data) => {
      // Set the data in localStorage
      cy.window().then((window) => {
        window.localStorage.setItem("localstorage1", JSON.stringify(data)); // Adjust 'yourKey' as per your need
      });
    });

    cy.fixture("localstorage2.json").then((data) => {
      // Set the data in localStorage
      cy.window().then((window) => {
        window.localStorage.setItem("localstorage2", JSON.stringify(data)); // Adjust 'yourKey' as per your need
        window.localStorage.setItem(
          "resume-list",
          '["resume","localstorage1","localstorage2"]',
        );
      });
    });
  }

  cy.visit(url);
};

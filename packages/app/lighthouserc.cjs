// lighthouserc.js

module.exports = {
  ci: {
    collect: {
      url: [process.env.LHCI_URL || "http://localhost:5173"], // URL of your local Vite project (update if different)
      startServerCommand: "npm run dev", // Command to start your Vite server
      numberOfRuns: process.env.LHCI_RUN || 1, // Number of runs to perform
      settings: {
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ], // Categories you want to audit
        chromeFlags: "--headless --no-sandbox", // Run headless Chrome without sandboxing
      },
    },
    assert: {
      preset: "lighthouse:recommended", // You can use predefined assertions (optional)
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 0.79 }],
        "categories:seo": ["error", { minScore: 1 }],
        "categories:pwa": ["warn", { minScore: 1 }],
        "third-party-cookies": ["warn", {"minScore": 1}],
        "inspector-issues": ["warn", {"minScore": 1}],
      },
    },
    upload: {
      //target: 'lhci', // If using Lighthouse CI server, use 'lhci'
      target: "temporary-public-storage",
    },
  },
};

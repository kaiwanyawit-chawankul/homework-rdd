// lighthouserc.js

module.exports = {
    ci: {
      collect: {
        url: ['http://localhost:5173'], // URL of your local Vite project (update if different)
        startServerCommand: 'npm run dev', // Command to start your Vite server
        numberOfRuns: 1, // Number of runs to perform
        settings: {
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], // Categories you want to audit
          chromeFlags: '--headless --no-sandbox', // Run headless Chrome without sandboxing
        },
      },
      assert: {
        preset: 'lighthouse:recommended', // You can use predefined assertions (optional)
        assertions: {
          'performance': ['error', { minScore: 0.9 }],
          'seo': ['error', { minScore: 0.9 }],
          'accessibility': ['error', { minScore: 0.9 }],
          'best-practices': ['error', { minScore: 0.9 }],
        },
      },
      upload: {
        //target: 'lhci', // If using Lighthouse CI server, use 'lhci'
        target: "temporary-public-storage"
      },
    },
  };

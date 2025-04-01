// prepare.js
if (!(process.env.NODE_ENV === 'production' || process.env.CI === 'true')) {
    const { execSync } = require('child_process');
    execSync('npx husky install', { stdio: 'inherit' });
  } else {
    console.log('Skipping husky installation: Production or CI environment detected.');
  }

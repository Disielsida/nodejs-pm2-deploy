const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.example') });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_REPO, DEPLOY_PATH,
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'post-deploy': [
        'cd frontend',
        'npm install',
        'npm run build',
      ].join(' && '),
    },
  },
};

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.deploy') });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_REPO, DEPLOY_PATH, DEPLOY_KEY
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: DEPLOY_KEY,
      'post-deploy': [
        'export NVM_DIR="$HOME/.nvm"',
        '. "$NVM_DIR/nvm.sh"',
        'cd frontend',
        'npm install',
        'npm run build',
      ].join(' && '),
    },
  },
};

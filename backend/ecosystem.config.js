require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_REPO, DEPLOY_PATH,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/backend.env`,
      'post-deploy': [
        'cd backend',
        `cp ${DEPLOY_PATH}/shared/backend.env .env`,
        'npm install',
        'npm run build',
        'pm2 startOrRestart ./ecosystem.config.js --env production',
      ].join(' && '),
    },
  },
};

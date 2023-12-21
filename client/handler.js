const serverless = require('serverless-http');
const next = require('next');

const app = next({ dev: false, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  exports.handler = serverless(async (req, res) => {
    return await handle(req, res);
  });
});

const server = require('../../src/app.js');
const serverless= require("serverless-http")

// Syncing all the models at once.


module.exports.handler = serverless(server, {
  basePath: "/api"
});
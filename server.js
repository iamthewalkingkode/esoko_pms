// npm install nodemon && npm install mongoose &&  npm install morgan &&  npm install body-parser &&  npm install bcrypt &&  npm install jsonwebtoken
const conf = require('./config');

const http = require('http');
const app  = require('./app');

const port = conf.port || 8000;

const server = http.createServer(app);
server.listen(port);
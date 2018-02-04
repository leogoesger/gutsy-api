const http = require('http');
const app = require('../src/app');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const port = 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

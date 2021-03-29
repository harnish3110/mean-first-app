const http = require('http');
const app = require('./backend/app');
const expressApp = require('./backend/app');

const port = process.env.PORT || 3000;

// Setting the port number for the express App
app.set('port', port);

//Passing the Express server code created in the ./backend/app.js file
const server = http.createServer(expressApp);

// Either take the port number from the Environment variable or use port 3000 (Eg localhost:3000)
server.listen(port);

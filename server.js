const http = require('http');

//Create the server with the following request
const server = http.createServer((req, res) => {
  res.end('this is my first server');
 });

 // Either take the port number from the Environment variable or use port 3000 (Eg localhost:3000)
 server.listen(process.env.PORT || 3000);

const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");


// to ensure that the port value from the ENV is usable.
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};


// CHeck which type error (if) occured and exit the server/code gracefully
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// We log that what addresses we are listening to right now.
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");

// Setting the port number for the express App
app.set("port", port);

//Passing the Express server code created in the ./backend/app.js file
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

// Either take the port number from the Environment variable or use port 3000 (Eg localhost:3000)
// Start the server
server.listen(port);

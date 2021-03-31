const express = require('express');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

// May need to update the IP on the server to whitelist the incoming requests
const uri = "mongodb+srv://harnish:rnVSmDNi9hSz2vU@cluster0.xbbo3.mongodb.net/mean-database?retryWrites=true&w=majority";

const app = express();

// Connection to the mongo db atlas server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connection to MongoDB Successful') })
  .catch((err) => { console.error('Something is Wrong with the connection', err) });

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use("/api/posts", postRoutes);


module.exports = app;


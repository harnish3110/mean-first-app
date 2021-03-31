const express = require('express');
const Post = require('./models/post');
const mongoose = require('mongoose');
const { update } = require('./models/post');


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

// Add a new Post to the DB
app.post('/api/post', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then(result => {
      return res.status(201).json({
        message: 'Post added successfully',
        id: result._id
      });
    });
});

// Get all Posts from the database
app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      return res.status(200).json({
        message: 'Success',
        posts: documents
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({
        message: err,
        posts: null
      });
    });
});

/* Delete a single post from the DB with ID sent as a param in the URL.
  Adding :<variable> make the URL dynamic so that the variable containing the data can be extracted*/

app.delete('/api/post/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      return res.status(200).json({
        message: "Deleted the document with the id= " + req.params.id
      });
    });
});

app.put('/api/post', (req, res, next) => {

  /* Can also be sone like this
    const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.body.id.id }, post) */

  const updatedPost = req.body;
  Post.updateOne({ _id: updatedPost.id }, { title: updatedPost.title, content: updatedPost.content })
    .then(data => {
      return res.status(200).json({
        message: 'Updation Successful'
      });
    });
});

app.get('/api/post/:postId', (req, res, next) => {
  Post.findById(req.params.postId)
    .then(document => {
      if (document) {
        res.status(200).json(document);
      }
      else {
        res.status(404).json({
          message: 'No Such Data exits'
        });
      }
    });
});

module.exports = app;


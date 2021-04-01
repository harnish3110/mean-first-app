const express = require('express');
const multer = require('multer');

const router = express.Router();

const Post = require('../models/post');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let err = new Error('Invalid file type');
    if (isValid) err = null;
    cb(err, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext)
  }
});

// Add a new Post to the DB
router.post('', multer(storage).single('image'), (req, res, next) => {
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
router.get('', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      return res.status(200).json({
        message: "Deleted the document with the id= " + req.params.id
      });
    });
});

router.put('', (req, res, next) => {

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

// Get the single post from the DB with id sent as a param
router.get('/:postId', (req, res, next) => {
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

module.exports = router;

const mongoose = require('mongoose');

// Schema for the Mongo collection for Posts
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});
// Name should start with upper case
module.exports = mongoose.model('Post', postSchema);

/* The schema name should be singular and start with upper case.
But the collection of the this documents will be plural all lower case. */

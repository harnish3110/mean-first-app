const express = require('express');
const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/post', (req, res, next) => {
  const post = req.body
  console.log(post);
  return res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'asjdb2ebdk', title: 'First Post from the Server', content: 'This is the content of the first post' },
    { id: 'jkasbdkjas', title: 'Second Post from the Server', content: 'This is the content of the second post!!!' }
  ];

  return res.status(200).json({
    message: 'Success',
    posts: posts
  });
});

module.exports = app;


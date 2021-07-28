const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
const posts = [
  {
    username: 'rincy',
    title: 'post 1 ',
  },
  {
    username: 'rinu',
    title: 'post 2 ',
  },
];
app.get('/posts', authenticateToken, (req, res) => {

  const myPost = posts.filter((x) => x.username == req.user.name);

  res.json(myPost);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //   console.log(token);
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.listen(3000);

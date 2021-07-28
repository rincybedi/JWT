const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());

app.post('/login', (req, res) => {
  //Authenticate user

  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

let refreshTokens = [];

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  console.log(refreshToken);
  if (!!refreshToken) return res.status(401);
  console.log(refreshTokens);
  if (!refreshTokens.includes(refreshToken)) return res.status(403);
  jwt.verify(refreshToken.process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    const accessToken = generateAccessToken({ name: user.name });
    return res.json({ accessToken });
  });
});

function generateAccessToken(user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15s',
  });
  return accessToken;
}

app.listen(4000);

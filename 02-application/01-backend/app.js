const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api_router');
const pageRouter = require('./routes/page_router');

const app = express();
app.use(express.static(__dirname + '/public'));


app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    )
    next();
  });

app.use('/api', apiRouter);

module.exports = app;

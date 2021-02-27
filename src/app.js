require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const winston = require('winston');
const { v4: uuid } = require('uuid');
const { NODE_ENV } = require('./config')
const bookmarksRouter = require('./bookmarks/bookmarks-router')

const app = express()

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})

app.use(bookmarksRouter)



// app.get('/bookmarks', (req, res) => {
//   res.json(bookmarks)
// })

// app.get('/bookmarks/:id', (req, res) => {
//   const { id } = req.params;
//   const bookmark = bookmarks.find(b => b.id == id);

//   // make sure we found a bookmark
//   if (!bookmark) {
//     logger.error(`bookmarks with id ${id} not found.`);
//     return res
//       .status(404)
//       .send('bookmark Not Found');
//   }

//   res.json(bookmark);
// });

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app
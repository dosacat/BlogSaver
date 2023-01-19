const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./controllers/blogsaver.js');
// const config = require('./utils/config');
// const logger = require('./utils/logger');
const middleware = require('./utils/middleware.js');

//middleware
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', router);
app.use(cors());



app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);



module.exports= app;
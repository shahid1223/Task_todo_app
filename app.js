const express = require('express');
const app = express();
const cors = require('cors');
//routes
const TodoRouter = require('./routes/TodoRoute');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController')
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/v1/todo', TodoRouter);
app.all('*', async (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404, 404));
});

app.use(globalErrorHandler)

module.exports = app;
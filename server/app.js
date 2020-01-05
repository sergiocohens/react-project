const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tagsRouter = require('./routes/tags')
const imagesRouter = require('./routes/images')
const imageTagsRouter = require('./routes/imageTags')



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tags', tagsRouter);
app.use('/image', imagesRouter)
app.use('/imageTags', imageTagsRouter)



app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found. Try again.');
});

module.exports = app;

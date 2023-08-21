const express = require('express');
const userRouter = require('./routes/userRoutes')
const tweetRouter = require('./routes/tweetRouter');
const followRouter = require('./routes/followerRouter');
const AppError = require('./utils/AppError')
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '10kb' }));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweet', tweetRouter);
app.use('/api/v1/follow', followRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


module.exports = app;
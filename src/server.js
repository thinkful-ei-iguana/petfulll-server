const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();
app.use(cors());
app.use(express());

app.get('/api', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/dog', dogRouter);
app.use('/api/cat', catRouter);
app.use('/api/people', peopleRouter);

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT,()=>{
  console.log('Serving on 8080');
});

module.exports = app;
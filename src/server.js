const express = require('express');
const cors = require('cors');
const dogRoute = require('./dog-router');
const catRoute = require('./cat-router');
const {CLIENT_ORIGIN} = require('./config')
const app = express();

app.use(cors())

app.use('/api/dog', cors(), dogRoute);
app.use('/api/cat', cors(), catRoute);

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

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
  console.log(`Serving on ${PORT}`);
});
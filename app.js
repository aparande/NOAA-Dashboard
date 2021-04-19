const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();

const fb = require('./fire_api');

app.use(express.static(path.join(__dirname, 'build')));

// TODO: Replace this with Redis or something
let traces = null;

// Middleware to take traces from the cache if applicable, else to load them from the database
const loadTracesMiddleware = async (req, res, next) => {
  if (req.query.start === undefined || req.query.start === null) {
    return res.status(400).send({
      message: "Need to supply a start date"
    });
  }

  if (traces == null || Object.keys(traces).length === 0) {
    console.log(`Attempting to load traces: ${req.query.start}`);
    traces = await fb.get_all_traces(req.query.start, req.query.end, parseInt(req.query.limit || 100));
  }
  
  next();
}

app.get('/api/get_traces', loadTracesMiddleware, (req, res, next) => {
  res.send(traces);
})

app.get('/api/get_tol', async (req, res, next) => {
  if (req.query.start === undefined || req.query.start === null || req.query.end === undefined || req.query.end === null) {
    return res.status(400).send({
      message: "Need to supply dates"
    });
  }

  tol = await fb.get_tol(req.query.start, req.query.end, req.query.buoy_num);
  res.send(tol);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);



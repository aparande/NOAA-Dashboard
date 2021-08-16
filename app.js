const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const { Op, QueryTypes } = require('sequelize');
const Multer = require('multer');
const { uploadMetrics, uploadGPS } = require('./middlewares/google-cloud-storage');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: { fileSize: 1024 * 1024 * 200 } // 200 MB Limit
})

const app = express();

const { sequelize, Buoy, GPSPoint } = require('./database/models');

app.use(express.static(path.join(__dirname, 'dashboard', 'build')));

app.post('/api/upload_metric', multer.single('file'), uploadMetrics, (req, res, next) => {
  if (req.file && req.file.gcsObject) {
    return res.send({ status: "success" });
  }

  return res.status(500).send('Could not upload metric file');
});

app.post('/api/upload_gps', multer.single('file'), uploadGPS, (req, res, next) => {
  if (req.file && req.file.gcsObject) {
    return res.send({ status: "success" });
  }

  return res.status(500).send('Could not upload metric file');
});

app.get('/api/get_tol', async (req, res, next) => {
  const buoy = await Buoy.findByPk(req.query.buoyId);
  if (buoy === null || buoy === undefined) {
    return res.status(400).send({
      message: "Buoy not found"
    });
  }
  if (req.query.start === undefined || req.query.start === null || req.query.end === undefined || req.query.end === null) {
    return res.status(400).send({
      message: "Need to supply dates"
    });
  }
  const queryStr = `
    SELECT xlabel, AVG(value) from datapoints 
    WHERE metric='TOL' AND statistic=:stat AND (timestamp BETWEEN to_timestamp(:start) AND to_timestamp(:end)) AND buoy_id=:id
    GROUP BY xlabel;
  `
  const tol = await sequelize.query(queryStr, {
    replacements: { start: req.query.start, end: req.query.end, id: req.query.buoyId, stat: req.query.statistic },
    logging: console.log, 
    type: QueryTypes.SELECT,
    raw: true 
  });

  res.send(tol);
});

app.get('/api/get_bb', async (req, res) => {
  if (req.query.start === undefined || req.query.start === null || req.query.end === undefined || req.query.end === null) {
    return res.status(400).send({
      message: "Need to supply a date range"
    });
  }

  const buoy = await Buoy.findByPk(req.query.buoyId);
  if (buoy === null || buoy === undefined) {
    return res.status(400).send({
      message: "Buoy not found"
    });
  }

  const queryStr = `
    SELECT (extract(epoch from timestamp) / :agg)::INT * :agg as timestamp, AVG(value) from datapoints 
    WHERE metric='BB' AND statistic='median' AND (timestamp BETWEEN to_timestamp(:start) AND to_timestamp(:end)) AND buoy_id=:id
    GROUP BY (extract(epoch from timestamp) / :agg)::INT * :agg;
  `
  const bb = await sequelize.query(queryStr, {
    replacements: { start: req.query.start, end: req.query.end, id: req.query.buoyId, agg: req.query.agg },
    logging: console.log, 
    type: QueryTypes.SELECT,
    raw: true 
  });

  res.send(bb);
});

app.get('/api/visible_buoys', async (req, res) => {
  const buoys = await Buoy.findAll({ raw: true, attributes: ["id", "name"] });
  res.send(buoys);
});

app.get('/api/buoy_trace', async (req, res) => {
  const trace = await GPSPoint.findAll({ 
		raw: true, 
		attributes: ["latitude", "longitude", "timestamp"], 
		where: { buoy_id: req.query.buoyId }
	});

  if (trace === null || trace === undefined) {
    return res.status(400).send({
      message: "Buoy not found"
    });
  }
	res.send({ "trace": trace });
});

app.get('/api/get_time_bounds', async (req, res) => {
	const maxTime = await GPSPoint.max("timestamp");
	const minTime = await GPSPoint.min("timestamp");

	res.send({ "max": Date.parse(maxTime) / 1000, "min": Date.parse(minTime) / 1000 })
});


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dashboard', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);



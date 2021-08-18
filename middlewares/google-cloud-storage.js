require('dotenv').config();

const { storage } = require('../helpers/google-cloud-storage');

exports.uploadMetrics = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const bucket = storage.bucket(process.env.GCP_METRICS_BUCKET);
  const file = bucket.file(req.file.originalname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.gcsError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.gcsObject = file;
    next()
  })

  stream.end(req.file.buffer);
}

exports.uploadGPS = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const bucket = storage.bucket(process.env.GCP_GPS_BUCKET);
  const file = bucket.file(req.file.originalname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.gcsError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.gcsObject = file;
    next()
  })

  stream.end(req.file.buffer);
}

require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASS,
    "database": process.env.PG_DB,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialectOptions": {
      "ssl": {
        "ca": process.env.PG_CA,
        "cert": process.env.PG_CERT,
        "key": process.env.PG_KEY,
        "rejectUnauthorized": false // This is technically a security issue
      },
    },
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASS,
    "database": process.env.PG_DB,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialectOptions": {
      "ssl": {
        "ca": process.env.PG_CA,
        "cert": process.env.PG_CERT,
        "key": process.env.PG_KEY,
        "rejectUnauthorized": false // This is technically a security issue
      },
    },
    "dialect": "postgres"
  }
}

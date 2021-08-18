// Created with guidance from https://www.woolha.com/tutorials/node-js-upload-file-to-google-cloud-storage

require('dotenv').config();

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
  }
})

exports.storage = storage;
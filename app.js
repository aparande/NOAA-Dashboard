
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "www")));

const server = app.listen(8000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });



const express = require("express");
const app = express();
const api = require("./routes/router");
require('dotenv').config();

app.use("/", api);
console.clear();


app.listen(3000);
console.log("Listening, on the 3000 port");

module.exports = app;
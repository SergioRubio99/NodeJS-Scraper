const express = require("express");
const app = express();
const api = require("./controllers/main_controller");
require('dotenv').config();

app.get("/", api);
app.get("/:num", api);

app.listen(3000), console.log("Listening, on the 3000 port");

module.exports = app;
 

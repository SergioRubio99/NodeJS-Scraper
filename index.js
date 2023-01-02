const express = require("express");
const puppeteer = require('puppeteer');
const app = express();
const api = require("./routes/api");


require('dotenv').config();

app.listen(process.env.PORT);

app.use("/1", api);
app.use("/", api);

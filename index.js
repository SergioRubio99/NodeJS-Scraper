const express = require("express");
const puppeteer = require('puppeteer');
const app = express();
const api = require("./routes/api");


require('dotenv').config();

console.log("Now listening for new requests!");

app.listen(process.env.PORT);

 
app.use("/", api);

const express = require("express");
const app = express();
const api = require("./routes/router");
require('dotenv').config();





app.use("/", api);
console.clear();
console.log("Listening, on the 3000 port")


app.listen(process.env.PORT);
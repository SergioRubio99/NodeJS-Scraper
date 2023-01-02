const express = require("express");
const app = express();
const api = require("./routes/api");


require('dotenv').config();

app.listen(process.env.PORT);

app.use("/", api);
app.use("/1", api);

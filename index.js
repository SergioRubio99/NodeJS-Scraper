const express = require("express");
const app = express();
require('dotenv').config();

app.get("/", (req, res) => {
    console.log(process.env.PORT);
    res.send("hello world");
})

app.listen(process.env.PORT);
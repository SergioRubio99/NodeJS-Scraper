const express = require("express");
const router = express.Router();

const nonum = require("../middlewares/nonum");
const num = require("../middlewares/num");

router.get("/", nonum);

router.get("/:num", num);


module.exports = router;
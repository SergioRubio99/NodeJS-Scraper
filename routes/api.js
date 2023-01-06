const express = require("express");
const router = express.Router();

const api = require("../middlewares/api");


router.get("/", api);
router.get("/:num", api);

module.exports = router;
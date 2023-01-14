const express = require("express");
const router = express.Router();

const api = require("../controllers/api");

router.get("/", api);
router.get("/:num", api);

module.exports = router;

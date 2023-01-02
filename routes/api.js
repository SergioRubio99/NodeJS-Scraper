const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log(process.env.PORT);
    res.status(200).json({
        myprofile: "Dummy generated data!"
    })
})

module.exports = router;
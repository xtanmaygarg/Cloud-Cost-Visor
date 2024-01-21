const express = require("express");
const storageRouter = require("./storage");

const router = express.Router();
router.use("/storage", storageRouter);

router.get("/", (req, res) => {
  res.json({ routeName: "/alerts/compute" });
});

module.exports = router;

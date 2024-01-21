const express = require("express");
const {
  getAllAlerts,
  createAlert,
  deleteAlert,
} = require("../handlers/alertHandler");
const router = express.Router();

router.get("/", (req, res) => {
  getAllAlerts(res);
});

router.post("/", (req, res) => {
  createAlert(res, req.body);
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteAlert(res, id);
});

module.exports = router;

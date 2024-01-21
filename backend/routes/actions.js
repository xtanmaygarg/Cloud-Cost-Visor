const express = require("express");
const {
  getActionTemplates,
  getAllActions,
  createAction,
  deleteAction,
} = require("../handlers/actionHandler");
const router = express.Router();

router.get("/", (req, res) => {
  getAllActions(res);
});

router.post("/", (req, res) => {
  createAction(res, req.body);
});

router.delete("/:id", (req, res) => {
  deleteAction(res, req.params.id);
});

router.get("/templates", (req, res) => {
  const resourceType = req.query.resourceType;
  getActionTemplates(res, resourceType);
});

module.exports = router;

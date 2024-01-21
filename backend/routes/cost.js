const express = require("express");
const router = express.Router();
const { executeQuery } = require("../database/databaseHelper");
const { instanceCost, diskCost, snapshotsCost, bucketsCost, computeCost, totalCost, networkingCost, computeListCost } = require("../handlers/costHandler");

// route "/cost/"

router.get("/", (req, res) => {
    totalCost(res, id = "", name = "");
});

router.get("/compute", (req, res) => {
    computeCost(res, id = "", name = "");
});

router.get("/storage", (req, res) => {
    bucketsCost(res, id = "", name = "");
});

router.get("/networking", (req, res) => {
    networkingCost(res, id = "", name = "");
});

router.get("/compute/instances", (req, res) => {
    instanceCost(res, id = "", name = "");
});

router.get("/compute/disks", (req, res) => {
    diskCost(res, id = "", name = "");
});

router.get("/compute/list", (req, res) => {
    computeListCost(res, id = "", name = "");
});

router.get("/compute/snapshots", (req, res) => {
    snapshotsCost(res, id = "", name = "");
});

router.get("/storage/buckets", (req, res) => {
    bucketsCost(res, id = "", name = "");
});

router.get("/compute/instances/:name", (req, res) => {
    instanceName = req.get();
    instanceid = req.params.id();
    let data = instanceCost(instanceName, instanceId);
    res.json(data);
});

router.get("/compute/disks/:id", (req, res) => {
    res.json({ routeName: "/cost/compute/disks/:id" });
});

router.get("/compute/snapshots/:id", (req, res) => {
    res.json({ routeName: "/cost/compute/snapshots/:id" });
});

router.get("/storage/buckets/:id", (req, res) => {
    res.json({ routeName: "/cost/storage/buckets/:id" });
});

module.exports = router;

const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.put("/api/users/:id", userControllers.edit);
router.post("/api/users", userControllers.add);
router.delete("/api/users/:id", userControllers.destroy);

const interventionControllers = require("./controllers/interventionControllers");

router.get("/api/interventions", interventionControllers.browse);
router.get("/api/interventions/:id", interventionControllers.read);
router.put("/api/interventions/:id", interventionControllers.edit);
router.post("/api/interventions", interventionControllers.add);
router.delete("/api/interventions/:id", interventionControllers.destroy);

const operationControllers = require("./controllers/operationControllers");

router.get("/api/operations", operationControllers.browse);
router.get("/api/operations/:id", operationControllers.read);
router.put("/api/operations/:id", operationControllers.edit);
router.post("/api/operations", operationControllers.add);
router.delete("/api/operations/:id", operationControllers.destroy);

module.exports = router;

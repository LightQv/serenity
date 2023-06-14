const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const patientControllers = require("./controllers/patientControllers");

router.get("/api/patients", patientControllers.browse);
router.get("/api/patients/:id", patientControllers.read);
router.put("/api/patients/:id", patientControllers.edit);
router.post("/api/patients", patientControllers.add);
router.delete("/api/patients/:id", patientControllers.destroy);

const interventionControllers = require("./controllers/interventionControllers");

router.get("/api/interventions", interventionControllers.browse);
router.get("/api/interventions/:id", interventionControllers.read);
router.put("/api/interventions/:id", interventionControllers.edit);
router.post("/api/interventions", interventionControllers.add);
router.delete("/api/interventions/:id", interventionControllers.destroy);

module.exports = router;

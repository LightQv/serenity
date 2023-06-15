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

const operationControllers = require("./controllers/operationControllers");

router.get("/api/operations", operationControllers.browse);
router.get("/api/operations/:id", operationControllers.read);
router.put("/api/operations/:id", operationControllers.edit);
router.post("/api/operations", operationControllers.add);
router.delete("/api/operations/:id", operationControllers.destroy);

module.exports = router;

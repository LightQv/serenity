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

const protocolControllers = require("./controllers/protocolControllers");

router.get("/api/protocols", protocolControllers.browse);
router.get("/api/protocols/:id", protocolControllers.read);
router.put("/api/protocols/:id", protocolControllers.edit);
router.post("/api/protocols", protocolControllers.add);
router.delete("/api/protocols/:id", protocolControllers.destroy);

module.exports = router;

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

const practitionerControllers = require("./controllers/practitionerControllers");

router.get("/api/practitioners", practitionerControllers.browse);
router.get("/api/practitioners/:id", practitionerControllers.read);
router.put("/api/practitioners/:id", practitionerControllers.edit);
router.post("/api/practitioners", practitionerControllers.add);
router.delete("/api/practitioners/:id", practitionerControllers.destroy);
module.exports = router;

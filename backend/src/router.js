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
router.put("/api/patients/:id", itemControllers.edit);
router.post("/api/patients", itemControllers.add);
router.delete("/api/patients/:id", itemControllers.destroy);

module.exports = router;

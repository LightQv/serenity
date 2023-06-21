const express = require("express");

const router = express.Router();

const { validateUser } = require("./services/validators");
const { getUserByEmailMiddleware } = require("./controllers/authControllers");
const { hashPassword, verifyPassword } = require("./services/auth");

// Public Routes
router.post("/api/login", getUserByEmailMiddleware, verifyPassword);

// Private Routes
const userControllers = require("./controllers/userControllers");

router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.put("/api/users/:id", userControllers.edit);
router.post("/api/users", validateUser, hashPassword, userControllers.add);

const practitionerControllers = require("./controllers/practitionerControllers");

router.get("/api/practitioners", practitionerControllers.browse);
router.get("/api/practitioners/:id", practitionerControllers.read);
router.put("/api/practitioners/:id", practitionerControllers.edit);
router.post("/api/practitioners", practitionerControllers.add);
router.delete("/api/practitioners/:id", practitionerControllers.delete);

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

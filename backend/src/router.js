const express = require("express");

const router = express.Router();

const { validateUser } = require("./services/validators");
const { validateUserEdit } = require("./services/validators");
const { getUserByEmailMiddleware } = require("./controllers/authControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
  verifyAdmin,
} = require("./services/auth");

// Public Routes (Auth)
router.post("/api/login", getUserByEmailMiddleware, verifyPassword);

// Auth requiered
router.use(verifyToken);
router.get("/api/logout", logout);

// Private Routes

const userControllers = require("./controllers/userControllers");

router.get("/api/users", verifyAdmin, userControllers.browse);
router.get("/api/users/:id", verifyAdmin, userControllers.read);
router.put(
  "/api/users/:id",
  verifyAdmin,
  validateUserEdit,
  userControllers.edit
);
router.post(
  "/api/users",
  verifyAdmin,
  validateUser,
  hashPassword,
  userControllers.add
);
router.delete("/api/users/:id", verifyAdmin, userControllers.destroy);

const practitionerControllers = require("./controllers/practitionerControllers");

router.get("/api/practitioners", practitionerControllers.browse);
router.get("/api/practitioners-list", practitionerControllers.browseList);
router.get("/api/practitioners/:id", practitionerControllers.read);
router.put("/api/practitioners/:id", practitionerControllers.edit);
router.post("/api/practitioners", practitionerControllers.add);
router.delete("/api/practitioners/:id", practitionerControllers.delete);

const interventionControllers = require("./controllers/interventionControllers");

router.get("/api/interventions", interventionControllers.browse);
router.get("/api/interventions-list", interventionControllers.browseList);
router.get("/api/interventions/:id", interventionControllers.read);
router.put("/api/interventions/:id", verifyAdmin, interventionControllers.edit);
router.post("/api/interventions", verifyAdmin, interventionControllers.add);
router.delete(
  "/api/interventions/:id",
  verifyAdmin,
  interventionControllers.destroy
);

const operationControllers = require("./controllers/operationControllers");

router.get("/api/operations", operationControllers.browse);
router.get("/api/operations/:id", operationControllers.read);
router.put("/api/operations/:id", operationControllers.edit);
router.post("/api/operations", operationControllers.add);
router.delete("/api/operations/:id", operationControllers.destroy);

const protocolControllers = require("./controllers/protocolControllers");

router.get("/api/protocols", protocolControllers.browse);
router.get("/api/protocols/:id", protocolControllers.read);
router.put("/api/protocols/:id", protocolControllers.edit);
router.post("/api/protocols", protocolControllers.add);
router.delete("/api/protocols/:id", protocolControllers.destroy);

const itemControllers = require("./controllers/itemControllers");

router.get("/api/items", itemControllers.browse);
router.get("/api/items/:id", itemControllers.readByProtocol);
router.get("/api/items/details/:id", itemControllers.readDetails);
router.put("/api/items/details/:id", itemControllers.edit);
router.post("/api/items", itemControllers.add);
router.delete("/api/items/:id", itemControllers.destroy);

module.exports = router;

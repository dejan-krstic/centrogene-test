const express = require("express");

const PacientController = require("../controllers/pacients");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, PacientController.createPacient);

router.put("/:id", checkAuth, extractFile, PacientController.updatePacient);

router.get("", PacientController.getPacients);

router.get("/:id", PacientController.getPacient);

router.delete("/:id", checkAuth, PacientController.deletePacient);

module.exports = router;

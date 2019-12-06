"use strict"

const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");
const varausController = require("../controllers/varausController");

router.get("/", homeController.showHome);
router.get("/login", homeController.showLogin);
router.get("/reserve", homeController.showReserve);
router.post("/reserve/new", varausController.saveReservation)
router.get("/reservations", varausController.getAllReservations);
router.get("/contacts", homeController.showContacts);
router.get("/rules", homeController.showRules);

module.exports = router;
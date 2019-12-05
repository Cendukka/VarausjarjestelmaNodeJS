"use strict"

const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.showHome);
router.get("/login", homeController.showLogin);
router.get("/reserve", homeController.showReserve);
router.get("/reservations", homeController.showReservations);
router.get("/contacts", homeController.showContacts);
router.get("/rules", homeController.showRules);

module.exports = router;
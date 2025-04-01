const express = require('express');
const router = express.Router();
const registerController = require('../controllers/usersController');

// Crear Usuario
router.post('/register',registerController.createUser)
router.post('/login',registerController.loginUser)

module.exports = router;
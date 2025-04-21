const express = require('express');
const router = express.Router();
const registerController = require('../controllers/usersController');
const allowCors = require('../middleware/allowCors'); // Asegúrate de aplicar CORS

// Crear Usuario
router.post('/register',registerController.createUser);

// Login Usuario
router.post('/login', registerController.loginUser);

module.exports = router;

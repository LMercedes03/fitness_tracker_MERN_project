const express = require('express');
const fitnessController = require('../controllers/fitnessControllers');
const router = express.Router();
const auth = require('../utils/auth');


// Cardio routes

router.post('/cardio', auth.authMiddleware, fitnessController.createCardioExercise);
// router.get('/cardio/:id', auth.authMiddleware, fitnessController.getCardioById);
router.delete('/cardio/:id', auth.authMiddleware, fitnessController.deleteCardioExercise);

// Resistance routes
router.post('/resistance', auth.authMiddleware, fitnessController.createResistanceExercise);
router.get('/resistance/:id', auth.authMiddleware, fitnessController.getResistanceExercisebyId);
router.delete('/resistance/:id', auth.authMiddleware, fitnessController.deleteResistanceExercise);

// User routes
router.get('/users/me', auth.authMiddleware, fitnessController.getSingleUser);
router.post('/users', fitnessController.createUser);
router.post('/users/login', fitnessController.loginUser);


module.exports = router;
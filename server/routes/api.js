const express = require('express');
const fitnessController = require('../controllers/fitnessControllers');
const router = express.Router();
const auth = require('../utils/auth');


// Cardio routes
router.get('/cardio', auth.authMiddleware, fitnessController.getCardioExercises);
router.post('/cardio', auth.authMiddleware, fitnessController.createCardioExercise);
router.put('/cardio/:id', auth.authMiddleware, fitnessController.updateCardioExercise);
router.delete('/cardio/:id', auth.authMiddleware, fitnessController.deleteCardioExercise);

// Resistance routes
router.get('/resistance', auth.authMiddleware, fitnessController.getResistanceExercises);
router.post('/resistance', auth.authMiddleware, fitnessController.createResistanceExercise);
router.put('/resistance/:id', auth.authMiddleware, fitnessController.updateResistanceExercise);
router.delete('/resistance/:id', auth.authMiddleware, fitnessController.deleteResistanceExercise);

// User routes
router.get('/users', fitnessController.getUsers);
router.get('/users/me', auth.authMiddleware, fitnessController.getSingleUser);
router.post('/users', fitnessController.createUser);
router.post('/users/login', fitnessController.loginUser);
router.delete('/users/:id', auth.authMiddleware, fitnessController.deleteUser);

module.exports = router;
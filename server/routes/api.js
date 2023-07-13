const express = require('express');
const fitnessController = require('../controllers/fitnessControllers');
const router = express.Router();

// Exercise routes
router.get('/exercises', 
  fitnessController.getExercises,
  (req, res) => res.status(200).json(res.locals)
)
router.post('/exercises', fitnessController.createExercise);
router.put('/exercises/:id', fitnessController.updateExercise);
router.delete('/exercises/:id', fitnessController.deleteExercise);

module.exports = router;
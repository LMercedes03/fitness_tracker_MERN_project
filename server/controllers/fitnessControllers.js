const models = require('../models/trackerModels');
const Cardio = models.Cardio;
const Resistance = models.Resistance;
const Exercise = models.Exercise;


const fitnessController = {};


// Controller for handling exercise-related operations

fitnessController.getExercises = async (req, res, next) => {
  
  Person.find({}).exec()
    .then((exercises) => {
      console.log(exercises);
      res.locals = exercisess;
      next(); 
    })
    .catch((err) => {
      next(err); 
    });
};

fitnessController.createExercise = async (req, res) => {
  try {
    const { name, type, duration, distance } = req.body;
    const exercise = new Exercise({ name, type, duration, distance });
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create exercise' }); 
  }
};

fitnessController.updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, duration, distance } = req.body;
    const exercise = await Exercise.findByIdAndUpdate(
      id,
      { name, type, duration, distance },
      { new: true }
    );
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update exercise' });
  }
};

fitnessController.deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    await Exercise.findByIdAndDelete(id);
    res.json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete exercise' });
  }
};

module.exports = fitnessController;
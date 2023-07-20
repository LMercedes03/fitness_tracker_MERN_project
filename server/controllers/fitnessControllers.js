const models = require('../models/trackerModels');
const { signToken }  = require('../utils/auth');
const Cardio = models.Cardio;
const Resistance = models.Resistance;
const User = models.User;

const fitnessController = {};

// CARDIO EXERCISES

// Create a new cardio exercise
fitnessController.createCardioExercise = async (req, res) => {
  try {
    const { name, distance, duration, date } = req.body;
    const userId = req.user._id; // Access the user ID from the authenticated user

    // Create a new cardio input
    const cardio = await Cardio.create({
      name,
      distance,
      duration,
      date,
      userId,
    });

    // Add the cardio exercise to the user's cardio array
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { cardio: cardio._id } },
      { new: true }
    );

    // Check if the user exists and the update was successful
    if (!updatedUser) {
      return res.status(404).json({ message: 'Cardio created but no user with this id!' });
    }

    // Return the success message and the created cardio exercise data
    res.status(201).json({ message: 'Cardio successfully created!', cardio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create cardio exercise' });
  }
};

// Get cardio exercise data by ID
fitnessController.getCardioExerciseById = async (req, res) => {
  try {
    const { id } = req.params;

    const dbCardioData = await Cardio.findOne({ _id: id });

    if (!dbCardioData) {
      return res.status(404).json({ message: 'No cardio data found with this ID!' });
    }

    res.json(dbCardioData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Delete a cardio exercise
fitnessController.deleteCardioExercise = async (req, res) => {
  try {
    const { id } = req.params;
    await Cardio.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cardio exercise deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete cardio exercise' });
  }
};


// RESISTANCE EXERCISES

// Create a new resistance exercise
fitnessController.createResistanceExercise = async (req, res) => {
  try {
    const { name, weight, sets, reps, date } = req.body;
    const userId = req.user._id; // Access the user ID from the authenticated user

    // Create a new resistance exercise
    const resistance = await Resistance.create({
      name,
      weight,
      sets,
      reps,
      date,
      userId,
    });

    // Add the resistance exercise to the user's resistance array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { resistance: resistance._id } },
      { new: true }
    ).populate('resistance', 'name weight sets reps date'); // Populate the resistance array in the updated user data

    // Check if the user exists and the update was successful
    if (!updatedUser) {
      return res.status(404).json({ message: 'Resistance created but no user with this id!' });
    }

    // Return the success message and the created resistance exercise data
    res.status(201).json({ message: 'Resistance successfully created!', resistance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create resistance exercise' });
  }
};


// Get resistance exercise by Id
fitnessController.getResistanceExerciseById = async (req, res) => {
  try {
    const { id } = req.params;

    const dbResistanceData = await Resistance.findOne({ _id: id });

    if (!dbResistanceData) {
      return res.status(404).json({ message: 'No resistance data found with this ID!' });
    }

    res.json(dbResistanceData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Delete a resistance exercise
fitnessController.deleteResistanceExercise = async (req, res) => {
  try {
    const { id } = req.params;
    await Resistance.findByIdAndDelete(id);
    res.status(200).json({ message: 'Resistance exercise deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete resistance exercise' });
  }
};


// USERS

// Get a single user by ID
fitnessController.getSingleUser = async ({ user = null, params }, res) => {
  try {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    })
      .select('-__v')
      .populate('cardio')
      .populate('resistance')

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

// Create a new user
fitnessController.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    // Create a new user
    const user = new User({
      username,
      email,
      password, 
    });
    
    // Save the user to the database
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};



// Login a user
fitnessController.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Can\'t find this user' });
    }
    
    const correctPw = await user.isCorrectPassword(password);
    
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    
    const token = signToken(user);
    res.json({ token, user });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};


module.exports = fitnessController;
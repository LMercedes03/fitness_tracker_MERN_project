const models = require('../models/trackerModels');
const { signToken }  = require('../utils/auth');
const Cardio = models.Cardio;
const Resistance = models.Resistance;
const User = models.User;

const fitnessController = {};

// CARDIO EXERCISES

// Get all cardio exercises
fitnessController.getCardioExercises = async (req, res) => {
  try {
    const cardioExercises = await Cardio.find();
    res.status(200).json(cardioExercises);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get cardio exercises' });
  }
};

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

    res.status(201).json(cardio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create cardio input' });
  }
};

// Update a cardio exercise
fitnessController.updateCardioExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, distance } = req.body;
    const updatedExercise = await Cardio.findByIdAndUpdate(
      id,
      { name, duration, distance },
      { new: true }
    );
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update cardio exercise' });
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

    res.status(201).json(resistance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create resistance exercise' });
  }
};

// Get all resistance exercises
fitnessController.getResistanceExercises = async (req, res) => {
  try {
    const resistanceExercises = await Resistance.find();
    res.status(200).json(resistanceExercises);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get resistance exercises' });
  }
};

// Update a resistance exercise
fitnessController.updateResistanceExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sets, reps } = req.body;
    const updatedExercise = await Resistance.findByIdAndUpdate(
      id,
      { name, sets, reps },
      { new: true }
    );
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update resistance exercise' });
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

// Get all users
fitnessController.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get users' });
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
      password, // Note: You should hash the password before saving it
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

// Get a single user by ID
fitnessController.getSingleUser = async ({ user = null, params }, res) => {
  try {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    })
      .select('-__v')
      .populate('cardio')
      .populate('resistance');

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
;

// Delete a user
fitnessController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
      
    // Check if the user exists in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'User deleted successfully' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};


// Update a user
// fitnessController.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { username },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to update user' });
//   }
// };

module.exports = fitnessController;
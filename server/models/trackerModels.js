const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const cardioSchema = new Schema({
  type: {
    type: String,
    default: 'cardio',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 30
  },
  distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const resistanceSchema = new Schema({
  type: {
    type: String,
    default: 'resistance',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  weight: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['cardio', 'resistance'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: 'Username is Required',
    },
    password: {
      type: String,
      trim: true,
      required: 'Password is Required',
      minlength: 6,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/],
    },
    cardio: [{
      type: Schema.Types.ObjectId,
      ref: 'cardio'
    }],
    resistance: [{
      type: Schema.Types.ObjectId,
      ref: 'resistance'
    }]
  });

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// // For example, to populate cardio array:
// userSchema.pre('findOne', function (next) {
//   this.populate('cardio');
//   next();
// });

// // Similarly, to populate resistance array:
// userSchema.pre('findOne', function (next) {
//   this.populate('resistance');
//   next();
// });

const User = mongoose.model('user', userSchema);
const Cardio = mongoose.model('cardio', cardioSchema);
const Resistance = mongoose.model('resistance', resistanceSchema);
const Exercise = mongoose.model('exercise', exerciseSchema);


module.exports = {
  User,
  Cardio,
  Resistance,
  Exercise,
};

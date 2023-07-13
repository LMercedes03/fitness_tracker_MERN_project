const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const cardioSchema = new Schema({
  type: {
    type: String,
    default: 'cardio',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
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
    ref: 'User',
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
    ref: 'User',
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

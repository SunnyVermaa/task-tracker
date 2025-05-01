const mongoose = require('mongoose')
const userModel = require('../models/userModel')


const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type : String},
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: 'Not Started',
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
    createdAt: { type: Date, default: Date.now }
  });

  const projectModel = mongoose.model('project', projectSchema);
  module.exports = projectModel;
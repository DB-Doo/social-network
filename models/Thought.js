const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for individual reactions within a thought
const reactionSchema = new Schema({
  reactionId: {
    // Define a reactionId field with a default value of a new ObjectId
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  // Define a reactionBody field with type String, make it required, and set a maximum length
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  // Define a username field with type String and make it required
  username: {
    type: String,
    required: true,
  },
  // Define a createdAt field with type Date, a default value of the current date, and a getter method to format the date
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => createdAtVal.toISOString(),
  },
});

// Define the schema for the Thought model
const thoughtSchema = new Schema({
  // Define a thoughtText field with type String, make it required, and set minimum and maximum lengths
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  // Define a createdAt field similar to the one in reactionSchema
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => createdAtVal.toISOString(),
  },
  // Define a username field with type String and make it required
  username: {
    type: String,
    required: true,
  },
  // Include the reactionSchema as an array to allow multiple reactions per thought
  reactions: [reactionSchema],
});

// Create a virtual property 'reactionCount' that returns the number of reactions by counting the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Compile the thoughtSchema into a model named 'Thought' and assign it to the Thought variable
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
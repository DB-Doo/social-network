const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the User model
const userSchema = new Schema({
  // Define a username field with type String, make it unique, required, and trim whitespace
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  // Define an email field with type String, make it unique, required, and validate with a regex pattern
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  // Define a thoughts field as an array of ObjectId references to the Thought model
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought',
  }],
  // Define a friends field as an array of ObjectId references to the User model itself (for friend relationships)
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

// Create a virtual property 'friendCount' that returns the number of friends by counting the length of the friends array
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});
// Compile the userSchema into a model named 'User' and assign it to the User variable
const User = mongoose.model('User', userSchema);

module.exports = User;
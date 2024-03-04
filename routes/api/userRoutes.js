const router = require('express').Router();
const Thought = require("../../models/Thought");
const User = require("../../models/User");

// GET all users
router.get('/', async (req, res) => {
  try {
    // Fetch all users from the database and populate their 'thoughts' and 'friends' fields
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);  // Send the users data as a JSON response
  } catch (err) {
    res.status(500).json(err); // Send a server error response if an error occurs
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    // Find a single user by their _id and populate their 'thoughts' and 'friends' fields
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user with the data provided in the request body
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by its _id
router.put('/:id', async (req, res) => {
  try {
    // Update a user by their _id with the data provided in the request body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    if (!userToDelete) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    // BONUS: Remove a user's associated thoughts when deleted.
    await Thought.deleteMany({ _id: { $in: userToDelete.thoughts } });
    res.json({ message: 'User and their thoughts deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      // Use $addToSet to avoid duplicate entries
      { $addToSet: { friends: req.params.friendId } }, 
      // runValidators: true forces Mongoose to run schema validation for the update operation, ensuring that any updates adhere to the schema's rules.
      // new: true: Return the document after the update has been applied
      { new: true, runValidators: true } 
    );
    if (!user) {
      res.status(404).json({ message: 'No user found with this userId!' });
      return;
    }
    res.json({ message: 'Friend added successfully!', user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    // Remove a friend from a user's friend list using $pull
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user found with this userId!' });
      return;
    }
    res.json({ message: 'Friend removed successfully!', user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
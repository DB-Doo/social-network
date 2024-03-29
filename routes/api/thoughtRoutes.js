const router = require('express').Router();
const Thought = require("../../models/Thought");
const User = require("../../models/User");

// GET to get all thoughts
router.get('/', async (req, res) => {
  try {
    // Fetch all thoughts from the database
    const thoughts = await Thought.find();
    // Send the fetched thoughts as a JSON response
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET to get a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    // Create a new thought with the data provided in the request body
    const newThought = await Thought.create(req.body);
    // Update the user's thoughts array to include the new thought's _id
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    // Update a thought by its _id with the data provided in the request body
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const thoughtToDelete = await Thought.findByIdAndDelete(req.params.id);
    if (!thoughtToDelete) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    // Also remove the thought from the user's thoughts array
    await User.findByIdAndUpdate(thoughtToDelete.userId, { $pull: { thoughts: req.params.id } }, { new: true });
    res.json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    // Add a reaction to a thought's reactions array
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought found with this id or reaction not found!' });
      return;
    }
    // Send the updated thought, with the reaction removed, as a JSON response
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
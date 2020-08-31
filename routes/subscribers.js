const express = require('express');
const router = express.Router(); // we want the router portion of express
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');

// getting All
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Creating One
router.post('/', async (req, res) => {
  // Instantiate a subscriber Object from the Model Scema & insert data
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });

  // save it to database
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  // check to see If they are NOT IN THE DB - if not, set them to the DB
  if (req.body.name !== null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel !== null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }

  // If they ARE IN THE DB, update the entry
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: 'Deleted Subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to check if subscriber exists
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: 'cannot find subscriber' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;

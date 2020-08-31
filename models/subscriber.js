const mongoose = require('mongoose');

// Defines how our data should interact with database
const subscriberSchema = new mongoose.Schema({
  // Want to define the different properties of our schema keys
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// (modelNameInTheDB, schemaCorrespondingToSaidModel)
// 'model' - use here coz when exported&imported elsewhere, this model allows us to interact with the DB using this schema.
module.exports = mongoose.model('Subscriber', subscriberSchema);

// this is imported into the subscribers.js Router file

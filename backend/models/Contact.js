const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);

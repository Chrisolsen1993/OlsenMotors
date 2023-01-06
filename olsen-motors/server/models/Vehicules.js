const mongoose = require("mongoose");

const { Schema } = mongoose;

const vehiculesSchema = new Schema({
  make: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Photo: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  commentId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Vehicules = mongoose.model("Vehicules", vehiculesSchema);

module.exports = Vehicules;

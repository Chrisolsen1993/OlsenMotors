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
  vin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  price: {
    type: String,
    required: true,
    min: 0.99,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  conditionId: {
    type: Schema.Types.ObjectId,
    ref: "Conditions",
    required: true,
  },
  commentId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Vehicules = mongoose.model("Vehicules", vehiculesSchema);

module.exports = Vehicules;

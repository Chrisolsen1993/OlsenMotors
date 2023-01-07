const mongoose = require("mongoose");

const { Schema } = mongoose;

const conditionsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Conditions = mongoose.model("Conditions", categorySchema);

module.exports = Conditions;

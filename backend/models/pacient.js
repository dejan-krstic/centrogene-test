const mongoose = require("mongoose");

const pacientSchema = mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: String, required: true },
  address: { type: String, required: true },
  condition: { type: String || undefined },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Pacient", pacientSchema);

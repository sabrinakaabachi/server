const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model("Produit", ProductSchema);

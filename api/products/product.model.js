const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: Number,
  description: {
    type: String,
    required: true,
  },
  additions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addition",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: function(){return this.discount ? this.price - (this.price * this.discount) / 100 : this.price},
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  hasCard: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

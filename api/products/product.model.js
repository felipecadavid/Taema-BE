const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: Number,
    description: {
        type: String,
        required: true
    },
    additions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addition'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    use: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        default: 0, // Set the default value to 0
    },
    pharmacistId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);

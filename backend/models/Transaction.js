const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        amount: {
            type: Number,
            required: [true, 'Please add a positive number'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        date: {
            type: Date,
            default: Date.now
        },
        notes: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
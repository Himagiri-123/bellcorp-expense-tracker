const express = require('express');
const router = express.Router();
const {
    getTransactions,
    getSummary,
    setTransaction,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transactionController');

const { protect } = require('../middleware/authMiddleware');

// Specific routes first
router.get('/summary', protect, getSummary);

// General routes
router.route('/').get(protect, getTransactions).post(protect, setTransaction);
router.route('/:id').put(protect, updateTransaction).delete(protect, deleteTransaction);

module.exports = router;
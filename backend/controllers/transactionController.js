const Transaction = require('../models/Transaction');

// Get transactions
const getTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const { search, category, startDate, endDate, minAmount, maxAmount } = req.query;

        let query = { user: req.user.id };

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        if (startDate && endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            query.date = {
                $gte: new Date(startDate),
                $lte: end
            };
        }

        if (minAmount || maxAmount) {
            query.amount = {};
            if (minAmount) query.amount.$gte = Number(minAmount);
            if (maxAmount) query.amount.$lte = Number(maxAmount);
        }

        const total = await Transaction.countDocuments(query);

        // --- SORTING FIX: Latest Date + Latest Added (createdAt) ---
        const transactions = await Transaction.find(query)
            .sort({ date: -1, createdAt: -1 }) 
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            transactions,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalRecords: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Summary
const getSummary = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });

        const totalExpenses = transactions.reduce((acc, item) => acc + item.amount, 0);

        const categoryMap = transactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

        const chartData = Object.keys(categoryMap).map(key => ({
            name: key,
            value: categoryMap[key]
        }));

        res.status(200).json({ totalExpenses, chartData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Transaction
const setTransaction = async (req, res) => {
    try {
        const { title, amount, category, notes, date } = req.body;

        if (!title || !amount || !category) {
            res.status(400);
            throw new Error('Please add title, amount and category');
        }

        const transaction = await Transaction.create({
            title,
            amount,
            category,
            notes,
            date: date || Date.now(),
            user: req.user.id,
        });

        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Transaction
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            res.status(400);
            throw new Error('Transaction not found');
        }

        if (transaction.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            res.status(400);
            throw new Error('Transaction not found');
        }

        if (transaction.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await transaction.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTransactions,
    getSummary,
    setTransaction,
    updateTransaction,
    deleteTransaction,
};
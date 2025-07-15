const Produce = require('../models/Produce');

// Get all produce (optionally filter by type, intent, status, user)
exports.getProduce = async (req, res) => {
    try {
        const { type, intent, status, user } = req.query;
        const filter = {};
        if (type) filter.type = type;
        if (intent) filter.intent = intent;
        if (status) filter.status = status;
        if (user) filter.user = user;

        const produce = await Produce.find(filter).populate('user', 'name phone role');
        res.json(produce);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new produce
exports.createProduce = async (req, res) => {
    try {
        const produce = await Produce.create(req.body);
        res.status(201).json(produce);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get single produce by ID
exports.getProduceById = async (req, res) => {
    try {
        const produce = await Produce.findById(req.params.id).populate('user', 'name phone role');
        if (!produce) return res.status(404).json({ message: 'Produce not found' });
        res.json(produce);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update produce by ID
exports.updateProduce = async (req, res) => {
    try {
        const produce = await Produce.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produce) return res.status(404).json({ message: 'Produce not found' });
        res.json(produce);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete produce by ID
exports.deleteProduce = async (req, res) => {
    try {
        const produce = await Produce.findByIdAndDelete(req.params.id);
        if (!produce) return res.status(404).json({ message: 'Produce not found' });
        res.json({ message: 'Produce deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
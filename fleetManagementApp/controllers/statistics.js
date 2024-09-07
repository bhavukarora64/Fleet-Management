// controllers/statistics.js
exports.getAllStatistics = async (req, res) => {
    try {
        const statistics = await statistics.find();
        res.json(statistics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

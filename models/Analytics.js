const mongoose = require('mongoose');

const Analytics = new mongoose.Schema({
    name: {type: String, unique: true},
    calls: [
        {type: Date}
    ],
    totalCalls: {type: Number},
});

module.exports = mongoose.model('Analytics', Analytics);
const mongoose = require('mongoose');

const Conversion = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
		}, 
	{timestamps: true
});

module.exports = mongoose.model('Conversion', Conversion);

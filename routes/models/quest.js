const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const questSchema = mongoose.Schema({
	id: String,
	adventure_id: String,
	name: String,
	clue: String,
	answer: Array,
	area: String
});

module.exports = mongoose.model('Quest', questSchema);
const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');

const adventureSchema = mongoose.Schema({
  	id: String,
    name: String,
    total_quests: String,
    start_time: String,
    end_time: String
});

//courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Adventure', adventureSchema);
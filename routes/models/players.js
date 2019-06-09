const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');

const playerSchema = mongoose.Schema({
  	id: String,
    name: String,
    email: String,
    password: String
});

//courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Player', playerSchema);
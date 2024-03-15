const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
});

//Enable text Search on certain field
propertySchema.index({title: 'text', description: 'text'});

module.exports = mongoose.model('Property', propertySchema);


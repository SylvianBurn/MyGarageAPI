const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        required: true,
        type: String
    },
    model: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Car', carSchema)
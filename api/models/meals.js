const mongoose = require('mongoose');

const mealsScehma = mongoose.Schema({

    meal:{ type: String , required: true },
    calories: {type: String , required: true},
    userId: {type: String , required: true},
    username: {type: String , required: true},
    emailId: {type: String, required: true},
    date: {type: Date, required: true , default: Date.now } 
})

module.exports = mongoose.model('meals',mealsScehma);
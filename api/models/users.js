const mongoose = require('mongoose');

const userScehma = mongoose.Schema({
   email:{ 
       type: String, 
       required: true, 
       unique: true, 
       match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username:{ type: String , required: true },
    password: {type: String , required: true},
    expected_calories: {type: String , required: true},
    is_admin:{type: Boolean, required: true}

})

module.exports = mongoose.model('user',userScehma);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fbID :{
        type : Number
    },
    
    name :{
        type : String
    },

    email :{
        type: String
    }

});

const User = mongoose.model('user',userSchema);
module.exports = User;
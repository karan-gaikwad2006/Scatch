const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart:{
        type:Array,
        default:[],
    },
    isadmin:Boolean,
    orders:{
        type:Array,
        default:[],
    },
    contact:Number,
    picture:String
})

module.exports = mongoose.model('User', userSchema);
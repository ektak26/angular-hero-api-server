const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
    name: {type:String,required: [true,'Name is required']},
    canFly: Boolean,
    gender:String,
    location:Number,
    photo:String,
    ip:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Hero', HeroSchema);
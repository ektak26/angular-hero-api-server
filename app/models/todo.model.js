const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: {type:String,required: [true,'Name is required']},
    isCompleted: {type:Boolean,default:false},
    ip:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);
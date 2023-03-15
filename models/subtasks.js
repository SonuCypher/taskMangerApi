const mongoose = require('mongoose')

const subtasksSchema = new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    periodType:{
        type:String,
        required:true
    },
    period:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    taskListName:{
        type:String,
        required:true
    },
})


module.exports = mongoose.model('SubTasks',subtasksSchema)
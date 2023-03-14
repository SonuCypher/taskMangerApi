const mongoose = require('mongoose')
const taskListSchema= new mongoose.Schema({
    listname:{
        type:String,
        required:[true,'listname cannot be blank']
    },
    description:{
        type:String,
        required:[true,'description should not be blank']
    },
    active:{
        type:String,
        required:[true,'active should be selected']
    }
})
module.exports = mongoose.model('TaskList',taskListSchema)
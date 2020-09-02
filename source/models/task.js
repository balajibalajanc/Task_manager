//Model for task
const mongoose=require('mongoose');
const Task= mongoose.model('Task',{
    Desc:{
        type:String,
        trim:true,
        required:true
    },
    completed_status:{
        type:Boolean,
        default:false
    }
})

module.exports=Task;

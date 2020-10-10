//Model for task
const mongoose=require('mongoose');
const bcrypt= require('bcrypt');

const taskSchema= mongoose.Schema({
    Desc:{
        type:String,
        trim:true,
        required:true
    },
    completed_status:{
        type:Boolean,
        default:false
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

taskSchema.pre('save',async function(next){
    const task=this

    next()
})


const Task= mongoose.model('Task',taskSchema);



module.exports=Task;

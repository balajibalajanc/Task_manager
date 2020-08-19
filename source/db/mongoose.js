const mongoose=require('mongoose');
const validator= require('validator');
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
useNewUrlParser:true,   
useUnifiedTopology: true,
    useCreateIndex: true
}).then((result)=>
{console.log("Database connected Successfully");}).catch((reject)=>{
    console.log(reject);
})

//Model for Users
// const User= mongoose.model('User',{
//     name: {
//         type:String,
//         required: true,
//         trim:true

//     },
//     email:{
//         type:String,
//         required: true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Not a valid Email");
//             }
//         }

//     },

//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//             if(value.toLoweCcase.includes("password"))
//             {
//                 throw new error("Am i joke to you give a proper password");   
//                }
//         }
//     },
//     Age :{
//         type: String,
//         default:0,
//         validate(value){
//             if(value < 0)
//             {
//                 throw new Error("Age is not valid");
//             }
//         }
//     }
// })

//Model for task
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

// const me = new User({
//     name:"ranjit",
//     email:'ranjit@gmail.com',
//     Age:22,
//     password:'     re32    '
// })

const task_call= new Task({
    Desc:"Check Emails"
  //  completed_status: false
})

task_call.save().then((result)=>{
console.log(result)
}
).catch((error)=>
{
    console.log(Error,error)
})

// me.save().then((result)=>{
// console.log(result)
// }
// ).catch((error)=>
// {
//     console.log(Error,error)
// })
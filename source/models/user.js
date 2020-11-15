const mongoose=require('mongoose');
const validator= require('validator');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const Task= require('../models/task')

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
// useNewUrlParser:true,   
// useUnifiedTopology: true,
//     useCreateIndex: true
// }).then((result)=>
// {console.log("Database connected Successfully");}).catch((reject)=>{
//     console.log(reject);
// })
const Userschema= new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim:true

    },
    email:{
        unique:true,
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid Email");
            }
        }

    },

    password:{
        type:String,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes("password"))
            {
                throw new error("Am i joke to you give a proper password");   
               }
        }
    },
    Age:{
        type: String,
        default:0,
        validate(value){
            if(value < 0)
            {
                throw new Error("Age is not valid");
            }
        }
    },
    tokens: [{
        token: {
            required:true,
            type: String
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

Userschema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'

})

Userschema.methods.toJSON= function()
{
    const user=this
    const userObject= user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

Userschema.methods.generateAuthToken =async function (){
    const user=this;
    const token=jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET )
    user.tokens=user.tokens.concat({token});
    await user.save()
    return token

} 

Userschema.statics.findByCredentials = async (email,password)=>{
    const user= await User.findOne({email});
    if(!user)
    {
        throw new Error ('Unable to login ...mail is not there')
    }
    const isMatching= await bcrypt.compare(password,user.password);

    if(!isMatching)
    {
        throw new Error ('Unable to login ...password is not matching')
    }

    return user

}

Userschema.pre('save',async function(next){
    const user=this
if(user.isModified('password'))
{
    user.password=await bcrypt.hash(user.password,8);
}
    next()
})

Userschema.pre('remove', async function(next){
const user=this
await Task.deleteMany({owner:user._id});
next();
})

//Model for Users
const User= mongoose.model('User',Userschema)

module.exports=User;
const express=require('express');
require('./db/mongoose');
const { response, request } = require('express');
const userRouter=require('./routers/user_router');
const taskRouter=require('./routers/task_router');

const app=express()
const port=process.env.PORT

// app.use((req,res,next)=>{
//     console.log("Application is under maintenace " + req.method + req.path);
//     res.status(504).send("Application is under maintenace");

// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);




app.get("/",(request,response)=>{
    response.send(' Main Page status: Page under Construction')
})

app.get("/user/",(request,response)=>{
    response.send(' Main Page status: Page under Construction')
})

// const multer=require('multer');
// const upload =multer({
//     dest:'Documents',
//     limits: {
//         fileSize:100000000
//     },
//     fileFilter(request,file,cb){
//         if(!file.originalname.match(/\.(doc$|docx$)/))
//     {
//         return cb(new Error("Please provide a Document file"))
//     }
//      cb (undefined,true);
// }

// })
// app.post('/upload',upload.single('upload'),(req,res) => {
//     res.status(200).send("Document saved successfully");
// },(error,req,res,next)=> {
//     res.send(error.message)
// })


app.listen(port,()=>{
console.log('sever is up and running in '+ port );
})  


// const Task=require('../source/models/task')
// const User=require('./models/user');

// const main= async () =>{
//     const task= await Task.findById('5f5f9f499bb2f630385123ad');
//     await task.populate('owner').execPopulate();
//     console.log(task.owner);
// }

// const main= async () =>{
// const user=await User.findById('5f5f9f079bb2f630385123ab');
// await user.populate('tasks').execPopulate();
// console.log(user.tasks)
// }

// main();

// const bcrypt=require('bcrypt');
// const jsonwebtoken=require('jsonwebtoken')
//  const myfunction= async ()=> {
// const token = jsonwebtoken.sign({_id:'abc123'},'thisismynewtry',  {expiresIn: '2 second'})

// console.log(token);

// const test=jsonwebtoken.verify(token,'thisismynewtry')
// console.log(test);

//     const passw='cseCSE@123'
//     const hashpassw= await bcrypt.hash(passw,8);
    
//     console.log(passw);
//     console.log(hashpassw);

//     const isMatch= await bcrypt.compare(passw,hashpassw);
//     console.log(isMatch);

//  }

//  myfunction();
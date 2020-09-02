const express=require('express');
require('./db/mongoose');
const Task=require('./models/task')
const User=require('./models/user');
const { response, request } = require('express');

const app=express()
const port=process.env.PORT || 3000

app.use(express.json());

app.get("/",(request,response)=>{
    response.send('Page under Construction')
})

app.get('/task-status', async (request,response)=>{
    
    try{
    const task= await Task.find({})
    response.send(task);
    }catch(e){
        response.send(error).status(400)
    }   
//     Task.find({}).then((task)=>{
// response.send(task)
//     }).catch((error)=>{
// response.send(error)
   // })
})


app.get('/task-status/:id', async(request,response)=>{
    const _id=request.params.id;

    try{
      const task= await Task.findById(_id)
      if (!task)
      {
          return response.status(404).send("There is no such task bro")
      }
      response.send(task).status(200);

    }catch(e){response.status(500).send(error);}
//     Task.findById(_id).then((task)=>{
//    if(!task){
//        return response.status(404).send('There is no Task for the specific ID');

//    }
//    response.send(task);

//     }).catch((error)=>{

//     })
})


app.post("/task-status", async (request,response)=>{
    const task=new Task(request.body);

    try{
        await task.save()
         response.send(task).status(200)           
    }catch(e){
        response.status(400).send(e);
    }

//      task.save().then(()=>{
// response.send(task);
//      }).catch((error)=>{
// response.status(400).send(error);   
//      })
})

app.get('/users', async (request,response)=>{
   try{
      // console.log('all user');
  const user= await User.find({})
    response.send(user).status(200)
   }catch(e){
response.statut(400).send(e);
   }
//     User.find({}).then((user)=>{
// response.send(user)
//     }).catch((error)=>{
// response.send(error)
//     })
})



app.get('/users/:id', async(request,response)=>{
   
    const _id=request.params.id;
   
   try{
       const user = await User.findById(_id)
       if (!user)
       {
        return response.status(404).send('There is no user for the specific ID');
       }
       response.send(user);
   }catch(e){
 response.send(e).status(500)
   }
   

//     User.findById(_id).then((user)=>{
//    if(!user){
//        return response.status(400).send('There is no user for the specific ID');

//    }
//    response.send(user);

//     }).catch((error)=>{
// response.status(500).send(error);
//     })
})



app.post('/users', async (request,response)=>{
    const user=new User(request.body);
try {
    await user.save()
    response.status(200).send(user)
}catch(e){
    response.status(400).send(e)
}


//         user.save().then(()=>{
// response.send(user);
//     }).catch((error)=>{
// response.status(400).send(error);
//     })


})


app.listen(port,()=>{
console.log('sever is up and running in '+ port );
})  
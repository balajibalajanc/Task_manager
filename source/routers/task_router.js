const express=require('express');
const Task=require('../models/task');
const auth=require('../middle_ware/auth');
const { update } = require('../models/task');
const router=new express.Router();


//create the new task
router.post("/task-status",auth, async (request,response)=>{
    // const task=new Task(request.body);
 const task=new Task({
     ...request.body,
     owner:request.user._id
 })
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


//return all the  for the completed
router.get('/task-status',auth, async (request,response)=>{
    const match={}
    const sort={}
    if(request.query.completed_status)
    {
        match.completed_status=request.query.completed_status ==='true'
    }

    if (request.query.sortBy)
    {
        const parts=request.query.sortBy.split(':')
        sort[parts[0]]=parts[1] === 'desc' ? -1:1

    }
    try{
    //const task= await Task.find({owner:request.user._id})
    await request.user.populate({
        path:'tasks',
        match,
        options:{
            limit:parseInt(request.query.limit),
            skip:parseInt(request.query.skip),
            sort
        },
        
    }).execPopulate();
   const flas=(request.user.tasks).length;
    if (flas === 0)
    {
        return response.status(404).send("There is no task created yet human")
    }
    response.send(request.user.tasks);
    }catch(e){
        response.send(error).status(400)
    }   
//     Task.find({}).then((task)=>{
// response.send(task)
//     }).catch((error)=>{
// response.send(error)
   // })
})

//get the particular task by id
router.get('/task-status/:id',auth, async(request,response)=>{
    const _id=request.params.id;

    try{
      //const task= await Task.findById(_id)
      const task= await Task.findOne({_id,owner:request.user._id});
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


//update the particaular task
router.patch('/task-status/:id',auth, async (request,response)=>{
const updates=Object.keys(request.body);
const allowUpdate=["Desc","completed_status"];
const isCheck=updates.every((update)=> allowUpdate.includes(update));
if (!isCheck)
{
    return response.status(404).send({
     Error: "It is not a Valid field to Update"
    })
}

    try{
       // const task=await Task.findById(request.params.id);
        const task = await Task.findOne({_id:request.params.id,owner:request.user._id })
       
        //const task = await Task.findByIdAndUpdate(request.params.id,request.body,{new: true,runValidators: true})
        if(!task)
        {
            return response.status(400).send({
                Error:"There is no such Task_description"
            })
        }
        updates.forEach((update)=> task[update]=request.body[update]);

        task.save();

        response.status(200).send(task)
    }catch(e){
        response.status(400).send(e)
    }
})

//delete the particular task
router.delete('/task-status/:id', auth,async (request,response)=>{

    try{
        //const task= await Task.findByIdAndDelete(request.params.id)
        const task=await Task.findOneAndDelete({_id: request.params.id,owner:request.user._id});
        if(!task)
        {
            return response.status(404).send("It is not in the search")
        }
        response.status(200).send({task,Message:"Item delete successfully"})
    }catch(e){
        response.status(400).send(e)
    }
})





module.exports=router
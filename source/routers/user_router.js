const express=require('express');
const User=require('../models/user');
const auth=require('../middle_ware/auth');
const { request, response } = require('express');
const router=new express.Router();
const multer=require('multer');
const sharp= require('sharp');
const { sendWelcomeEmail,sendCancelationEmail } = require('../emails/accounts');

 //find the user of the specific id
//  router.get('/users/:id', async(request,response)=>{
    
//     const _id=request.params.id;
   
//    try{
//        const user = await User.findById(_id)
//        if (!user)
//        {
//         return response.status(404).send('There is no user for the specific ID');
//        }
//        response.send(user);
//    }catch(e){
//  response.send(e).status(500)
//    }
   

//     User.findById(_id).then((user)=>{
//    if(!user){
//        return response.status(400).send('There is no user for the specific ID');

//    }
//    response.send(user);

//     }).catch((error)=>{
// response.status(500).send(error);
//     })
// })


//Create User
 router.post('/users', async (request,response)=>{
    const user=new User(request.body);
try {
    await user.save();
    sendWelcomeEmail(user.email,user.name);
    const token= await user.generateAuthToken();
    response.status(201).send({ user,token });
}catch(e){
    console.log(e);
    response.status(400).send(e)
}


//         user.save().then(()=>{
// response.send(user);
//     }).catch((error)=>{
// response.status(400).send(error);
//     })


})

//login User
router.post('/users/login',async (request,response)=>{
   try{
    const user = await User.findByCredentials(request.body.email,request.body.password);
    const token= await user.generateAuthToken();
    response.send({user,token});
   }
   catch(e){
       console.log(e);
    response.status(400).send(e);
   } 
})


//logout the user
router.post('/users/logout',auth,async (request,response)=>{
    try{

        request.user.tokens=request.user.tokens.filter((token)=>{
           return token.token !== request.token
        })
        await request.user.save();
        response.send();
    }catch(e){
        response.status(500).send(e)
    }
})


//logoutfrom all the user
router.post('/users/logoutall',auth,async (request,response)=>{
    try{
                request.user.tokens= [];
        await request.user.save();
        response.send();
    }catch(e){
        response.status(500).send(e)
    }
})

//Read Profile
router.get('/users/me', auth,async (request,response)=>{
    response.send(request.user);
    
        //     try{
    //        // console.log('all user');
    //    const user= await User.find({})
    //      response.send(user).status(200)
    //     }catch(e){
    //  response.statut(400).send(e);
    //     }
     //     User.find({}).then((user)=>{
     // response.send(user)
     //     }).catch((error)=>{
     // response.send(error)
     //     })
     })

//Update the User
 router.patch('/users/me',auth,async (request,response)=>{
 
     const updates= Object.keys(request.body);
     const allowUpdate=["name","email","password","Age"];
     const isValidator=updates.every((update)=> allowUpdate.includes(update));
 
 if (!isValidator)
 {
     return response.status(404).send({
      Error: "It is not a Valid field to Update"
     })
 }
     try {
        //const user= await User.findById(request.params.id);
        const user= await User.findById(request.user._id);

        updates.forEach((update)=>request.user[update]=request.body[update])
        await request.user.save();

 //const user = await User.findByIdAndUpdate(request.params.id,request.body,{ new: true, runValidators: true})
//  if(!user){
//      return response.status(404).send({Error:'There is no such user'}) 
//  }
 response.send(request.user);
 
     }catch(e){
 
         response.status(400).send(e);
     }
 })
 
 //delete the user
 router.delete('/users/me',auth, async (request,response)=>{
 
     try{
        //  const user= await User.findByIdAndDelete(request.params.id)
 
        //  if(!user)
        //  {
        //      return response.status(404).send("It is not in the search")
        //  }

        await request.user.remove()
        sendCancelationEmail(request.user.email,request.user.name);
         response.status(200).send({User:request.user,Message:"Item delete successfully"})
     }
     catch(e){
         response.status(400).send(e)
     }
 }) 

//including a profile picture
 const avatar =multer({
    limits: {
        fileSize:1000000
    },
    fileFilter(request,file,cb){
        if(!file.originalname.match(/\.(jgp$)/))
    {
        return cb(new Error("Please provide a proper file"))
    }
     cb (undefined,true);

    }
})
router.post('/users/me/avatar',auth ,avatar.single('avatars'), async(req,res) => {
   
   const buffer= await sharp(req.file.buffer).resize({
       width:250,
       height:250
   }).png().toBuffer(); 
    req.user.avatar=buffer;
   await req.user.save();
    res.status(200).send("images saved successfully");
},(error,req,res,next)=> {
    res.send(error.message)
})

router.delete('/users/me/avatar',auth , async(req,res) => {
     req.user.avatar=undefined;
     await req.user.save();
         res.status(200).send("images deleted successfully");
},(error,req,res,next)=> {
    res.send(error.message)
})


//get the avatar
router.get('/users/:id/avatar',async (req,res)=> {
try {
    const user= await User.findById(req.params.id);
if(!user || !user.avatar)
{
    throw new Error();
}
res.set('Content-Type','image/png');
res.send(user.avatar)

}catch(e){
res.status(400).send(e);
}
})

 module.exports=router
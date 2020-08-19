const express=require('express');
const app=express()
const port=process.env.PORT || 3000



app.post('/users',(request,response)=>{

    response.send('Testing');
})


app.listen(port,()=>{
console.log('sever is up and running in '+ port );
})  
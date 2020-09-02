require('../source/db/mongoose');
const Task=require('../source/models/task')

//5f3e61ad93d09e57582d5421

// User.findByIdAndDelete('5f48a1602b52bb3a1cb78304').then((user)=>{
//     console.log(user);
//     return Task.countDocuments({completed_status:false})
// }).then((result)=>{
// console.log(result);
// }).catch((error)=>{
// console.log(error);
// })


const deleteandcount= async(id,status)=>{
    const del= await Task.findByIdAndDelete(id)
    const count= await Task.countDocuments({completed_status:status})
    return count
}

deleteandcount('5f410cedbfa4b539709138c7',true).then ((result)=>{
console.log(result)
}).catch((error)=>{
    console.log(error);
})
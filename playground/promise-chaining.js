require('../source/db/mongoose');
const User=require('../source/models/user')

//5f3e61ad93d09e57582d5421

// User.findByIdAndUpdate('5f48a1602b52bb3a1cb78304',{ Age:1}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({Age:1})
// }).then((result)=>{
// console.log(result);
// }).catch((error)=>{
// console.log(error);
// })


const updateAgeancount = async(id,age)=>{
    const user=     await User.findByIdAndUpdate(id,{Age:age})
      const count=   await User.countDocuments({Age:age})
     return count;
     }

updateAgeancount('5f48a1da2b52bb3a1cb78305',1).then((result)=>{
console.log(result);
}).catch((error)=>{
console.log(error);
})
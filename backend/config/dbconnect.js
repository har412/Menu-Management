const mongoose = require('mongoose')



 module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/menu-management')
    .then(data=>{
        console.log("connected ")
    })
    .catch(err=>{
        console.log(err)
    })
 }



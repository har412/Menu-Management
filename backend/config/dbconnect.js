const mongoose = require('mongoose')



 module.exports = ()=>{
    mongoose.connect('mongodb+srv://harkirat:12345678aA@cluster0.wxyr5kj.mongodb.net/Cluster0?retryWrites=true&w=majority')
    .then(data=>{
        console.log("connected ")
    })
    .catch(err=>{
        console.log(err)
    })
 }



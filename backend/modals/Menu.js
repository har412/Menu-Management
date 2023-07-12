const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({

name:{
    type:String,
    required:true
},
parent_id:{
    type:String
}
,
child:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu'
    }
]

})


const Menu = mongoose.model('Menu',menuSchema)

module.exports= Menu
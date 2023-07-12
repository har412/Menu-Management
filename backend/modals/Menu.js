const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  },
  child: [{}]
});

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent_id: {
    type:String,
    required:true
  },
  child: [childSchema]
});



const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;

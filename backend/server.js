const app =  require('express')();
const express = require('express')

//json body parser
app.use(express.json())
const menuRouter = require('./routes/menuRoute')

const db =  require('./config/dbconnect')

// menu Router
app.use('/',menuRouter)
//set ejs
app.set('view engine', 'ejs');

// db connection
db();

//include public folder
app.use(express.static(__dirname + '/public'))

app.listen(8080,()=>{
    console.log("server running at 8080")
})
const app =  require('express')();
const express = require('express')
const cors = require('cors')
//json body parser
app.use(express.json())
const menuRouter = require('./routes/menuRoute')
app.use(cors({origin:"*"}))
const db =  require('./config/dbconnect')

// menu Router
app.use('/',menuRouter)


// db connection
db();

//include public folder
app.use(express.static(__dirname + '/public'))

app.listen(8080,()=>{
    console.log("server running at 8080")
})
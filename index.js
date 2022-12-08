const express = require('express'); 
const dotenv = require('dotenv').config({path : './config.env'});
const path = require('path')

// dotenv.config({path : path.resolve(__dirname + './config.env')})  
const port = process.env.PORT
const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended : false}))

//Static files
app.use(express.static(path.join(__dirname, 'public')))

app.use("/openai", require('./routes/openRoute'))

app.listen(port, ()=>{
    console.log(`App is running on ${port}`)
})
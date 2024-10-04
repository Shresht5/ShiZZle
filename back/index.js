const express =require('express');
const mongoose=require('mongoose')
const Module =require('./Models/ModelUser')
const cors=require('cors')
const CreateUser=require('./Routes/CreateUser')
const LoginUser=require('./Routes/LoginUser')
const DisplayMenu=require('./Routes/DisplayMenu')
const OrderData=require('./Routes/OrderData')
const app=express();

const port=2000;

function check(){console.log(`connects`)}
function error(err){console.log(err)}
mongoose.connect('mongodb://localhost:27017/Goofy_food_menu',check())

app.use(cors())
app.use(express.json())
app.use('/api',CreateUser)
app.use('/api',LoginUser)
app.use('/api',DisplayMenu);
app.use('/api',OrderData)

app.get('/',(req,res)=>{res.send('home')});

app.listen(port,()=>{console.log(`hellos`)})
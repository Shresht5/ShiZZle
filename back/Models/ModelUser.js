const mongoose = require('mongoose');

const User=mongoose.Schema(
    {
        name:{type:String,required:true},
        loct:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        pass:{type:String,required:true},
    },{timestamps:true}
)
const model = mongoose.model('Users',User)
module.exports =model


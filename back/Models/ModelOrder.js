const mongoose = require('mongoose');

const Order=mongoose.Schema(
    {
        email:{type:String,required:true,unique:true},
        order_data:{type:Array,required:true},

    },{timestamps:true}
)
const model = mongoose.model('orders',Order)
module.exports =model
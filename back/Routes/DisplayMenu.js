const express =require('express');
const Router=express.Router();
const mongoose=require('mongoose')



Router.get('/displaymenu',async(req,res)=>{
    try {
        const fdata = mongoose.connection.db.collection("food_menu");
        const data = await fdata.find({}).toArray();
        global.food_item = data;
        // console.log(global.food_item);
        res.send(global.food_item);  // Send the fetched data as a response
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching food menu");
    }
});
module.exports=Router

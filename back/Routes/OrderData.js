const express = require('express')
const Router=express.Router();
const Model=require('../Models/ModelOrder')


Router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data
    console.dir(data)
    console.dir(req.body.email)
    await data.splice(0,0,{Order_date:req.body.order_time})
    
    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Model.findOne({ 'email': req.body.email })    
    console.dir(eId)
    if (eId===null) {
        try {

            await Model.create({
                email: req.body.email,
                order_data:[data]
            })
            console.dir("---")
                console.dir(data)
                res.json({ success: true })
        } catch (error) {
            console.log(error.message)
            res.send({success: false})

        }
    }

    else {
        try {
            await Model.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.json({success: false} )
        }
    }
})

Router.post('/userorder', async (req, res) => {
    try {
        let myOrders = await Model.findOne({ 'email': req.body.email });
        if (!myOrders) {
            return res.status(404).json({ message: "No orders found." });
        }
        res.json({ order_data: myOrders.order_data });
    } catch (err) {
        console.log("Server error:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


module.exports=Router
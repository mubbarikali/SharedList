const express = require('express');
const Item = require('../models/Item');
const router = express.Router();


//Getting all items.
router.get("/", async (req, res)=>{
 
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.json(error);
    }

});



//Getting single item.
router.get("/:itemId", async (req, res)=>{
 
    const itemId = await req.params.itemId;

    try {
        const item = await Item.findById(itemId);
        res.json(item);
    } catch (error) {
        res.json(error);
    }

});



//Creating new item.
router.post("/", async (req, res)=>{
     
    try {
        const item = await Item.create(req.body);
        res.json(item);
    } catch (error) {
        res.json(error);
    }

});


//Deleting a item.
router.delete("/:itemId", async (req, res)=>{
     
    try {
        await Item.deleteOne({_id: req.params.itemId});
        res.status(200).json({
            "message": "Item deleted."
        });
    } catch (error) {
        res.json({
            "error": "error occured."
        });
    }

});



//Updating a item.
router.put("/:itemId", async (req, res)=>{
     
    const itemId = req.params.itemId;
    try {
        await Item.updateOne(
            {
            "_id": itemId
            },
            req.body
        );

        res.status(200).json({
            "message": itemId
        });
    } catch (error) {
        res.json(error);
    }

});



module.exports = router;
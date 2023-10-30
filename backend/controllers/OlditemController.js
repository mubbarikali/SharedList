// const { Error } = require('mongoose');
// const Item = require('../models/ItemModel');
// const User = require('../models/UserModel');

// const getItems = async (req, res) => {
//   try {
//     const items = await Item.find({user: req.user.id});
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const getItem = async (req, res) => {
//   const itemId = req.params.itemId;

//   try {
//     const item = await Item.findById(itemId);
//     if (!item) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const addItem = async (req, res) => {
//   const { itemName, bought } = req.body;

//   if (!itemName || bought === undefined) {
//     return res.status(400).json({ message: 'Please provide both itemName and bought to add a new item.' });
//   }

//   try {
//     const item = await Item.create({ itemName, bought, user: req.user.id });
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// const updateItem = async (req, res) => {
//   //Validation that user is authorized to update.
//   const item = await Item.findById(req.params.id);

//   if (!item) {
//     res.status(404);
//     throw new Error("Item not found.");
//   };

//   if (!req.user) {
//     res.status(404);
//     throw new Error("User not found.");
//   };


//   if (item.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorized.");
//   };

 
//  //Item updation logic.
//   const itemId = req.params.itemId;
//   const { itemName, bought } = req.body;

//   if (!itemName || bought === undefined) {
//     return res.status(400).json({ message: 'Please provide both itemName and bought to update the item.' });
//   }

//   try {
//     const updatedItem = await Item.findByIdAndUpdate(itemId, { itemName, bought }, { new: true });
//     if (!updatedItem) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
//     res.json(updatedItem);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// const deleteItem = async (req, res) => {
//   //Logic to delete an item.
//   try {
//     const deletedItem = await Item.findByIdAndRemove(req.params.itemId);
//     if (!deletedItem) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
//     res.status(200).json({ message: 'Item deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { getItems, getItem, addItem, updateItem, deleteItem };

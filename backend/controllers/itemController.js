const { Error } = require('mongoose');
const Item = require('../models/ItemModel');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');


// @desc    Get all of items of loggedin user.
// @route   GET /api/v1/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find({user: req.user.id});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// @desc    Get single item of loggedin user.
// @route   GET /api/v1/item
// @access  Private
const getItem = asyncHandler(async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// @desc    Add an item by loggedin user.
// @route   POST /api/v1/item
// @access  Private
const addItem = asyncHandler(async (req, res) => {
  const { itemName} = req.body;

  
  if (!itemName) {
    return res.status(400).json({ message: 'Please provide itemName to add.' },
    itemName);

  }

  try {
    const item = await Item.create({ itemName, user: req.user.id });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// @desc    Update single item of loggedin user.
// @route   PUT /api/v1/items/itemId
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
//Code for checking user authorization.
    const item = await Item.findById(req.params.itemId)
 
    if (!item) {
      res.status(400)
      throw new Error('Item not found')
    }

    // Check for user
    if (!req.user) {
      res.status(404)
      throw new Error('User not found')
    }
    // Make sure the logged in user matches the item user
    if (item.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    //Logic for updating.
    const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedItem)
  })



// @desc    Delete single item of loggedin user.
// @route   DELETE /api/v1/item/itemId
// @access  Private
const deleteItem = asyncHandler( async (req, res) => {
//Code for checking user authorization.
const item = await Item.findById(req.params.itemId)
 
if (!item) {
  res.status(400)
  throw new Error('Item not found')
}

// Check for user
if (!req.user) {
  res.status(404)
  throw new Error('User not found')
}
// Make sure the logged in user matches the item user
if (item.user.toString() !== req.user.id) {
  res.status(401)
  throw new Error('User not authorized')
}


  //Logic to delete an item.
  try {
    const deletedItem = await Item.findByIdAndRemove(req.params.itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

module.exports = { getItems, getItem, addItem, updateItem, deleteItem };

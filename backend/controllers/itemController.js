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
  const { itemName, bought } = req.body;

  if (!itemName || bought === undefined) {
    return res.status(400).json({ message: 'Please provide both itemName and bought to add a new item.' },
    itemName,
    bought);

  }

  try {
    const item = await Item.create({ itemName, bought, user: req.user.id });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// @desc    Update single item of loggedin user.
// @route   PUT /api/v1/items/itemId
// @access  Private
// const updateItem = asyncHandler(async (req, res) => {
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
// });

const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)
  
    if (!item) {
      res.status(400)
      throw new Error('Item not found')
    }

    
    //Code for checking user authorization.
    const user = await User.findById(req.user.id);
    // Check for user
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
    // Make sure the logged in user matches the item user
    if (item.user.toString() !== user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedItem)
  })


// @desc    Delete single item of loggedin user.
// @route   DELETE /api/v1/item/itemId
// @access  Private
// const deleteItem = asyncHandler( async (req, res) => {
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
// });




// const deleteItem = asyncHandler( async (req, res) => {
//     //Logic to delete an item.
    
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//         res.json(400);
//         throw new Error("Item not found.");
//     };

//     await item.remove();
//     res.status(200).json({id: req.params.id});    
// });



const deleteItem = asyncHandler(async (req, res) => {
    try {
      const item = await Item.findById(req.params.itemId);
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Make sure the logged-in user matches the item user before deleting
      if (item.user.toString() !== req.user.itemId) {
        return res.status(401).json({ error: 'User not authorized' });
      }
  
      await item.remove();
      res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  





// const deleteItem = asyncHandler(async (req, res) => {
//     try {
//       const item = await Item.findById(req.params.itemId);
  
//       if (!item) {
//         return res.status(404).json({ error: 'Item not found' });
//       }
  
//       // Make sure the logged-in user matches the item user before deleting
//       if (item.user.toString() !== req.user.id) {
//         return res.status(401).json({ error: 'User not authorized' });
//       }
  
//       await item.remove();
//       res.status(200).json({ message: 'Item deleted' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  

module.exports = { getItems, getItem, addItem, updateItem, deleteItem };

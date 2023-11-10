const mongoose = require("mongoose");

const Item = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    
    itemName: {
        type: String,
        require: [true, "Please add an item name."]
    }

},

{
    timestamps: true  
  }

);


module.exports = mongoose.model("items", Item);
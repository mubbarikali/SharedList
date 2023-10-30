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
    },

    bought: {
        type: Boolean,
        require: [true, "Please add bought status as well."]
    }

});


module.exports = mongoose.model("items", Item);
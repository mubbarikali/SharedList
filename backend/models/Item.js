const mongoose = require("mongoose");

const Item = mongoose.Schema({
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
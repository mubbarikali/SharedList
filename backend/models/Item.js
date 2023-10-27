const mongoose = require("mongoose");

const Item = mongoose.Schema({
    itemName: {
        type: String,
        require: true
    },

    bought: {
        type: Boolean,
        require: true
    }

});


module.exports = mongoose.model("items", Item);
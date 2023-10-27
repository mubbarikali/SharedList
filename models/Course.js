const mongoose = require("mongoose");

const Course = mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    content: {
        type: String,
        require: true
    },

    Video: {
        type: Number,
        require: true
    },

    active: Boolean

});


module.exports = mongoose.model("courses", Course);
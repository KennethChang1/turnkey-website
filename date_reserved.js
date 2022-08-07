
const mongoose = require("mongoose");

// setup community
const Schema = mongoose.Schema({
    date : {
        type : String,
        required : true,
    },
})

// Export default table
const date_reserved = module.exports = mongoose.model('date_reserved',Schema);

module.exports.get = (callback,limit) => {
    date_reserved.find(callback).limit(limit);
}
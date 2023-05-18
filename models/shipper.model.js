var mongoose = require('mongoose');

var shipperSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true
    },
    distribution_hub: {
        type: String,
        required: true,
        default: false,
        enum: ["d1", "d7", "abd"]
    }
});

var Shipper = mongoose.model('shipper-info', shipperSchema);
module.exports = Shipper
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    },
    business_name: {
        type: String,
        maxlength: 20,
        required: true,
        unique: true
    },
    business_address: {
        type: String,
        maxlength: 100,
        required: true,
    }
});


var Vendor = mongoose.model('vendor-info', vendorSchema);
vendorSchema.plugin(uniqueValidator, {"message": "{VALUE} has been used dude. Go back and change your {PATH}"});
module.exports = Vendor
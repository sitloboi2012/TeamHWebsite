var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var usernameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        unique: true
    },
    role_type: {
        type: String,
        required: true,
        default: false,
        enum: ["Customer", "Vendor", "Shipper"]
    }
})

var Username = mongoose.model('username-info', usernameSchema);

usernameSchema.plugin(uniqueValidator, {"message": "{VALUE} has been used dude. Go back and change your {PATH}"});
module.exports = Username
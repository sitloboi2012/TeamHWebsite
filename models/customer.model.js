var mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        maxlength: 40,
        required: true
    },
    customer_address: {
        type: String,
        maxlength: 100,
        required: true
    }
});

var Customer = mongoose.model('customer-info', customerSchema);
module.exports = Customer
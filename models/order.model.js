var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    customer_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total_price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Active",
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    business_address: {
        type: String,
        required: true
    },
    products_list: {
        type: Array,
        required: true
    },
    products_count: {
        type: Number,
        required: false,
    }
})

orderSchema.pre('validate', function (next) {
    this.products_count = this.products_list.length
    next();
});

var Order = mongoose.model('order-info', orderSchema);
module.exports = Order
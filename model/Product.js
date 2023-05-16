const mongoose = require('mongoose');

// Replace <password> with the actual password for the user
mongoose.connect('mongodb+srv://vuminhha2504:Mystyle16,bdw@ha-vu.herubsk.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error.message));


// Define a schema
const productSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20
    },
<<<<<<< Updated upstream
    brand: {
        type: String,
=======
    category: {
        type: String,
        enum: ['shoes', 'stationery', 'phone case']
>>>>>>> Stashed changes
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        maxlength: 500
    },
    image: {
        type: String,
        required: true
    }
});

// Define a model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer({ dest: "public/images" });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const Product = require('./model/Product');

app.post("/form-processing", upload.single("myFile"), (req, res) => {
    // Stuff to be added later
    console.log(req.file);
    console.log(req.body.product_name);
    console.log(req.body.category);
    console.log(req.body.price);
    res.send("upload success");
});

app.get('/add-product', (req, res) => {
    res.render('addProduct');
})

app.get('/customer-page', (req, res) => {
    res.render('customerPage');
})

app.post('/processing', (req, res) => {
    console.log(req.body.product_name);
    res.send('Congratulations');
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
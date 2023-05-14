const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const Product = require('./model/Product');


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
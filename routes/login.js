var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let page_title = "Login Page";
    let form_title = "Login Lazada"
    res.render('login', { page_title, form_title });
});

module.exports = router;

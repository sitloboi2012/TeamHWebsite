var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let page_title = "Registration Page";
    let form_title = "Registration Lazada"
    res.render('sign_up', { page_title, form_title });
});

module.exports = router;

// import libraries
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const multer = require("multer");
const app = express();
var path = require('path');
var mongoose = require("./db")
var bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');

var Shipper = require("./models/shipper.model");
var Customer = require("./models/customer.model");
var Vendor = require("./models/vendor.model");
var Username = require("./models/username.model");
const port = 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());
app.set("layout", "layouts/layout")

// LOGIN SERVE BEFORE ANY OTHER ACTION
// LOGIN FORM

//TODO: save username password to localstorage
app.get('', (req, res) => {
  // them
  res.render("login",
    {
      title: "Login Page",
      form_title: "Lazada - Login",
      layout: "layouts/login_layout.ejs"
    })
});

app.post('/login-check', (req, res) => {
  const { username, password } = req.body;
  if (username === null) {
    res.send({ redirect: "/" })
  }
})


// use static static files
app.use(express.static("public"))
app.use("/css", express.static(__dirname + "public/css"))
app.use("/js", express.static(__dirname + "public/js"))
app.use("/images", express.static(__dirname + "public/images"))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const upload = multer({ 'dest': 'public/upload_images' });

app.post('/login-verify', (req, res) => {

  try {
    const { user_type, username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Please filled in the data" })
    }

    switch (user_type) {
      case "customer":
        userLogin = Customer.findOne({ username: username, password: password })
          .then(function (value) {
            if (value) {
              res.redirect("/customer-profile");
            } else {
              res.redirect("/");
            }
          })
          .catch((error) => console.log(error.message));
        break;

      case "vendor":
        userLogin = Vendor.findOne({ username: username, password: password })
          .then(function (value) {
            if (value) {
              res.redirect("/vendor-profile");
            } else {
              res.redirect("/");
            }
          })
          .catch((error) => console.log(error.message));
        break;

      case "shipper":
        userLogin = Shipper.findOne({ username: username, password: password })
          .then(function (value) {
            if (value) {
              res.redirect("/shipper-profile");
            } else {
              res.redirect("/");
            }
          })
          .catch((error) => console.log(error.message));
        break;
    }

  } catch (err) {
    console.log(err.message)
  }
})


// REGISTION FORM
app.get('/registration', (req, res) => {
  res.render("choose_role",
    {
      title: "Registration Page",
      form_title: "Choose your role",
      layout: "layouts/registration/role_selection.ejs"
    })
})


// Select Role POST
app.post('/role-selection', function (req, res) {
  // sourcery skip: avoid-using-var
  var user_type = req.body.user_type;
  switch (user_type) {
    case 'customer':
      res.redirect("/customer-registration");
      break;
    case 'vendor':
      res.redirect("/vendor-registration");
      break;
    case 'shipper':
      res.redirect("/shipper-registration");
      break;
  }
  // Send a response back to the client
});

app.get('/vendor-registration', (req, res) => {
  res.render("vendor_form",
    {
      title: "Vendor Form",
      form_title: "Vendor Registration Form",
      layout: "layouts/registration/vendor_layouts.ejs"
    })
});


// Vendor Form Registration POST
app.post('/vendor-form-process', upload.single('images'), function (req, res) {
  // Log the form data received from the client
  const username = new Username({
    username: req.body.username,
    role_type: "Vendor",
  })
  const vendor = new Vendor({
    username: req.body.username,
    password: req.body.password,
    business_name: req.body.business_name,
    business_address: req.body.business_address
  });
  username.save()
    .then(() => vendor.save()
      .then(() => res.redirect("/"))
      .catch(function (error) { res.send("Business Name has already been used. Please return and change Business Name") }))
    .catch(function (error) { res.send("Username has already been used. Please return and change Username") })
  // Send a response back to the client
});

app.get('/customer-registration', (req, res) => {
  res.render("customer_form",
    {
      title: "Customer Form",
      form_title: "Customer Registration Form",
      layout: "layouts/registration/customer_layouts.ejs"
    })
});

// Customer Form Registration POST
app.post('/customer-form-process', upload.single('images'), function (req, res) {
  // Log the form data received from the client
  const username = new Username({
    username: req.body.username,
    role_type: "Customer",
  })
  const customer = new Customer({
    username: req.body.username,
    password: req.body.password,
    customer_name: req.body.full_name,
    customer_address: req.body.delivery_address
  });
  username.save()
    .then(() => customer.save()
      .then(() => res.redirect("/")))
    .catch(function (error) { res.send("Username has already been used. Please return and change Username") })
  // Send a response back to the client
});

app.get('/shipper-registration', (req, res) => {
  res.render("shipper_form",
    {
      title: "Shipper Form",
      form_title: "Shipper Registration Form",
      layout: "layouts/registration/shipper_layouts.ejs"
    })
});

// Shipper Form Registration POST
app.post('/shipper-form-process', upload.single('images'), function (req, res) {
  // Log the form data received from the client
  // console.log(req.file);
  const username = new Username({
    username: req.body.username,
    role_type: "Shipper",
  })
  const shipper = new Shipper({
    username: req.body.username,
    password: req.body.password,
    distribution_hub: req.body.distribution_hub
  });
  username.save()
    .then(() => shipper.save()
      .then(() => res.redirect("/")))
    .catch(function (error) { res.send("Username has already been used. Please return and change Username") })
  // Send a response back to the client
});


// SHIPPER
app.get("/shipper-profile", (req, res) => {
  res.render("shipper_profile",
    {
      title: "Shipper Page",
      layout: "layouts/shipper_page/shipper_profile_layout.ejs"
    })
})


app.get('/shipper-page', (req, res) => {
  res.render("shipper_form",
    {
      title: "Shipper Page",
      layout: "layouts/shipper_page/shipper_main_layout.ejs"
    })
});


// VENDOR
app.get('/vendor-page', (req, res) => {
  res.render("vendor_page",
    {
      title: "Vendor Page",
      layout: "layouts/vendor_page/vendor_main_layout.ejs"
    })
});


app.get('/vendor-page/all-product', (req, res) => {
  res.render("vendor_all_product",
    {
      title: "Vendor Page",
      layout: "layouts/vendor_page/all_product_layout.ejs"
    })
});


app.get('/vendor-page/add-product', (req, res) => {
  res.render("vendor_add_product",
    {
      title: "Vendor Page",
      layout: "layouts/vendor_page/add_product_layout.ejs"
    })
});

app.get("/vendor-profile", (req, res) => {
  res.render("vendor_profile",
    {
      title: "Shipper Page",
      layout: "layouts/vendor_page/vendor_profile_layout.ejs"
    })
})


// CUSTOMER
app.get('/customer-page', (req, res) => {
  res.render("customer_page",
    {
      title: "Vendor Page",
      layout: "layouts/customer_page/customer_main_layout.ejs"
    })
});

app.get("/customer-profile", (req, res) => {
  res.render("customer_profile",
    {
      title: "Shipper Page",
      layout: "layouts/customer_page/customer_profile_layout.ejs"
    })
})

// listen on port 3000
app.listen(port, () => console.info("Listening from port", port))
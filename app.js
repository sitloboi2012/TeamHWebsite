// import libraries
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const multer = require("multer");
const app = express();
var path = require('path');
var mongoose = require("./db")
var bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


var Shipper = require("./models/shipper.model");
var Customer = require("./models/customer.model");
var Vendor = require("./models/vendor.model");
var Username = require("./models/username.model");
const port = 3000;
const Product = require('./models/Product');
const Order = require("./models/order.model");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());
app.set("layout", "layouts/layout")

// LOGIN SERVE BEFORE ANY OTHER ACTION
// LOGIN FORM

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

const upload = multer({ 'dest': 'public/upload_images/' });

app.post('/login-verify', (req, res) => {

  try {
      const { user_type, username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ error: "Please filled in the data" })
      }

      switch (user_type) {
          case "customer":
              Customer.findOne({ username: username, password: password })
                  .then(function (information) {
                      if (information) {
                          res.render(
                              "customer_profile",
                              {
                                  information,
                                  layout: "layouts/customer_page/customer_profile_layout.ejs"
                              });
                      } else {
                          res.redirect("/");
                      }
                  })
                  .catch((error) => console.log(error.message));
              break;

          case "vendor":
              userLogin = Vendor.findOne({ username: username, password: password })
                  .then(function (information) {
                      if (information) {
                          res.render(
                              "vendor_profile",
                              {
                                  information,
                                  layout: "layouts/vendor_page/vendor_profile_layout.ejs"
                              });
                      } else {
                          res.redirect("/");
                      }
                  })
                  .catch((error) => console.log(error.message));
              break;

          case "shipper":
              userLogin = Shipper.findOne({ username: username, password: password })
                  .then(function (information) {
                      if (information) {
                          res.render(
                              "shipper_profile",
                              {
                                  information,
                                  layout: "layouts/shipper_page/shipper_profile_layout.ejs"
                              });
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

app.post("/shipper-page/:id/update", (req, res) => {
  console.log(req.params.id);
  Order.findByIdAndUpdate(req.params.id, { status: "Delivered" }, {
      new: true,
      runValidators: true,
  })
      .then(order => {
          if (!order) {
              return res.send("Not found any order matching the ID");
          }
          res.redirect("/shipper-page");
      })
      .catch(error => res.send(error));
})

app.get('/shipper-page/:username/all-product', async (req, res) => {
  Order.find({})
      .then(orders => res.render('shipper_form',
          {
              orders,
              title: "Shipper Page",
              distribution_title: req.params.username + " Distribution Hub", layout: "layouts/shipper_page/shipper_main_layout.ejs"
          }))
      .catch(error => res.send(error));
});

app.get('/shipper-page/:_id/details', async (req, res) => {
  Order.findById(req.params._id)
      .then(order => {
          if (!order) {
              return res.send('Not found any product matching the ID!');
          }
          res.render("order_details",
              {
                  order,
                  title: "Order Details",
                  layout: "layouts/shipper_page/order_details_layout.ejs"
              });
      })
      .catch(error => res.send(error));
})


// VENDOR
app.get('/vendor-page', (req, res) => {
  res.render("vendor_page",
    {
      title: "Vendor Page",
      layout: "layouts/vendor_page/vendor_main_layout.ejs"
    })
});

app.get('/vendor-page/all-product', (req, res) => {
  Product.find()
  .then((products) => {
    res.render("vendor_all_product",
    {
      products: products,
      title: "Vendor Page",
      layout: "layouts/vendor_page/all_product_layout.ejs"
    })
  })
  .catch((error) => {
    console.log(error.message);
  })
});

app.post("/vendor-page/form-processing", upload.single("image"), (req, res) => {
  console.log(req.file);
  const product = new Product(req.body);
  product.save()
  .then(() => res.redirect('vendor_all_product'))
  .catch((error) => res.send(error));
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
      title: "Vendor Page",
      layout: "layouts/vendor_page/vendor_profile_layout.ejs"
    })
})

// UPDATE product
app.post('/product/:id/update', (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'price', 'description', 'onSale', 'categories'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.send({ error: 'Invalid updates!' });
  }
})

// CUSTOMER
app.get('/customer-page', (req, res) => {
  Product.findById()
  .then((products) => {
    res.render("customer_page",
    {
      products: products,
      title: "Customer Page",
      layout: "layouts/customer_page/customer_main_layout.ejs"
    })
  })
  .catch((error) => {
    console.log(error.message);
  })
  
});

app.get("/customer-profile", (req, res) => {
  res.render("customer_profile",
    {
      title: "Customer Page",
      layout: "layouts/customer_page/customer_profile_layout.ejs"
    })
})

app.get("/shopping-cart", (req, res) => {
  res.render("shopping_cart",
      {
          title: "Shopping Cart",
          layout: "layouts/customer_page/customer_order_layout.ejs"
      })
})

app.post("/order-generate", (req, res) => {
  const newOrder = new Order({
      customer_name: req.body.name,
      address: req.body.address,
      status: "Active",
      total_price: req.body.price.reduce((partialSum, a) => partialSum + a, 0),
      product_list: req.body.product,
      business_name: req.body.name,
      business_address: req.body.address
  })

  newOrder.save()
  .then(() => res.redirect('/customer-page'))
  .catch(error => res.send(error));
})


// listen on port 3000
app.listen(port, () => console.info("Listening from port", port))
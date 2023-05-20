const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to the MongoDB database
const uri = 'mongodb+srv://hieucreasic:mypassword@cluster1.a2cxino.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ProfilePage'; // Replace with your database name
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

// Configure multer to store uploaded files in 'public/uploads' directory
const upload = multer({ dest: 'public/uploads/' });

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Route to render the profile page
app.get('/', function (req, res) {
  // Fetch the user data from the MongoDB collection
  const collection = db.collection('PerInfo'); // Replace with your collection name
  collection.findOne({}, function (err, user) {
    if (err) {
      console.error('Failed to fetch user data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Render the profile page with the user data
      res.render('customerprofile', { userData: user });
    }
  });
});

// Route to render the Shipper profile page
app.get('/customerProfile', function (req, res) {
  const userData = {
    role: 'Customer',
    name: 'Hieu',
    address: 'District 1',
    email: 'hieudang@gmail.com',
    password: 'brightcode'
  };

  // Render the ShipperProfilePage.ejs file and pass the userData object
  res.render('CustomerProfilePage', { userData });
});

// Route to handle the form submission and update the data
app.post('/save_data', upload.single('file'), function (req, res) {
  const data = req.body;
  const file = req.file;

  // Check if a new file was uploaded
  if (file) {
    data.profileImage = '/uploads/' + file.filename;
  }

  // Update the user data in the MongoDB collection
  const collection = db.collection('PerInfo'); // Replace with your collection name
  collection.updateOne({}, { $set: data }, { upsert: true })
    .then(() => {
      console.log('Data updated in MongoDB');
      res.redirect('/');
    })
    .catch(err => {
      console.error('Failed to update data in MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
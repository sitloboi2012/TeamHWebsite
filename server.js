const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;

// Set up the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to the MongoDB database
const uri = 'mongodb+srv://hieucreasic:mypassword@cluster1.a2cxino.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ProfilePage'; // Replace with your database name
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Route to render the profile page
app.get('/', function(req, res) {
  // Fetch the user data from the MongoDB collection
  const collection = db.collection('PerInfo'); // Replace with your collection name
  collection.findOne({}, function(err, user) {
    if (err) {
      console.error('Failed to fetch user data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Render the profile page with the user data
      res.render('profile', { user });
    }
  });
});

// Route to handle the form submission and update the data
app.post('/save_data', function(req, res) {
  const data = req.body;

  // Update the user data in the MongoDB collection
  const collection = db.collection('PerInfo'); // Replace with your collection name
  collection.updateOne({}, { $set: data }, { upsert: true })
    .then(() => {
      console.log('Data updated in MongoDB');
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Failed to update data in MongoDB:', err);
      res.json({ success: false });
    });
});

// Start the server
app.listen(port, function() {
  console.log('Server running on port ' + port);
});

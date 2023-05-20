// RMIT University Vietnam
//   Course: COSC2430 Web Programming
//   Semester: 2023A
//   Assessment: Assignment 2
//   Author: Huy
//   ID: s3823794
//   Acknowledgement: Acknowledge the resources that you use here.

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://s3978681:mypassword@cosc2430-group-project.chsvfpu.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });
var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
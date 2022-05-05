const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/MAJORPROJECT-2_development');
const db= mongoose.connection;

db.on('error',console.error.bind(console, "Error connecting to Mongodb"));

db.once('open',function(){
    console.log('Sucessfully connected to database ::MONGODB')
});

module.exports= db;
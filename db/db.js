const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost/mlsss';

mongoose.connect(connectionString, { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
   });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
  }); // this shows us in bash that we're connected
  
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose is disconnected`);
  });
  
mongoose.connection.on('error', (err) => {
    console.log(err, 'mongoose error');
  });
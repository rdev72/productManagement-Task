const mongoose= require('mongoose')
const config = require('../config')

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db =mongoose.connection;
db.once('open',()=>console.log('mongo connected'));
db.on('error',err=> console.log(err));


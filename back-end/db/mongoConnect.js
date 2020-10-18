const mongoose =require('mongoose');

const utils= require('../utils/utils.js')

mongoose.connect(utils.mongoUrl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false,  
})
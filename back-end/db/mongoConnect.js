const mongoose =require('mongoose');
const {MONGO_KEY} =require('../utils/config.js')

mongoose.connect(MONGO_KEY,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false,  
})
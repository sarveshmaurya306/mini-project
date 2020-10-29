const mongoose =require('mongoose');
const KEYS =require('../utils/config')
mongoose.connect(KEYS.MONGO_KEY,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false,  
})
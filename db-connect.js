const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/covid19', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
});
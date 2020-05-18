var mongoose = require('mongoose');
const uri=process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser: true}).then(()=>{
    console.log("connect to mongoDB successfully")
})
.catch((error)=>{
    console.error(error);
});





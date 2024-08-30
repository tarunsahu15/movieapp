const mongoose = require("mongoose");

const DB = process.env.DB_CONNECTION

mongoose.connect(DB,{
    // useUnifiedTopology:true,
    // useNewUrlParser:true
}).then(()=>console.log("Database Connected")).catch((error)=>console.log("error",error));
const mongoose = require("mongoose");

const movieratingSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    movieid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});


// model
const movierationgDB = new mongoose.model("moviesratings",movieratingSchema);
module.exports = movierationgDB
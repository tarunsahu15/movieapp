require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const PORT = 4009;


app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json("server start")
});

// user routes
const userAuthRoutes = require("./routes/user/userAuthroutes");
app.use("/userauth/api",userAuthRoutes);

// movie routes
const moviesroutes = require("./routes/movie/movieroutes");
app.use("/movies/api",moviesroutes);


// listen app
app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})

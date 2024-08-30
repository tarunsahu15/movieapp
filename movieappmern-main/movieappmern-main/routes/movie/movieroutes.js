const express = require("express");
const router = new express.Router();
const userauthenticate = require("../../middleware/userauthenticate");
const movieupload = require("../../multerConfig/movieStorageconfig");
const moviescontrollers = require("../../controllers/moviescontrollers/moviecontrollers");


// movies routes
router.post("/create",[userauthenticate,movieupload.single("image")],moviescontrollers.createmovie);
router.get("/getallmovie",moviescontrollers.getAllusermovie);
router.patch("/update/:id",[userauthenticate,movieupload.single("image")],moviescontrollers.updatemovies);
router.delete("/delete/:id",userauthenticate,moviescontrollers.deleteMovie);
router.get("/details/:id",moviescontrollers.getSingleMovie);


// movie rating
router.post("/movieratingadd/:movieid",userauthenticate,moviescontrollers.addmovierating);
router.get("/getmovierating/:movieid",moviescontrollers.getMovieRating);
router.delete("/deletemovierating/:ratingid",userauthenticate,moviescontrollers.deleterating);


module.exports = router;
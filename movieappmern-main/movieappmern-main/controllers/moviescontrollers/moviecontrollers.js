const moviesDB = require("../../model/movie/moviesModel");
const movieratingDB = require("../../model/movie/movierationgModel");
const cloudinary = require("../../cloudinary/cloudinaryConfig");

exports.createmovie = async (req, res) => {
    const file = req?.file ? req?.file?.path : "";
    const { moviename, publishyear } = req.body;

    if (!file || !moviename || !publishyear) {
        res.status(400).json({ error: "all filed are require" })
    } else {
        try {
            const upload = await cloudinary?.uploader?.upload(file);

            const existingmovie = await moviesDB.findOne({ moviename: moviename });

            if (existingmovie) {
                res.status(400).json({ error: "already exist" })

            } else {
                const moviesData = new moviesDB({
                    userid: req?.userMainId, moviename, image: upload?.secure_url, publishyear
                });

                await moviesData.save();

                res.status(200).json({ message: "movies sucessfully create" });
            }
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
}

// getAllusermovie

exports.getAllusermovie = async (req, res) => {

    const page = req.query.page || 1;
    const search = req.query.search || ""
    const sort = req.query.sort || ""
    const ITEM_PER_PAGE = 2;

    const query = {
        moviename :{$regex:search,$options:"i"}
    }

    try {
        const skip = (page - 1) * ITEM_PER_PAGE // 3 - 1 = 2 * 2 = 4

        // all movie count
        const allusermovieCount = await moviesDB.countDocuments(query);

        // movie all data
        const allusermoviesData = await moviesDB.find(query)
            .limit(ITEM_PER_PAGE)
            .skip(skip)
            .sort({_id:sort == "new" ? -1 : 1})

        const pageCount = Math.ceil(allusermovieCount / ITEM_PER_PAGE)  // 5/2 = 2.5 = 3

        res.status(200).json({
            Pagination: {
                allusermovieCount, pageCount
            },
            allusermoviesData
        });
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

// updatemovies
exports.updatemovies = async(req,res)=>{
    const {id} = req.params;
    const file = req?.file ? req?.file?.path : "";
    const { moviename, publishyear,image } = req.body;

    var upload;

    try {
        
        if(file){
            upload = await cloudinary?.uploader?.upload(file);
        }

        let dynamicImg = file ? upload?.secure_url : image

        const moviesUpdate = await moviesDB.findByIdAndUpdate({_id:id},{
            userid: req?.userMainId, moviename, image:dynamicImg, publishyear
        },{new:true});

        await moviesUpdate.save();

        res.status(200).json({message:"movie sucessfully update",moviesUpdate})
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

// deleteMovie
exports.deleteMovie = async(req,res)=>{
    const {id} = req.params;

    try {
        const deleteMovieData = await moviesDB.findByIdAndDelete({_id:id});
        res.status(200).json({message:"Movies sucessfully Delete",deleteMovieData});
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

// getSingleMovie
exports.getSingleMovie = async(req,res)=>{
    const {id} = req.params;

    try {
        const getSingleMovieData = await moviesDB.findOne({_id:id});

        res.status(200).json(getSingleMovieData)
    } catch (error) {
        res.status(400).json({ error: error })
    }
}


// addmovierating
exports.addmovierating = async(req,res)=>{
    const {movieid} = req.params;
    
    const {username,rating,description} = req.body;

    if(!movieid || !username || !rating || !description){
        res.status(400).json({error:"ALl fields are required"})
    }

    try {
        const movieratingAdd = new movieratingDB({
            userid:req.userMainId,movieid,username,rating,description
        });

        await movieratingAdd.save();

        res.status(200).json(movieratingAdd);
    } catch (error) {
        res.status(400).json({ error: error })
    }
}


// getMovieRating
exports.getMovieRating = async(req,res)=>{
    const {movieid} = req.params;

    try {
        const getmovierating = await movieratingDB.find({movieid:movieid});

        res.status(200).json(getmovierating)
    } catch (error) {
        console.log("error",error)
        res.status(400).json({ error: error })
    }
}

// deleterating
exports.deleterating = async(req,res)=>{
    const {ratingid} = req.params;

    try {
        const ratingDelete = await movieratingDB.findByIdAndDelete({_id:ratingid});

        res.status(200).json({ratingDelete,message:"rating delete sucessfully !"})
    } catch (error) {
        res.status(400).json({ error: error })
    }
}
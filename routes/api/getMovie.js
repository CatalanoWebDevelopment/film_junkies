const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const api_key = process.env.API_KEY;

const getMovie = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`);
    const data = await response.json();
    return data;
};

// @route   GET api/getMovie
// @desc    Route for getting a single movie description from https://developers.themoviedb.org/3/movies/get-movie-videos
router.get("/", (req, res) => {
    const id = req.query.id;
    getMovie(id).then(data => {
        res.send({ response: data });
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const api_key = process.env.API_KEY;

const getPopularMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
};

// @route GET api/getPopularMovies
// @desc Retrieves popular movie titles from https://developers.themoviedb.org/3/movies/get-popular-movies
router.get("/", (req, res) => {
    const pageNumber = req.query.pagenumber;
    getPopularMovies(pageNumber).then(data => {
        res.send({ response: data });
    });
});

module.exports = router;
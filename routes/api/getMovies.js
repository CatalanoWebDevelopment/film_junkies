const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
const api_key = process.env.API_KEY;
const includeAdult = false;

const getMovies = async (query) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=${includeAdult}&query=${query}`);
    const data = await response.json();
    return data;
};

// @route GET api/getMovies
// @desc Get movies based on search input from https://developers.themoviedb.org/3/search/search-movies
router.get("/", (req, res) => {
    const query = req.query.query;
    getMovies(query).then(data => {
        res.send({ response: data});
    });
});

module.exports = router;
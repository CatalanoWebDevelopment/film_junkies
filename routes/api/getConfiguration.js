const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
const api_key = process.env.API_KEY;

const getConfig = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${api_key}`);
    const data = await response.json();
    return data;
};

// @route GET api/getConfiguration
// @desc Get API config to handle images from https://developers.themoviedb.org/3/configuration/get-api-configuration
router.get("/", (req, res) => {
    getConfig().then(data => {
        res.send({ response: data });
    });
});

module.exports = router;
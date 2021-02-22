const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Routing 
const getPopularMovies = require("./routes/api/getPopular/Movies");

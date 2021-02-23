const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Route Variables
const getPopularMovies = require("./routes/api/getPopular/Movies");

// Server Config
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/getPopularMovies", getPopularMovies);

if (process.env.NODE_ENV === "production") {
    // Serve static files
    app.use(express.static(path.join(__dirname, "client/build")));

    // Handle React routing, return all requests back to React App
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
};

app.listen(port, () => console.info(`Currently listening on http://localhost:${port}`));
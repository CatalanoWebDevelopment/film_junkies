const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const api_key = process.env.API_KEY;
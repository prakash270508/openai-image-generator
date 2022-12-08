const express = require('express');
const { generateImage } = require('../cofigure/configure')
const route = express.Router();


route.post("/image", generateImage)


module.exports = route;
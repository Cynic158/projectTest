const express = require("express");
const articlehandler = require("../router_handler/articlehandler");
const schema = require("../schema");
const expressJoi = require("@escook/express-joi");
const articlerouter = express.Router();
articlerouter.get("/cates", articlehandler.cates);

module.exports = articlerouter;

const express = require("express");
const userhandler = require("../router_handler/userhandler");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const schema = require("../schema");
router.post("/reguser", expressJoi(schema.userSchema), userhandler.reguser);
router.post("/login", expressJoi(schema.userSchema), userhandler.login);

module.exports = router;

const express = require("express");
const userinfohandler = require("../router_handler/userinfohandler");
const schema = require("../schema");
const expressJoi = require("@escook/express-joi");
const inforouter = express.Router();
inforouter.get("/userinfo", userinfohandler.userinfo);
inforouter.post(
  "/userinfo",
  expressJoi(schema.infoSchema),
  userinfohandler.userupdate
);
inforouter.post(
  "/updatepwd",
  expressJoi(schema.passwordSchema),
  userinfohandler.userpassword
);
inforouter.post(
  "/update/avatar",
  expressJoi(schema.avatarSchema),
  userinfohandler.useravatar
);

module.exports = inforouter;

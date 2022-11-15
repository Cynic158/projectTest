const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");
const userinfoRouter = require("./router/userinfo");
const articleRouter = require("./router/article");
const db = require("./db/db");
const Joi = require("joi");
const jwt = require("./jwt");
const expressjwt = require("express-jwt");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.reshandler = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

app.use(
  expressjwt
    .expressjwt({ secret: jwt.secretKey, algorithms: ["HS256"] })
    .unless({ path: [/^\/api\//] })
);

app.use("/api", userRouter);
app.use("/my", userinfoRouter);
app.use("/my/article", articleRouter);

app.use(function (err, req, res, next) {
  // 4.1 Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.reshandler(err);
  } else if (err.name == "UnauthorizedError") {
    return res.reshandler("身份认证失败");
  } else {
    // 4.2 未知错误
    res.reshandler(err);
  }
});

app.listen(80, () => {
  console.log("http://127.0.0.1");
});

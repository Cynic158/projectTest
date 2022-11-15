const db = require("../db/db");
const bcryptjs = require("bcryptjs");
const jwt = require("../jwt");

function reguser(req, res) {
  let sqlusername = "select * from users where username=?";
  db.query(sqlusername, req.body.username, (err, results) => {
    if (err) {
      return res.reshandler(err);
    } else if (results.length > 0) {
      return res.reshandler("用户名已被占用");
    } else {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      let sqlpassword = "insert into users set ?";
      db.query(
        sqlpassword,
        {
          username: req.body.username,
          password: req.body.password,
        },
        (err, results) => {
          if (err) {
            return res.reshandler(err);
          } else if (results.affectedRows !== 1) {
            return res.reshandler("注册出错");
          } else {
            res.reshandler("注册成功", 0);
          }
        }
      );
    }
  });
}
function login(req, res) {
  let sqlusername = "select * from users where username=?";
  db.query(sqlusername, req.body.username, (err, results) => {
    if (err) {
      return res.reshandler(err);
    } else if (results.length > 0) {
      if (bcryptjs.compareSync(req.body.password, results[0].password)) {
        let tokenstr = jwt.generateToken({
          ...results[0],
          password: "",
          pic: "",
        });
        res.send({
          status: 0,
          message: "登录成功",
          token: "Bearer " + tokenstr,
        });
      } else {
        return res.reshandler("账号或密码不一致");
      }
    } else {
      return res.reshandler("账号或密码不一致");
    }
  });
}

module.exports = {
  reguser,
  login,
};

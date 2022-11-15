const db = require("../db/db");
const bcryptjs = require("bcryptjs");

function userinfo(req, res) {
  let sqluserinfo =
    "select id, username, nickname, email, pic from users where id=?";
  db.query(sqluserinfo, req.auth.id, (err, results) => {
    if (err) {
      return res.reshandler(err);
    } else if (results.length > 0) {
      res.send({
        status: 0,
        message: "获取用户信息成功",
        data: results[0],
      });
    } else {
      return res.reshandler("获取用户信息失败");
    }
  });
}

function userupdate(req, res) {
  let sqluserupdate = "update users set ? where id=?";
  db.query(
    sqluserupdate,
    [{ nickname: req.body.nickname, email: req.body.email }, req.body.id],
    (err, results) => {
      if (err) {
        return res.reshandler(err);
      } else if (results.affectedRows !== 1) {
        return res.reshandler("更新用户信息出错");
      } else {
        res.reshandler("更新用户信息成功", 0);
      }
    }
  );
}

function userpassword(req, res) {
  let sqluserpassword = "select password from users where id=?";
  db.query(sqluserpassword, req.auth.id, (err, results) => {
    if (err) {
      return res.reshandler(err);
    } else if (results.length > 0) {
      if (bcryptjs.compareSync(req.body.oldPwd, results[0].password)) {
        let sqluserpasswordupdate = "update users set password=? where id=?";
        req.body.newPwd = bcryptjs.hashSync(req.body.newPwd, 10);
        db.query(
          sqluserpasswordupdate,
          [req.body.newPwd, req.auth.id],
          (err, results) => {
            if (err) {
              return res.reshandler(err);
            } else if (results.affectedRows !== 1) {
              return res.reshandler("密码更新出错");
            } else {
              res.reshandler("密码更新成功", 0);
            }
          }
        );
      } else {
        return res.reshandler("密码不符");
      }
    } else {
      res.reshandler("更改密码出错");
    }
  });
}

function useravatar(req, res) {
  let sqlavatar = "update users set pic=? where id=?";
  db.query(sqlavatar, [req.body.avatar, req.auth.id], (err, results) => {
    if (err) {
      return res.reshandler(err);
    } else if (results.affectedRows !== 1) {
      return res.reshandler("更新头像失败");
    } else {
      res.reshandler("更新头像成功", 0);
    }
  });
}

module.exports = {
  userinfo,
  userupdate,
  userpassword,
  useravatar,
};

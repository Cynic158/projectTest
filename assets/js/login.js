///<reference path="./assets/lib/jquery.js">
$(function () {
  // 注册链接点击事件
  $("#reglink").click(function () {
    $(".logContainer").fadeOut(500, function () {
      $(".logContainer").css("display", "none");
      $(".regContainer").fadeIn(500, function () {
        $(".regContainer").css("display", "block");
      });
    });
  });
  // 登录链接点击事件
  $("#loglink").click(function () {
    $(".regContainer").fadeOut(500, function () {
      $(".regContainer").css("display", "none");
      $(".logContainer").fadeIn(500, function () {
        $(".logContainer").css("display", "block");
      });
    });
  });

  // layui表单验证
  let form = layui.form;
  form.verify({
    accountVerify: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5·]+$").test(value)) {
        return "账号不能有特殊字符以及空格";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "账号首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "账号不能全为数字";
      }
      if (!/^[\S]{3,18}$/.test(value)) {
        return "账号必须3到18位以内";
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    passwordVerify: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    passwordConfirmVerify: function (value) {
      let pwdvalue = $(".regContainer [name=regPassword]").val();
      if (value !== pwdvalue) {
        return "两次密码不一致";
      }
    },
  });

  // 注册接口
  $("#regForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: {
        username: $(".regContainer [name=regAccount]").val(),
        password: $(".regContainer [name=regPassword]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          layer.msg(
            "注册成功，将跳转到登录页面",
            {
              time: 2000, //2秒关闭（如果不配置，默认是3秒）
            },
            function () {
              $(".regContainer input").val("");
              $("#loglink").click();
            }
          );
        }
      },
    });
  });

  // 登录接口
  $("#logForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: {
        username: $(".logContainer [name=logAccount]").val(),
        password: $(".logContainer [name=logPassword]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          localStorage.setItem("token", res.token);
          layer.msg(
            "登录成功，将跳转到主页",
            {
              time: 2000, //2秒关闭（如果不配置，默认是3秒）
            },
            function () {
              $(".logContainer input").val("");
              location.href = "./index.html";
            }
          );
        }
      },
    });
  });

  // baseApi——ajaxPrefilter,url根路径拼接
  $.ajaxPrefilter(function (options) {
    options.url = "http://www.liulongbin.top:3007" + options.url;
  });
});

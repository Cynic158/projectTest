$(function () {
  // layui表单验证
  let form = layui.form;
  form.verify({
    passwordSameVerify: function (value) {
      let oldvalue = $("#pwdForm [name=oldpwd]").val();
      if (value === oldvalue) {
        return "新密码不能与原来一致";
      }
    },
    passwordVerify: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    passwordConfirmVerify: function (value) {
      let pwdvalue = $("#pwdForm [name=newpwd]").val();
      if (value !== pwdvalue) {
        return "两次密码不一致";
      }
    },
  });

  //    修改密码表单
  $("#pwdForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/updatepwd",
      data: {
        oldPwd: $("#pwdForm [name=oldpwd]").val(),
        newPwd: $("#pwdForm [name=newpwd]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          layer.msg(
            "修改成功，请重新登录",
            {
              time: 2000, //2秒关闭（如果不配置，默认是3秒）
            },
            function () {
              window.parent.location.href = "../../../login.html";
            }
          );
        }
      },
    });
  });
});

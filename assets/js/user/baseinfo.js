$(function () {
  // 渲染用户信息
  getinfo(renderinfo);

  // layui表单验证
  let form = layui.form;
  form.verify({
    usernicknameVerify: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5·]+$").test(value)) {
        return "昵称不能有特殊字符以及空格";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "昵称首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "昵称不能全为数字";
      }
      if (!/^[\S]{3,18}$/.test(value)) {
        return "昵称必须3到18位以内";
      }
    },
  });

  //    修改用户基本资料表单
  $("#modifyForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: {
        id: $("#modifyForm [name=hiddenid]").val(),
        nickname: $("#modifyForm [name=usernickname]").val(),
        email: $("#modifyForm [name=useremail]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          layer.msg(res.message);
          // 调取父页面的方法
          window.parent.refreshinfo();
        }
      },
    });
  });

  // 重置按钮事件
  $("#resetbtn").click(function (e) {
    e.preventDefault();
    getinfo(renderinfo);
  });
});

// 渲染用户信息
function renderinfo(user) {
  //给表单赋值
  let form = layui.form;
  form.val("baseinfoForm", {
    //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
    usernameLogined: user.username, // "name": "value"
    usernickname: user.nickname || "",
    useremail: user.email || "",
    hiddenid: user.id,
  });

  // $("#modifyForm [name=usernameLogined]").val(user.username);
  // $("#modifyForm [name=usernickname]").val(user.nickname || "");
  // $("#modifyForm [name=useremail]").val(user.email || "");
}

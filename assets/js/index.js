$(function () {
  // 获取用户基本信息
  getinfo(renderinfo);
  // 登出事件
  $("#logoutbtn").click(function () {
    layer.confirm(
      "是否退出账号",
      { icon: 3, title: "登出账号" },
      function (index) {
        //do something
        location.href = "./login.html";
        localStorage.removeItem("token");

        layer.close(index);
      }
    );
  });
});

// 渲染用户信息
function renderinfo(user) {
  // if (user.user_pic == null) {
  if (user.pic == null) {
    $(".textAvatar").text((user.nickname || user.username)[0].toUpperCase());
    $(".layui-nav-img").css("display", "none");
    $(".textAvatar").css("display", "inline-block");
  } else {
    $(".layui-nav-img").attr("src", user.user_pic);
    $(".layui-nav-img").css("display", "inline-block");
    $(".textAvatar").css("display", "none");
  }
  $(".username").text(user.nickname || user.username);
}

// 由子页面调用刷新
function refreshinfo() {
  getinfo(renderinfo);
}

$.ajaxPrefilter(function (options) {
  // 需要权限的接口请求头拼接
  options.url = "http://www.liulongbin.top:3007" + options.url;
  if (options.url.indexOf("my") !== -1) {
    options.headers = { Authorization: localStorage.getItem("token") || "" };
  }
  // 访问权限
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "./login.html";
    }
  };
});
// 获取用户基本信息
function getinfo(fun) {
  // 获取用户基本信息
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      } else {
        fun(res.data);
      }
    },
  });
}

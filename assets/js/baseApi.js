$.ajaxPrefilter(function (options) {
  options.url = "http://www.liulongbin.top:3007" + options.url;
  if (options.url.indexOf("my") !== -1) {
    options.headers = { Authorization: localStorage.getItem("token") || "" };
  }
  options.complete = function (res) {
    if (res.responseJSON.status === 1) {
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

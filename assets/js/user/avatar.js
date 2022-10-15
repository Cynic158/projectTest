$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
    zoomable: false,
    viewMode: 3,
  };
  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 上传按钮点击事件
  $("#cutimg").click(function () {
    $("#imgfile").click();
  });

  // 输入框变更图片事件
  $("#imgfile").on("change", function (e) {
    let filelist = e.target.files;
    if (filelist.length == 0) {
      return;
    } else {
      let imgGet = filelist[0];
      let newImgURL = URL.createObjectURL(imgGet);
      $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", newImgURL) // 重新设置图片路径
        .cropper(options)
        .zoomTo(1); // 重新初始化裁剪区域
    }
  });

  // 将裁剪的图片上传到服务器
  $("#uploadimg").click(function () {
    let imgdataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串;

    $.ajax({
      type: "post",
      url: "/my/update/avatar",
      data: { avatar: imgdataURL },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          layer.msg(res.message);
          window.parent.refreshinfo();
        }
      },
    });
  });
});

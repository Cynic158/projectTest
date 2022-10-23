$(function () {
  let form = layui.form;
  let articleStatus = "已发布";
  initSelect();
  // 初始化富文本编辑器
  initEditor();

  // 1. 初始化图片裁剪器
  var $image = $("#image");
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
    zoomable: false,
    viewMode: 3,
  };
  // 3. 初始化裁剪区域
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
        .cropper(options);
    }
  });

  $("#publishbtn").click(function () {
    articleStatus = "已发布";
  });
  $("#draftbtn").click(function () {
    articleStatus = "草稿";
  });

  $("#articleForm").on("submit", function (e) {
    e.preventDefault();
    let fd = new FormData($(this)[0]);
    fd.append("state", articleStatus);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append("cover_img", blob);
      });
    fd.forEach(function (value, key) {
      console.log(value, key);
    });
    $.ajax({
      type: "post",
      url: "/my/article/add",
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          layer.msg(
            res.message,
            {
              time: 2000, //2秒关闭（如果不配置，默认是3秒）
            },
            function () {
              location.href = "./catelist.html";
            }
          );
        }
      },
    });
  });

  $(document).ajaxStart(function () {
    layer.msg("如果没有响应代表接口出错");
  });

  function initSelect() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          let selectlist = template("selectTem", res);
          $("[name=cate_id]").html(selectlist);
          form.render();
        }
      },
    });
  }
});

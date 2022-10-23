$(function () {
  let addlay = null;
  let editlay = null;

  initcategory();

  $(".addcate").click(function () {
    addlay = layer.open({
      type: 1,
      area: ["500px", "230px"],
      title: "添加类别",
      content: $("#addcateContent").html(),
    });
  });

  $("body").on("submit", "#addcateForm", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: {
        name: $("#addcateForm [name=cateName]").val(),
        alias: $("#addcateForm [name=cateAlias]").val(),
      },
      success: function (res) {
        if (res.status === 0) {
          layer.msg(res.message);
          initcategory();
          layer.close(layopen);
        } else if (
          res.message ==
          "ER_DUP_ENTRY: Duplicate entry '2147483647' for key 'PRIMARY'"
        ) {
          layer.msg("添加类别接口对应的数据库出错，暂时无法添加类别");
        } else {
          layer.msg(
            res.message,
            {
              time: 1000, //2秒关闭（如果不配置，默认是3秒）
            },
            function () {
              layer.close(addlay);
              return;
            }
          );
        }
      },
    });
  });

  $("#tb").on("click", ".editbtn", function () {
    let editid = $(this).attr("data-id");
    let editname = $(this).parent().parent().find("td:nth-child(1)").text();
    let editalias = $(this).parent().parent().find("td:nth-child(2)").text();
    editlay = layer.open({
      type: 1,
      area: ["500px", "230px"],
      title: "修改文章类别",
      content: $("#editcateContent").html(),
      success: function () {
        $("#editcateForm [name=cateId]").val(editid);
        $("#editcateForm [name=cateName]").val(editname);
        $("#editcateForm [name=cateAlias]").val(editalias);
      },
    });
  });

  $("body").on("submit", "#editcateForm", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/updatecate",
      data: {
        Id: $("#editcateForm [name=cateId]").val(),
        name: $("#editcateForm [name=cateName]").val(),
        alias: $("#editcateForm [name=cateAlias]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          layer.msg(
            res.message,
            {
              time: 1000, //2秒关闭（如果不配置，默认是3秒）
            },
            function () {
              layer.close(editlay);
              initcategory();
              return;
            }
          );
        }
      },
    });
  });
});

$("#tb").on("click", ".deletebtn", function () {
  let deleteid = $(this).attr("data-id");
  layer.confirm(
    "是否删除该类别",
    { icon: 3, title: "删除类别" },
    function (index) {
      //do something
      $.ajax({
        type: "get",
        url: "/my/article/deletecate/" + deleteid,
        success: function (res) {
          if (res.status !== 0) {
            layer.close(index);
            return layer.msg(res.message);
          } else {
            layer.close(index);
            layer.msg(res.message);
            initcategory();
          }
        },
      });
    }
  );
});

function initcategory() {
  $.ajax({
    type: "get",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      } else {
        //   console.log(res.data);
        let categoryTable = template("categoryTem", res);
        $("#tb").html(categoryTable);
      }
    },
  });
}

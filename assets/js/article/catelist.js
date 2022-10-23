$(function () {
  let inquireObj = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  let form = layui.form;
  let editlay = null;
  let laypage = layui.laypage;

  initList();
  initSelect();

  $("#selectForm").on("submit", function (e) {
    e.preventDefault();
    inquireObj.cate_id = $("[name=selectCate]").val();
    inquireObj.state = $("[name=selectStatus]").val();
    initList();
  });

  $("#tb").on("click", ".deletebtn", function () {
    let deleteid = $(this).attr("data-id");
    let btnLength = $(".deletebtn").length;
    layer.confirm(
      "是否删除该文章",
      { icon: 3, title: "删除文章" },
      function (index) {
        //do something
        $.ajax({
          type: "get",
          url: "/my/article/delete/" + deleteid,
          success: function (res) {
            if (res.status !== 0) {
              layer.close(index);
              return layer.msg(res.message);
            } else {
              layer.close(index);
              layer.msg(res.message);
              if (btnLength === 1 && inquireObj.pagenum !== 1) {
                inquireObj.pagenum--;
              }
              initList();
            }
          },
        });
      }
    );
  });

  function initList() {
    $.ajax({
      type: "get",
      url: "/my/article/list",
      data: inquireObj,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          let catelistTable = template("catelistTem", res);
          $("#tb").html(catelistTable);
          renderPage(res.total);
        }
      },
    });
  }

  function initSelect() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else {
          let selectlist = template("selectTem", res);
          $("#sl").html(selectlist);
          form.render();
        }
      },
    });
  }

  template.defaults.imports.dateFormat = function (date) {
    let time = new Date(date);
    let year = time.getFullYear();
    let month = addzero(time.getMonth() + 1);
    let day = addzero(time.getDate());
    let hour = addzero(time.getHours());
    let minute = addzero(time.getMinutes());
    let second = addzero(time.getSeconds());
    return `${year} 年${month} 月${day} 日${hour} 时${minute} 分${second} 秒`;
  };

  function addzero(n) {
    n = n > 9 ? n : "0" + n;
    return n;
  }

  function renderPage(n) {
    layui.use("laypage", function () {
      //执行一个laypage实例
      laypage.render({
        elem: "pageContainer", //注意，这里的 test1 是 ID，不用加 # 号
        count: n, //数据总数，从服务端得到
        limit: inquireObj.pagesize,
        limits: [2, 3, 4, 5, 6],
        curr: inquireObj.pagenum,
        layout: ["count", "limit", "prev", "page", "next", "skip"],
        // 点击页码以及调用laypage.render都会调用jump函数
        // 如果是后者，则first为true
        // 切换每页显示条数也会触发jump
        jump: function (obj, first) {
          //obj包含了当前分页的所有参数，比如：
          console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          console.log(obj.limit); //得到每页显示的条数
          inquireObj.pagenum = obj.curr;
          inquireObj.pagesize = obj.limit;

          //首次不执行
          if (!first) {
            //do something
            initList();
          }
        },
      });
    });
  }
});

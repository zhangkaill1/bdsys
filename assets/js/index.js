$(function () {
  getUserInfo();
  $("#exit").on("click", function () {
    layui.layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "提示" },
      function (index) {
        localStorage.removeItem("token");
        location.href = "/login.html";
        layui.layer.close(index);
      }
    );
  });
});

function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      // console.log(res.data['username'])
      renderAvatar(res.data);
    },
    complete: function (res) {
        console.log(res)
      if (
        res.responseJSON.message === "身份认证失败！" &&
        res.responseJSON.status === 1
      ) {
        localStorage.removeItem("token");
        location.href = "/login.html";
      }
    },
  });
}

function renderAvatar(obj) {
  let fname = obj.nickname || obj.username;
  // console.log(str)
  $(".welcome").html("&nbsp" + fname);
  if (obj.user_pic !== null) {
    $(".layui-nav-img").attr("src", obj.user_pic).show();
  } else {
    let first = fname[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}

$(function () {
  $("#toReg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#toLog").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });


  var layer = layui.layer

  $('#form_log').on('submit',function(e){
      e.preventDefault()
      $.ajax({
          method: 'POST',
          url: '/api/login',
          data: $(this).serialize(),
          success: function(res){
              if(res.status !== 0){
                  console.log(res.message)
                  return layer.msg(res.message)
              }
              localStorage.setItem('token',res.token)
              location.href = '/index.html'
            //   console.log(res.token)
          }
      })
  })

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "api/reguser",
      data: {
        username: $('.reg-box input[name="username"]').val(),
        password: $('.reg-box input[name="password"]').val(),
      },
      success: function (res) {
        if (res.status !== 0) {
        //   return console.log(res.message);
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $("#toLog").click()
      },
    });
  });

});

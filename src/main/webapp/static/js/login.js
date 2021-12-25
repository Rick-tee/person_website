/*等待页面加载完毕*/
$(function () {

    $("#loginPhone").blur(function () {
        //获得手机号码或邮箱
        var info = $("#loginPhone").val()

        switch (info.length){
            case 0:$("#phoneEmailError").text("请输入手机号码或邮箱!");break;
            case 11:if (!phoneExp(info))
                $("#phoneEmailError").text("请输入有效手机号码!");break;
            default:if (!emailExp(info)) {
                $("#phoneEmailError").text("请输入正确邮箱!")
            }
        }
    })

    /*手机号码获得焦点*/
    $("#loginPhone").focus(function () {
        $("#phoneEmailError").text("")
    })

    /*密码失去焦点*/
    $("#loginPassword").blur(function () {
        //获得用户登录的密码
        var password = $("#loginPassword").val()
        if (!passwordExp(password)) {
            $("#loginPwdError").text("校验有误,请检查!")
        }
    })

    /*密码获得焦点*/
    $("#loginPassword").focus(function () {
        $("#loginPwdError").text("")
    })

    //手机号码/邮箱按下回车键
    $("#loginPhone").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#login").click()
        }
    });

    //密码框按下回车键
    $("#loginPassword").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#login").click()
        }
    });

    /*点击登录按钮*/
    $("#login").click(function () {
        $("#loginPhone").onblur
        $("#loginPassword").onblur

        //获得用户登录的手机号码/邮箱
        var userInfo = $("#loginPhone").val()

        //获得用户登录的密码
        var password = $("#loginPassword").val()

        //执行登录函数
        var loginState = userLogin(userInfo, password)

        //登录成功
        if (loginState != "") {
            //保存session,保存用户的id号
            var str = JSON.stringify(loginState)
            //保存用户信息
            $.cookie("user", str, {path: '/'})

            //Alert("登录成功", "欢迎您," + loginState.userName, "success", "ok!")

            //页面跳转
            pageJump(getWeb() + "index.html")

        } else {
            //提示
            Alert("错误提示", "账户或密码错误！", "error", "知道了");
        }
    })
})

/*页面跳转*/
function pageJump(url){
    window.location.href = url;
}

/*用户登录的ajax请求*/
function userLogin(userInfo, password) {
    var info = "";
    $.ajax({
        url: "font/userLogin.action",
        type: "post",
        async: false,
        data: {
            userInfo: userInfo,
            password: password,
        }, success: function (data) {
            info = data;
        }
    })
    return info;
}

/*函数弹出框提示*/
function Alert(title, text, icon, button) {
    swal({
        title: title,
        text: text,
        icon: icon,
        button: button,
    });
}

/**
 * 跳转到管理员登录界面
 */
function adminLogin(){
    window.location.href="adminLogin.html"
}

/**
 * 获得默认网站名 ，不包含文件地址
 * @returns {string}
 */
function getWeb(){
    //获得当前网址
    var url = window.location.href;

    //当前网址的字符串截取
    var websiteUrl = url.substring(0,url.lastIndexOf('/') + 1)

    return websiteUrl
}
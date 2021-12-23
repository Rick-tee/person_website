/*页面初始化加载*/
$(function () {

    /*用户失去焦点函数*/
    $("#userName").blur(function () {
        //用户名
        var regUserName = $("#userName").val()
        if (!userExp(regUserName)) {
            $("#userError").text("不能为空且仅支持大小写英文,长度限定4~20!")
            return;
        }
    })

    /*用户获得焦点*/
    $("#userName").focus(function () {
        //清空
        $("#userError").text("")
    })

    /*手机号码失去焦点*/
    $("#phone").blur(function () {
        var regPhone = $("#phone").val()
        if (!phoneExp(regPhone)) {
            $("#phoneError").text("输入有误!")
            return;
        }
    })

    /*手机号码获得焦点*/
    $("#phone").focus(function () {
        $("#phoneError").text("")
    })

    /*邮箱失去焦点*/
    $("#email").blur(function () {
        //邮箱
        var regEmail = $("#email").val()
        if (!emailExp(regEmail)) {
            $("#emailError").text("地址不正确!")
            return;
        }
    })

    /*邮箱获得焦点*/
    $("#email").focus(function () {
        $("#emailError").text("")
    })

    /*密码失去焦点*/
    $("#password").blur(function () {
        $("#duplicatePassword").blur()
        //密码
        var regPassword = $("#password").val()
        if (!passwordExp(regPassword)) {
            $("#passwordError").text("长度最低6位!")
            return;
        }
    })

    /*密码获得焦点*/
    $("#password").focus(function () {
        $("#passwordError").text("")
    })

    /*重复密码失去焦点*/
    $("#duplicatePassword").blur(function () {
        //密码
        var regPassword = $("#password").val()
        //重复密码
        var regDupPwd = $("#duplicatePassword").val()
        if (regDupPwd.length == 0) {
            $("#dupPwdError").text("不能为空!")
            return;
        } else if (!dupPwdExp(regPassword, regDupPwd)) {
            $("#dupPwdError").text("不匹配!")
            return;
        }
    })

    /*重复密码获得焦点*/
    $("#duplicatePassword").focus(function () {
        $("#dupPwdError").text("")
    })

    /*手机号码弹起时判断*/
    $("#phone").keyup(function () {
        //查询该手机号码是否被注册
        var userInfoByPhone = selectByPhone($("#phone").val())

        if (userInfoByPhone != "") {
            $("#phoneError").text("已被注册!")
        }
    })

    /*邮箱弹起时判断*/
    $("#email").keyup(function () {
        //查询该邮箱是否被注册
        var userInfoByEmail = selectByEmail($("#email").val())

        if (userInfoByEmail != "") {
            $("#emailError").text("已被注册!")
        }
    })

    /*注册按钮点击*/
    $("#btn_register").click(function () {
        $("#userName").blur()
        $("#phone").blur()
        $("#email").blur()
        $("#password").blur()
        $("#duplicatePassword").blur()

        /*判断所有条件是否成立*/
        if ($("#userError").text() == "" && $("#phoneError").text() == "" &&
            $("#emailError").text() == "" && $("#passwordError").text() == "" && $("#dupPwdError").text() == "") {

            /*发起注册ajax请求*/
            userRegAjax($("#userName").val(), $("#phone").val(), $("#email").val(), $("#password").val())
        }
    })

})

/*用户名规则判断函数 正确：true；错误：false*/
function userExp(regUserName) {
    /*用户名规则*/
    return /^[a-zA-Z0-9_-]{4,20}$/.test(regUserName);
}

/*手机号码规则判断 正确：true；错误：false*/
function phoneExp(regPhone) {
    return /^1[345789]\d{9}$/.test(regPhone)
}

/*邮箱规则 正确：true；错误：false*/
function emailExp(regEmail) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(regEmail)
}

/*密码规则 正确：true；错误：false*/
function passwordExp(regPassword) {
    return regPassword.length >= 6
}

/*重复密码规则 正确：true；错误：false*/
function dupPwdExp(regPassword, regDupPwd) {
    return regPassword == regDupPwd
}

/*手机号码检测ajax请求*/
function selectByPhone(phone) {
    var userPhone = "";
    $.ajax({
        url: "font/phoneTest.action",
        async: false,
        type: "post",
        data: {
            phone: phone
        }, success(data) {
            userPhone = data;
        }
    })
    return userPhone;
}

/*邮箱检测ajax请求*/
function selectByEmail(email) {
    var userEmail = "";
    $.ajax({
        url: "font/emailTest.action",
        async: false,
        type: "post",
        data: {
            email: email,
        }, success(data) {
            userEmail = data;
        }
    })
    return userEmail;
}

/*前台用户注册的ajax请求*/
function userRegAjax(userName, phone, email, password) {
    $.ajax({
        url: "font/register.action",
        type: "post",
        data: {
            userName: userName,
            phone: phone,
            email: email,
            password: password,
        }, success: function (data) {
            location.reload()
        }, error: function (data) {
            if (data.status == 500) {
                swal("注册失败!", "该手机号码已被注册!", "warning");
                return;
            }
            swal("出错啦!", "网络连接失败,请检查网络!", "error");
        }
    })
}
/*等待页面加载完毕*/
$(function () {
    /*手机号码和邮箱失去焦点时判断*/
    $("#msg").blur(function () {
        //获得手机号码或邮箱
        var info = $("#msg").val()

        //进行判断
        phoneAndEmailVerification(info, "forgetPhoneAndEmail")
    })

    /*手机号码和邮箱获得焦点时判断*/
    $("#msg").focus(function () {
        $("#forgetPhoneAndEmail").text("")

        //回车按键
        $("#msg").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#getCode").click()
            }
        })
    })

    /*验证码焦点失去判断*/
    $("#code").blur(function () {
        //获得验证码
        var code = $("#code").val()

        //验证码不正确
        if (!isNumber(code)) {
            $("#codeError").text("输入有误!")
        }
    })

    /*验证码获得焦点*/
    $("#code").focus(function () {
        $("#codeError").text("")

        //验证码回车
        $("#code").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#verification").click()
            }
        })
    })

    /*点击验证*/
    $("#verification").click(function () {
        $("#msg").blur()
        $("#code").blur()

        if ($("#codeError").text() || $("#forgetPhoneAndEmail").text())
            return;

        /*执行到此，说明手机号码/邮箱、验证码无误，即可进行点击验证*/
        //发送ajax请求
        verificationEmailAndCode($("#msg").val(),$("#code").val())
    })

    /*点击获得验证码*/
    $("#getCode").click(function () {
        //点击获得验证码
        //按钮点击生效前提：手机号码或邮箱 需任意其一满足条件
        $("#msg").blur()
        if ($("#forgetPhoneAndEmail").text().length == 0) {
            //满足条件
            //发起ajax获得邮箱验证码请求
            if (sendCode($("#msg").val()) == "error")
                return;
            //60s倒计时(调用函数)
            countDown(60, this)

        }
    })
})

/*验证手机号码和邮箱是否符合规范*/
function phoneAndEmailVerification(info, labelIdentification) {
    switch (info.length) {
        case 0:
            $("#" + labelIdentification).text("不能为空!");
            break;
        case 11:
            if (!phoneExp(info))
                $("#" + labelIdentification).text("请输入有效手机号码!");
            break;
        default:
            if (!emailExp(info)) {
                $("#" + labelIdentification).text("请输入正确邮箱!")
            }
    }
}

/*判断验证码*/
function isNumber(number) {
    try {
        number = parseInt(number)
        if (number > 99999 && number < 999999)
            return true;
    } catch (e) {
        return false;
    }
}

/*倒计时*/
function countDown(seconds, obj) {
    if (seconds > 0) {
        seconds--;
        $(obj).text("重新获取(" + seconds + "s)").attr("disabled", true);//禁用按钮
        // 定时1秒调用一次
        setTimeout(function () {
            countDown(seconds, obj);
        }, 1000);
    } else {
        $(obj).text("获取验证码").attr("disabled", false);//启用按钮
    }
}

/*发送验证码ajax请求*/
function sendCode(info){
    //判断手机号码,暂不支持手机号码
    if (info.indexOf("@") == -1){
        swal("发送失败!", "暂不支持手机号码验证!", "warning");
        return "error";
    }

    $.ajax({
        url:"font/sendCode.action",
        type:"post",
        data:{
            info:info,
            subject:"个人博客网站注册密码找回",
        },success:function (data){
            //判断
            if (null == data || "" == data) {
                swal("错误提示!", "手机号码或邮箱不存在!", "error");
                return;
            }

            swal("发送成功","请注意接收验证码!", "success");

        },error:function () {
            swal("出错啦!", "网络连接失败,请检查网络!", "error");
        }
    })
}

/*用户验证邮箱/手机号码和验证的ajax请求*/
function verificationEmailAndCode(info,code){
    if (info.indexOf("@") == -1){
        swal("验证失败!", "暂不支持手机号码验证!", "warning");
        return "error";
    }

    $.ajax({
        url: "font/verificationEmailAndCode.action",
        type: "post",
        async:false,
        data: {
            info:info,
            code:code,
        }, success: function (data) {
            //判断，获得为空,提示验证码错误
            if (data == null || data == ""){
                swal("错误提示", "用户未注册或验证码错误!", "error");
                return;
            }
            var date = new Date(new Date().getTime() + 10 * 60 * 1000);//缓存默认保存10分钟
            //获得不为空,标识获得了用户信息,存储至浏览器session,跳转到首页 页面跳转
            var str = JSON.stringify(data)
            $.cookie("user", str, {expires: date, path: '/'})
            pageJump("index.html")
        }, error: function () {
            swal("出错啦!", "网络连接失败,请检查网络!", "error");
        }
    })
}
$(function () {
    //等待页面加载完毕

    //调用登录函数
    //点击登录按钮，实现登录
    $("button").click(function () {
        //获得用户名
        var userName = $("#userName").val()

        //获得密码
        var password = $("#password").val()

        //调用登录
        login(userName,password)
    })
})

/**
 * 管理员登录函数
 * @param userName 用户名
 * @param password 用户密码
 */
function login(userName,password){
    //判断用户名及密码是否符合要求
    if (userExp(userName) && passwordExp(password)){
        //登录的ajax请求
        $.ajax({
            url:"admin/login.action",
            type:"post",
            async:false,
            data:{
                admin_name:userName,
                password:password,
            },success:function (data) {
                //设置管理员 cookie
                $.cookie("admin", data.adminName, {path: '/'})
                if (data == null || data == ""){
                    confirm("用户名或密码不正确，请检查！")
                    return;
                }else {
                    /*转向到管理员登录页面*/
                    window.open(getWeb() + "static/admin/backIndex.html","_blank")
                }
            },error:function () {
                //弹框提示错误
                Alert("登录提示","网络错误","error","知道了")
            }
        })
    }else {
        //弹框提示错误
        Alert("错误提示","用户名或密码格式，请检查！","warning","知道了")
    }
}

/*用户名规则判断函数 正确：true；错误：false*/
function userExp(userName) {
    /*用户名规则*/
    return /^[a-zA-Z0-9_-]{4,20}$/.test(userName);
}

/*密码规则 正确：true；错误：false*/
function passwordExp(password) {
    return password.length >= 5
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

/**
 *登录的返回
 * @param obj 控件对象   getWeb() + 'adminLogin.html'
 */
function back(obj){
    $(obj).attr('href',getWeb() + 'login.html')
}
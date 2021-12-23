/*用户列表的js文件*/
/*等待页面加载完毕*/
$(function (){
    /*判断当前用户是否登录*/
    if (isLogin()){
        /*登录了，清空 登录注册*/
        $("#login_register").empty()

        /*显示用户名*/
        $("#login_register").append(shortShowUserName())

        /*显示用户头像*/
        //判断用户信息中是否存在用户头像
        if (null != JSONStrToJSON($.cookie("user")).userAvatar){
            getUserAvatar()
        }

    }else {
        /*未登录，隐藏下拉菜单*/
        $("#pull_down_menu").hide()
    }

    /*加载对应页面信息*/
    iframeLoad()
    
})

/*iframe页面加载函数*/
navigation = function(id){
    //默认用户管理
    let src="user_list"

    //判断id
    if ("user_list" == id){
        //用户列表
        src = "user_list.html";
    }else if ("video_list" == id){
        //视频列表
        src = "video_list.html";
    }else if ("music_list" == id){
        //音乐列表
        src = "music_list.html";
    }else if ("picture_list" == id){
        //相册列表
        src = "picture_list.html";
    }else if ("order_list" == id){
        //订单列表
        src = "order_list.html";
    }

    //加载对应html
    $("#myframe").attr("src",src);
}

/*内容子页面*/
function iframeLoad() {
    /*设置子页面内容高度*/
    $("#iframe").height($("#iframe").outerHeight() + jQuery(window).height() + 400)
}

/*判断用户是否登录函数*/
function isLogin(){
    //获得当前浏览器的cookie值
    var user = $.cookie("user")

    //返回登录状态，true代表登录，false代表未登录
    return null != user && "" != user.trim()
}

/*用户下拉*/
layui.use(['dropdown', 'util', 'layer', 'table'], function () {
    var dropdown = layui.dropdown
        , util = layui.util
        , layer = layui.layer
        , table = layui.table
        , $ = layui.jquery;

    //初演示
    dropdown.render({
        elem: '.select'
        , data: [{
            title: '个人中心'
            , id: 100
        }, {
            title: '个人简历'
            , id: 101
        }, {
            title: '退出'
            , id: 102
        },
        ]
        , click: function (obj) {
            switch (obj.id){
                case 100:personCenter();break;//页面跳转到个人中心
                case 101:resume();break;//页面跳转到个人简历
                case 102:quit();break//退出登录
            }
        }
    });
})

/*简短显示用户名*/
function shortShowUserName() {

    //获得用户信息
    var user =  JSONStrToJSON($.cookie("user"));

    //获得用户名
    var userName = user.userName

    //判断用户名
    if (userName.toString().length > 6){
        userName = userName.substr(0,6) + ".."
    }
    return userName
}

/*解析用户登录返回的用户信息*/
function JSONStrToJSON(JSONStr){
    //转换json，返回
    return eval('(' + JSONStr + ')');
}

/**
 * 请求个人中心函数
 */
function personCenter(){
    window.location.href=getWeb() + "static/font/personal/personal.html"
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
 * 清除cookie
 */
function quit(){
    //删除cookie
    $.removeCookie("user",{path: '/'})

    //刷新当前页面
    location.reload();
}

/**
 * 获取用户头像ajax函数
 */
function getUserAvatar(){
    var windowUrl = window.URL || window.webkitURL;//处理浏览器兼容性
    var xhr = new XMLHttpRequest();
    var url = getWeb() + "/font/getUserAvatar.action?userId=" + user['userId'];//验证码请求地址
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            var blob = this.response;
            $("#demo1").attr("src", windowUrl.createObjectURL(blob));
            $("#avatar").attr("src", windowUrl.createObjectURL(blob));
        }
    }
    xhr.send();
}

/**
 * 设置用户头像
 */
function getUserAvatar(){
    //获得用户信息
    var user =  JSONStrToJSON($.cookie("user"));

    //获得用户名
    var userName = user.userName

    var windowUrl = window.URL || window.webkitURL;//处理浏览器兼容性

    var xhr = new XMLHttpRequest();

    var url = getWeb() + "/font/getUserAvatar.action?userId=" + user['userId'];//验证码请求地址

    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            var blob = this.response;
            $("#avatar").attr("src", windowUrl.createObjectURL(blob));
        }
    }
    xhr.send();
}

/**
 * 跳转到热门视频
 */
function popularVideos(){
    //跳转首页,展现视频
    window.location.href = getWeb() + "popularVideos.html"
}

/**
 * 跳转到热门音乐
 */
function popularMusic(){
    //跳转首页，展现音乐
    window.location.href = getWeb() + "popularMusic.html"
}

/**
 * 跳转到个人简历页面
 */
function resume(){
    if (!isLogin()){
        swal({
            title: "警告",
            text: "请先登录账户",
            icon: "warning",
            button: "知道了"
        });
        return;
    }
    window.open(getWeb() + "static/font/resume/resume.html","_blank")
}
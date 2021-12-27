//声明的全局变量
let ICON_SUCCESS = "success";//成功
let ICON_ERROR = "error";//错误
let ICON_WARNING = "warning";//警告

//请求方式
let REQUEST_GET="GET";//查询
let REQUEST_POST="POST";//增加
let REQUEST_PUT="PUT";//更改
let REQUEST_DELETE="DELETE";//删除


/**
 * 获得默认网站名 ，不包含文件地址
 * @returns {string}
 */
function getWeb() {
    //获得当前网址
    var url = window.location.href;
    var str = url.split('xiaomuzi')[0]

    //当前网址的字符串截取
    var websiteUrl = str + "xiaomuzi/"

    return websiteUrl
}

/**
 * 封装ajax
 * @param arg 用户传递的参数信息
 * @param url 请求地址
 * @param method 请求方式
 * @returns {string} 返回数据
 * @constructor
 */
function Ajax(arg,url,method){
    var result = ""

    $.ajax({
        url:url,
        type:method,
        async:false,
        data:{
            arg:arg
        },success:function (resp) {
            result = resp;
        },error:function (data) {
            sweetAlert("操作失败","服务器异常:" + data.status,"error","确定")
        }
    })

    return result;
}

/*手机号码规则判断 正确：true；错误：false*/
function phoneExp(regPhone) {
    return /^1[345789]\d{9}$/.test(regPhone)
}

/**
 * 根据用户id删除数据
 * @param userId 用户id
 * @param url 请求地址
 * @param method 删除方法
 */
function dataDel(userId,url,method){
    let result = Ajax(userId,url,method)
    if (result.data == 1){
        sweetAlert("删除提示","删除成功！",ICON_SUCCESS,"确定")
        return;
    }

    sweetAlert("删除提示","删除失败！",ICON_ERROR,"确定")
}

/**
 * 自定义弹窗
 * @param title 标题
 * @param text 内容
 * @param icon 显示状态图标
 * @param button 用户取消弹窗按钮内容
 */
function sweetAlert(title,text,icon,button){
    swal({
        title: title,
        text: text,
        icon: icon,
        button: button,
    });
}

/**
 * 视频、歌单、相册状态改变开关
 * @param obj 控件对象
 * @param data data
 * @param url 请求地址
 * @param method 请求方式
 */
function changeStatus(obj,data,url,method){
    //获得开关
    let status = data.elem.checked

    //获得控件id（视频id，歌单id，相册id等）
    let arg = obj.value

    //用户正常
    let value = 1;

    //用户禁用
    if (!status){
        value = 2;
    }

    $.ajax({
        url:url,
        type:method,
        data:{
            arg:arg,
            value:value,
        },success:function (resp) {
            if (resp['data'].accountState == 1){
                layer.tips('资源已启用', data.othis)
            }else {
                layer.tips('资源已禁用', data.othis)
            }

        },error:function (data) {
            sweetAlert("操作失败","服务器异常:" + data.status,"error","确定")
        }
    })
}
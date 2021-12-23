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
 * @param val 用户字段属性值
 * @param url 请求地址
 * @param method 请求方式
 * @returns {string} 返回数据
 * @constructor
 */
function Ajax(val,url,method){
    let result = ""

    $.ajax({
        url:url,
        type:method,
        data:{
            val:val
        },success:function (resp) {
            result = resp;
        },error:function () {
            swal({
                title: "操作失败",
                text: "未能成功删除该记录",
                icon: "error",
                button: "确定",
            });
        }
    })

    return result;
}

/*手机号码规则判断 正确：true；错误：false*/
function phoneExp(regPhone) {
    return /^1[345789]\d{9}$/.test(regPhone)
}
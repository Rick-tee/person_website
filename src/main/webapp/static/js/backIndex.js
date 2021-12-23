$(function () {
    //页面加载成功时执行
    //一秒调用一次
    setInterval("getDate()",1000);
})

// 获取实时时间
function getDate(){
    //清除
    $("#getTime").empty()

    //拼接
    tmpDate = new Date();
    date = tmpDate.getDate();
    month = tmpDate.getMonth() + 1;
    year = tmpDate.getFullYear();

    myArray = new Array(6);
    myArray[0] = "星期日"
    myArray[1] = "星期一"
    myArray[2] = "星期二"
    myArray[3] = "星期三"
    myArray[4] = "星期四"
    myArray[5] = "星期五"
    myArray[6] = "星期六"
    weekday = tmpDate.getDay();

    //星期
    var week = '';

    if (weekday == 0 | weekday == 6) {
        week = myArray[weekday]
    } else {
        week = myArray[weekday]
    }

    $("#getTime").text(year + "年" + month + "月" + date + "日" + week + "    "
        + tmpDate.getHours() + "时" + tmpDate.getMinutes() + "分"
        + tmpDate.getSeconds() + "秒");
}

/*iframe页面加载函数*/
navigation = function(id){
    //默认用户管理
    let src="user_list.html"

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
$(function () {
    //当前视频 bvid 号
    var bvid = localStorage.getItem("bvid")

    //获得当前视频json
    var video = localStorage.getItem("video")

    if (bvid == "" || bvid == null){
        //获得热门视频 随机视频类型
        biliVideo = biliVideoAjax(fields())
    }else {
        //表示用户点击了某个视频
        biliVideo = JSON.parse(video);
    }


    //设置视频
    setVideo(bvid)

    //喜欢列表
    likeVideo()

})

/**
 * 设置需要播放视频
 * @param bvid 传入的视频bvid
 */
function setVideo(bvid){
    //清空当前播放的视频
    $("#playVideo").empty();

    //解析视频,通过视频的bvid，找到该视频
    for (let i = 0; i < biliVideo.length; i++){

        //得到视频bvid
        var videoId = biliVideo[i]['bvid']

        //比对视频bvid，得到其余相关信息
        if (bvid == videoId){
            //获得视频的aid
            var aid = biliVideo[i]['aid']

            //获得视频标题
            var videoTitle = biliVideo[i]['title']

            //获得视频热度
            var play = "热度：" + biliVideo[i]['play']

            //获得视频发布时间 //这是int类型
            var pubdate = "时间：" + getDateFormate(biliVideo[i]['pubdate'])

            //获得视频简介
            var description = "简介：" + biliVideo[i]['description']

            //获得视频类型 ,默认舞蹈
            var tag = biliVideo[i]['tag'];

            if (tag == ""){
                tag = "舞蹈"
            }

            //设置参数
            //设置标题
            $("#VideoTitle").text(videoTitle)
            //设置热度
            $("#heat").text(play)
            //设置时间
            $("#time").text(pubdate)
            //设置简介
            $("#description").text(description)
            //设置类型
            $("#tag").text(tag)

            //拼接当前应该嵌入的视频
            var videoUrl = "//player.bilibili.com/player.html?aid=" + aid + "&bvid="+bvid;

            //嵌入视频
            $("#playVideo").append("<iframe width=\"720\" height=\"405\" frameborder=\"0\"\n" +
                "                        src=\""+videoUrl+"\" \n" +
                "                        allowfullscreen=\"true\"></iframe>")
        }
    }
}

/**
 * 打造喜欢视频推荐列表
 */
function likeVideo(){
    if (biliVideo.length > 8){
        //打造猜你喜欢模块
        for (let j = 0; j < 8; j++) {
            //获得封面图片地址
            var picUrl = biliVideo[j]['pic']
            //获得视频标题
            var videoTitle = biliVideo[j]['title']
            //视频的播放次数
            var videoPlay = biliVideo[j]['play']
            //视频id
            var videoId = biliVideo[j]['bvid']

            $("#guessVideo").append("<li><a href=\"#\" target=\"_self\" id=\""+videoId+"\" onclick=\"covert(this)\">\n" +
                "                <i><img\n" +
                "                    src=\"" + picUrl + "\" alt=\""+videoTitle+"\"></i>\n" +
                "                <p>"+videoTitle+"</p>\n" +
                "                <span>已有 + '"+videoPlay+"' + 人观看</span></a>\n" +
                "            </li>")
        }
    }else {
        for (let j = 0; j < 4; j++) {
            //获得封面图片地址
            var picUrl = biliVideo[j]['pic']
            //获得视频标题
            var videoTitle = biliVideo[j]['title']
            //视频的播放次数
            var videoPlay = biliVideo[j]['play']
            //视频id
            var videoId = biliVideo[j]['bvid']

            $("#guessVideo").append("<li><a href=\"#\" target=\"_self\" id=\""+videoId+"\" onclick=\"covert(this)\">\n" +
                "                <i><img\n" +
                "                    src=\"" + picUrl + "\" alt=\""+videoTitle+"\"></i>\n" +
                "                <p>"+videoTitle+"</p>\n" +
                "                <span>已有 + '"+videoPlay+"' + 人观看</span></a>\n" +
                "            </li>")
        }
    }
}

/**
 * 时间转换
 * @param intDate 整型时间参数
 * @returns {string} 返回 年-月-日 时间格式
 */
function getDateFormate(intDate){
    var dateStr = "";

    //创建日期对象
    var date = new Date();

    //传入要转换的参数
    date.setTime(intDate)

    //yyyy-MM-dd格式日期
    dateStr = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+date.getDay();

    //返回日期
    return dateStr;
}

/**
 * 视频id转换
 * @param obj 传入的标签对象
 */
function covert(obj){
    setVideo(obj.id)
}

/**
 * 点赞
 */
function praise(){
    //判断用户是否登录
    try{
        //获得用户信息
        var user =  JSONStrToJSON($.cookie("user"));

        //获得用户名
        var userName = user.userName

        Alert("提示","您的点赞收到了，感谢您的支持","success","确定")

    }catch (e) {
        Alert("提示","您还未登录，请先登录！","warning","知道了")
    }

}

/*解析用户登录返回的用户信息*/
function JSONStrToJSON(JSONStr){
    //转换json，返回
    return eval('(' + JSONStr + ')');
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
 * 视频上一页函数
 */
function videoPreviousPage() {
    //获得当前页码
    var currentPageNumber = parseInt($("#videoFirst").text())

    //判断当前页码
    if (currentPageNumber != 1 && currentPageNumber > 0) {
        //清空标签内容
        $("#guessVideo").empty()

        //上一页
        var previousPage = currentPageNumber - 1
        //起始数据量
        var startPage = (previousPage - 1) * 12
        //终止数据量
        var stopPage = startPage + 12

        try{
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                //获得封面图片地址
                var picUrl = biliVideo[i]['pic']
                //获得视频标题
                var videoTitle = biliVideo[i]['title']
                //视频的播放次数
                var videoPlay = biliVideo[i]['play']
                //视频id
                var videoId = biliVideo[i]['bvid']

                //页面拼接
                $("#guessVideo").append("<li>\n" +
                    "\t<a href=\"#\" id=\""+videoId+"\" onclick='videoId(this)'><i>\n" +
                    "\t\t\t<img src=\"" + picUrl + "\"\n" +
                    "\t\t\t\talt=\"" + videoTitle + "\"></i>\n" +
                    "\t\t<p>" + videoTitle + "</p>\n" +
                    "\t\t<span>已有 '" + videoPlay + "' 人观看</span>\n" +
                    "\t</a>\n" +
                    "</li>")
            }
        }catch (e){
            console.log(e)
        }finally {
            //设置当前页码
            $("#videoFirst").text(previousPage)
        }

    }
}

/**
 * 视频的下一页
 */
function videoNextPage() {
    //获得当前页码 页码从 1开始，数据则从0开始
    var currentPageNumber = parseInt($("#videoFirst").text())

    //判断当前页码
    if (currentPageNumber != Math.ceil(biliVideo.length / 12) && currentPageNumber < Math.ceil(biliVideo.length / 12)) {
        //清空标签内容
        $("#guessVideo").empty()
        //下一页
        var nextPage = currentPageNumber + 1
        //起始量
        var startPage = (currentPageNumber -1) + 12
        //截至量
        var stopPage = startPage + 13

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                //获得封面图片地址
                var picUrl = biliVideo[i]['pic']
                //获得视频标题
                var videoTitle = biliVideo[i]['title']
                //视频的播放次数
                var videoPlay = biliVideo[i]['play']
                //视频id
                var videoId = biliVideo[i]['bvid']

                //页面拼接
                $("#guessVideo").append("<li>\n" +
                    "\t<a href=\"#\" id=\""+videoId+"\" onclick='videoId(this)'><i>\n" +
                    "\t\t\t<img src=\"" + picUrl + "\"\n" +
                    "\t\t\t\talt=\"" + videoTitle + "\"></i>\n" +
                    "\t\t<p>" + videoTitle + "</p>\n" +
                    "\t\t<span>已有 '" + videoPlay + "' 人观看</span>\n" +
                    "\t</a>\n" +
                    "</li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#videoFirst").text(nextPage)
        }
    }
}

/**
 * 视频尾页
 */
function videoLastPage() {
    //获得当前页码
    var currentPageNumber = parseInt($("#videoFirst").text())
    //判断当前页码
    if (currentPageNumber != Math.ceil(biliVideo.length / 12)){
        //清空标签内容
        $("#guessVideo").empty()
        //尾页
        var lastPage = Math.ceil(biliVideo.length / 12)
        //起始量
        var startPage = (lastPage - 1) * 12
        //截至量
        var stopPage = lastPage * 12

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                //获得封面图片地址
                var picUrl = biliVideo[i]['pic']
                //获得视频标题
                var videoTitle = biliVideo[i]['title']
                //视频的播放次数
                var videoPlay = biliVideo[i]['play']
                //视频id
                var videoId = biliVideo[i]['bvid']

                //页面拼接
                $("#guessVideo").append("<li>\n" +
                    "\t<a href=\"#\" id=\""+videoId+"\" onclick='videoId(this)'><i>\n" +
                    "\t\t\t<img src=\"" + picUrl + "\"\n" +
                    "\t\t\t\talt=\"" + videoTitle + "\"></i>\n" +
                    "\t\t<p>" + videoTitle + "</p>\n" +
                    "\t\t<span>已有 '" + videoPlay + "' 人观看</span>\n" +
                    "\t</a>\n" +
                    "</li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#videoFirst").text(lastPage)
        }
    }
}
$(function () {
    /*页面加载完毕*/
    //获得热门视频
    biliVideo = biliVideoAjax(fields())

    //组成热门视频
    video(biliVideo)

    //设置视频总页码
    $("#videoTotalPageNumber").text(Math.ceil(biliVideo.length / 12))

    //获得热门歌单
    musicSong = songAjax();

    //组成歌单信息
    music(musicSong)

    //设置歌单总页码
    $("#musicTotalPageNumber").text(Math.ceil(musicSong['data']['list'].length / 12))

    //获得热门图片
    pictureList = pictureAjax();

    //组成热门图片
    picture(pictureList)

    //判断用户是否登录
    if ($.cookie("user")) {
        //登录即显示悄悄话和心愿，否则不显示和隐藏
        $("#bigBanner").show()
        talk($.cookie('user'))
    }

    //热门视频点击更新
    $(document).on('click',"#popularVideos",function () {
        //视频数据清空
        $("#video").empty()
        //重新请求数据
        video(biliVideoAjax(fields()))
    })

    //热门歌单点击更新
    $(document).on('click',"#popularPlaylist",function () {
        //歌单数据清空
        $("#music").empty()
        music(songAjax())
    })

    //热门图片点击更新
    $(document).on('click',"#popularPictures",function () {
        //图片数据清空
        $("#picList").empty()
        picture(pictureAjax())
    })

})

/*bilibil视频接口请求ajax*/
function biliVideoAjax(keyword) {
    //返回视频哔哩哔哩视频json
    var biliVideo = "";

    $.ajax({
        url: getWeb() + "video/video.action",
        async: false,
        data: {
            keyword: keyword,
        },
        type: "get",
        success: function (data) {
            //转换json
            var json = JSON.parse(data[0])

            //获得视频集合
            biliVideo = json['data']['result']
        },
        error: function () {
            swal({
                title: "网络崩溃",
                text: "视频请求失败，请检查接口！",
                icon: "error",
                button: "知道了",
            });
        },
    })
    return biliVideo;
}

/**
 * 点击视频列表中的一个操作
 * @param obj 列表对象
 */
function videoId(obj) {
    //存放 视频id号码
    window.localStorage.setItem("bvid", obj.id)

    //将视频json存储为str字符串
    var video = JSON.stringify(biliVideo)

    //视频字符串存储
    window.localStorage.setItem("video", video)

    //页面跳转
    window.location.href = getWeb() + "videotail.html"
}

/**
 * 歌单id
 * @param obj 当前dom对象
 */
function musicId(objId){
    //存放 音乐当前歌单id号码
    window.localStorage.setItem("musicId", objId)

    //将歌单json存储为str字符串
    var music = JSON.stringify(musicSong)

    //存放音乐字符串
    window.localStorage.setItem("music",music);

    //页面跳转
    window.location.href = getWeb() + "musicDetail.html"
}

/**
 *视频列表打造
 * @param videoJson 视频数据json格式
 */
function video(videoJson) {
    if (videoJson.length == 0) {
        swal({
            title: "加载提示",
            text: "该视频内容字段不存在，请检查！",
            icon: "warning",
            button: "知道了",
        });
        return;
    }
    //判断视频的个数
    if (videoJson.length < 12) {
        for (let i = 0; i < videoJson.length; i++) {
            //获得封面图片地址
            var picUrl = videoJson[i]['pic']
            //获得视频标题
            var videoTitle = videoJson[i]['title']
            //视频的播放次数
            var videoPlay = videoJson[i]['play']
            //视频id
            var videoId = biliVideo[i]['bvid']

            //页面拼接
            $("#video").append("<li>\n" +
                "\t<a href=\"#'\" id=\"" + videoId + "\" onclick='videoId(this)'><i>\n" +
                "\t\t\t<img src=\"" + picUrl + "\"\n" +
                "\t\t\t\talt=\"" + videoTitle + "\"></i>\n" +
                "\t\t<p>" + videoTitle + "</p>\n" +
                "\t\t<span>已有 '" + videoPlay + "' 人观看</span>\n" +
                "\t</a>\n" +
                "</li>")
        }
    } else {
        for (let i = 0; i < 12; i++) {
            //获得封面图片地址
            var picUrl = videoJson[i]['pic']
            //获得视频标题
            var videoTitle = videoJson[i]['title']
            //视频的播放次数
            var videoPlay = videoJson[i]['play']
            //视频id
            var videoId = biliVideo[i]['bvid']

            //页面拼接
            $("#video").append("<li>\n" +
                "\t<a href=\"#\" id=\"" + videoId + "\" onclick='videoId(this)'><i>\n" +
                "\t\t\t<img src=\"" + picUrl + "\"\n" +
                "\t\t\t\talt=\"" + videoTitle + "\"></i>\n" +
                "\t\t<p>" + videoTitle + "</p>\n" +
                "\t\t<span>已有 '" + videoPlay + "' 人观看</span>\n" +
                "\t</a>\n" +
                "</li>")
        }
    }

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
        $("#video").empty()

        //上一页
        var previousPage = currentPageNumber - 1
        //起始数据量
        var startPage = (previousPage - 1) * 12
        //终止数据量
        var stopPage = startPage + 12

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
                $("#video").append("<li>\n" +
                    "\t<a href=\"#\" id=\"" + videoId + "\" onclick='videoId(this)'><i>\n" +
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
        $("#video").empty()
        //下一页
        var nextPage = currentPageNumber + 1
        //起始量
        var startPage = (currentPageNumber - 1) + 12
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
                $("#video").append("<li>\n" +
                    "\t<a href=\"#\" id=\"" + videoId + "\" onclick='videoId(this)'><i>\n" +
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
    if (currentPageNumber != Math.ceil(biliVideo.length / 12)) {
        //清空标签内容
        $("#video").empty()
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
                $("#video").append("<li>\n" +
                    "\t<a href=\"#\" id=\"" + videoId + "\" onclick='videoId(this)'><i>\n" +
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

/**
 * 热门歌单推荐接口请求ajax
 * @returns {string} 返回歌单列表
 */
function songAjax() {
    var songList = ""

    $.ajax({
        url: getWeb() + 'music/music.action',
        type: 'get',
        async: false,
        success: function (data) {
            songList = data
        },
        error: function () {
            swal({
                title: "网络崩溃",
                text: "音乐请求失败，请检查接口！",
                icon: "error",
                button: "知道了",
            });
        },
    })
    return songList
}

/**
 * 音乐列表json数据，默认添加
 * @param musicSong json数据格式的音乐
 */
function music(musicSong) {
    //转换json数据格式
    var musicJson = musicSong

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //默认当前显示12个
    if (totalPlaylist.length > 12) {
        //遍历歌单
        for (let i = 0; i < 12; i++) {
            //歌单名
            var specialName = totalPlaylist[i]['specialname']
            //歌单图片
            var imgUrl = totalPlaylist[i]['imgurl']

            //替换图片中的{size} 为150
            imgUrl = imgUrl.replace(/{size}/,"150")

            //歌单介绍
            var intro = totalPlaylist[i]['intro']
            //歌曲数量
            var songCount = totalPlaylist[i]['songcount']

            //歌单id
            var specialid = totalPlaylist[i]['specialid']

            //歌单列表拼接
            $("#music").append("<li>\n" +
                "                                <a href=\"#\" onclick='musicId("+specialid+")'>\n" +
                "                                <i>\n" +
                "                                <img src=\"" + imgUrl + "\" alt=\"图片丢失了\">\n" +
                "                                </i>\n" +
                "                                <p>" + specialName + "</p>\n" +
                "                                <span>" + songCount + " + 歌曲</span>\n" +
                "                                </a>\n" +
                "                            </li>")
        }
    } else {
        //遍历歌单
        for (let i = 0; i < totalPlaylist.length; i++) {
            //歌单名
            var specialName = totalPlaylist[i]['specialname']
            //歌单图片
            var imgUrl = totalPlaylist[i]['imgurl']
            //歌单介绍
            var intro = totalPlaylist[i]['intro']
            //歌曲数量
            var songCount = totalPlaylist[i]['songcount']
            //歌单id
            var specialid = totalPlaylist[i]['specialid']

            //歌单列表拼接
            $("#music").append("<li>\n" +
                "                                <a href=\"#\" onclick='musicId("+specialid+")'>\n" +
                "                                <i>\n" +
                "                                <img src=\"" + imgUrl + "\" alt=\"图片丢失了\">\n" +
                "                                </i>\n" +
                "                                <p>" + specialName + "</p>\n" +
                "                                <span>" + songCount + " + 歌曲</span>\n" +
                "                                </a>\n" +
                "                            </li>")
        }
    }


}

/**
 * 音乐的上一页函数
 */
function musicPreviousPage() {
    //获得当前页码
    var currentPageNumber = parseInt($("#musicFirst").text())
    //转换json数据格式
    var musicJson = musicSong

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //判断当前页码
    if (currentPageNumber != 1 && currentPageNumber > 0) {
        //清空标签内容
        $("#music").empty()

        //上一页
        var previousPage = currentPageNumber - 1
        //起始数据量
        var startPage = (previousPage - 1) * 12
        //终止数据量
        var stopPage = startPage + 12

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                //歌单名
                var specialName = totalPlaylist[i]['specialname']
                //歌单图片
                var imgUrl = totalPlaylist[i]['imgurl']
                //替换图片中的{size} 为150
                imgUrl = imgUrl.replace(/{size}/,"150")
                //歌单介绍
                var intro = totalPlaylist[i]['intro']
                //歌曲数量
                var songCount = totalPlaylist[i]['songcount']
                //歌单歌曲列表
                var songs = totalPlaylist[i]['songs']

                //歌单id
                var specialid = totalPlaylist[i]['specialid']

                //歌单列表拼接
                $("#music").append("<li>\n" +
                    "                                <a href=\"#\" onclick='musicId("+specialid+")'>\n" +
                    "                                <i>\n" +
                    "                                <img src=\"" + imgUrl + "\" alt=\"图片丢失了\">\n" +
                    "                                </i>\n" +
                    "                                <p>" + specialName + "</p>\n" +
                    "                                <span>" + songCount + " + 歌曲</span>\n" +
                    "                                </a>\n" +
                    "                            </li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#musicFirst").text(previousPage)
        }
    }
}

/**
 * 音乐的下一页函数
 */
function musicNextPage() {
    //获得当前页码 页码从 1开始，数据则从0开始
    var currentPageNumber = parseInt($("#musicFirst").text())
    //转换json数据格式
    var musicJson = musicSong

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //判断当前页码
    if (currentPageNumber != Math.ceil(musicSong.length / 12) && currentPageNumber < Math.ceil(biliVideo.length / 12)) {
        //清空标签内容
        $("#music").empty()
        //下一页
        var nextPage = currentPageNumber + 1
        //起始量
        var startPage = (currentPageNumber - 1) + 12
        //截至量
        var stopPage = startPage + 13

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                //歌单名
                var specialName = totalPlaylist[i]['specialname']
                //歌单图片
                var imgUrl = totalPlaylist[i]['imgurl']
                //替换图片中的{size} 为150
                imgUrl = imgUrl.replace(/{size}/,"150")
                //歌单介绍
                var intro = totalPlaylist[i]['intro']
                //歌曲数量
                var songCount = totalPlaylist[i]['songcount']
                //歌单歌曲列表
                var songs = totalPlaylist[i]['songs']
                //歌单id
                var specialid = totalPlaylist[i]['specialid']

                //歌单列表拼接
                $("#music").append("<li>\n" +
                    "                                <a href=\"#\" target=\"_self\" onclick='musicId("+specialid+")'>\n" +
                    "                                <i>\n" +
                    "                                <img src=\"" + imgUrl + "\" alt=\"图片丢失了\">\n" +
                    "                                </i>\n" +
                    "                                <p>" + specialName + "</p>\n" +
                    "                                <span>" + songCount + " + 歌曲</span>\n" +
                    "                                </a>\n" +
                    "                            </li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#musicFirst").text(nextPage)
        }
    }
}

/**
 * 音乐歌单尾页函数
 */
function musicLastPage() {
    //获得当前页码 页码从 1开始，数据则从0开始
    var currentPageNumber = parseInt($("#musicFirst").text())
    //转换json数据格式
    var musicJson = musicSong

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //判断当前页码
    if (currentPageNumber != Math.ceil(totalPlaylist.length / 12)) {
        //清空标签内容
        $("#music").empty()
        //尾页
        var lastPage = Math.ceil(totalPlaylist.length / 12)
        //起始量
        var startPage = (lastPage - 1) * 12
        //截至量
        var stopPage = lastPage * 12

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                //歌单名
                var specialName = totalPlaylist[i]['specialname']
                //歌单图片
                var imgUrl = totalPlaylist[i]['imgurl']
                //替换图片中的{size} 为150
                imgUrl = imgUrl.replace(/{size}/,"150")
                //歌单介绍
                var intro = totalPlaylist[i]['intro']
                //歌曲数量
                var songCount = totalPlaylist[i]['songcount']
                //歌单歌曲列表
                var songs = totalPlaylist[i]['songs']
                //歌单id
                var specialid = totalPlaylist[i]['specialid']

                //歌单列表拼接
                $("#music").append("<li>\n" +
                    "                                <a href=\"#\" target=\"_self\" onclick='musicId("+specialid+")'>\n" +
                    "                                <i>\n" +
                    "                                <img src=\"" + imgUrl + "\" alt=\"图片丢失了\">\n" +
                    "                                </i>\n" +
                    "                                <p>" + specialName + "</p>\n" +
                    "                                <span>" + songCount + " + 歌曲</span>\n" +
                    "                                </a>\n" +
                    "                            </li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#musicFirst").text(lastPage)
        }
    }
}

/**
 * 获得图片ajax
 * @returns {string} 返回list图片集合
 */
function pictureAjax(){
    var picList = "";

    $.ajax({
        url:getWeb() + 'picture/' + "picture.action",
        type:"get",
        async:false,
        data:{
            count:"24",
        },
        success:function (data) {
            picList = data[0];
        },
        error: function () {
            swal({
                title: "网络错误",
                text: "图片请求失败，请检查网络！",
                icon: "error",
                button: "知道了",
            });
        },
    })

    return picList;
}

/**
 * 组合热门图片
 * @param pictureList 热门图片集合
 */
function picture(pictureList){
    //json数据转换
    var pictureList = JSON.parse(pictureList)

    //设置图片总页码
    $("#picTotalPageNumber").text(Math.ceil(pictureList.length / 12))

    if (pictureList.length < 12){
        //图片列表循环遍历
        for (let i = 0; i < pictureList.length; i++) {
            //页面拼接
            $("#picList").append("<li><a href=\"#\"><i><img class=\"pimg\" id='pic"+i+"' src='"+pictureList[i]+"' alt=\"图片地址丢失\" title='狗狗萌宠大PK' width='286' height='286'></i></a></li>")
        }
    }else {
        //图片列表循环遍历
        for (let i = 0; i < 12; i++) {
            //页面拼接
            $("#picList").append("<li><a href=\"#\"><i><img class=\"pimg\" id='pic"+i+"' src='"+pictureList[i]+"' alt=\"图片地址丢失\" title='狗狗萌宠大PK' width='286' height='286'></i></a></li>")
        }
    }
}

/**
 * 图片的上一页函数
 */
function picPreviousPage(pictureList) {
    //获得当前页码
    var currentPageNumber = parseInt($("#picFirst").text())

    //数据转换
    var pictureList = JSON.parse(pictureList)

    //判断当前页码
    if (currentPageNumber != 1 && currentPageNumber > 0) {
        //清空标签内容
        $("#picList").empty()

        //上一页
        var previousPage = currentPageNumber - 1

        //起始数据量
        var startPage = (previousPage - 1) * 12

        //终止数据量
        var stopPage = startPage + 12

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                $("#picList").append("<li><a href=\"#\"><i><img class=\"pimg\" id='pic"+i+"' src='"+pictureList[i]+"' alt=\"图片地址丢失\" title='狗狗萌宠大PK' width='286' height='286'></i></a></li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#picFirst").text(previousPage)
        }
    }
}

/**
 * 图片的下一页函数
 */
function picNextPage(pictureList) {
    //获得当前页码
    var currentPageNumber = parseInt($("#picFirst").text())

    //数据转换
    var pictureList = JSON.parse(pictureList)

    //判断当前页码
    if (currentPageNumber != Math.ceil(pictureList.length / 12) && currentPageNumber < Math.ceil(pictureList.length / 12)) {
        //清空标签内容
        $("#picList").empty()
        //下一页
        var nextPage = currentPageNumber + 1
        //起始量
        var startPage = (currentPageNumber - 1) + 12
        //截至量
        var stopPage = startPage + 12

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                $("#picList").append("<li><a href=\"#\"><i><img class=\"pimg\" id='pic"+i+"' src='"+pictureList[i]+"' alt=\"图片地址丢失\" title='狗狗萌宠大PK' width='286' height='286'></i></a></li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#picFirst").text(nextPage)
        }
    }
}

/**
 * 图片的尾页
 */
function picLastPage(pictureList) {
    //获得当前页码
    var currentPageNumber = parseInt($("#picFirst").text())

    //数据转换
    var pictureList = JSON.parse(pictureList)

    //判断当前页码
    if (currentPageNumber != Math.ceil(pictureList.length / 12)) {
        //清空标签内容
        $("#picList").empty()
        //尾页
        var lastPage = Math.ceil(pictureList.length / 12)
        //起始量
        var startPage = (lastPage - 1) * 12
        //截至量
        var stopPage = lastPage * 12

        try {
            //依次遍历json数据，定位数据点
            for (let i = startPage; i < stopPage; i++) {
                $("#picList").append("<li><a href=\"#\"><i><img class=\"pimg\" id='pic"+i+"' src='"+pictureList[i]+"' alt=\"图片地址丢失\" title='狗狗萌宠大PK' width='286' height='286'></i></a></li>")
            }
        } catch (e) {
            console.log(e)
        } finally {
            //设置当前页码
            $("#picFirst").text(lastPage)
        }
    }
}

/**
 * 获得默认网站名 ，不包含文件地址
 * @returns {string} 返回当前的网址
 */
function getWeb() {
    //获得当前网址
    var url = window.location.href;

    //当前网址的字符串截取
    var websiteUrl = url.substring(0, url.lastIndexOf('/') + 1)

    return websiteUrl
}

/**
 * 随机产生搜索字段
 * @returns {any} 返回搜索字段
 */
function fields(){
    //创建数组
    var field = new Array();

    //添加数据
    field.push("音乐")
    field.push("舞蹈")
    field.push("知识")
    field.push("生活")
    field.push("时尚")
    field.push("娱乐")
    field.push("国创")
    field.push("游戏")
    field.push("科技")
    field.push("鬼畜")
    field.push("咨询")

    //产生随机数
    var randNumber = Math.floor(Math.random() * field.length)

    //产生随机搜索字段
    var keyword = field[randNumber]

    //返回搜索随机关键字
    return keyword;

}

/**
 * 我的视频
 * @param user 用户信息
 */
function myVideo(user){
    //判断用户是否登录
    if (user == undefined){
        swal({
            title: "未登录",
            text: "请先登录",
            icon: "warning",
            button: "知道了",
        });
        return;
    }

    //页面跳转到个人中心
    window.open(getWeb() + "static/font/personal/personal.html","_blank");

    /*//转换json
    var user = JSON.parse(user)

    //获得userId
    var userId = user.userId

    //给出视频资源找不到时的提示
    var message = "对不起，你未上传任何视频，点击确定去上传";

    //请求查询的用户视频数量地址
    var url = getWeb() + "video/selectVideoCountByUserId.action";

    //视频存在，跳转地址
    var videoJumpUrl = "";

    //跳转视频上传地址
    var uploadVideoUrl = "";

    //调用ajax查询用户是否拥有视频
    doesItExistVideoMusicPic(userId,message,url,uploadVideoUrl,videoJumpUrl);*/

}

/**
 * 判断用户视频、歌单、相册是否存在
 * @param userId 用户id
 * @param message 资源不存在时，提示信息
 * @param url 用户的请求地址
 * @param uploadResourceUrl 资源上传、创建地址
 * @param resourceJumpUrl 资源展示地址
 */
function doesItExistVideoMusicPic(userId,message,url,uploadResourceUrl,resourceJumpUrl){
    $.ajax({
        url:url,
        type:"post",
        data:{
            userId:userId,
        },
        success:function (data) {
            if (data != 0){
                //页面跳转
                window.location.href=videoJumpUrl
            }else {
                //弹窗提示
                if (confirm(message)){
                    //用户点击确定，跳转上传视频
                    window.location.href=uploadVideoUrl
                }
            }
        },
        error:function (resp) {
            //错误提示
            switch (resp.status){
                case 404:swal({
                    title: "404",
                    text: "页面丢失",
                    icon: "error",
                    button: "知道了",
                });break;
                case 500:swal({
                    title: "500",
                    text: "服务器崩溃，程序员小哥抢救中！",
                    icon: "error",
                    button: "知道了",
                });break;
                default:swal({
                    title: "未知错误",
                    text: "出现预计之外的错误！",
                    icon: "error",
                    button: "知道了",
                });break;
            }
        }
    })
}

/**
 * 我的歌单
 * @param user 用户信息
 */
function myPlaylist(user){
    //判断用户是否登录
    if (user == undefined){
        swal({
            title: "未登录",
            text: "请先登录",
            icon: "warning",
            button: "知道了",
        });
        return;
    }

    //页面跳转到个人中心
    window.open(getWeb() + "static/font/personal/personal.html","_blank");
    /*//转换json
    var user = JSON.parse(user)

    //获得userId
    var userId = user.userId

    //给出歌单资源找不到时的提示
    var message = "对不起，你未创建任何歌单，点击确定去创建";

    //请求查询的用户歌单数量地址
    var url = getWeb() + "music/selectMusicCountByUserId.action";

    //歌单存在，跳转地址
    var musicJumpUrl = "";

    //跳转歌单创建地址
    var uploadMusicUrl = "";

    //调用ajax查询用户是否拥有歌单
    doesItExistVideoMusicPic(userId,message,url,uploadMusicUrl,musicJumpUrl);*/
}

/**
 * 我的相册
 * @param user 用户信息
 */
function myPicture(user){
    //判断用户是否登录
    if (user == undefined){
        swal({
            title: "未登录",
            text: "请先登录",
            icon: "warning",
            button: "知道了",
        });
        return;
    }

    //页面跳转到个人中心
    window.open(getWeb() + "static/font/personal/personal.html","_blank");
    /*//转换json
    var user = JSON.parse(user)

    //获得userId
    var userId = user.userId

    //给出相册资源找不到时的提示
    var message = "对不起，你未创建任何相册，点击确定去创建";

    //请求查询的用户相册数量地址
    var url = getWeb() + "picture/selectPictureCountByUserId.action";

    //相册存在，跳转地址
    var pictureJumpUrl = "";

    //跳转相册创建地址
    var uploadPictureUrl = "";

    //调用ajax查询用户是否拥有相册
    doesItExistVideoMusicPic(userId,message,url,uploadPictureUrl,pictureJumpUrl);*/
}

/**
 * 设置悄悄话
 * @param user 用户 对象
 */
function talk(user){
    //转换json
    var user = JSON.parse(user)

    //设置左边悄悄话
    $("#left_whispers_context").val(user.leftWish)

    //设置右边悄悄话
    $("#right_whispers_context").val(user.rightWhisper)
}
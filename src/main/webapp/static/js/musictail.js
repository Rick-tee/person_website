$(function (){
    //等待页面加载完毕
    /*拿到当前歌单的id*/
    var musicId = window.localStorage.getItem("musicId")

    //获得首页歌单信息
    var music = window.localStorage.getItem("music")

    //当前歌单不存在
    if (music == "" || music == null){
        //获得热门歌单
        songList = songAjax()

        //判断music
        if (musicId == "" || musicId == null){
            //获得一个当前热门歌单中的music
            musicId = songList['data']['list'][0]['specialid']

        }
    }else {
        //歌单信息存在
        songList = JSON.parse(music)
    }

    //调用组装歌曲函数
    getMusicInfoList(musicId)

    //打造猜你喜欢歌曲列表
    buildUpMusicList(songList)
})

/**
 * 通过id，获得当前音乐
 * @param obj id
 */
function updateNow(obj){
    //存放 音乐当前歌单id号码
    window.localStorage.setItem("musicId", obj)

    //将歌单json存储为str字符串
    var music = JSON.stringify(musicSong)

    //存放音乐字符串
    window.localStorage.setItem("music",music);

    //页面跳转
    window.location.href = getWeb() + "musicDetail.html"
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
 * 组装当前播放歌曲及歌曲列表歌曲
 * @param musicId 当前歌单id
 */
function getMusicInfoList(musicId){
    //获得音乐数据
    songList = songAjax()

    //总歌单列表
    var totalPlaylist = songList['data']['list']

    //设置总页码
    $("#musicTotal").text(Math.ceil(totalPlaylist.length / 8))

    //获得当前歌单
    for (let i = 0; i < totalPlaylist.length; i++) {
        //判断集合中的歌单id
        if (musicId == totalPlaylist[i]['specialid']) {
            //获得歌单名
            var specialname = totalPlaylist[i]['specialname']

            //获得简介
            var intro = totalPlaylist[i]['intro']

            //播放次数
            var playcount = totalPlaylist[i]['playcount']

            //类型
            var reason = totalPlaylist[i]['reason']

            //设置右侧歌单信息
            //标题
            $("#musicTitle").text(specialname)
            //热度
            $("#heat").text("热度：" + playcount)
            //时间
            $("#time").text("时间：" + new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate())
            //简介
            $("#description").text("简介：" + intro)
            //类型
            $("#tag").text(reason)
        }else {
            //获得歌单名
            var specialname = totalPlaylist[i]['specialname']

            //获得简介
            var intro = totalPlaylist[i]['intro']

            //播放次数
            var playcount = totalPlaylist[i]['playcount']

            //类型
            var reason = totalPlaylist[i]['reason']

            //设置右侧歌单信息
            //标题
            $("#musicTitle").text(specialname)
            //热度
            $("#heat").text("热度：" + playcount)
            //时间
            $("#time").text("时间：" + new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate())
            //简介
            $("#description").text("简介：" + intro)
            //类型
            $("#tag").text(reason)
        }
    }
}

/**
 * 音乐列表json数据，默认添加
 * @param musicSong json数据格式的音乐
 */
function buildUpMusicList(musicSong) {
    //转换json数据格式
    var musicJson = musicSong

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //设置当前总页码数
    $("#musicTotal").text(Math.ceil(totalPlaylist.length / 8))

    //默认当前显示8个
    if (totalPlaylist.length > 8) {
        //遍历歌单
        for (let i = 0; i < 8; i++) {
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
            $("#playMusic").append("<li>\n" +
                "                                <a href=\"#\" onclick='getMusicInfoList("+specialid+");updateNow("+specialid+")'>\n" +
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
            $("#playMusic").append("<li>\n" +
                "                                <a href=\"#\" onclick='getMusicInfoList("+specialid+");updateNow("+specialid+")'>\n" +
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
function musicNowPreviousPage() {
    //获得当前页码
    var currentPageNumber = parseInt($("#musicFirst").text())
    //转换json数据格式
    var musicJson = musicSong

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //判断当前页码
    if (currentPageNumber != 1 && currentPageNumber > 0) {
        //清空标签内容
        $("#playMusic").empty()

        //上一页
        var previousPage = currentPageNumber - 1
        //起始数据量
        var startPage = (previousPage - 1) * 8
        //终止数据量
        var stopPage = startPage + 8

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
                $("#playMusic").append("<li>\n" +
                    "                                <a href=\"#\" onclick='getMusicInfoList("+specialid+");updateNow("+specialid+")'>\n" +
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
function musicNowNextPage() {
    //获得当前页码 页码从 1开始，数据则从0开始
    var currentPageNumber = parseInt($("#musicFirst").text())
    //转换json数据格式
    var musicJson = songAjax()

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //判断当前页码
    if (currentPageNumber != Math.ceil(totalPlaylist.length / 8) && currentPageNumber < Math.ceil(totalPlaylist.length / 8)) {
        //清空标签内容
        $("#playMusic").empty()
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
                $("#playMusic").append("<li>\n" +
                    "                                <a href=\"#\" target=\"_self\" onclick='getMusicInfoList("+specialid+");updateNow("+specialid+")'>\n" +
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
function musicNowLastPage() {
    //获得当前页码 页码从 1开始，数据则从0开始
    var currentPageNumber = parseInt($("#musicFirst").text())
    //转换json数据格式
    var musicJson = musicSong

    //总歌单列表
    var totalPlaylist = musicJson['data']['list']

    //判断当前页码
    if (currentPageNumber != Math.ceil(totalPlaylist.length / 8)) {
        //清空标签内容
        $("#playMusic").empty()
        //尾页
        var lastPage = Math.ceil(totalPlaylist.length / 8)
        //起始量
        var startPage = (lastPage - 1) * 8
        //截至量
        var stopPage = lastPage * 8

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
                $("#playMusic").append("<li>\n" +
                    "                                <a href=\"#\" target=\"_self\" onclick='getMusicInfoList("+specialid+");updateNow("+specialid+")'>\n" +
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

/*函数弹出框提示*/
function Alert(title, text, icon, button) {
    swal({
        title: title,
        text: text,
        icon: icon,
        button: button,
    });
}
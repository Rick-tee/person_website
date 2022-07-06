$(function () {
    //左边心愿剩余字数，默认
    leftSurplusFont = 130;

    //右边悄悄话剩余字数，默认
    rightSurplusFont = 130;

    //视频id
    videoId = ""

    //获得用户 userId
    var userId = JSON.parse($.cookie("user"))['userId']

    //更新用户信息
    getUserInfoByUserId(userId)

    //获得当前用户对象
    user = JSON.parse($.cookie("user"))

    //获得空间状态
    var spaceState = user['spaceState']

    //获取空间容量
    var freeSpace = user['freeSpace']

    //设置空间容量
    if (spaceState == 0) {
        //用户未开通空间
        $("#free_space").text(freeSpace + "GB")
        //用户点击提升空间，跳转支付界面
        $("#pay").click(function () {
            pay()
        })
    } else {
        //用户已开通空间
        $("#free_space").text("恭喜你拥有永久空间!")
        //更新 ‘提升空间容量’ 按钮样式 及无效
        $("#pay").attr("disabled", true)
        //设置按钮隐藏
        $("#pay").attr("hidden", true)
    }

    //设置当前用户名框
    $("#userName").val(user['userName'])

    //设置当前密码框
    //使用 * 字符，替换密码
    $("#password").val(user['password'].replaceAll("*").substr(0, 6))

    //设置当前用户性别
    switch (user['userSex']) {
        case '0':
            $("#nv").checked;
            break;
        case '1':
            $("#nan").checked;
            break;
        default:
    }

    //展示用户头像
    getUserAvatar()

    //设置当前电话号码
    $("#phone").val(user['phone'])

    //设置当前邮箱
    $("#email").val(user['email'])

    //设置详细地址
    $("#address").val(user['address'])

    //设置左边心愿
    $("#leftWish").text(user['leftWish'])

    //设置右边悄悄话
    $("#rightWhisper").text(user['rightWhisper'])

    //设置省份
    var provinceObj = getProvince()

    /**
     * 单机更新密码 按钮
     */
    $("#updatePwd").click(function () {
        if ($("#password").val().trim().length < 6) {
            //用户更新的密码长度，小于 6 ，给提示
            swal({
                title: "警告",
                text: "密码长度不符合规范",
                icon: "warning",
                button: "知道了"
            });
            return;
        }
        //执行到此，说明密码符合规范，更新密码
        updatePassword(JSON.parse($.cookie("user"))['userId'], $("#password").val())
    })

    /**
     * 用户名输入框按键弹起函数
     */
    $("#userName").keyup(function () {
        if (!userExp($("#userName").val())) {
            $("#userNameError").text('用户名不合法！')
        }
    })

    /**
     * 用户名输入框按键按下，清除错误提示
     */
    $("#userName").keydown(function () {
        $("#userNameError").text('')
    })

    /**
     * 密码输入框按键弹起函数
     */
    $("#password").keyup(function () {
        if (!passwordExp($("#password").val())) {
            $("#pwdError").text('长度最低6位!')
        }
    })

    /**
     * 密码输入框按键按下，清除错误提示
     */
    $("#password").keydown(function () {
        $("#pwdError").text('')
    })

    /**
     * 手机号码输入框按键弹起，判断手机格式是否有误，无误
     * 进行联网检测手机号码是否被注册，是：错误提示
     */
    $("#phone").keyup(function () {
        if (!phoneExp($("#phone").val())) {
            $("#phoneError").text('手机号码格式有误，请检查！')
        } else {
            //查询该手机号码是否被注册
            var userInfoByPhone = selectByPhone($("#phone").val())

            if (userInfoByPhone != "") {
                $("#phoneError").text("已被注册!")
            }
        }
    })

    /**
     * 手机号码输入框，按键按下，清除错误提示
     */
    $("#phone").keydown(function () {
        $("#phoneError").text('')
    })

    /**
     * 邮箱输入框按键弹起，判断邮箱格式是否有误，无误
     * 进行联网检测邮箱是否被注册，是：错误提示
     */
    $("#email").keyup(function () {
        if (!phoneExp($("#email").val())) {
            $("#emailError").text('邮箱格式有误，请检查！')
        } else {
            //查询该手机号码是否被注册
            var userInfoByPhone = selectByEmail($("#email").val())

            if (userInfoByPhone != "") {
                $("#emailError").text("已被注册!")
            }
        }
    })

    /**
     * 邮箱输入框，按键按下，清除错误提示
     */
    $("#email").keydown(function () {
        $("#emailError").text('')
    })

    /**
     * 左边心愿输入框，按键弹起，字数提示
     */
    $("#leftWish").keyup(function () {
        //获得字数
        var fontCount = $("#leftWish").val().length

        //剩余字符输入量
        leftSurplusFont = 130 - fontCount;

        if (leftSurplusFont < 0) {
            $("#leftWishError").text('请注意字符数量！')
            return;
        }

        $("#leftWishError").text('还可以输入' + leftSurplusFont + '个字符')
    })

    /**
     * 左边心愿输入框，按键按下，判断字数
     */
    $("#leftWish").keydown(function () {
        $("#leftWishError").text('还可以输入' + leftSurplusFont + '个字符')
    })

    /**
     * 右边心愿输入框，按键弹起，字数提示
     */
    $("#rightWhisper").keyup(function () {
        //获得字数
        var fontCount = $("#rightWhisper").val().length

        //剩余字符输入量
        rightSurplusFont = 130 - fontCount;

        if (rightSurplusFont < 0) {
            $("#rightWhisperError").text('请注意字符数量！')
            return;
        }

        $("#rightWhisperError").text('还可以输入' + rightSurplusFont + '个字符')
    })

    /**
     * 右边心愿输入框，按键按下，判断字数
     */
    $("#rightWhisper").keydown(function () {
        $("#rightWhisperError").text('还可以输入' + rightSurplusFont + '个字符')
    })

    //调用设置省份的函数
    setProvince(provinceObj)

    //加载layui功能样式和图片上传
    layui.use(['upload', 'element', 'layer'], function (obj) {
        var $ = layui.jquery,
            upload = layui.upload,
            element = layui.element,
            layer = layui.layer;

        //头像上传
        upload.render({
            elem: '#test1',
            async: false,
            url: getWeb() + 'font/avatarUpload.action',
            before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    $('#demo1').attr('src', result); //图片链接（base64）
                });

                element.progress('demo', '0%'); //进度条复位
                layer.msg('上传中', {
                    icon: 16,
                    time: 0
                });
            }
            //进度条
            ,
            progress: function (n, elem, e) {
                element.progress('demo', n + '%'); //可配合 layui 进度条元素使用
                if (n == 100) {
                    layer.msg('上传完毕', {
                        icon: 1
                    });
                }
            }
        });

        //视频封面上传
        upload.render({
            elem: '#test2'
            ,type:"post"
            ,url: getWeb() + "video/videoPic.action" //此处用的是第三方的 http 请求演示，实际使用时改成您自己的上传接口即可。
            ,auto:true
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    $('#demo2').attr('src', result); //图片链接（base64）
                });

                element.progress('demo2', '0%'); //进度条复位
                layer.msg('上传中', {icon: 16, time: 0});
            }
            , done: function (res) {
                //如果上传失败
                if (res.code > 0) {
                    return layer.msg('上传失败');
                }
                //上传成功的一些操作
                videoId = res['videoId']
                $('#demoText2').html(''); //置空上传失败的状态
            }
            //进度条
            , progress: function (n, elem, e) {
                element.progress('demo2', n + '%'); //可配合 layui 进度条元素使用
                if (n == 100) {
                    layer.msg('视频封面上传完毕', {icon: 1});
                }
            }
        });

        //歌单封面上传
        upload.render({
            elem: '#test3'
            ,type:"post"
            ,url: getWeb() + "music/musicPic.action" //此处用的是第三方的 http 请求演示，实际使用时改成您自己的上传接口即可。
            ,auto:true
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    $('#demo3').attr('src', result); //图片链接（base64）
                });

                element.progress('demo3', '0%'); //进度条复位
                layer.msg('上传中', {icon: 16, time: 0});
            }
            , done: function (res) {
                //如果上传失败
                if (res.code > 0) {
                    return layer.msg('上传失败');
                }
                musicId = res["musicId"]
                //上传成功的一些操作
                //……
                $('#demoText3').html(''); //置空上传失败的状态
            }
            //进度条
            , progress: function (n, elem, e) {
                element.progress('demo3', n + '%'); //可配合 layui 进度条元素使用
                if (n == 100) {
                    layer.msg('歌单封面上传完毕', {icon: 1});
                }
            }
        });

        //演示多视频列表上传
        var uploadListIns2 = upload.render({
            elem: '#testList2'
            , elemList: $('#demoList2') //列表元素对象
            , url: getWeb() + 'video/videoList.action' //此处用的是第三方的 http 请求演示，实际使用时改成您自己的上传接口即可。
            , accept: 'video'
            , multiple: true
            , number: 300
            , auto: false
            , bindAction: '#testListAction2'
            , choose: function (obj) {
                var that = this;
                var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                //读取本地文件
                obj.preview(function (index, file, result) {
                    var tr = $(['<tr id="upload-' + index + '">'
                        , '<td>' + file.name + '</td>'
                        , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                        , '<td><div class="layui-progress" lay-filter="progress-demo-' + index + '"><div class="layui-progress-bar" lay-percent="0%"></div></div></td>'
                        , '<td>'
                        , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                        , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                        , '</td>'
                        , '</tr>'].join(''));

                    //单个重传
                    tr.find('.demo-reload').on('click', function () {
                        obj.upload(index, file);
                    });

                    //删除
                    tr.find('.demo-delete').on('click', function () {
                        delete files[index]; //删除对应的文件
                        tr.remove();
                        uploadListIns2.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    });

                    that.elemList.append(tr);
                    element.render('progress'); //渲染新加的进度条组件
                });
            }
            , done: function (res, index, upload) { //成功的回调
                var that = this;
                if (res.code == 0) { //上传成功
                    var tr = that.elemList.find('tr#upload-' + index)
                        , tds = tr.children();
                    tds.eq(3).html(''); //清空操作
                    delete this.files[index]; //删除文件队列已经上传成功的文件
                    return;
                }
                this.error(index, upload);
            }
            , allDone: function (obj) { //多文件上传完毕后的状态回调
                layer.msg('视频队列上传完毕', {icon: 1});
                console.log(obj)
            }
            , error: function (index, upload) { //错误回调
                var that = this;
                var tr = that.elemList.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
            }
            , progress: function (n, elem, e, index) { //注意：index 参数为 layui 2.6.6 新增
                element.progress('progress-demo-' + index, n + '%'); //执行进度条。n 即为返回的进度百分比
            }
        });

        //演示多歌曲列表上传
        var uploadListIns3 = upload.render({
            elem: '#testList3'
            , elemList: $('#demoList2') //列表元素对象
            , url: getWeb() + 'music/musicList.action' //此处用的是第三方的 http 请求演示，实际使用时改成您自己的上传接口即可。
            , accept: 'audio'
            , multiple: true
            , number: 300
            , auto: false
            , bindAction: '#testListAction3'
            , choose: function (obj) {
                var that = this;
                var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                //读取本地文件
                obj.preview(function (index, file, result) {
                    var tr = $(['<tr id="upload-' + index + '">'
                        , '<td>' + file.name + '</td>'
                        , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                        , '<td><div class="layui-progress" lay-filter="progress-demo-' + index + '"><div class="layui-progress-bar" lay-percent="0%"></div></div></td>'
                        , '<td>'
                        , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                        , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                        , '</td>'
                        , '</tr>'].join(''));

                    //单个重传
                    tr.find('.demo-reload').on('click', function () {
                        obj.upload(index, file);
                    });

                    //删除
                    tr.find('.demo-delete').on('click', function () {
                        delete files[index]; //删除对应的文件
                        tr.remove();
                        uploadListIns3.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    });

                    that.elemList.append(tr);
                    element.render('progress'); //渲染新加的进度条组件
                });
            }
            , done: function (res, index, upload) { //成功的回调
                var that = this;
                if (res.code == 0) { //上传成功
                    var tr = that.elemList.find('tr#upload-' + index)
                        , tds = tr.children();
                    tds.eq(3).html(''); //清空操作
                    delete this.files[index]; //删除文件队列已经上传成功的文件
                    return;
                }
                this.error(index, upload);
            }
            , allDone: function (obj) { //多文件上传完毕后的状态回调
                layer.msg('视频队列上传完毕', {icon: 1});
                console.log(obj)
            }
            , error: function (index, upload) { //错误回调
                var that = this;
                var tr = that.elemList.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
            }
            , progress: function (n, elem, e, index) { //注意：index 参数为 layui 2.6.6 新增
                element.progress('progress-demo-' + index, n + '%'); //执行进度条。n 即为返回的进度百分比
            }
        });

        //多图片上传
        upload.render({
            elem: '#test4'
            , url: getWeb() + 'picture/pictureFileUpload.action' //此处配置你自己的上传接口即可
            , multiple: true
            , number: 500
            , accept: 'picture'
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    $('#demo4').append('<img width="92" height="92" src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
                });
            }
            , done: function (res) {
                //上传完毕
                layer.msg('图片上传成功', {icon: 1});
            }
        });
    })
})

/**
 * 个人选择
 * @param obj 标签对象
 */
function myChose(obj) {
    //获得个人中心当前顶级选项卡文本值
    var currentTab = $(".layui-this").text()

    //首先进行隐藏
    //隐藏视频操作2
    $("#videoOperation2").hide()
    //隐藏歌单操作2
    $("#musicOperation2").hide()
    //隐藏相册操作2
    $("#pictureOperation2").hide()

    //定义4个顶级选项卡值
    var topArray = new Array()
    topArray.push("基本信息")
    topArray.push("我的视频")
    topArray.push("我的歌单")
    topArray.push("我的相册")

    try{
        //获得当选按钮组值
        var choseRadio = obj.value
    }catch (e) {
        console.error(e)
        alert(111)
    }

    //判断当前的选项卡值
    for (let i = 0; i < topArray.length; i++) {
        if (currentTab == topArray[i]) {
            //再次判断当前单选值
            switch (choseRadio) {
                //查看
                case "0":
                    if (currentTab == "我的视频") {
                        //隐藏视频操作1
                        $("#videoOperation1").hide()
                        //显示视频操作2
                        $("#videoOperation2").show()
                        //调用文件table列表
                        userFileTable("")

                    }
                    if (currentTab == "我的歌单") {
                        $("#musicOperation1").hide()
                        $("#musicOperation2").show()
                    }
                    if (currentTab == "我的相册") {
                        $("#pictureOperation1").hide()
                        $("#pictureOperation2").show()
                    }
                    break;
                //新增
                case "1":
                    if (currentTab == "我的视频") {
                        $("#videoOperation1").show()
                        $("#videoOperation2").hide()
                    }if (currentTab == "我的歌单") {
                    $("#musicOperation1").show()
                    $("#musicOperation2").hide()
                }if (currentTab == "我的相册") {
                    $("#pictureOperation1").show()
                    $("#pictureOperation2").hide()
                }
            }
        }
    }
}

/**
 * 用户文件表格
 */
function userFileTable(elem){
    layui.use(['table', 'util'], function() {
        var table = layui.table,
            util = layui.util;

        //监听单元格编辑
        table.on('edit('+elem+')', function(obj) {
            var value = obj.value //得到修改后的值
                ,
                data = obj.data //得到所在行所有键值
                ,
                field = obj.field; //得到字段
            layer.msg('[ID: ' + data.id + '] ' + field + ' 字段更改值为：' + util.escape(value));
        });
    });
}
/**
 * 用户支付函数
 */
function pay() {
    //设置form表单
    var form = $("#profile")

    //设置请求方式
    form.attr("method", "post")

    //设置请求地址
    form.attr("action", getWeb() + "alipay.action")

    //发起请求
    form.submit();
}

/**
 * 用户更新 密码
 */
function updatePassword(userId, password) {
    //发起ajax同步请求，更新用户密码
    $.ajax({
        url: getWeb() + 'font/updatePasswordByUserId.action',
        type: 'post',
        async: false,
        data: {
            userId: userId,//更新条件
            password: password,//密码
        },
        success: function (data) {
            //提示更新成功
            swal({
                title: "更新提示",
                text: "密码更新成功",
                icon: "success",
                button: "好的"
            });
        }, error: function (resp) {
            //更新失败
            swal({
                title: "更新提示",
                text: "网络错误",
                icon: "error",
                button: "知道了"
            });
        }
    })
}

/**
 * 获得城市信息,发起ajax请求
 * @returns {string} 返回json 城市数据
 */
function getProvince() {
    var province = "";

    $.ajax({
        url: getWeb() + "font/getProvince.action",
        async: false,
        success: function (resp) {
            province = resp
        }
    })
    return province;
}

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
 * 设置省
 * @param provinceJson json
 */
function setProvince(provinceJson) {
    $("#province-select").append("<option>选择省份</option>")
    for (let i = 1; i < provinceJson.length; i++) {
        //省份
        if (provinceJson[i]['type'] == 1) {
            $("#province-select").append("<option id=\"" + provinceJson[i]['id'] + "\" onclick=\"getCity(this)\" >" + provinceJson[i]['districtName'] + "</option>")
        }
    }
}

/**
 * 设置城市
 * @Param obj 对象id
 */
function getCity(obj) {
    $("#city-select").append("<option>选择城市</option>")
    //获得对应id的 层级值`district_sqe`

    //获得市
    var provinceJson = getProvince()

    //城市清空
    $("#city-select").empty()

    for (let i = 0; i < provinceJson.length; i++) {
        //根据id获得对应 市 层级
        if (obj.id == provinceJson[i]['id']) {
            //获得对应层级
            var district_sqe = provinceJson[i]['districtSqe']

            //循环取出 市区
            for (let j = 0; j < provinceJson.length; j++) {
                //判断层级
                if (provinceJson[j]['districtSqe'].indexOf(district_sqe) != -1) {
                    $("#city-select").append("<option id=\"" + provinceJson[j]['id'] + "\" onclick=\"getUrbanArea(this)\" >" + provinceJson[j]['districtName'] + "</option>")
                }
            }
        }
    }
}

/**
 * 获得乡镇
 */
function getUrbanArea(obj) {
    $("#area-select").append("<option>选择区县</option>")

    //获得对应id的 层级值`district_sqe`
    //获得市
    var provinceJson = getProvince()

    $("#area-select").empty()

    for (let i = 0; i < provinceJson.length; i++) {
        //根据id获得对应 市 层级
        if (obj.id == provinceJson[i]['id']) {
            //获得对应层级
            var district_sqe = provinceJson[i]['districtSqe']

            //循环取出 市区
            for (let j = 0; j < provinceJson.length; j++) {
                //判断层级
                if (provinceJson[j]['districtSqe'].indexOf(district_sqe) != -1) {
                    $("#area-select").append("<option>" + provinceJson[j]['districtName'] + "</option>")
                }
            }
        }
    }
}

/**
 * 用户信息更新，保存提交函数
 */
function save() {
    //用户点击提交
    //判断参数
    if ($("#userNameError").text().trim().length == 0 && $("#phoneError").text().trim().length == 0 &&
        $("#emailError").text().trim().length == 0 && leftSurplusFont >= 0 && rightSurplusFont >= 0) {

        //获得性别
        var sex = $("input[name='sex']:checked").val();

        //发起ajax同步请求，更新用户信息
        $.ajax({
            url: getWeb() + 'font/userUpdate.action',
            type: 'post',
            async: false,
            data: {
                userId: user['userId'],//更新条件
                userName: $("#userName").val(),//用户名
                sex: sex,//性别
                phone: $("#phone").val(),//手机号码
                email: $("#email").val(),//邮箱
                province: $("#province-select option:selected").text(),//省份
                city: $("#city-select option:selected").text(),//城市
                county: $("#area-select option:selected").text(),//乡镇
                address: $("#address").val(),//详细地址
                leftWish: $("#leftWish").val(),//左边心愿
                rightWhisper: $("#rightWhisper").val(),//右边悄悄话
            },
            success: function (data) {
                //提示更新成功
                swal({
                    title: "成功提示",
                    text: "信息更新成功",
                    icon: "success",
                    button: "好的"
                });
            }, error: function (resp) {
                //更新失败
                swal({
                    title: "错误提示",
                    text: "网络错误",
                    icon: "error",
                    button: "知道了"
                });
            }
        })
        return;
    }

    swal({
        title: "警告",
        text: "请注意参数是否正确",
        icon: "warning",
        button: "确定"
    });
}

/**
 * 获取用户头像
 */
function getUserAvatar() {
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
 * 清除cookie
 */
function quit() {
    //删除cookie
    $.removeCookie("user", {path: '/'})

    //跳转到首页
    window.location.href = getWeb() + "index.html"
}

/**
 * 跳转到热门视频
 */
function popularVideos() {
    //跳转首页
    window.location.href = getWeb() + "popularVideos.html"
}

/**
 * 跳转到热门音乐
 */
function popularMusic() {
    //跳转首页，展现音乐
    window.location.href = getWeb() + "popularMusic.html"
}

/**
 * 通过userId获得用户信息
 * @param userId userId
 * @returns {string} 返回 用户对象信息
 */
function getUserInfoByUserId(userId) {
    var user = ''
    //ajax请求
    $.ajax({
        url: getWeb() + "font/getUserInfoByUserId.action",
        data: {
            userId: userId,
        },
        type: "post",
        async: false,
        success: function (data) {
            user = data
        },
        error: function (resp) {
            //失败
        }
    })

    //用户信息转换
    var str = JSON.stringify(user)

    //将 用户信息，存入 本地缓存中
    $.cookie("user", str, {path: '/'})
    return user;
}

/**
 * 个人中心视频点击保存
 */
function myVideoSave(){
    //获得视频册名
    let videoName = $("#videoName").val()

    //获得视频分类
    let videoClassification = "1" //默认 1 生活

    //获得视频类型
    let videoType = "2" //默认 私有

    //获得所有 视频分类 class
    let videoClassificationSelector = document.getElementsByClassName("videoClassification")

    for (let i = 0; i < videoClassificationSelector.length; i++) {
        if (videoClassificationSelector[i].checked){
            videoClassification = videoClassificationSelector[i].value
        }
    }

    //获得所有 视频类型 class
    let videoTypeSelector = document.getElementsByClassName("type2")

    for (let i = 0; i < videoTypeSelector.length; i++) {
        if (videoTypeSelector[i].checked){
            videoType = videoTypeSelector[i].value
        }
    }

    if (videoName.trim().length == 0){
        //弹框提示
        swal({
            title: "警告",
            text: "请输入视频册名",
            icon: "warning",
            button: "确定"
        });
        return;
    }

    //调用ajax, 上传具体视频描述信息
    $.ajax({
        url:getWeb() + "video/videoDescriptionInfo.action",
        type:"post",
        data:{
            videoName:videoName,
            videoClassification:videoClassification,
            type:videoType
        },success:function (resp) {
            if (resp == false){
                //弹框提示
                swal({
                    title: "失败",
                    text: "添加失败",
                    icon: "error",
                    button: "确定"
                });
                return;
            }
            //调用视频长传单击
            $("#testListAction2").click()

            swal({
                title: "成功",
                text: "数据成功添加",
                icon: "success",
                button: "确定"
            });
        },error:function () {
            swal({
                title: "失败",
                text: "服务遭遇滑铁卢>_<",
                icon: "error",
                button: ">~<"
            });
        }
    })
    //setInterval('updateBrowserPage(5)',1000)
    //刷新浏览器
    //location.reload()
}

/**
 * 个人中心歌单保存
 */
function myMusicSave(){
    //获得歌单名
    let musicName = $("#musicName").val()

    //获得歌单分类
    let musicClassification = "1" //默认 1 伤感

    //获得歌单类型
    let musicType = "2" //默认 私有

    //获得所有 歌单分类 class
    let musicClassificationSelector = document.getElementsByClassName("musicClassification")

    for (let i = 0; i < musicClassificationSelector.length; i++) {
        if (musicClassificationSelector[i].checked){
            musicClassification = musicClassificationSelector[i].value
        }
    }

    //获得所有 歌单类型 class
    let musicTypeSelector = document.getElementsByClassName("type3")

    for (let i = 0; i < musicTypeSelector.length; i++) {
        if (musicTypeSelector[i].checked){
            musicType = musicTypeSelector[i].value
        }
    }

    if (musicName.trim().length == 0){
        //弹框提示
        swal({
            title: "警告",
            text: "请输入歌单名",
            icon: "warning",
            button: "确定"
        });
        return;
    }

    //调用ajax, 上传具体歌曲描述信息
    $.ajax({
        url:getWeb() + "music/musicDescriptionInfo.action",
        type:"post",
        data:{
            musicName:musicName,
            musicClassification:musicClassification,
            type:musicType
        },success:function (resp) {
            if (resp == false){
                //弹框提示
                swal({
                    title: "失败",
                    text: "添加失败",
                    icon: "error",
                    button: "确定"
                });
                return;
            }
            //调用视频长传单击
            $("#testListAction3").click()

            swal({
                title: "成功",
                text: "数据成功添加",
                icon: "success",
                button: "确定"
            });
        },error:function () {
            swal({
                title: "失败",
                text: "服务遭遇滑铁卢>_<",
                icon: "error",
                button: ">~<"
            });
        }
    })
    //刷新浏览器
    //location.reload()
}

/**
 * 个人中心相册保存
 */
function myPictureSave(){
    //获得相册名
    let pictureName = $("#pictureName").val()

    //获得相册分类
    let pictureClassification = "1" //默认 1 人物

    //获得相册类型
    let pictureType = "2" //默认 私有

    //获得所有 相册分类 class
    let pictureClassificationSelector = document.getElementsByClassName("pictureClassification")

    for (let i = 0; i < pictureClassificationSelector.length; i++) {
        if (pictureClassificationSelector[i].checked){
            pictureClassification = pictureClassificationSelector[i].value
        }
    }

    //获得所有 相册类型 class
    let pictureTypeSelector = document.getElementsByClassName("type4")

    for (let i = 0; i < pictureTypeSelector.length; i++) {
        if (pictureTypeSelector[i].checked){
            pictureType = pictureTypeSelector[i].value
        }
    }

    //判断相册名
    if (pictureName.trim().length == 0){
        //弹框提示
        swal({
            title: "警告",
            text: "请输入相册名",
            icon: "warning",
            button: "确定"
        });
        return;
    }

    //调用ajax, 上传具体相册描述信息
    $.ajax({
        url:getWeb() + "picture/pictureDescriptionInfo.action",
        type:"post",
        data:{
            pictureName:pictureName,
            pictureClassification:pictureClassification,
            type:pictureType
        },success:function (resp) {
            if (resp == false){
                //弹框提示
                swal({
                    title: "失败",
                    text: "添加失败",
                    icon: "error",
                    button: "确定"
                });
                return;
            }
            //调用相册多图片上传
            //$("#testListAction4").click()

            swal({
                title: "成功",
                text: "数据成功添加",
                icon: "success",
                button: "确定"
            });
        },error:function () {
            swal({
                title: "失败",
                text: "服务遭遇滑铁卢>_<",
                icon: "error",
                button: ">~<"
            });
        }
    })
    //刷新浏览器
    //location.reload()
}

/**
 * 跳转到个人简历页面
 */
function resume(){
    window.location.href = getWeb() + "static/font/resume/resume.html";
}

/**
 * 更新浏览器页面
 */
function updateBrowserPage(){
    //刷新浏览器
    location.reload()
}
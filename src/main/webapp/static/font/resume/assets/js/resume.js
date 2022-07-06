$(function () {
    //您的姓名按键弹起
    $("#name").change(function () {
        //个人信息姓名获得
        $("#confirmName").val($("#name").val().trim())
        $("#personName").text($("#name").val().trim())
    })

    //默认所有信息 禁用无法修改
    disableAllTextBoxes()

    //获得用户 userId
    let userId = JSON.parse($.cookie("user"))['userId']

    //设置头像
    getUserAvatar(userId)

    //获得用户的简历信息
    let person = getPerson(userId);

    //通过用户id，设置当前展示的简历
    setResumePage(person)

    //获得省份
    setProvince(person['dreamCity'])

    //用户点击修改
    $("#modify").click(function () {
        allTextBoxesCanBeModified()
    })

    //用户点击更新
    $("#update").click(function () {
        //默认所有信息 禁用无法修改
        disableAllTextBoxes()

        //您的姓名按键弹起
        $("#name").keyup(function () {
            //个人信息姓名获得
            $("#confirmName").val($("#name").val().trim())
            $("#personName").text($("#name").val().trim())
        })

        //获得性别
        if ($("#sex").val().trim() != '男' && $("#sex").val().trim() != '女'){
            swal({
                title: "警告！",
                text: "您输入的性别不正确！请检查！",
                icon: "warning",
                button: "知道了",
            });
            document.getElementById('modify').checked = true
            allTextBoxesCanBeModified()
            return;
        }

        //获得手机号码
        if (!phoneExp($("#tel").val().trim())){
            swal({
                title: "警告！",
                text: "您输入的手机号码不正确！",
                icon: "warning",
                button: "知道了",
            });
            document.getElementById('modify').checked = true
            allTextBoxesCanBeModified()
            return;
        }

        //获得邮箱
        if (!emailExp($("#email").val().trim())){
            swal({
                title: "警告！",
                text: "您输入的电子邮箱不正确！",
                icon: "warning",
                button: "知道了",
            });
            document.getElementById('modify').checked = true
            allTextBoxesCanBeModified()
            return;
        }

        //调用ajax函数，完成数据更新上传
        personInfo(userId)
    })
})

/**
 * 所有文本框禁止
 */
function disableAllTextBoxes(){
    $("#name").attr("disabled",true)
    $("#jobPosts").attr("disabled",true)
    $("#sex").attr("disabled",true)
    $("#age").attr("disabled",true)
    $("#computerSkill").attr("disabled",true)
    $("#tel").attr("disabled",true)
    $("#email").attr("disabled",true)
    $("#homepage").attr("disabled",true)
    $("#gitHub").attr("disabled",true)
    $("#gitee").attr("disabled",true)
    $("#backendFramework").attr("disabled",true)
    $("#frontEndFramework").attr("disabled",true)
    $("#databaseRelated").attr("disabled",true)
    $("#developmentTools").attr("disabled",true)
    $("#versionManagement").attr("disabled",true)
    $("#otherSkills").attr("disabled",true)
    $("#education").attr("disabled",true)
    $("#workExperience").attr("disabled",true)
    $("#status").attr("disabled",true)
    $("#dreamPosition").attr("disabled",true)
    $("#dreamCity").attr("disabled",true)
    $("#companyName").attr("disabled",true)
    $("#startDate").attr("disabled",true)
    $("#endDate").attr("disabled",true)
    $("#dutyTime").attr("disabled",true)
    $("#developmentProjectName").attr("disabled",true)
    $("#projectIntro").attr("disabled",true)
    $("#reasonForLeaving").attr("disabled",true)
    $("#projectName").attr("disabled",true)
    $("#projectDescription").attr("disabled",true)
    $("#selfEvaluation").attr("disabled",true)
}

/**
 * 所有文本框可修改
 */
function allTextBoxesCanBeModified(){
    $("#name").attr("disabled",false)
    $("#jobPosts").attr("disabled",false)
    $("#sex").attr("disabled",false)
    $("#age").attr("disabled",false)
    $("#computerSkill").attr("disabled",false)
    $("#tel").attr("disabled",false)
    $("#email").attr("disabled",false)
    $("#homepage").attr("disabled",false)
    $("#gitHub").attr("disabled",false)
    $("#gitee").attr("disabled",false)
    $("#backendFramework").attr("disabled",false)
    $("#frontEndFramework").attr("disabled",false)
    $("#databaseRelated").attr("disabled",false)
    $("#developmentTools").attr("disabled",false)
    $("#versionManagement").attr("disabled",false)
    $("#otherSkills").attr("disabled",false)
    $("#education").attr("disabled",false)
    $("#workExperience").attr("disabled",false)
    $("#status").attr("disabled",false)
    $("#dreamPosition").attr("disabled",false)
    $("#dreamCity").attr("disabled",false)
    $("#companyName").attr("disabled",false)
    $("#startDate").attr("disabled",false)
    $("#endDate").attr("disabled",false)
    $("#dutyTime").attr("disabled",false)
    $("#developmentProjectName").attr("disabled",false)
    $("#projectIntro").attr("disabled",false)
    $("#reasonForLeaving").attr("disabled",false)
    $("#projectName").attr("disabled",false)
    $("#projectDescription").attr("disabled",false)
    $("#selfEvaluation").attr("disabled",false)
}

/*手机号码规则判断 正确：true；错误：false*/
function phoneExp(regPhone) {
    return /^1[345789]\d{9}$/.test(regPhone)
}

/*邮箱规则 正确：true；错误：false*/
function emailExp(regEmail) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(regEmail)
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
 * 获得用户的个人简历
 * @param userId 通过用户id获得
 * @returns {string} 返回json数据
 */
function getPerson(userId) {
    var personInfo = "";
    $.ajax({
        url: getWeb() + "resume/select.action",
        type: "post",
        async:false,
        data:{
            userId:userId
        },
        success: function (resp) {
            personInfo = resp
        }
    })
    return personInfo;
}

/**
 * 设置省
 * @param provinceJson json
 */
function setProvince(provinceId) {
    //选择城市
    let provinceJson = getProvince()

    if (provinceId != undefined){
        for (let i = 0; i < provinceJson.length; i++) {
            if (provinceId == provinceJson[i]['id']){
                $("#dreamCity").append("<option value='"+provinceJson[i]['id']+"'>"+provinceJson[i]['districtName']+"</option>");
                break;
            }
        }
    }

    $("#dreamCity").append("<option value='0'>---请选择期望城市---</option>")
    for (let i = 1; i < provinceJson.length; i++) {
        //省份
        if (provinceJson[i]['type'] == 1) {
            $("#dreamCity").append("<option value='"+provinceJson[i]['id']+"'>"+provinceJson[i]['districtName']+"</option>")
        }
    }
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
 * 用户个人信息上传
 */
function personInfo(userId){
    //获得用户姓名
    let name = $("#name").val().trim()

    //获得用户的求职岗位
    let jobPosts = $("#jobPosts").val().trim()

    //获得性别
    let sex = $("#sex").val().trim()

    //获得年龄
    let age = $("#age").val().trim()

    //获得计算机水平
    let computerSkill = $("#computerSkill").val().trim()

    //获得手机号码
    let tel = $("#tel").val().trim()

    //获得电子邮箱
    let email = $("#email").val().trim()

    //获得个人主页
    let homePage = $("#homepage").val().trim()

    //github地址
    let gitHub = $("#gitHub").val().trim()

    //gitee地址
    let gitee = $("#gitee").val().trim()

    //获得后端框架
    let backendFramework = $("#backendFramework").val().trim()

    //获得前端框架
    let frontEndFramework = $("#frontEndFramework").val().trim()

    //获得数据库相关
    let databaseRelated = $("#databaseRelated").val().trim()

    //开发工具
    let developmentTools = $("#developmentTools").val().trim()

    //版本管理
    let versionManagement = $("#versionManagement").val().trim()

    //其余技能点
    let otherSkills = $("#otherSkills").val().trim()

    //获得学历
    let education = $("#education").val().trim()

    //获得工作年限
    let workExperience = $("#workExperience").val().trim()

    //获得就职状态
    let status = $("#status").val().trim()

    //获得到岗时间
    let dutyTime = $("#dutyTime").val()

    //期望职位
    let dreamPosition = $("#dreamPosition").val().trim()

    //期望城市
    let dreamCity = $("#dreamCity option:selected");
    //获得value
    let value = dreamCity.val()
    //获得text
    let text = dreamCity.text()

    //工作经历
    //公司名称
    let companyName = $("#companyName").val().trim()

    //开发的项目名
    let developmentProjectName = $("#developmentProjectName").val().trim()

    //项目开发开始时间
    let startDate = $("#startDate").val()

    //项目开发结束时间
    let endDate = $("#endDate").val()

    //项目简介
    let projectIntro = $("#projectIntro").val().trim()

    //获得离职原因
    let reasonForLeaving = $("#reasonForLeaving").val().trim()

    //其他项目
    //项目名
    let projectName = $("#projectName").val().trim()

    //项目描述
    let projectDescription = $("#projectDescription").val().trim()

    //获得自我评价
    let selfEvaluation = $("#selfEvaluation").val().trim()

    //数据封装
    let param = {
        name:name,
        jobPosts:jobPosts,
        sex:sex,
        age:age,
        computerSkill:computerSkill,
        tel:tel,
        email:email,
        homePage:homePage,
        gitHub:gitHub,
        gitee:gitee,
        backendFramework:backendFramework,
        frontEndFramework:frontEndFramework,
        databaseRelated:databaseRelated,
        developmentTools:developmentTools,
        versionManagement:versionManagement,
        otherSkills:otherSkills,
        education:education,
        workExperience:workExperience,
        status:status,
        dutyTime:dutyTime,
        dreamPosition:dreamPosition,
        dreamCity:value,
        companyName:companyName,
        developmentProjectName:developmentProjectName,
        startDate:startDate,
        endDate:endDate,
        projectIntro:projectIntro,
        reasonForLeaving:reasonForLeaving,
        projectName:projectName,
        projectDescription:projectDescription,
        selfEvaluation:selfEvaluation,
        userId:userId
    }

    //调用ajax
    $.ajax({
        url:getWeb() + "resume/update.action",
        dataType:"json",
        contentType:"application/json",
        type:"post",
        data:JSON.stringify(param),
        success:function (data) {
            if (data.userId == userId){
                swal({
                    title: "成功",
                    text: "简历信息已成功更新",
                    icon: "success",
                    button: "知道了",
                });
            }
        },error:function () {
            document.getElementById('modify').checked = true
            allTextBoxesCanBeModified();
            swal({
                title: "错误",
                text: "服务器异常！",
                icon: "error",
                button: "确定",
            });
        }
    })
}

/**
 * 渲染当前简历页面
 * @param data 用户个人数据
 */
function setResumePage(data){
    $("#name").val(data.name)
    $("#confirmName").val(data.name)
    $("#personName").text(data.name)
    $("#jobPosts").val(data.jobPosts)
    $("#sex").val(data.sex)
    $("#age").val(data.age)
    $("#computerSkill").val(data.computerSkill)
    $("#tel").val(data.tel)
    $("#email").val(data.email)
    $("#homepage").val(data.homePage)
    $("#gitHub").val(data.gitHub)
    $("#gitee").val(data.gitee)
    $("#backendFramework").val(data.backendFramework)
    $("#frontEndFramework").val(data.frontEndFramework)
    $("#databaseRelated").val(data.databaseRelated)
    $("#developmentTools").val(data.developmentTools)
    $("#versionManagement").val(data.versionManagement)
    $("#otherSkills").val(data.otherSkills)
    $("#education").val(data.education)
    $("#workExperience").val(data.workExperience)
    $("#status").val(data.status)
    $("#dutyTime").val(data.dutyTime)
    $("#dreamPosition").val(data.dreamPosition)
    $("#companyName").val(data.companyName)
    $("#developmentProjectName").val(data.developmentProjectName)
    $("#startDate").val(data.startDate)
    $("#endDate").val(data.endDate)
    $("#projectIntro").val(data.projectIntro)
    $("#reasonForLeaving").val(data.reasonForLeaving)
    $("#projectName").val(data.projectName)
    $("#projectDescription").val(data.projectDescription)
    $("#selfEvaluation").val(data.selfEvaluation)
}

/**
 * 获取用户头像ajax函数
 */
function getUserAvatar(userId){
    var windowUrl = window.URL || window.webkitURL;//处理浏览器兼容性
    var xhr = new XMLHttpRequest();
    var url = getWeb() + "/font/getUserAvatar.action?userId=" + userId;
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

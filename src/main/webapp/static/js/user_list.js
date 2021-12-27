/**
 * 用户列表搜索
 * @param arg 用户传入的参数信息
 *
 */
function userListSearch(arg){
    //判断用户传入的是手机号码还是用户id
    //判断长度
    //用户搜索url
    let url = getWeb() + "admin/user/query.action"

    if (arg.length == 11){
        if(phoneExp(arg)){
            //满足条件说明，用户传递的是手机号码
            //根据用户手机号码删除数据
            if (Ajax(arg,url,REQUEST_POST) == null){
                sweetAlert("用户查询","该用户不存在！",ICON_WARNING,"确定")
            }
            return;
        }
    }

    //不是手机号码
    Ajax(arg,url,REQUEST_POST)
    if (Ajax(arg,url,REQUEST_POST) == null){
        sweetAlert("用户查询","该用户不存在！",ICON_WARNING,"确定")
    }
}

/**
 * 用户站台更改
 * @param obj 用户对象
 */
function userStatus(obj,data){
    //获得开关
    let status = data.elem.checked

    //获得userId
    let userId = obj.value

    //用户正常
    let value = 1;

    //用户禁用
    if (!status){
        value = 2;
    }

    $.ajax({
        url:getWeb() + "admin/user/updateUserStatus.action",
        type:REQUEST_POST,
        data:{
            userId:userId,
            status:value,
        },success:function (resp) {
            if (resp['data'].accountState == 2){
                layer.tips('用户已禁用', data.othis)
            }else {
                layer.tips('用户已正常', data.othis)
            }

        },error:function (data) {
            sweetAlert("操作失败","服务器异常:" + data.status,"error","确定")
        }
    })
}
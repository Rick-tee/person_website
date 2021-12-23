$(function () {

})

/**
 * 改变用户状态方法
 * @param val 传入的用户字段值
 */
function changeUserState(val){
    let url = getWeb() + "admin/delete.action";
    Ajax(val,url,"DELETE")
}

/**
 * 用户列表搜索
 * @param arg 用户传入的参数信息
 * 95380722b38
 */
function userListSearch(arg){
    //判断用户传入的是手机号码还是用户id
    //判断长度
    if (arg.length == 11){
        phoneExp()
    }
}
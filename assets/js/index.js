$(function () {
    //调用函数，获取基本信息
    getUserInfo();

    var layer = layui.layer
    //点击退出事件
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function (index) {
                //清除本地存储
                localStorage.removeItem('token');
                //跳转到登录页面
                location.href = '/login.html';
                //关闭confirm询问框
                layer.close(index);
            });
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        //请求头配置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                //弹出登录失败提示
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        },
        //无论成功还是失败 都调用complete函数,可以使用res.responseJSON 拿到服务器响应回来的数据
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清除本地存储
        //         localStorage.removeItem('token');
        //         //强制跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取用户名称并渲染到页面
    var name = user.username || user.nickname;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
$(function () {
    //获取form layer对象
    var form = layui.form;
    var layer = layui.layer;

    //自定义验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称在1~6个字符之间！'
            }
        }
    })
    initUserInfo();
    //初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                // 调用form.val方法为表单赋值 第一个参数：为那个表单赋值  第二个参数：数据源
                form.val('forUserInfo', res.data);
            }
        })
    }

    //重置按钮事件
    $('#btnReset').on('click', function (e) {
        //阻止默认事件
        e.preventDefault();
        //重新获取用户信息 填充表单
        initUserInfo();
    })
    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止默认事件
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                //调用index 页面方法，重新渲染头像
                window.parent.getUserInfo();
            }
        })
    })













})
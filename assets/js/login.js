$(function () {
    //点击"去注册账号"链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击"去登录"链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从layui 获取form layer对象
    var form = layui.form;
    var layer = layui.layer;
    //通过layui.lay-verify 函数 自定义校验规则
    form.verify({
        //自定义 密码 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd: function (value) {
            //拿到密码框的值
            var pwd = $('.reg-box [name = password]').val();
            //value 表示在此确认密码框的值
            if (pwd !== value) {
                return '两次输入密码不一致！';
            }
        }
    })

    //监听登录表单的事件
    $('#form_login').submit(function (e) {
        //阻止默认的提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    //弹出登录失败提示
                    return layer.msg(res.message);
                }
                //将成功得到的token值 保存到localStorage 中(本地存储)
                localStorage.setItem('token', res.token)
                //弹出登录成功提示
                layer.msg(res.message);
                //跳转到后台主页
                //location.href = '/index.html'
            }
        })
    })

    //监听注册表单的事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认的提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录!');
                $('#link_login').click();
            }
        })
    })






















})
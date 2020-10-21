$(function () {
    initArtCateList();
    //获取layer对象
    var layer = layui.layer
    var form = layui.form

    //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //定义弹出层索引
    var indexAdd = null;

    //为添加类别绑定点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    // 通过代理的形式，为 btn-edit 绑定点击事件
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        //restful 传参方式 特点：传参的时候不需要参数名
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    //通过代理的形式，为修改分类表单 绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        //
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    //通过代理的形式 为删除按钮绑定点击事件
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' },
            function (index) {
                // 发起请求获取对应分类的数据
                $.ajax({
                    type: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类失败！')
                        }
                        //关闭confirm询问框
                        layer.close(index);
                        initArtCateList()
                    }
                })

            });
    })





})
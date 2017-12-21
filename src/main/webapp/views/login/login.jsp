<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/views/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>home</title>
    <%@include file="/views/common/cssandjs.jsp" %>
    <link rel="stylesheet" href="${basePath}/resources/ui/layui/css/layui.css">
    <style type="text/css">
        .loginDiv{
            /*border: 1px solid red;width: 500px;height: 600px;*/
            position: absolute;
            top: 100px;
            right: 100px;
            width: 350px;
            height: 328px;
            padding-top: 1px;
            border-radius: 3px;
            background-color: rgba(255, 255, 255, .5);
        }
        .loginDiv form{
            width: 330px;
            height: 310px;
            margin: 8px auto;
            border-radius: 3px;
            background-color: rgba(255, 255, 255, .8);
            padding-top: 1px;
        }
        .loginTitle{
            display: block;
            width: 255px;
            margin: 40px auto 24px;
            line-height: 1;
            font-size: 18px;
            color: #6B86A1;
        }
        .login-input{
            display: inline-block;
            width: 70%;
        }
    </style>
</head>
<body class="layui-bg-orange">
    <div class="loginDiv" >
        <%--登陆表单--%>
        <form class="layui-form" action="" lay-filter="loginForm">
            <legend><span class="loginTitle" style="text-align: center;">欢迎登录</span></legend>

            <div class="layui-form-item" style="text-align: center;">
                <input type="text" name="username" lay-verify="required" placeholder="请输入昵称/姓名/邮箱" autocomplete="off" class="layui-input login-input">
            </div>

            <div class="layui-form-item" style="text-align: center;">
                <input type="password" name="password" lay-verify="required|number" placeholder="请输入密码" autocomplete="off" class="layui-input login-input">
            </div>

            <div class="layui-form-item" style="text-align: center;">
                <button class="layui-btn" lay-submit="" lay-filter="demo1" style="width: 70%;">登陆</button>
            </div>

            <div class="layui-form-item" style="text-align: center;">
                <button class="layui-btn" style="width: 70%;">去注册</button>
            </div>
        </form>
    </div>


<script src="${basePath}/resources/ui/layui/layui.js"></script>

<script type="text/javascript">
    layui.use('form', function(){
        var form = layui.form
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate;
//        form.render();                //更新全部
//        form.render('select');        //刷新select选择框渲染
//        form.render(null, 'test1');   //更新 lay-filter="test1" 所在容器内的全部表单状态
//        form.render('select', 'test2'); //更新 lay-filter="test2" 所在容器内的全部 select 状态

        //监听提交
        form.on('submit(demo1)', function(data){
            layer.alert(JSON.stringify(data.field), {
                title: '最终的提交信息'
            })
            return false;
        });

    });

    $(function () {

    });

</script>
</body>
</html>


<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/views/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>home</title>
    <%@include file="/views/common/cssandjs.jsp" %>
</head>
<body>
<h1 class="homeTitle">hhhhhksdflksjfl你好,dsfh</h1>
<a href="${basePath}/views/login/login.jsp">去登陆</a>
<script type="text/javascript">
    $(function () {
        var html = $(".homeTitle").html();
//        alert(html);
        html="我是李豪鹏";
        $(".homeTitle").html(html);
        <%--alert('web-${webPrefix}');--%>
        <%--alert('img-${imgPrefix}');--%>
    })

</script>
</body>
</html>


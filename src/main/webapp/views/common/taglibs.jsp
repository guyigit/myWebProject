<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="st"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf"%>
<%--<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sst"%>--%>
<%--<%@ taglib uri="http://www.pinlor.com/dict/functions" prefix="fns"%>  --%>

<c:set var="basePath" value="${pageContext.request.contextPath}" />
<c:set var="webPrefix" value="${applicationScope['static.location.origin']}" />
<c:set var="imgPrefix" value="${applicationScope['static.location.origin.images']}" />


<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%-- 当前项目上下文路径 --%>
<c:set var="CTX_PATH" value="${pageContext.request.contextPath}" scope="application"/>


<script type="text/javascript">
	var CTX_PATH = "${CTX_PATH}";
</script>

<%-- 引入类库 --%>

<!-- jquery -->
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/jquery/jquery-1.12.3.min.js"></script>
<!-- West-lib -->
<link rel="stylesheet" type="text/css" href="${CTX_PATH}/project/resource/css/base.css"/>
<link rel="stylesheet" type="text/css" href="${CTX_PATH}/project/common/lib/west/resource/css/west.css"/>
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/west/util.js"></script>
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/west/eventutil.js"></script>
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/west/calendar.js"></script>
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/west/cardcalendar.js"></script>
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/west/message.js"></script>
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/west/combox.js"></script>
<script type="text/javascript" src="${CTX_PATH}/project/common/lib/west/readmore.js"></script>
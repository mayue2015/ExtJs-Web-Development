<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>工程任务</title>
 <%
	 HttpSession sessionHH = request.getSession();
			
     String taskId = sessionHH.getAttribute("taskId") + "";
	     
     if(taskId == null || "".equals(taskId) || "null".equals(taskId)){
    	 taskId = "";
     }
 %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base />
<%-- <jsp:include page="/public/views/common.jsp" flush="true"></jsp:include> --%>
<script type="text/javascript">
	var taskId = "<%=taskId %>";

	$import("pmv/scripts/engineeringTask/app.js");
</script>
</head>
<body></body>
</html>
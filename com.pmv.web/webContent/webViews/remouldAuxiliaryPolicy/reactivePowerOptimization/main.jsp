<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>无功优化</title>
<%
     HttpSession session_task = request.getSession();
	Map<String,String> task_obj = (Map<String,String>)session_task.getAttribute("TASK_OBJ");
	String taskName = task_obj == null ? "" : task_obj.get("TASK_NAME")+"";
	String versionId = task_obj == null ? "" : task_obj.get("VERSIONID")+"";
%>
<bp:base />
<script type="text/javascript">
	$import("pmv/scripts/remouldAuxiliaryPolicy/reactivePowerOptimization/app.js");
	var versionId = "<%=versionId %>";
	var task_name = "<%=taskName %>";
	var isCanModify = 0;
</script>
</head>
<body></body>
</html>
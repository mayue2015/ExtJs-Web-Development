<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title>电力电量平衡</title>
<% 
	HttpSession sessionHH = request.getSession();

	String taskId = sessionHH.getAttribute("taskId") + "";//任务ID
	if(taskId == null || "".equals(taskId) || "null".equals(taskId)){
		taskId = "";
    }
%>
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<script type="text/javascript" src="planning/scripts/src/ux/ColumnHeaderGroup.js"></script>
<script type="text/javascript">
 	var taskId = "<%=taskId %>";
 	var years = '';
</script>
<script type="text/javascript">
	$import("prediction/scripts/powerbalance/main.js");
</script>
</head>
<body>
</body>
</html>
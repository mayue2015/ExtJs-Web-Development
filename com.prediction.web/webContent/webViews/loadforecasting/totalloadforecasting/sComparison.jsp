<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title></title>
<% 
	HttpSession sessionHH = request.getSession();

	String taskId = sessionHH.getAttribute("taskId") + "";//任务ID
	
	if(taskId == null || "".equals(taskId) || "null".equals(taskId)){
		taskId = "";
    }
%>
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<!-- <link rel="stylesheet" type="text/css" href="evaluation/public/styles/common.css" /> -->
<!-- <script type="text/javascript" src="planning/scripts/src/ux/ColumnHeaderGroup.js"></script> -->
<script type="text/javascript">
	var title = "方案比较";
	var i = 1;
	do{
	  title += "　  ";
	  i++;
	}while(i<500)
	document.title = title;

	var taskId = "<%=taskId %>";
	
	$import("prediction/scripts/loadforecasting/totalloadforecasting/sComparison/main.js");
</script>
</head>
<body>
</body>
</html>
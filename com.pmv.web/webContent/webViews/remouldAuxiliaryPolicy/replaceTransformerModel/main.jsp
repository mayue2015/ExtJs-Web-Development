<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>更换配变型号</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base />
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<%
HttpSession session_task = request.getSession();
	Map<String,String> task_obj = (Map<String,String>)session_task.getAttribute("TASK_OBJ");
	String taskName = task_obj == null ? "" : task_obj.get("TASK_NAME")+"";
	String versionId = task_obj == null ? "" : task_obj.get("VERSIONID")+"";
%>
<script type="text/javascript">
	var versionId = "<%=versionId %>";
	var task_name = "<%=taskName %>";
	var isCanModify = 0;

	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceTransformerModel/app.js");
</script>
</head>
<body></body>
</html>
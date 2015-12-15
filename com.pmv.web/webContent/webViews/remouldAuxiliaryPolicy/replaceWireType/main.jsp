<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>更换导线型号</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base />
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<%
	 HttpSession sessionH = request.getSession();
		
     Map<String,String> task_obj = (Map<String,String>)sessionH.getAttribute("TASK_OBJ");
	 String task_name = task_obj == null ? "" : task_obj.get("TASK_NAME")+"";
	 String versionId = task_obj == null ? "" : task_obj.get("VERSIONID")+"";
     
     if(versionId == null || "".equals(versionId) || "null".equals(versionId)){
    	 versionId = "";
     }
     if(task_name == null || "".equals(task_name) || "null".equals(task_name)){
    	 task_name = "";
     }
%>
<script type="text/javascript">
	var versionId = "<%=versionId %>";
	var task_name = "<%=task_name %>";
	var isCanModify = 0;

	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceWireType/app.js");
</script>
</head>
<body></body>
</html>
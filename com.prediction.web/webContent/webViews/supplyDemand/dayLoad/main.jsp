<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title>日负荷曲线</title>
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<link rel="stylesheet" type="text/css" href="evaluation/public/styles/common.css" />
<%
	 HttpSession sessionH = request.getSession();
		
     String taskVerId = sessionH.getAttribute("versionId") + "";
     
     if(taskVerId == null || "".equals(taskVerId) || "null".equals(taskVerId)){
    	 taskVerId = "";
     }
%>
<script type="text/javascript">
	var taskVersionId = "<%=taskVerId %>";	
	$import("prediction/scripts/supplyDemand/dayLoad/app.js");
</script>
</head>
<body>
</body>
</html>
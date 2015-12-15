<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<title>网供电量和售电量统计</title>
<% 
	HttpSession sessionHH = request.getSession();

	String versionId = sessionHH.getAttribute("versionId") + "";//任务版本ID
	String taskId = sessionHH.getAttribute("taskId") + "";//任务ID
	String areaId = sessionHH.getAttribute("area") + "";//区域
	String baseYear = sessionHH.getAttribute("baseYear") + "";//基准年
	String beginYear = sessionHH.getAttribute("beginYear") + "";//起始年
	String endYear = sessionHH.getAttribute("endYear") + "";//目标年
	String faVersionId = request.getParameter("faVersionId") + "";//方案版本ID
	
	if(versionId == null || "".equals(versionId) || "null".equals(versionId)){
		versionId = "";
    }
	if(taskId == null || "".equals(taskId) || "null".equals(taskId)){
		taskId = "";
    }
	if(areaId == null || "".equals(areaId) || "null".equals(areaId)){
		areaId = "";
    }
	if(baseYear == null || "".equals(baseYear) || "null".equals(baseYear)){
		baseYear = "";
    }
	if(beginYear == null || "".equals(beginYear) || "null".equals(beginYear)){
		beginYear = "";
    }
	if(endYear == null || "".equals(endYear) || "null".equals(endYear)){
		endYear = "";
    }
	if(faVersionId == null || "".equals(faVersionId) || "null".equals(faVersionId)){
		faVersionId = "";
    }
%>
<script type="text/javascript">
	var versionId = "<%=versionId %>";
 	var taskId = "<%=taskId %>";
 	var areaId = "<%=areaId %>";
 	var baseYear = "<%=baseYear %>";
 	var beginYear = "<%=beginYear %>";
 	var endYear = "<%=endYear %>";
 	var faVersionId = "<%=faVersionId %>";
</script>
<script type="text/javascript">
	$import("prediction/scripts/supplyDemand/powerLoad/app.js");
</script>
</head>
<body>
</body>
</html>
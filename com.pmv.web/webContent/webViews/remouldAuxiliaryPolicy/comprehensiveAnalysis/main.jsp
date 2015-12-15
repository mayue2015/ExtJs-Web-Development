<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.Map"%> 
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<bp:base />
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>多工程综合分析</title>	
	<% 
		HttpSession sessionHH = request.getSession();
		Map<String,String> task_obj = (Map<String,String>)session.getAttribute("TASK_OBJ");
		String task_name = task_obj == null ? "" : task_obj.get("TASK_NAME")+"";
	%>
	<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
	<link rel="stylesheet" type="text/css" href="planning/css/treeGrid.css" />
	<style type="text/css">
	.x-grid-record-red-NEW{
	   background: #EEA2AD;
	}
	.x-grid-record-gray-NEW{
	   background: gray;
	}
	</style>
	<script type="text/javascript">
		var task_name = '<%=task_name%>';
		var roghtChartWidth = 300;
		$import("planning/scripts/common/treeGrid.js");
		$import("pmv/scripts/remouldAuxiliaryPolicy/comprehensiveAnalysis/controller.js");
		$import("pmv/scripts/remouldAuxiliaryPolicy/comprehensiveAnalysis/mainView.js");
	</script>
	</head>
	<body>
	</body>
	
</html>
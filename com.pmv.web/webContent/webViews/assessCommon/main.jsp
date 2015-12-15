<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<bp:base />
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>
<%
	String assessType = request.getParameter("type");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>评估</title>	
	<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
	<link rel="stylesheet" type="text/css" href="planning/css/treeGrid.css" />
	<style type="text/css">
	</style>
	<script type="text/javascript">
		var assessType = '<%=assessType%>';
		var versionId = '';
		var viceWidth = 300;		
		$import("pmv/scripts/assessCommon/app.js");
	</script>
	</head>
	<body>
	</body>
	
</html>
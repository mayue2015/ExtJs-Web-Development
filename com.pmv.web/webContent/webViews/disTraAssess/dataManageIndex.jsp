<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<bp:base />
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>配变评估基础数据维护</title>	
	<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
	<style type="text/css">
	</style>
	<script type="text/javascript">
	 // grid导出excel
	    $import("planning/scripts/excel/grid2Excel.js");
	    $import("pmv/scripts/lowVoltageDistrict/dataManage/time.js");
	    $import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
		$import("pmv/scripts/disTraAssess/controller.js");
		$import("pmv/scripts/disTraAssess/dataManageView.js");
		var viceWidth = 300;
		var isCanModify = 0;
		var height = document.documentElement.offsetHeight;
		var versionId = '';
		var defaultDate = '';
	</script>
	</head>
	<body>
	</body>
	
</html>
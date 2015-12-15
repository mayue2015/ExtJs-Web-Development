<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title>负荷分配</title>
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<style type="text/css">
.edit {
	background-image: url(planning/icons/edit.png) !important;
}
.plugin {
	background-image: url(planning/icons/fam/plugin.gif) !important;
}
</style>
<script type="text/javascript">
	var caseVersionId = window.dialogArguments.caseVersionId;
	var areaId = window.dialogArguments.areaId;
	$import("prediction/scripts/loadforecasting/totalloadforecasting/loadAssign.js");
</script>
</head>
<body>
</body>
</html>
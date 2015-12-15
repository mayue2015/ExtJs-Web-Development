<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title></title>
<script type="text/javascript">
	var title = "各产业用电量统计";
	var i = 1;
	do{
	  title += "　  ";
	  i++;
	}while(i<500)
	document.title = title;
	
	$import("planning/scripts/getLoadTime/getLoadTime.js");
	
	$import("prediction/scripts/supplyDemand/everyInduPower/Window.js");
	$import("prediction/scripts/supplyDemand/everyInduPower/controller.js");
</script>
</head>
<body>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title></title>
<script type="text/javascript">
	var title = "网供电量和售电量统计";
	var i = 1;
	do{
	  title += "　  ";
	  i++;
	}while(i<500)
	document.title = title;

	$import("prediction/scripts/supplyDemand/powerSupply/window.js");
	$import("prediction/scripts/supplyDemand/powerSupply/controller.js");
</script>
</head>
<body>
</body>
</html>
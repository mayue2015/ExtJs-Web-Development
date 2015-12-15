<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title></title>
    <!-- 时刻微调 Spinner-->
    <link rel="stylesheet" href="evaluation/com/jb/pms/js/widget/application/date/Spinner.css" />
    <script type="text/javascript" src="evaluation/com/jb/pms/js/widget/application/date/Spinner.js"></script>
    <script type="text/javascript" src="evaluation/com/jb/pms/js/widget/application/date/SpinnerField.js"></script>
<script type="text/javascript">
	var title = "日负荷曲线";
	var i = 1;
	do{
	  title += "　  ";
	  i++;
	}while(i<500)
	document.title = title;
	
	$import("planning/scripts/getLoadTime/getLoadTime.js");
	$import("prediction/scripts/supplyDemand/dayLoad/Window.js");
	$import("prediction/scripts/supplyDemand/dayLoad/controller.js");
</script>
</head>
<body>
</body>
</html>
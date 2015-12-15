<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title></title>
<script type="text/javascript">
	var title = "中压线路单位造价库";
	var i = 1;
	do{
	  title += "　  ";
	  i++;
	}while(i<500)
	document.title = title;
	
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceWireType/Window.js");
</script>
</head>
<body>
</body>
</html>
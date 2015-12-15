<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base/>
<title></title>
<script type="text/javascript">
	var arg = window.dialogArguments;//获得父窗口 
	var type = null;
	if(arg){
		type = arg.type;
	}
	
	var title = "方案";
	if(type == 'create'){
		title = "新建" + title;
	}else{
		title = "修改" + title;
	}
	
	var i = 1;
	do{
	  title += "　  ";
	  i++;
	}while(i<500)
	document.title = title;
	
	$import("prediction/scripts/loadforecasting/totalloadforecasting/CaseWindow.js");
	$import("prediction/scripts/loadforecasting/totalloadforecasting/controller.js");
</script>
</head>
<body>
</body>
</html>
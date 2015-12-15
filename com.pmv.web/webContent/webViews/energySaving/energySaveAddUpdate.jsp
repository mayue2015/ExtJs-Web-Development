<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<bp:base />
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>节电量项目评估(新增/修改)</title>
	<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
	<script type="text/javascript">
		var arg = window.dialogArguments;//获得父窗口 
		var id = null;
		var name = null;
		var bigCode = null;
		var bigName = null;
		var smallCode = null;
		var smallName = null;
		
		if(arg){
			id = arg.id;
			name = arg.name;
			bigCode = arg.bigCode;
			bigName = arg.bigName;
			smallCode = arg.smallCode;
			smallName = arg.smallName;
		}
	 </script>
	 <script type="text/javascript">
			$import("pmv/scripts/energySaving/energySaveAddUpdate.js")
	 </script>
		
	</head>
	<body>
	</body>
</html>
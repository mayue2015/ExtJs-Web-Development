<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base />
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>

<script type="text/javascript">
	var title = "设备类型选择";
	var i = 1;
	do{
	  title += "　  ";
	  i++;
	}while(i<700)
	document.title = title;

   <!-- F1引入封装组件JS -->
   $import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
   
   <!-- 页面引用JS -->
   <!-- 生产厂家维护JS -->
   $import("sysconfig/scripts/sccjwh/SblxSelect.js"); 
</script>
</head>
<body></body>
</html>
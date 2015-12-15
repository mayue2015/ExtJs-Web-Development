<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>生产厂家维护</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base />
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>

<style>
	.x-grid3-cell-inner,.x-grid3-hd-inner {
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		padding: 3px 3px 3px 5px;
		white-space: normal;
	}
	.x-grid-record-blue table{
		color : blue;
	}
</style>

<script type="text/javascript">
   <!-- F1引入封装组件JS -->
   $import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
   
   <!-- 页面引用JS -->
   <!-- 生产厂家维护JS -->
   $import("sysconfig/scripts/sccjwh/sccjwh.js"); 
</script>
</head>
<body></body>
</html>
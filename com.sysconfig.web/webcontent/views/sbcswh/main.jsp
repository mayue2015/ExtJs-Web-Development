<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>设备参数维护</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- F1框架标签,引用基础资源 -->
<bp:base />

<!-- 公用jsp用来存放全局性变量、函数、页面默认行为等公共资源 -->
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>

<!-- 引用当前模块应用引导js文件,一般命名为app.js,该js用来加载,页面所需组件、应用mvc资源js文件 -->
<script type="text/javascript">
	$import("sysconfig/scripts/sbcswh/app.js");
</script>

<!-- 公用样式 -->
<link rel="stylesheet" type="text/css" href="sysconfig/public/styles/common.css">

</head>
<body></body>
</html>
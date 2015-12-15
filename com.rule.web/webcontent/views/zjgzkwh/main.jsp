<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>专家规则库维护</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- F1框架标签,引用基础资源 -->
<bp:base />

<!-- 公用jsp用来存放全局性变量、函数、页面默认行为等公共资源 -->
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>

<script type="text/javascript">
	//具体模块的应用js,当前页面示例引用的是‘专家规则库维护’应用
	$import("rule/scripts/zjgzkwh/app.js");
	//调用同步请求工具js
	$import("rule/public/scripts/Bp.util.RequestUtils.js");
</script>

<!-- 公用样式 -->
<link rel="stylesheet" type="text/css" href="rule/public/styles/common.css">
</head>
<body></body>
</html>
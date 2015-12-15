<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title>评价标准维护</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- F1框架标签,引用基础资源 -->
<bp:base />
<!-- 公用jsp用来存放全局性变量、函数、页面默认行为等公共资源 -->
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>

<style type="text/css">
/*Grid内容自动换行 begin*/
.x-grid3-cell-inner, .x-grid3-hd-inner {
	white-space: normal !important;
	word-wrap: break-word;
	word-break: break-all;
}
.x-grid3-cell {
	vertical-align: middle !important;
}
/*Grid内容自动换行 end*/
</style>

<!-- 引用当前模块应用引导js文件,一般命名为app.js,该js用来加载,页面所需组件、应用mvc资源js文件 -->
<script type="text/javascript">
	// 具体模块的应用js,当前页面示例引用的是‘评价标准维护’应用
	$import("rule/scripts/pjbzwh/app.js");
</script>
</head>
<body></body>
</html>

<!--
	jsp页面命名规则,用于显示功能模块的主页面命名为main.jsp,
	附属页面,弹出窗口可根据功能命名例如update.jsp,detail.jsp,dialog.jsp等,
	文件存储在同一目录下
-->
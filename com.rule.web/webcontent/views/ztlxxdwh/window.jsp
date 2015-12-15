<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base />
<jsp:include page="/public/views/common.jsp" flush="true"></jsp:include>
<%
	String type = request.getParameter("type");
	String guid = request.getParameter("guid");
%>
<script type="text/javascript">
	var type = "<%=type%>";
	guid = "<%=guid%>";
	if (type == "c") {
		$import("rule/scripts/ztlxxdwh/win_c.js");
	}
	if (type == "h") {
		$import("rule/scripts/ztlxxdwh/win_h.js");
	}
	if (type == "p") {
		$import("rule/scripts/ztlxxdwh/win_p.js");
	}
</script>
</head>
<body></body>
</html>
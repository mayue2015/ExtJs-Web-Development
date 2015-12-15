<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<bp:base />
<jsp:include page="sysconfig/public/views/common.jsp" flush="true"></jsp:include>
<link rel="stylesheet" type="text/css" href="planning/css/core.css">
<title></title>
<head>
	<script type="text/javascript">
		var title = "应用部门";
		var i = 1;
		do{
		  title += "　  ";
		  i++;
		}while(i<500)
		document.title = title;
		
	    $import("sysconfig/scripts/dydjwh/getDeptInfo.js");
	</script>
</head>
<body>
</body>
</html>
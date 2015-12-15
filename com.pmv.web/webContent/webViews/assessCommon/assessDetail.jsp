<%@ page language="java" import="java.util.*" import="java.net.URLDecoder" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<%
	String rightTableStr = URLDecoder.decode(request.getParameter("rightTableStr"),"utf-8");
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style type="text/css">
.table_tdv_red{
	font-size:12px;
	text-align:left;
	color:red;
	width:150px;
}
.table_tdv{
	font-size:12px;
	text-align:left;
	width:150px;
}
.table_head{
	font-size:12px;
	text-align:right;
	width:150px;
}
.table_td_bold{
	font-size:12px;
	font-weight:bold;
}
</style>
</head>
<body>
	<table>
		<tr>
			<td colspan="2" class="table_tdv">名称：<span id="dev_name"></span></td>
		</tr>
		<%		
		
			String[] d = rightTableStr.split(",");
			for (int j = 0; j < d.length; j++) {
				String[] keyValue = d[j].split("@");
				String namev = (j+1)+"."+keyValue[0];
		%>
		<tr>
			<td colspan="2"><hr style="border: 1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td>
		</tr>
		<tr>
			<td colspan="2" class="table_td_bold"><%=namev%></td>
		</tr>
		<tr>
			<td class="table_head"><%=keyValue[0]%> ：</td>
			<td class="table_tdv" ><span id = "<%=keyValue[1]%>@zbz"></span></td>
		</tr>
		<tr>
			<td class="table_head">标准参考值 ：</td>
			<td class="table_tdv" ><span id = "<%=keyValue[1]%>@ckz"></span></td>
		</tr>
		<tr>
			<td class="table_head">评价结果 ：</td>
			<td class="table_tdv" ><span id = "<%=keyValue[1]%>@jg"></span></td>
		</tr>
		<tr id = "<%=keyValue[1]%>@gjcs" style="">
			<td class="table_head" >建议改造措施 ：</td>
			<td class="table_tdv_red"><span id = "<%=keyValue[1]%>@jygzcs"></span></td>
		</tr>
		<%}%>
	</table>
</body>
</html>
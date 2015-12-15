<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<%@ page import="java.net.URLDecoder"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>更换导线型号-工程费用</title>
<style type='text/css'>
body{
	font-size:12px;
}
table {
	font-size:12px;
}
</style>
</head>
<% 
	String title = request.getParameter("title");
	title = title == null ? "" : URLDecoder.decode(title,"utf-8");
	String costBuilding = request.getParameter("costBuilding"); 
	String costInstall = request.getParameter("costInstall"); 
	String costEquipment = request.getParameter("costEquipment"); 
	String costOthers = request.getParameter("costOthers"); 
	String costStatic = request.getParameter("costStatic"); 
	String costDynamic = request.getParameter("costDynamic"); 
%>
<body>
	<table style="width:100%">
	    <!-- <hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1> -->
		<tr font-size:12px;><%= title %></tr><!-- 阿城线-阿城线-3段（10km）,型号由LGJ-95改造为LGJ-240 -->
		<tr><td colspan="3"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td></tr>
		<tr>
			<td style="width: 133px; ">分项预估费用：</td>
		</tr>
		<tr>
			<td></td>
			<td style="width: 245px; ">建筑工程费：  <%= costBuilding%> 万元</td>
			<td>安装工程费：  <%= costInstall %> 万元</td>
		</tr>
		<tr>
			<td></td>
			<td>设备购置费： <%= costEquipment %> 万元</td>
			<td>其他费用： <%= costOthers %> 万元</td>
		</tr>
		<tr><td colspan="3"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td></tr>
		<tr>
			<td>投资预估费用：</td>
		</tr>
		<tr>
			<td></td>
			<td>静态投资：  <%= costStatic %> 万元</td>
			<td>动态投资：  <%= costDynamic %> 万元</td>
		</tr>
		<tr><td colspan="3"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td></tr>
	</table>
</body>
</html>
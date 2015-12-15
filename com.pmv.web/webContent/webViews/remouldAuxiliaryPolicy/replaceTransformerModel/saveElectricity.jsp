<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<%@ page import="java.net.URLDecoder"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>节电量</title>
<bp:base />
<style> 
.table-c td{
	border:1px solid black;
}
body{
	font-size:12px;
}
table {
	font-size:12px;
}
</style>
<%
	String title = request.getParameter("title");
	title = title == null ? "" : URLDecoder.decode(title,"utf-8");
	String assSvcId = request.getParameter("assSvcId"); 
	String guid = request.getParameter("guid");
	//基期型号
	String base_model = request.getParameter("base_model"); 
	//基期容量
	String base_capacity = request.getParameter("base_capacity"); 
	//基期空载损耗
	String base_unload_lost = request.getParameter("base_unload_lost"); 
	//基期短路损耗
	String base_load_lost = request.getParameter("base_load_lost"); 
	String rep_model = request.getParameter("rep_model"); 
	String rep_capacity = request.getParameter("rep_capacity"); 
	String rep_unload_lost = request.getParameter("rep_unload_lost"); 
	String rep_load_lost = request.getParameter("rep_load_lost"); 
	String ave_load_rate = request.getParameter("ave_load_rate"); 
	String y_save_kwh = request.getParameter("y_save_kwh"); 
%>
<script type="text/javascript">
$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
function checkNum(obj) {  
    //检查是否是非数字值  
    if (isNaN(obj.value)) {  
        obj.value = "";  
    }  
    if (obj != null) {  
        //检查小数点后是否对于4位 
        if (obj.value.toString().split(".").length > 1 && obj.value.toString().split(".")[1].length > 4) {  
            obj.value = "";  
        }  
    }  
} 

function calculate(){
	var ave_load_rate = document.getElementById('aveLoadRateId').value;
	if (ave_load_rate == ''){
		alert('变压器平均负载率不能为空');
		return;
	}
	var guid = '<%=guid%>';
	//基期容量
	var base_capacity = <%=base_capacity%>;
	//基期空载损耗
	var base_unload_lost = <%=base_unload_lost%>;
	//基期短路损耗
	var base_load_lost = <%=base_load_lost%>;
	var rep_capacity = <%=rep_capacity%>;
	var rep_unload_lost = <%=rep_unload_lost%>;
	var rep_load_lost = <%=rep_load_lost%>;
	var assSvcId = '<%=assSvcId%>';
	
	var y_save_kwh = (base_unload_lost - rep_unload_lost + base_load_lost
			* Math.pow(rep_load_lost * ave_load_rate / base_capacity, 2) - rep_load_lost * ave_load_rate * ave_load_rate) * 8760 / 10000;
	var util =new Bp.util.RequestUtils();
	var res = Ext.decode(util.sendRequest('pmv/reTransformerModelAction/calculateSaveElectricity.do',{
		guid : guid,
		y_save_kwh : y_save_kwh,
		ave_load_rate : ave_load_rate,
		assSvcId : assSvcId
	}));
	if (res != undefined && res.success) {
		document.getElementById('ySaveKwhId').value = y_save_kwh.toFixed(4);
	}
}
</script>
</head>
<body>
	<table style="width: 100%;">
		<tr>
			<td ><%=title%></td>
		</tr>
		<tr><td colspan="5"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td></tr>
		<tr>
			<!-- 表格开始 -->
			<table width="100%" ;table border="0" cellspacing="0"
				style="border-collapse: collapse" class="table-c">
				<tr>
					<td rowspan="2" width="150px">基期（改造前）：</td>
					<td style="text-align: center; height: 30px">改造前型号</td>
					<td style="text-align: center; height: 30px">容量</td>
					<td style="text-align: center; height: 30px">空载损耗</td>
					<td style="text-align: center; height: 30px">短路损耗</td>
				</tr>
				<tr>
					<td style="text-align: center; height: 30px"><%=base_model%></td>
					<td style="text-align: center; height: 30px"><%=base_capacity%></td>
					<td style="text-align: center; height: 30px"><%=base_unload_lost%></td>
					<td style="text-align: center; height: 30px"><%=base_load_lost%></td>
				</tr>
				<tr>
					<td rowspan="3" width="150px">报告期（改造后）：</td>
					<td style="text-align: center; height: 30px" width="100px">改造后型号</td>
					<td style="text-align: center; height: 30px" width="100px">容量</td>
					<td style="text-align: center; height: 30px" width="100px">空载损耗</td>
					<td style="text-align: center; height: 30px" width="100px">短路损耗</td>
				</tr>
				<tr>
					<td style="text-align: center; height: 30px"><%=rep_model%></td>
					<td style="text-align: center; height: 30px"><%=rep_capacity%></td>
					<td style="text-align: center; height: 30px"><%=rep_unload_lost%></td>
					<td style="text-align: center; height: 30px"><%=rep_load_lost%></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: center; height: 30px">变压器平均负载率(%)</td>
					<td colspan="2"><input id="aveLoadRateId" type="text" value=<%=ave_load_rate%> style="border:0px;width:100%;" onkeyup="checkNum(this)"/></td>
				</tr>
			</table>
			<!-- 表格结束 -->
		</tr>
		<tr><td colspan="5"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td></tr>
		<tr>
		<table width="100%"; table border="0" cellspacing="0" style="border-collapse:collapse">
		<td style="border:1px solid red; width: 230px;height: 30px";">项目年节电量（万千瓦时）：</td>
			<td style="width: 300px;border:1px solid red;"><input id="ySaveKwhId" type="text" value=<%=y_save_kwh%> style="border:0px;width:100%;"/></td>
			<td ><input type="button" onclick=calculate() value="计算" /></td>
		</table>
		</tr>
	</table>
</body>
</html>
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
	String versionId = request.getParameter("versionId"); 
	String assSvcId = request.getParameter("assSvcId"); 
	String assSvcProject = request.getParameter("assSvcProject"); 
	String assSvcKva = request.getParameter("assSvcKva"); 
	String assSvcTan = request.getParameter("assSvcTan");
	if(assSvcTan == null || "".equals(assSvcTan) || "null".equals(assSvcTan)){
		assSvcTan = "0.008";
	}
	String assSvcReq = request.getParameter("assSvcReq"); 
	if(assSvcReq == null || "".equals(assSvcReq) || "null".equals(assSvcReq)){
		assSvcReq = "0.05";
	}
	String assEquTime = request.getParameter("assEquTime"); 
	if(assEquTime == null || "".equals(assEquTime) || "null".equals(assEquTime)){
		assEquTime = "1000";
	}
	String ySaveKwh = request.getParameter("ySaveKwh"); 
	if(ySaveKwh == null || "".equals(ySaveKwh) || "null".equals(ySaveKwh)){
		ySaveKwh = "";
	}
%>
<script type="text/javascript">
$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
var versionId = '<%=versionId%>';
var assSvcId = '<%=assSvcId%>';
var assSvcProject = '<%=assSvcProject%>';
var assSvcKva1 = <%=assSvcKva%>;
var assSvcTan1 = <%=assSvcTan%>;
var assSvcReq1 = <%=assSvcReq%>;
var assEquTime1 = <%=assEquTime%>;
var ySaveKwh1 = '<%=ySaveKwh%>';
function calculate(){
	var _assSvcKva = document.getElementById('assSvcKva').value;
	var _assSvcTan = document.getElementById('assSvcTan').value;
	var _assSvcReq = document.getElementById('assSvcReq').value;
	var _assEquTime = document.getElementById('assEquTime').value;
	var a=_assSvcKva*(_assSvcReq-_assSvcTan)*_assEquTime;
	var _ySaveKwh = a.toFixed(4);
	document.getElementById('ySaveKwh').value = _ySaveKwh;
	var util =new Bp.util.RequestUtils();
	var res = Ext.decode(util.sendRequest('pmv/reactivePowerOptimizationController/calculateSaveElectricity.do',{
		versionId : versionId,
		assSvcId : assSvcId,
		assSvcKva : _assSvcKva,
		assSvcTan : _assSvcTan,
		assSvcReq : _assSvcReq,
		assEquTime : _assEquTime,
		ySaveKwh : _ySaveKwh,
		assSvcProject : assSvcProject
	}));
	if (res != undefined && res.success) {
		document.getElementById('ySaveKwh').value = _ySaveKwh;
	}
 }
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
window.onload=function(){
	if(assSvcTan1 != ''){
		document.getElementById('assSvcTan').value = assSvcTan1;
	}
	if(assSvcReq1 != ''){
		document.getElementById('assSvcReq').value = assSvcReq1;
	}
	if(assEquTime1 != ''){
		document.getElementById('assEquTime').value = assEquTime1;
	}
	if(ySaveKwh1 != ''){
		document.getElementById('ySaveKwh').value = ySaveKwh1;
	}
};
</script>
</head>
<body>
	<table style="width: 100%;" >
	<tr><td colspan="3"><%= title %></td></tr>
	<tr><td colspan="3"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td></tr>
		<tr>
			<table width="100%";table border="0" cellspacing="0" style="border-collapse:collapse" class="table-c">
			
				<tr>
					<td rowspan="4" width ="150px" >报告期（改造后）：</td>
					<td style="text-align:right; width: 239px; height: 30px";>无功补偿全投的容量值</td>
					<td><input id = "assSvcKva" type="text" value=<%= assSvcKva %> style="border:0px;width:100%;" disabled="true"/></td>
				</tr>
				<tr>
					<td style="text-align:right;height: 30px";">电容器的介质损耗角正切值</td>
					<td><input id="assSvcTan" type="text" value=0.0008 style="border:0px;width:100%;" onkeyup="checkNum(this)"/></td>
				</tr>
				<tr>
					<td style="text-align:right;height: 30px";">无功经济当量</td>
					<td><input id="assSvcReq" type="text" value=0.05 style="border:0px;width:100%;" onkeyup="checkNum(this)"/></td>
				</tr>
				<tr>
					<td style="text-align:right;height: 30px";">补偿装置在最大节电力下等效运行时间</td>
					<td><input id="assEquTime" type="text" value=1000 style="border:0px;width:100%;" onkeyup="checkNum(this)"/></td>
				</tr>
			</table>
		</tr>
		<tr>
			<td colspan="3"><hr style="border: 1 dashed #000000"
					width="100%" color=#000000 SIZE=1></td>
		</tr>
		<tr >
		<table width="100%"; table border="0" cellspacing="0" style="border-collapse:collapse">
		<td style="border:1px solid red; width: 230px;height: 30px";">项目年节电量（万千瓦时）：</td>
			<td style="width: 300px;border:1px solid red;"><input id="ySaveKwh" type="text" style="border:0px;width:100%;"/></td>
			<td ><input type="button" onclick=calculate() value="计算" /></td>
		</table>
		</tr>
	</table>
</body>
</html>
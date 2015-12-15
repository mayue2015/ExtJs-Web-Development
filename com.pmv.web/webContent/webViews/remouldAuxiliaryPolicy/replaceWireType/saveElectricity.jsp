<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<%@ page import="java.net.URLDecoder"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>更换导线型号-节电量</title>
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
	
	String base_model = request.getParameter("base_model"); 
	String base_length = request.getParameter("base_length");
	String base_r_cal = request.getParameter("base_r_cal");
	String rep_model = request.getParameter("rep_model"); 
	String rep_r_cal = request.getParameter("rep_r_cal"); 
	String run_time = request.getParameter("run_time"); 
	String max_a = request.getParameter("max_a");
	String ave_a = request.getParameter("ave_a");
	String k = request.getParameter("k"); 
	String y_save_kwh = request.getParameter("y_save_kwh"); 
	String assSvcId = request.getParameter("assSvcId"); 
	String assSvcProject = request.getParameter("assSvcProject"); 
	
	if(run_time == null || "".equals(run_time) || "null".equals(run_time)){
		run_time = "8760";
	}
	if(ave_a == null || "".equals(ave_a) || "null".equals(ave_a)){
		ave_a = "200";
	}
	if(k == null || "".equals(k) || "null".equals(k)){
		k = "1.1";
	}
%>

<script type="text/javascript">
$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");

var assSvcId = '<%=assSvcId%>';
var assSvcProject = '<%=assSvcProject%>';
var base_length = <%=base_length%>
var run_time = '<%=run_time%>';
var ave_a = '<%=ave_a%>';
var k = '<%=k%>';
var y_save_kwh = '<%=y_save_kwh%>';

function calculate(){
	var _run_time = document.getElementById('run_time').value;
	var _ave_a = document.getElementById('ave_a').value;
	var _k = document.getElementById('k').value;
	var _base_r = document.getElementById('base_r').value;
	var _rep_r = document.getElementById('rep_r').value;
	var a = (_k*_k*_ave_a*_ave_a*(_base_r*base_length-_rep_r*base_length)*_run_time)/10000/1000;
	var _y_save_kwh = a.toFixed(4);
	document.getElementById('y_save_kwh').value = _y_save_kwh;
	
	var util =new Bp.util.RequestUtils();
	var res = Ext.decode(util.sendRequest('pmv/replaceWireTypeAction/calculateSaveElectricity.do',{
		assSvcId : assSvcId,
		assSvcProject : assSvcProject,
		run_time : _run_time,
		ave_a : _ave_a,
		k : _k,
		y_save_kwh : _y_save_kwh
	}));
	if (res != undefined && res.success) {
		document.getElementById('y_save_kwh').value = _y_save_kwh;
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
	if(run_time != ''){
		document.getElementById('run_time').value = run_time;
	}
	if(ave_a != ''){
		document.getElementById('ave_a').value = ave_a;
	}
	if(k != ''){
		document.getElementById('k').value = k;
	}
	if(y_save_kwh != ''){
		document.getElementById('y_save_kwh').value = y_save_kwh;
	}
};
</script>
</head>
<body>
	<table style="width: 100%;">
	<tr>
		<td colspan="3"></td>
	</tr>
	<tr>
		<td colspan="3"><%= title %></td>
	</tr>
	<tr>
		<td colspan="3"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td>
	</tr>
		<tr>
			<!-- 表格开始 -->
			<table width="100%";table border="0" cellspacing="0" style="border-collapse:collapse" class="table-c">
				<tr>
					<td rowspan="2" width ="150px" >基期（改造前）：</td>
					<td style="text-align:center; height: 30px">改造前型号</td>
					<td style="text-align:center; height: 30px">导线长度（km）</td>
					<td style="text-align:center; height: 30px">计算电阻（欧）</td>
				</tr>
	            <tr>
					<td style="text-align:center; height: 30px"><%= base_model %></td>
					<td style="text-align:center; height: 30px"><%= base_length %></td>
					<td style="text-align:center; height: 30px"><input id="base_r" type="text" value=<%= base_r_cal %> style="border:0px;width:100%;text-align:center;" disabled="true"/></td>
				</tr>	
				<tr>
					<td rowspan="4" width ="150px" >报告期（改造后）：</td>
					<td style="text-align:center; height: 30px";>改造后型号</td>
					<td style="text-align:center; height: 30px";>计算电阻（欧）</td>
					<td style="text-align:center; height: 30px";>运行时间（小时）</td>
				</tr>
				 <tr>
					<td style="text-align:center; height: 30px"><%= rep_model %></td>
					<td style="text-align:center; height: 30px"><input id="rep_r" type="text" value=<%= rep_r_cal %> style="border:0px;width:100%;text-align:center;" disabled="true"/></td>
					<td style="text-align:center; height: 30px">
					   <input id="run_time" type="text" value=<%= run_time %> style="border:0px;width:100%;text-align:center;" onkeyup="checkNum(this)" />
					</td>
				</tr>	
				<tr>
					<td style="text-align:center; height: 30px">安全电流（安）</td>
					<td style="text-align:center; height: 30px">平均电流（安）</td>
					<td style="text-align:center; height: 30px">形状系数</td>
				</tr>
				<tr>
					<td style="text-align:center; height: 30px"><%= max_a %></td>
					<td style="text-align:center; height: 30px">
					   <input id="ave_a" type="text" value=<%= ave_a %> style="border:0px;width:100%;text-align:center;" onkeyup="checkNum(this)"/>
					</td>
					<td style="text-align:center; height: 30px">
					   <input id="k" type="text" value=<%= k %> style="border:0px;width:100%;text-align:center;" onkeyup="checkNum(this)"/>
				    </td>
				</tr>	
			</table>
			<!-- 表格结束 -->
		</tr>
		<tr>
			<td colspan="3"><hr style="border: 1 dashed #000000" width="100%" color=#000000 SIZE=1></td>
		</tr>
		<tr>
		<table width="100%"; table border="0" cellspacing="0" style="border-collapse:collapse">
			<td style="border:1px solid red; width: 180px;height: 30px";";><font color=red>项目年节电量（万千瓦时）：</font></td>
			<td style="width: 300px;border:1px solid red;"><input id="y_save_kwh" type="text" style="border:0px;width:100%;text-align:right;"/></td>
			<td style="width: 30px;"></td>
			<td >
				<input type="button" style="border:1px solid red;width: 70px;height: 30px;font-size:14px" onclick="calculate()" value="计 算" />
			</td>
		</table>
		</tr>
	</table>
</body>
</html>
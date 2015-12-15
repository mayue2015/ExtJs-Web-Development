<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>总投资收益率</title>
<bp:base />
<style type='text/css'>
body{
	font-size:12px;
}
table {
	font-size:12px;
}

</style>
<%
	String versionId = request.getParameter("versionId");
	String assSvcId = request.getParameter("assSvcId");
	//综合电价
	String assElePrice = request.getParameter("assElePrice");
	if(assElePrice == null || "null".equals(assElePrice)){
		assElePrice="0.6";
	}
	//建设期月
	String assBldPeriod = request.getParameter("assBldPeriod");
	if(assBldPeriod == null || "null".equals(assBldPeriod)){
		assBldPeriod="6";
	}
	//合同期年
	String assConPeriod = request.getParameter("assConPeriod");
	if(assConPeriod == null || "null".equals(assConPeriod)){
		assConPeriod="5";
	}
	//分享比例
	String assShrRatio = request.getParameter("assShrRatio");
	if(assShrRatio == null || "null".equals(assShrRatio)){
		assShrRatio="0.95";
	}
	//技术服务费
	String assCstService = request.getParameter("assCstService");
	//无功补偿
	String assCstSvc = request.getParameter("assCstSvc");
	//静态投资
	String costStatic = request.getParameter("costStatic");
	//动态投资
	String costDynamic = request.getParameter("costDynamic");
	//年节电量
	String ySaveKwh = request.getParameter("ySaveKwh");
	//年节电效益
	String ySaveIncome = request.getParameter("ySaveIncome");
	//经营成本
	String assCstOper = request.getParameter("assCstOper");
	//建设期利息
	String assBldInterest = request.getParameter("assBldInterest");
	//支出
	String assExpense = request.getParameter("assExpense");
	//	年总收益
	String assYIncome = request.getParameter("assYIncome");
	//	管理费用
	String assCstManege = request.getParameter("assCstManege");
	//	通信维护费用
	String assCstCom = request.getParameter("assCstCom");
	//维护费用
	String assCstMaintnc = request.getParameter("assCstMaintnc");
	//五年利税前利益
	String assBenefit = request.getParameter("assBenefit");
	//总投资收益率
	String assCstInrate = request.getParameter("assCstInrate");
%>
<script type="text/javascript">
$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
var assBldPeriod = <%=assBldPeriod%>.toFixed(0);
var assConPeriod = <%=assConPeriod%>.toFixed(0);
var costDynamic = <%=costDynamic%>;
var costStatic = <%=costStatic%>;
var assSvcId = '<%=assSvcId%>';
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
function changeDiv(a,id){
	document.getElementById("year")[a-1].selected=true;
	document.getElementById('div5').style.backgroundColor="#FFFFFF";
	document.getElementById('div6').style.backgroundColor="#FFFFFF";
	document.getElementById('div7').style.backgroundColor="#FFFFFF";
	document.getElementById('div8').style.backgroundColor="#FFFFFF";
	if(document.getElementById(id)!=null){
		document.getElementById(id).style.backgroundColor="#FF3333";
	}
}
function selectChange(){
	var obj = document.getElementById('year'); //定位id
	var index = obj.selectedIndex; // 选中索引
	var value = obj.options[index].value; // 选中值
	changeDiv(value,'div'+value);
}
window.onload=function(){
	document.getElementById("month")[assBldPeriod-1].selected=true;
	document.getElementById("year")[assConPeriod-1].selected=true;
	if(document.getElementById('div'+assConPeriod)!=null){
		document.getElementById('div'+assConPeriod).style.backgroundColor="#FF3333";
	}
}
function calculate(){
	//年节电量
	var ySaveKwh = document.getElementById('ySaveKwhId').value;
	//综合电价
	var assElePrice = document.getElementById('assElePriceId').value;
	//分享比例
	var assShrRatio = document.getElementById('assShrRatioId').value;
	//建设期
	var assBldPeriod = document.getElementById('month').value;
	//无功补偿
	var assCstSvc = document.getElementById('assCstSvcId').value;
	//合同期
	var assConPeriod = document.getElementById('year').value;
	//技术服务费用
	var assCstService = document.getElementById('assCstServiceId').value
	
//	1年节电效益	年节电量*综合电价*分享比例
	var ySaveIncome = ySaveKwh*assElePrice*assShrRatio;
//	3建设期利息	静态投资*0.7*0.064*建设期/12*0.5
	var assBldInterest = costStatic*0.7*0.064*assBldPeriod/12*0.5;
//	5年总收益	年节电效益*合同期
	var assYIncome = ySaveIncome*5;
//	6管理费用	年总收益*0.05
	var assCstManege = assYIncome*0.05;
//	7通信维护费用	无功补偿*合同期*12*10/10000 
	var assCstCom = assCstSvc*assConPeriod*12*10/10000;
//	8维护费用		年总收益*0.05
	var assCstMaintnc = assYIncome*0.05;
//	2经营成本	维护费+管理费用+技术服务费用+通信服务费用
	var assCstOper = assCstMaintnc+assCstManege+(assCstService-0)+assCstCom;
//	4支出		动态投资+经营成本
	var assExpense = costDynamic+assCstOper;
//	9五年利税前利益	年总收益-支出
	var assBenefit = assYIncome-assExpense;
//	10总投资收益率	五年利税前利润/合同期/静态投资
	var assCstInrate = assBenefit/document.getElementById('year').value/costStatic;
	
	var util =new Bp.util.RequestUtils();
	var res = Ext.decode(util.sendRequest('pmv/reTransformerModelAction/calculateRoi.do',{
		assSvcId : assSvcId,
		costDynamic : costDynamic,
		assElePrice : assElePrice,
		assShrRatio : assShrRatio,
		assBldPeriod : assBldPeriod,
		assCstSvc : assCstSvc,
		assConPeriod : assConPeriod,
		assCstService : assCstService,
		ySaveIncome : ySaveIncome,
		assBldInterest : assBldInterest,
		assYIncome : assYIncome,
		assCstManege : assCstManege,
		assCstCom : assCstCom,
		assCstMaintnc : assCstMaintnc,
		assCstOper : assCstOper,
		assExpense : assExpense,
		assBenefit : assBenefit,
		assCstInrate : assCstInrate
	}));
	if (res != undefined && res.success) {
		document.getElementById('ySaveIncomeId').value = ySaveIncome.toFixed(4);
		document.getElementById('assBldInterestId').value = assBldInterest.toFixed(4);
		document.getElementById('assYIncomeId').value = assYIncome.toFixed(4);
		document.getElementById('assCstManegeId').value = assCstManege.toFixed(4);
		document.getElementById('assCstComId').value = assCstCom.toFixed(4);
		document.getElementById('assCstMaintncId').value = assCstMaintnc.toFixed(4);
		document.getElementById('assCstOperId').value = assCstOper.toFixed(4);
		document.getElementById('assExpenseId').value = assExpense.toFixed(4);
		document.getElementById('assBenefitId').value = assBenefit.toFixed(4);
		document.getElementById('assCstInrateId').value = assCstInrate.toFixed(4);
	}
}
</script>
</head>
<body>
	<table style="width: 100%;">
	<tr><td>综合电价：<input id="assElePriceId" type="text" value='<%=assElePrice %>' style="width:100px;" onkeyup="checkNum(this)"/>元/kWh</td>
		<td>　建 设 期：<select name="month" id="month" style="width:100px;">
						<%for (int i = 1; i < 13; i++){ %>   
				        <option value="<%=i%>" ><%=i%></option>
				        <%} %> 
				      </select>月</td>
		<td>　　　合 同 期：<select name="year" id="year" style="width:100px;" onchange="selectChange()">   
				       <%for (int i = 1; i < 13; i++){ %>   
				        <option value="<%=i%>"><%=i%></option>
				        <%} %> 
				      </select>年</td></tr>
	<tr><td>分享比例：<input id="assShrRatioId" type="text" value='<%=assShrRatio %>' style="width:100;" nkeyup="checkNum(this)"/>万元</td>
		<td>技术服务费：<input id="assCstServiceId" type="text" value='<%=assCstService %>' style="width:100;" nkeyup="checkNum(this)"/>万元</td>
		<td>　　　无功补偿：<input id="assCstSvcId" type="text" value='<%=assCstSvc %>' style="width:100;" nkeyup="checkNum(this)"/>万元</td></tr>
	<tr><td><font color="#FF0000">静态投资：<input id="costStaticId" type="text" value='<%=costStatic %>' style="width:100;" disabled="true"/>万元</font></td>
		<td>　动态投资：<input id="costDynamicId" type="text" value='<%=costDynamic %>' style="width:100;" nkeyup="checkNum(this)"/>万元</td>
		<td>　　　<font color="#FF0000">年节电量：<input id="ySaveKwhId" type="text" value='<%=ySaveKwh %>' style="width:100;" disabled="true"/>万kWH</font></td></tr>
	<tr><td>经营成本：<input id="assCstOperId" type="text" value='<%=assCstOper %>' style="width:100;"disabled="true"/>万元</td>
		<td>建设期利息：<input id="assBldInterestId" type="text" value='<%=assBldInterest %>' style="width:100;"disabled="true"/>万元</td>
		<td>　　　节电效益：<input id="ySaveIncomeId" type="text" value='<%=ySaveIncome %>' style="width:100;"disabled="true"/>万元</td></tr>
	<tr><td>　　支出：<input id="assExpenseId" type="text" value='<%=assExpense %>' style="width:100;"disabled="true"/>万元</td>
		<td></td>
		<td>　　　年总收益：<input id="assYIncomeId" type="text" value='<%=assYIncome %>' style="width:100;"disabled="true"/>万元</td></tr>
	<tr><td>管理费用：<input id="assCstManegeId" type="text" value='<%=assCstManege %>' style="width:100;"disabled="true"/>万元</td>
		<td></td>
		<td>　通信维护费用：<input id="assCstComId" type="text" value='<%=assCstCom %>' style="width:100;"disabled="true"/>万元</td></tr>
	<tr><td>维护费用：<input id="assCstMaintncId" type="text" value='<%=assCstMaintnc %>' style="width:100;"disabled="true"/>万元</td>
		<td></td>
		<td>五年利税前利润：<input id="assBenefitId" type="text" value='<%=assBenefit %>' style="width:100;"disabled="true"/>万元</td></tr>
	<tr><td colspan="3"><hr style="border:1 dashed #000000" width="100%" color=#987cb9 SIZE=1></td></tr>
	<tr><td><font color="#FF0000">总投资收益率（%）：</font><input id="assCstInrateId" type="text" value='<%=assCstInrate %>' style="width:100;"disabled="true"/></td>
		<td ><input type="button" onclick="calculate()" value="计算" /></td>
		<td>
			<div id="div5" style="width:30px;float:left;border:1px solid red;margin-left:5px;" onclick = "changeDiv(5,'div5')">5年</div>
			<div id="div6" style="width:30px;float:left;border:1px solid red;margin-left:5px;" onclick = "changeDiv(6,'div6')">6年</div>
			<div id="div7" style="width:30px;float:left;border:1px solid red;margin-left:5px;" onclick = "changeDiv(7,'div7')">7年</div>
			<div id="div8" style="width:30px;float:left;border:1px solid red;margin-left:5px;" onclick = "changeDiv(8,'div8')">8年</div>
		</td>
	</tr>
	</table>
</body>
</html>
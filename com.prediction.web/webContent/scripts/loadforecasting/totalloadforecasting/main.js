Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");
   
	//引用公共JS
	$import("planning/scripts/excel/grid2Excel.js");
	$import("planning/scripts/src/bpWidget/chart/chart.js");
	$import("planning/scripts/src/bpWidget/chart/anyChartContext.js");
	
	//引用页面JS
	$import("prediction/scripts/loadforecasting/totalloadforecasting/LineChart.js")
	$import("prediction/scripts/loadforecasting/totalloadforecasting/chartCenter.js")
	$import("prediction/scripts/loadforecasting/totalloadforecasting/tabsView.js");
	$import("prediction/scripts/loadforecasting/totalloadforecasting/view.js");
	$import("prediction/scripts/loadforecasting/totalloadforecasting/controller.js");
});
Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");

	height = document.documentElement.offsetHeight;
	width = document.documentElement.offsetWidth;
   
	//引用公共JS
	$import("planning/scripts/excel/ImportExcel.js");
	$import("planning/scripts/excel/grid2Excel.js");
	$import("planning/scripts/src/bpWidget/chart/chart.js");
	$import("planning/scripts/src/bpWidget/chart/anyChartContext.js");
	
	//引用页面JS
	$import("prediction/scripts/supplyDemand/yearLoad/navTree.js")
	$import("prediction/scripts/supplyDemand/yearLoad/LineChart.js");
	$import("prediction/scripts/supplyDemand/yearLoad/view.js");
	$import("prediction/scripts/supplyDemand/yearLoad/controller.js");
});
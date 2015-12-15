Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");
   
	//引用公共JS
	$import("planning/scripts/excel/ImportExcel.js");
	$import("planning/scripts/excel/grid2Excel.js");
	$import("planning/scripts/dwyxTree/navTree.js");
	
	//引用页面JS
	$import("prediction/scripts/supplyDemand/everyInduPower/view.js");
	$import("prediction/scripts/supplyDemand/everyInduPower/controller.js");
});
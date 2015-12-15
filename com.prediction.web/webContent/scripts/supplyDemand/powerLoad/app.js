Ext.onReady(function(){
	Ext.ns("Ext.app");
	
	// grid导出excel
	$import("planning/scripts/excel/grid2Excel.js");
	$import("planning/scripts/excel/ImportExcel.js");
	
	//多表头
	$import("prediction/scripts/supplyDemand/powerLoad/ColumnHeaderGroup.js");
	//控制层
	$import("prediction/scripts/supplyDemand/powerLoad/controller.js");
	//工具条
	$import("prediction/scripts/supplyDemand/powerLoad/tbar.js");
	// 树
	$import("planning/scripts/dwyxTree/navTree.js");
	// 主页面显示
	$import("prediction/scripts/supplyDemand/powerLoad/view.js");
	
});
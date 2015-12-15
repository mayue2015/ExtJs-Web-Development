Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");
   
	//引用公共JS
	$import("planning/scripts/excel/grid2Excel.js");
	
	//引用页面JS
	$import("reduction/scripts/loadDataManagement/model.js");
	$import("reduction/scripts/loadDataManagement/event.js");
	$import("reduction/scripts/loadDataManagement/view.js");
});
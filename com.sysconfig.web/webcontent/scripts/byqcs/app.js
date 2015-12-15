Ext.onReady(function(){
	Ext.ns("Ext.app");
	
	// 调用同步请求js
	$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
	// grid导出excel
	$import("planning/scripts/excel/grid2Excel.js");
	
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	
	$import("sysconfig/scripts/byqcs/model.js");
	// controller.js用来存储动作、请求等函数
	$import("sysconfig/scripts/byqcs/controller.js");
	// view.js用来编写用于显示页面组件对象
	$import("sysconfig/scripts/byqcs/view.js");
	
});
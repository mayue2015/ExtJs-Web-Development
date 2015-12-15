Ext.onReady(function(){
	Ext.ns("Ext.app");
	
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	
	// 调用同步请求js
	$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
	
	$import("planning/scripts/excel/grid2Excel.js");
	
	$import("sysconfig/scripts/subsParameter/model.js");
	// controller.js用来存储动作、请求等函数
	$import("sysconfig/scripts/subsParameter/controller.js");
	// view.js用来编写用于显示页面组件对象
	$import("sysconfig/scripts/subsParameter/view.js");
	
});
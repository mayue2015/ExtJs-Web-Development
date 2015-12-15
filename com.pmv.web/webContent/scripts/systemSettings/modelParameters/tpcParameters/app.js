Ext.onReady(function(){
	Ext.ns("Ext.app");
	
	// 调用同步请求js
	$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
	
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	
	$import("pmv/scripts/systemSettings/modelParameters/tpcParameters/model.js");
	// controller.js用来存储动作、请求等函数
	$import("pmv/scripts/systemSettings/modelParameters/tpcParameters/controller.js");
	// view.js用来编写用于显示页面组件对象
	$import("pmv/scripts/systemSettings/modelParameters/tpcParameters/view.js");
	
});
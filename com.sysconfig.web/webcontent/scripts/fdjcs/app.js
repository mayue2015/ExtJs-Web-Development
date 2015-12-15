Ext.onReady(function() {
	
	// 声明应用命名空间,一般使用Ext.app即可,该命名空间用于存储应用所使用的模型,组件,方法等(仅当前页面有效)
	Ext.ns("Ext.app");
	
	// 引用框架组件
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	
	// grid导出excel
	$import("planning/scripts/excel/grid2Excel.js");
	
	// 模型ID
	$import("sysconfig/scripts/fdjcs/model.js");
	// controller.js用来存储动作、请求等函数
	$import("sysconfig/scripts/fdjcs/controller.js");
	// view.js用来编写用于显示页面组件对象
	$import("sysconfig/scripts/fdjcs/view.js");
});
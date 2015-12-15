Ext.onReady(function() {

	// 声明应用命名空间,一般使用Ext.app即可,该命名空间用于存储应用所使用的模型,组件,方法等(仅当前页面有效)
	Ext.ns("Ext.app");

	// 引用框架组件

	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");

	$import("rule/scripts/zjgzkwh/model.js");
	// controller.js用来存储动作、请求等函数
	$import("rule/scripts/zjgzkwh/controller.js");
	// view.js用来编写用于显示页面组件对象
	$import("rule/scripts/zjgzkwh/view.js");

});

Ext.onReady(function(){
	// 评价细则维护命名空间
	Ext.ns("Ext.app");

	// 引用框架组件
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDDataSource.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
	
	// model.js一般用来存储实体对象
	$import("rule/scripts/pjxzwh/model.js");
	// controller.js用来存储动作、请求等函数
	$import("rule/scripts/pjxzwh/controller.js");
	// view.js用来编写用于显示页面组件对象
	$import("rule/scripts/pjxzwh/view.js");
	
})

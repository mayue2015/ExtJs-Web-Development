Ext.onReady(function() {

	// 模型库维护命名空间
	Ext.ns("Ext.appPjmxkwh");
	// 算法变量维护命名空间
	Ext.ns("Ext.appSfblwh");
	// 评价对象维护命名空间
	Ext.ns("Ext.appPjdxwh");
	// 状态量维护命名空间
	Ext.ns("Ext.appZtlwh");
	// 评价指标维护命名空间
	Ext.ns("Ext.appPjzbwh");
	
	// 引用框架组件
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");

	$import("rule/scripts/pjmxkwh/model.js");
	$import("rule/scripts/pjmxkwh/controller.js");
	$import("rule/scripts/pjmxkwh/view.js");
});

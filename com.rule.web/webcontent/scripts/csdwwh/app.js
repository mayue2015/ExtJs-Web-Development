Ext.onReady(function() {

	Ext.ns("Ext.app");
	// 城市电网命名空间
	Ext.ns("Ext.appCsdw");
	// 配电网区域命名空间
	Ext.ns("Ext.appPdwqy");
	// 评价线路命名空间
	Ext.ns("Ext.appPjxl");

	$import("extjs/scripts/src/BDControls/BDQueryPanel.js");
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDDataSource.js");
	$import("extjs/scripts/src/BDControls/BDForm.js");
	$import("extjs/scripts/src/BDControls/BDField.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");

	$import("rule/scripts/csdwwh/model.js");
	$import("rule/scripts/csdwwh/controller.js");
	$import("rule/scripts/csdwwh/view.js");
});
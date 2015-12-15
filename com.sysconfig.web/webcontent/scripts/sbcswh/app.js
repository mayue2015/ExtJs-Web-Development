Ext.onReady(function() {

	Ext.ns("Ext.app");
	// 基本参数命名空间
	Ext.ns("Ext.appJbcs");
	// 扩展参数区域命名空间
	Ext.ns("Ext.appKzcs");
	

	$import("extjs/scripts/src/BDControls/BDQueryPanel.js");
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDDataSource.js");
	$import("extjs/scripts/src/BDControls/BDForm.js");
	$import("extjs/scripts/src/BDControls/BDField.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");

	$import("sysconfig/scripts/sbcswh/model.js");
	$import("sysconfig/scripts/sbcswh/controller.js");
	$import("sysconfig/scripts/sbcswh/view.js");
});
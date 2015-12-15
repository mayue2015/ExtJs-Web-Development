Ext.onReady(function() {
	// 命名空间
	Ext.ns("Ext.app");
	
    // 平台组件JS
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	
    // 页面引用JS
	$import("sysconfig/scripts/dydjwh/model.js");
	$import("sysconfig/scripts/dydjwh/controller.js");
	$import("sysconfig/scripts/dydjwh/view.js");
	
});

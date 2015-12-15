Ext.onReady(function() {
	// 命名空间
	Ext.ns("Ext.app");
	
    // 平台组件JS
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	
	// grid导出excel
	$import("planning/scripts/excel/grid2Excel.js");
	
    // 页面引用JS
	$import("sysconfig/scripts/dlcswh/model.js");
	$import("sysconfig/scripts/dlcswh/controller.js");
	$import("sysconfig/scripts/dlcswh/view.js");
	
});

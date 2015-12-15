Ext.onReady(function() {
	//命名空间
	Ext.ns("Ext.app");

	//平台组件JS
	$import("extjs/scripts/src/BDControls/BDQueryPanel.js");
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDDataSource.js");
	$import("extjs/scripts/src/BDControls/BDForm.js");

	//页面JS
	$import("pmv/scripts/engineeringTask/model.js");
	$import("pmv/scripts/engineeringTask/controller.js");
	$import("pmv/scripts/engineeringTask/view.js");
});

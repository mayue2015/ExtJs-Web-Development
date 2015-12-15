Ext.onReady(function() {
	//命名空间
	Ext.ns("Ext.app");

	//引用框架组件
	$import("extjs/scripts/src/BDControls/BDQueryPanel.js");
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDDataSource.js");
	$import("extjs/scripts/src/BDControls/BDForm.js");
	$import("extjs/scripts/src/BDControls/BDField.js");

	//引用页面JS
	$import("sysconfig/scripts/wdbzcx/model.js");
	$import("sysconfig/scripts/wdbzcx/controller.js");
	$import("sysconfig/scripts/wdbzcx/view.js");
});

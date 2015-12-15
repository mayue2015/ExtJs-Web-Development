Ext.onReady(function() {
    //命名空间
	Ext.ns("Ext.app");

	//引用封装框架组件
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDField.js");
	$import("extjs/scripts/src/BDControls/BDDataSource.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");

	//引用MVC模块应用js
	$import("rule/scripts/ztlxxdwh/model.js");
	$import("rule/scripts/ztlxxdwh/sjlyModel.js");
	$import("rule/scripts/ztlxxdwh/controller.js");
	$import("rule/scripts/ztlxxdwh/sjlyController.js");
	$import("rule/scripts/ztlxxdwh/view.js");
});

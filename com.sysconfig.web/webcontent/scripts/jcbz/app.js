Ext.onReady(function() {
    // 命名空间
	Ext.ns("Ext.app");
    // 引入平台封装JS
	$import("extjs/scripts/src/BDControls/BDQueryPanel.js");
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDField.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
    // 引入页面JS
	$import("sysconfig/scripts/jcbz/model.js");
	$import("sysconfig/scripts/jcbz/controller.js");
	$import("sysconfig/scripts/jcbz/view.js");
});

Ext.onReady(function() {
	//命名空间
	Ext.ns("Ext.app");

	//平台组件JS
	$import("extjs/scripts/src/BDControls/BDGrid.js");

	//页面JS
	$import("pmv/scripts/systemSettings/economicEvaluation/mediumVolLine/model.js");
	$import("pmv/scripts/systemSettings/economicEvaluation/mediumVolLine/controller.js");
	$import("pmv/scripts/systemSettings/economicEvaluation/mediumVolLine/view.js");
});

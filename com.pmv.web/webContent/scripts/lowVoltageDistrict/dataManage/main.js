Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");

	height = document.documentElement.offsetHeight;
	width = document.documentElement.offsetWidth;

	mainWidth = width/4*3;
	viceWidth = width/4*1;
	versionId = '';
	// 调用同步请求js
	$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
	//引用页面JS
    $import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
	$import("pmv/scripts/lowVoltageDistrict/dataManage/controller.js");
	$import("pmv/scripts/lowVoltageDistrict/dataManage/from.js");
	$import("pmv/scripts/lowVoltageDistrict/dataManage/time.js");
	$import("pmv/scripts/lowVoltageDistrict/dataManage/view.js");
	
});
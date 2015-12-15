Ext.onReady(function() {
	
	// 声明应用命名空间,一般使用Ext.app即可,该命名空间用于存储应用所使用的模型,组件,方法等(仅当前页面有效)
	Ext.ns("Ext.app");
	$import("planning/scripts/src/bpWidget/chart/anyChartContext.js");
	$import("pmv/scripts/assessCommon/radarChart.js");
	$import("planning/scripts/common/treeGrid.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");
	if(assessType == 'disTra') {
		$import("pmv/scripts/disTraAssess/disTraAssess.js");
	} else if(assessType == 'lowVolt') {
		$import("pmv/scripts/lowVoltageDistrict/assessment/lowVoltAssess.js");
	} else {
		$import("pmv/scripts/lineAssessment/lineEnergyEAssessment/lineAssess.js");
	}
	$import("pmv/scripts/assessCommon/view.js");
	
});
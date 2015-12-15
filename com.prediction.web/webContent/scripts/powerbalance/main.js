Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");

	height = document.documentElement.offsetHeight;
	width = document.documentElement.offsetWidth;
   
	chartHeight = height/3;
	gridHeight = height/3*2;
	chartHeight = height-(height/3*2);
	dataGridHeight = height/3*2-27;
	//引用公共JS
	$import("planning/scripts/src/bpWidget/chart/chart.js");
	$import("planning/scripts/src/bpWidget/chart/anyChartContext.js");
	
	//引用页面JS
	$import("prediction/scripts/powerbalance/controller.js");
	$import("prediction/scripts/powerbalance/LineChart.js")
	$import("prediction/scripts/powerbalance/view.js");
	
});
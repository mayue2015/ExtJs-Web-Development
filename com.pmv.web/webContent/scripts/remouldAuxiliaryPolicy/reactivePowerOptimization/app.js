Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");
   
	//引用公共JS
	$import("planning/scripts/excel/grid2Excel.js");
	$import("planning/scripts/excel/ActiveExcel.js");
	
	//引用页面JS
	$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/reactivePowerOptimization/formPanel.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/reactivePowerOptimization/controller.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/reactivePowerOptimization/tabsView.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/reactivePowerOptimization/view.js");
});
Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");
   
	//引用公共JS
	$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
	$import("planning/scripts/excel/grid2Excel.js");
	
	//引用页面JS
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceWireType/formPanel.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceWireType/controller.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceWireType/tabsView.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceWireType/view.js");
});
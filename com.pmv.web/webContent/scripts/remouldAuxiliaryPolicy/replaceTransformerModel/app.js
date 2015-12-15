Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");
    
	//引用公共JS
	$import("planning/scripts/excel/grid2Excel.js");
	$import("planning/scripts/src/bpWidget/ext/util/Bp.util.RequestUtils.js");
	
	//引用页面JS
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceTransformerModel/formPanel.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceTransformerModel/controller.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceTransformerModel/tabsView.js");
	$import("pmv/scripts/remouldAuxiliaryPolicy/replaceTransformerModel/view.js");
});
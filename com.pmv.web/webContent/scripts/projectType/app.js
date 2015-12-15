Ext.onReady(function(){
	//命名空间
	Ext.ns("Ext.app");

	height = document.documentElement.offsetHeight;
	width = document.documentElement.offsetWidth;
   
	//引用页面JS
	$import("pmv/scripts/projectType/navTree.js")
	$import("pmv/scripts/projectType/view.js");
	$import("pmv/scripts/projectType/controller.js");
});
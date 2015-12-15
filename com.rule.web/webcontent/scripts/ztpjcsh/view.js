/**
 * 左侧导航树
 */
var leftTree = new Ext.tree.TreePanel({
 
	region : 'west',
	width : '45%',
	title : '启用评价模型细则',
	service : 'ztpjcsh_leftTree_service',
	root : new Ext.tree.AsyncTreeNode({
		text : '启用评价模型细则',
		expanded : true,
		id : 'leftTreeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'leftTreeroot'
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
Ext.app.lefttree=leftTree;//将左侧树设置为全局变量
leftTree.on('click', Ext.app.clickLeftTree);

/**
 * 右侧导航树
 */
var rightTree = new Ext.tree.TreePanel({
	region : 'east',
	title : '评价模型细则库',
	width : '45%',
	service : 'ztpjcsh_rightTree_service',
	root : new Ext.tree.AsyncTreeNode({
		text : '评价模型细则库',
		expanded : true,
		id : 'rightTreeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'rightTreeLoader'
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
Ext.app.righttree = rightTree;// 将右侧树数值为全局变量
rightTree.on('click', Ext.app.clickRightTree);

/**
 * 中间panel
 */
var middPanel = new Ext.Panel({

	region : "center",
	monitorResize: true,
	width : "10%",
	items : [ {
		layout : 'form',
		border : false,
		items : [ Ext.app.addButn, Ext.app.removeButn, Ext.app.initButn ]
	} ]
});


/**
 * 显示区
 */
var vp = new Ext.Viewport({
	layout : "border",
	items : [ leftTree, rightTree ,middPanel]

});




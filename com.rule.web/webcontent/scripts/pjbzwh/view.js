// 左侧导航树
var leftTree = new Ext.tree.TreePanel({
	id : 'naviTree',
	collapsible : true,
	split : true,
	region : 'west',
	autoHeight : false,
	animate : true,
	width : "15%",
	height : "100%",
	title : '项目名称',
	service : 'pjbzwh_treeService',
	filterStr : '',
	root : new Ext.tree.AsyncTreeNode(),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader',
		dataUrl : ''
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
Ext.app.lefttree = leftTree;
leftTree.on('click', Ext.app.PjbzwhProTree);

// 查询面板
var queryPanel = new Ext.ux.BDQueryPanel({
	id : "queryPanel",
	region : "north",
	frame : true,
	labelWidth : 70,
	height : 45,
	items : Ext.app.queryItems
});

// 数据表格
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	readOnly : true,
	detailView : false,
	listeners : {
		afterrender : function() {
			this.getTopToolbar().removeAll();
			dataGrid.getTopToolbar().add("-");
			Ext.each(Ext.app.gridBtn, function(btn) {
				dataGrid.getTopToolbar().add(btn);
				dataGrid.getTopToolbar().add("-");
			});
			var sql = " PJXMLX = '1700103' ";
			this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
		}
	}
});
Ext.app.dataGrid=dataGrid;

// 页面显示区
var vp = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [ leftTree, {
		region : "center",
		layout : "border",
		items : [ queryPanel, dataGrid ]
	} ]
});

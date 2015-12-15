// 左侧导航树
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
	region : 'west',
	autoHeight : false,
	animate : true,
	width : "15%",
	height : "100%",
	title : '部门单位',
	service : 'csdwwh_nav_tree_service',
	plugins : [ new Bp.plugin.TreePanel() ]
});
leftTree.on('click', Ext.app.dltdwhTreeClick);

// 数据表格
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	readOnly : true,
	detailView : false,
	listeners : {
		afterrender : function() {
			var appID = Ext.app.appID;
			var clsID = Ext.app.clsID;
			this.loadData(appID, clsID);
			this.getTopToolbar().removeAll();
			Ext.app.addZjBtn(this);
			Ext.app.addXgBtn(this);
			Ext.app.addRemoveBtn(this);
		}
	}
});

// 页面显示区
var vp = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [leftTree, dataGrid]
});

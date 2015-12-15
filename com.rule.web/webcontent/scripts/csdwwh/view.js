// 城市电网表格
var csdwGrid = new Ext.ux.BDGrid({
	readOnly : true,
	detailView : false,
	listeners : {
		render : function() {
			this.getTopToolbar().removeAll();
			this.getTopToolbar().add("-");
			var grid = this;
			Ext.each(Ext.appCsdw.gridBtn, function(btn) {
				grid.getTopToolbar().add(btn);
				grid.getTopToolbar().add("-");
			});
		},
		afterrender : function() {
			this.getStore().on("load", function() {
				Ext.app.buttonPermission();
			});
			this.loadData(Ext.appCsdw.appID, Ext.appCsdw.clsID);
		}
	}
});
Ext.app.csdwGrid = csdwGrid;

// 配电网区域表格
var pdwqyGrid = new Ext.ux.BDGrid({
	readOnly : true,
	detailView : false,
	region : "center",
	listeners : {
		render : function() {
			this.getTopToolbar().removeAll();
			this.getTopToolbar().add("-");
			var grid = this;
			Ext.each(Ext.appPdwqy.gridBtn, function(btn) {
				grid.getTopToolbar().add(btn);
				grid.getTopToolbar().add("-");
			});
			this.getStore().on("load", function() {
				Ext.app.pdwqyGuid = null;
				Ext.app.buttonPermission();
			});
		},
		rowclick : Ext.app.PdwqyRowClick
	}
});
Ext.app.pdwqyGrid = pdwqyGrid;

// 评价线路表格
var pjxlGrid = new Ext.ux.BDGrid({
	readOnly : true,
	detailView : false,
	split : true,
	region : "south",
	height : 220,
	listeners : {
		render : function() {
			this.getTopToolbar().removeAll();
			this.getTopToolbar().add("-");
			var grid = this;
			Ext.each(Ext.appPjxl.gridBtn, function(btn) {
				grid.getTopToolbar().add(btn);
				grid.getTopToolbar().add("-");
			});
		}
	}
});
Ext.app.pjxlGrid = pjxlGrid;

// 导航树
var navTree = new Ext.tree.TreePanel({
	collapsible : true,
	title : '部门单位',
	region : "west",
	width : "15%",
	height : "100%",
	service : "csdwwh_nav_tree_service",
	plugins : [ new Bp.plugin.TreePanel() ]
});
navTree.on("click", Ext.app.navTreeNodeClick);

// TAB页面板
var tabPanel = new Ext.TabPanel({
	region : "center",
	activeTab : 0,
	items : [ {
		layout : "fit",
		border : false,
		title : "城市电网维护",
		items : [ csdwGrid ]
	}, {
		layout : "border",
		border : false,
		title : "配电网区域维护",
		items : [ pdwqyGrid, pjxlGrid ],
		listeners : {
			afterrender : Ext.app.TabPanelRender
		}
	} ]
});

// 页面显示区
var vp = new Ext.Viewport({
	layout : "border",
	items : [ navTree, tabPanel ]
});

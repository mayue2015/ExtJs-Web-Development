/**
 * 数据表格
 */
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {

			dataGrid.getStore().on("load", function() {
				dataGrid.getTopToolbar().disable();
			});

			Ext.app.addExportBtn(this);// 添加导出按钮
			Ext.app.addRemoveToolbar(this); // 移除按钮
			this.loadData(Ext.app.appID, Ext.app.clsID);
		},
		// 保存前进行重复值判断
		beforesave : function(grid) {
			// 调用去重方法
			var v = Ext.app.validateData(grid);
			// 若返回false 则不进行保存操作
			if (v == false) {
				return false;
			}
		},
		// 保存之后刷新节点和表格
		aftersave : function(grid) {
			if (Ext.app.node.getDepth() == 2) {
				dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '',
						"FLBM='" + Ext.app.node.attributes.attr.code + "'");
			}
		}
	}
});
Ext.app.dataGrid = dataGrid;

/**
 * 导航树
 */
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
	region : 'west',
	width : "15%",
	title : '算法库',
	service : 'zjgzkwh_tree_service',
	root : new Ext.tree.AsyncTreeNode({
		text : '算法库',
		expanded : true,
		id : 'treeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader'
	}),
	plugins : [ new Bp.plugin.TreePanel() ]

});

Ext.app.lefttree = leftTree;// 导出
leftTree.on('click', Ext.app.leftTree);

var p = new Ext.Viewport({
	layout : "border",
	region : "center",
	defaults : {
		border : false
	},
	items : [ leftTree, dataGrid ]
});

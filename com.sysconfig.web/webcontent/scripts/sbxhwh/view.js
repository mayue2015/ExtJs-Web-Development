/**
 * 数据表格
 */
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
		
			dataGrid.getTopToolbar().disable();
			// 移除多余按钮
			Ext.app.addRemoveToolbar(this);
		
		},
		beforesave : function() {
			return Ext.app.validate(this);
			
		},
		aftersave : function() { // 保存后刷新表格
			dataGrid.getStore().reload();
		},
		afterdelete : function() { // 删除后刷新表格
			dataGrid.getStore().reload();
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
	title : '设备类型',
	service : 'sbxh_tree_service',
	loader : new Ext.tree.TreeLoader(),
	plugins : [ new Bp.plugin.TreePanel() ]

});
leftTree.on('click', Ext.app.leftTree);

var p = new Ext.Viewport({
	layout : "border",
	region : "center",
	defaults : {
		border : false
	},
	items : [ leftTree, dataGrid ]
});

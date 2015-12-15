/**
 * 数据表格
 */
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			// 加载数据集,去重使用
			Ext.app.dataJson();
			// 页面刷新 按钮失效
			this.getTopToolbar().disable();
			// 移除多余按钮
			Ext.app.addRemoveToolbar(this);
		},
		beforesave : function(a, data) {// 保存前校验BM值
			var v = Ext.app.vialidate(data);
			// 如果校验失败返回 false 则不执行保存操作
			return v;
		},
		aftersave : function(a, data) {// 保存后刷新树和表格
			// 向缓冲中添加数据
			Ext.app.addDataToCoach(data);
			dataGrid.getStore().reload();
			// 调用刷新树方法
			Ext.app.refshTree(leftTree);
		},
		//删除前检查数据
		beforedelete : function() {
			return Ext.app.serachInfo(this);
		},
		afterdelete : function(a, data) {
			// 删除缓存中的对应数据
			if (data.count > 0) {
				var s = data.objids.split(',');
				for (var i = 0; i < s.length - 1; i++) {
					Ext.app.deleteDataJson(s[i]);
				}
			}
			// 调用刷新树方法
			Ext.app.refshTree(leftTree);
			// 删除后刷新树
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
	service : 'sblx_tree_service',
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

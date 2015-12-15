//行政区域导航树
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
	region : 'west',
	autoHeight : false,
	autoScroll : true,
	animate : true,
	width : "15%",
	height : "100%",
	title : '行政区域',
	service : 'xzqy_tree_service',
	filterStr : '',
	root : new Ext.tree.AsyncTreeNode({
		text : '中国',
		expanded : true,
		id : 'treeroot',
		iconCls : 'treeroot'
	}),
	rootVisible : true,
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader',
		dataUrl : ''
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
leftTree.on('click', Ext.app.xzqyTreeClick);
leftTree.on('load', function(node) {// 默认选中第一个节点
	if (leftTree.getRootNode() == node) {
		var firstNode = node.firstChild;
		if (firstNode != null) {
			var getPath = firstNode.getPath();
			leftTree.selectPath(getPath, null, function(bSuccess, bNode) {
				bNode.fireEvent("click", bNode);
			});
		}
	}
});

/**
 * 行政区域维护 表格数据展示
 */
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	singleSelect : true, // 单选
	listeners : {
		afterrender : function(grid) { // 渲染主界面表格
			Ext.app.fixToolbar_qy();
			Ext.each(Ext.app.qy_gridBtn, function(btn) {
				dataGrid.getTopToolbar().add(btn);
				dataGrid.getTopToolbar().add("-");
			});
			this.loadData(Ext.app.appID, Ext.app.clsID);
		},
		aftersave : function() {
			if (Ext.app.node) {
				Ext.app.node.reload();
			}
			dataGrid.store.reload();
		},
		afterdelete : function() {
			if (Ext.app.node) {
				Ext.app.node.reload();
			}
			dataGrid.store.reload();
		},
		rowclick : Ext.app.XzqyRowClick
	}
});

/**
 * 单位与区域对照
 */
var dwGrid = new Ext.ux.BDGrid({
	split : true,
	region : "south",
	height : '250',
	listeners : {
		afterrender : function(grid) { // 渲染主界面表格
			Ext.app.fixToolbar_dw();
		},
		beforeedit : function(arg) {
			var record = dataGrid.getSelectionModel().getSelected();
			if (record == undefined)
				return;
			var areaType = record.get('AREA_TYPE');
			//  单位属性编辑器设置 过滤条件
			arg.fieldEditor.setFilter(" Z.DWJB IN ('" + areaType + "') AND Z.DEPT_ID NOT IN (SELECT B.DEPT_ID FROM US_APP.TB_COM_AREACONTRAST B)");
		},
		aftersave : function() {
			var record = dataGrid.getSelectionModel().getSelected();
			Ext.app.getDeptId(record.get('GUID'));
		},
		afterdelete : function() {
			dwGrid.getStore().load();
		}
	}
});

var panel = new Ext.Panel({
	region : "center",
	layout : "border",
	items : [ dataGrid, dwGrid ],
	listeners : {
		'afterrender' : function () {
			dataGrid.store.on("load",function(){
				dataGrid.getSelectionModel().selectFirstRow();// 表格加载默认选中第一行
				Ext.app.XzqyRowClick(); // 调用行点击事件
			})
		}
	}
});

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	items : [ leftTree, panel ]
});
/**
 * 按钮区
 */
var toolbar = [ '-', {
	id : 'add',
	xtype : 'button',
	text : '新建',
	iconCls : 'add',
	handler : function() {
		Ext.app.create(dataGrid);
	}
}, '-', {
	id : 'edit',
	xtype : 'button',
	text : '修改',
	iconCls : 'edit',
	handler : function() {
		Ext.app.update(dataGrid);
	}
}, '-', {
	id : 'remove',
	xtype : 'button',
	text : '删除',
	iconCls : 'remove',
	handler : function() {
		Ext.app.deleteData(dataGrid);
	}
}, '-' ]

/**
 * 加载数据集
 */
var gridStore = new Ext.data.Store({
	autoLoad : false,
	url : "pmv/projectTypeAction/loadGrid.do",
	method : 'post',
//	baseParams : {
//		'nodeId' : Ext.app.nodeId
//	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "guid",
			mapping : "0"
		}, {
			name : "s_project_name",// 项目小类名称
			mapping : "1"
		}, {
			name : "project_border",// 项目边界
			mapping : "2"
		} ]
	})
});
var sm = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false
});

/**
 * 表格模型
 */
var dataGrid = new Ext.grid.GridPanel({
	id : 'dataGrid',
	region : 'center',
	store : gridStore,
	sm : sm,
	cm : new Ext.grid.ColumnModel({
		columns : [ sm , {
			header : '项目小类名称',
			dataindex : 's_project_name',
			width : 200
		}, {
			header : '项目边界',
			dataindex : 'project_border',
			renderer: 'tips',
			width : 450
		} ]
	})
});

dataGrid.store.on('beforeload', function() {
	var _params = {
			'nodeId' : Ext.app.nodeId
		};
	this.baseParams = _params;
});

Ext.app.dataGrid = dataGrid;

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [ Ext.app.tree(), {
		region : 'center',
		layout : 'border',
		tbar : toolbar,
		items : [ dataGrid ]
	} ]
});
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
	xtype : 'button',
	text : '修改',
	iconCls : 'edit',
	handler : function() {
		Ext.app.update(dataGrid);
	}
}, '-', {
	xtype : 'button',
	text : '删除',
	iconCls : 'remove',
	handler : function() {
		Ext.app.deleteData(dataGrid);
	}
}, '-', {
	id : 'import',
	xtype : 'button',
	text : '导入',
	iconCls : 'llxs-import',
	tooltip : '导入',
	handler : function() {
		// 数据导入
		var importType = "NFHQX";
		Ext.app.importExcel2Grid(taskVersionId, importType, 'T');
	}
}, '-', {
	id : 'export',
	xtype : 'button',
	text : '导出',
	iconCls : 'llxs-export',
	tooltip : '导出',
	handler : function() {
		grid2Excel(dataGrid, {
			title : '年负荷曲线'
		});
	}
}, '-' ]

/**
 * 加载数据集
 */
var gridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/yearLoadAction/loadGrid.do",
	method : 'post',
	baseParams : {
		'nodeId' : Ext.app.nodeId
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "guid",
			mapping : "0"
		}, {
			name : "tab_year",// 年份
			mapping : "1"
		}, {
			name : "mw1",
			mapping : "2"
		}, {
			name : "mw2",
			mapping : "3"
		}, {
			name : "mw3",
			mapping : "4"
		}, {
			name : "mw4",
			mapping : "5"
		}, {
			name : "mw5",
			mapping : "6"
		}, {
			name : "mw6",
			mapping : "7"
		}, {
			name : "mw7",
			mapping : "8"
		}, {
			name : "mw8",
			mapping : "9"
		}, {
			name : "mw9",
			mapping : "10"
		}, {
			name : 'mw10',
			mapping : '11'
		}, {
			name : 'mw11',
			mapping : '12'
		}, {
			name : 'mw12',
			mapping : '13'
		} ]
	}),
	listeners : {
		load : function(s) {
			var grid = Ext.getCmp('dataGrid');
			grid.getSelectionModel().selectAll();
		}
	}
});

var sm = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false,
	listeners : {
		'selectionchange':function(sm){
			var record = dataGrid.getSelectionModel().getSelections();
			lineChars(record);
		}
	}
});

/**
 * 表格模型
 */
var dataGrid = new Ext.grid.GridPanel({
	id : 'dataGrid',
	region : 'center',
	tbar : [ '->', '计量单位： MW' ],
	store : gridStore,
	sm : sm,
	cm : new Ext.grid.ColumnModel({
		columns : [ sm , {
			header : '年份',
			dataindex : 'tab_year'
		}, {
			header : '一月',
			dataindex : 'mw1'
		}, {
			header : '二月',
			dataindex : 'mw2'
		}, {
			header : '三月',
			dataindex : 'mw3'
		}, {
			header : '四月',
			dataindex : 'mw4'
		}, {
			header : '五月',
			dataindex : 'mw5'
		}, {
			header : '六月',
			dataindex : 'mw6'
		}, {
			header : '七月',
			dataindex : 'mw7'
		}, {
			header : '八月',
			dataindex : 'mw8'
		}, {
			header : '九月',
			dataindex : 'mw9'
		}, {
			header : '十月',
			dataindex : 'mw10'
		}, {
			header : '十一月',
			dataindex : 'mw11'
		}, {
			header : '十二月',
			dataindex : 'mw12'
		} ]
	})
});
Ext.app.dataGrid = dataGrid;

// 图形Panel
var chartPanel = new Ext.Panel({
	height : height / 2,
	region : 'north',
	items : [ new Ext.Panel({
		height : height / 2,
		id : 'chartDivs',
		bodyStyle : 'background : white;'
	}) ]
});

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
		items : [ chartPanel, dataGrid ]
	} ]
});
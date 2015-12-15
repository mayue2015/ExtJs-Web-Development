

var sm = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false
});

var gridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/powerLoad/loadGrid.do",
	method : 'post',
	reader : new Ext.data.JsonReader({
		root : 'list',
		totalProperty : "size",
		fields : [ {
			name : "guid",
			mapping : "0"
		}, {
			name : "area",
			mapping : "1"
		}, {
			name : "tab_year",
			mapping : "2"
		}, {
			name : "all_soci_max_load",
			mapping : "3"
		}, {
			name : "padding_max_load",
			mapping : "4"
		}, {
			name : "net_max_load",
			mapping : "5"
		}, {
			name : "max_load_yr_rate",
			mapping : "6"
		}, {
			name : "max_load_use_hou",
			mapping : "7"
		}, {
			name : "padding_max_use_hou",
			mapping : "8"
		}, {
			name : "grid_max_use_hou",
			mapping : "9"
		}, {
			name : "dept_code",
			mapping : "10"
		} ]
	})
});

var bbar = new Ext.PagingToolbar({
	pageSize : 15,
	store : gridStore,
	displayInfo : true,
	displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
	emptyMsg : "无记录"
});

var row = [ {
		header : '',
		colspan : 2,
		align : 'center'
	},{
		header : '',
		colspan : 2,
		align : 'center'
	},{
		header : '',
		colspan : 1,
		align : 'center'
	}, {
		header : '最大负荷',
		colspan : 3,
		align : 'center'
	}, {
		header : '',
		colspan : 1,
		align : 'center'
	}, {
		header : '最大负荷利用小时数',
		colspan : 4,
		align : 'center'
} ];

var group = new Ext.ux.grid.ColumnHeaderGroup({
	rows : [ row ]
});

var dataGrid = new Ext.grid.GridPanel({
	id : 'dataGrid',
	region : "center",
	store : gridStore,
	sm : sm,
	tbar : Ext.app.tbar,
	bbar : bbar,
	cm : new Ext.grid.ColumnModel( {
		columns : [ new Ext.grid.RowNumberer(), sm, {
			header : 'GUID',
			dataIndex : 'guid',
			hidden : true
		}, {
			header : '区域',
			dataIndex : 'area',
			align : 'center',
			width : 90
		}, {
			header : '年份',
			dataIndex : 'tab_year',
			align : 'center',
			width : 80
		}, {
			header : '全社会',
			dataIndex : 'all_soci_max_load',
			align : 'center',
			width : 80
		}, {
			header : '统调',
			dataIndex : 'padding_max_load',
			align : 'center',
			width : 80
		}, {
			header : '网供',
			dataIndex : 'net_max_load',
			align : 'center',
			width : 80
		}, {
			header : '全社会最大负荷年增长率',
			dataIndex : 'max_load_yr_rate',
			align : 'center',
			width : 140
		}, {
			header : '全社会 ',
			dataIndex : 'max_load_use_hou',
			align : 'center',
			width : 80
		},{
			header : '统调',
			dataIndex : 'padding_max_use_hou',
			align : 'center',
			width : 80
		},{
			header : '网供',
			dataIndex : 'grid_max_use_hou',
			align : 'center',
			width : 80
		},{
			header : 'DEPT_CODE',
			dataIndex : 'dept_code',
			hidden : true
		} ]
	}),
	plugins : group

});

dataGrid.getStore().on('beforeload',function(){
	this.baseParams = {
			beginYear : beginYear,
			'nodeId' : Ext.app.node.id,
			'start' : 0,
			'limit' : 15
	}
});

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [ Ext.app.tree(), dataGrid ]
});
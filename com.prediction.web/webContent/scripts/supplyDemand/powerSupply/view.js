
var sm = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false
});

var gridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/powerSupp/loadGrid.do",
	method : 'post',
	reader : new Ext.data.JsonReader({
		root : 'list',
		totalProperty : "size",
		fields : [ {
			name : "guid",
			mapping : "0"
		}, {
			name : "area_name",
			mapping : "1"
		}, {
			name : "tab_year",
			mapping : "2"
		}, {
			name : "volt_name", // 电压
			mapping : "3"
		}, {
			name : "grid_supp_pow", // 网供电量
			mapping : "4"
		}, {
			name : "grid_supp_load", // 网供最大负荷
			mapping : "5"
		}, {
			name : "ele_sales", // 售电量
			mapping : "6"
		}, {
			name : "dept_code",
			mapping : "7"
		}, {
			name : "volt",
			mapping : "8"
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

var dataGrid = new Ext.grid.GridPanel({
	id : 'dataGrid',
	region : "center",
	store : gridStore,
	tbar : Ext.app.tbar,
	bbar : bbar,
	sm : sm,
	cm : new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), sm, {
			header : 'GUID',
			dataIndex : 'guid',
			hidden : true
		}, {
			header : '区域',
			dataIndex : 'area_name'
		}, {
			header : '年份',
			dataIndex : 'tab_year'
		}, {
			header : '电压等级',
			dataIndex : 'volt_name'
		}, {
			header : '网供电量',
			dataIndex : 'grid_supp_pow'
		}, {
			header : '网供最大负荷',
			dataIndex : 'grid_supp_load'
		}, {
			header : '售电量',
			dataIndex : 'ele_sales'
		}, {
			header : 'DEPT_CODE',
			dataIndex : 'dept_code',
			hidden : true
		}, {
			header : 'VOLT',
			dataIndex : 'volt',
			hidden : true
		} ]
	})

});

dataGrid.getStore().on('beforeload',function(){
	this.baseParams = {
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
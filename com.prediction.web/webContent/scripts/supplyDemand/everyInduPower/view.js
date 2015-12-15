/**
 * 各产业用电量统计-加载数据集
 */
var gridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/everyInduPowerAction/loadGrid.do",
	method : 'post',
	baseParams : {
		'nodeId' : Ext.app.nodeId,
		'start' : 0,
		'limit' : 15
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		totalProperty : "size",
		fields : [ {
			name : "GUID",//标识
			mapping : "0"
		}, {
			name : "AREA",//区域
			mapping : "1"
		}, {
			name : "TAB_YEAR",//年份
			mapping : "2"
		}, {
			name : "ALL_SOCIETY_POWER",//全社会用电量
			mapping : "3"
		}, {
			name : "PRI_INDUSTRY_POWER",//一产用电量
			mapping : "4"
		}, {
			name : "SECO_IN_POWER",//二产用电量
			mapping : "5"
		}, {
			name : "TERT_IN_POWER",//三产用电量
			mapping : "6"
		}, {
			name : "HOUSEHOLD_POW",//居民用电量
			mapping : "7"
		}, {
			name : "ELEC_CONS_PER_PER",//人均用电量
			mapping : "8"
		}, {
			name : "PADDING_POWER",//统调用电量
			mapping : "9"
		}, {
			name : 'PRI_IN_POW_RISE_RATE',//一产用电量增长率
			mapping : '10'
		}, {
			name : 'SEC_IN_POW_RI_RATE',//二产用电量增长率
			mapping : '11'
		}, {
			name : 'TER_IN_POW_RISE_RATE',//三产用电量增长率
			mapping : '12'
		}, {
			name : 'HOUS_POW_RISE_RATE',//居民用电量增长率
			mapping : '13'
		} ]
	})
});

/**
 * 工具栏-按钮
 */
var tbar = [ 
    '-', 
    {
    	id : 'add',
		xtype : 'button',
		text : '新增',
		iconCls : 'add',
		handler : function(){
			Ext.app.create(dataGrid);
		}
    }, 
    '-', 
    {
		xtype : 'button',
		text : '修改',
		iconCls : 'edit',
		handler : function() {
			Ext.app.update(dataGrid);
		}
    }, 
    '-', 
    {
		xtype : 'button',
		text : '删除',
		iconCls : 'remove',
		handler : function() {
			Ext.app.deleteData(dataGrid);
		}
    },
	'-',
	{
		id : 'import',
		xtype : 'button',
		text : '导入',
		iconCls : 'llxs-import',
		tooltip : '导入',
		handler : function() {
			//各产业用电量统计-数据导入
			var importType = "EVERYINDUPOWER";
			Ext.app.importExcel2Grid(taskVersionId,importType,'T');
		}
	}, 
	'-',
	{
		id : 'export',
		xtype : 'button',
		text : '导出',
		iconCls : 'llxs-export',
		tooltip : '导出',
		handler : function() {
			grid2Excel(dataGrid, {title : '各产业用电量统计'});
		}
	},
	'-',
	'->',
	'计量单位 ： 万千瓦时，万千瓦时/人，%'
]

/**
 * 复选框
 * */
var sm = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false
});

/**
 * 分页栏
 * */
var bbar = new Ext.PagingToolbar({
	pageSize : 15,
	store : gridStore,
	displayInfo : true,
	displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
	emptyMsg : "无记录"
});

/**
 * 各产业用电量统计-表格模型
 */
var dataGrid = new Ext.grid.GridPanel({
	id : 'dataGrid',
	region : "center",
	store : gridStore,
	tbar : tbar,
	bbar : bbar,
	sm : sm,
	cm : new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), sm, 
		            {
			header : 'GUID',
			dataIndex : 'GUID',
			hidden : true
		}, {
			header : '区域',
			dataIndex : 'AREA'
		}, {
			header : '年份',
			width : 90,
			dataIndex : 'TAB_YEAR'
		}, {
			header : '全社会用电量',
			dataIndex : 'ALL_SOCIETY_POWER'
		}, {
			header : '一产用电量',
			dataIndex : 'PRI_INDUSTRY_POWER'
		}, {
			header : '二产用电量',
			dataIndex : 'SECO_IN_POWER'
		}, {
			header : '三产用电量',
			dataIndex : 'TERT_IN_POWER'
		}, {
			header : '居民用电量',
			dataIndex : 'HOUSEHOLD_POW'
		}, {
			header : '人均用电量',
			dataIndex : 'ELEC_CONS_PER_PER'
		}, {
			header : '统调用电量',
			dataIndex : 'PADDING_POWER'
		}, {
			header : '一产用电量增长率',
			dataIndex : 'PRI_IN_POW_RISE_RATE'
		}, {
			header : '二产用电量增长率',
			dataIndex : 'SEC_IN_POW_RI_RATE'
		}, {
			header : '三产用电量增长率',
			dataIndex : 'TER_IN_POW_RISE_RATE'
		}, {
			header : '居民用电量增长率',
			dataIndex : 'HOUS_POW_RISE_RATE'
		} ]
	})
});
Ext.app.dataGrid = dataGrid;

/**
 * 页面显示
 * */ 
var viewport = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [ Ext.app.tree(), {
		region : 'center',
		layout : 'border',
		items : [ dataGrid ]
	} ]
});
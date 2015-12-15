var arg = window.dialogArguments;//获得父窗口 
/**
 * 负荷数据管理-查询表单
 */
var formPanel = new Ext.form.FormPanel({
	id : 'searchForm',
	height : 50,
	region : 'north',
	frame : true,
	border : false,
	labelAlign : "right",
	labelWidth: 70, 
	items : [{
    	columnWidth : 1,
    	hideLabels : true,
    	autoHeight : true,
    	xtype : 'panel',
    	layout : 'column',
    	items : [ {
    		columnWidth : .28,
            layout : 'form',
            labelWidth: 90, 
            border : false,
            items : [ {
        		xtype : 'combo', 
                id :　'factory',
                name : 'factory',
                fieldLabel : '所属厂站/设备',
                mode : 'local',
                emptyText : '请选择',
                hiddenName : 'factoryId',
                store : Ext.app.factoryStore,
				displayField : 'value',
				valueField : 'text',
				triggerAction : 'all',
                anchor : '85%',
                editable : false,
                typeAhead : true
        	}]
    	},{
    		columnWidth : .22,
        	layout : 'form',
        	border : false,
        	items : [{
        		xtype : 'textfield', 
        		fieldLabel : '负荷名称',
                id :　'loadName',
                name : 'loadName',
                anchor : '85%'
        	}]
    	},{
    		columnWidth : .25,
        	layout : 'form',
        	border : false,
        	items : [ {
        		xtype : 'combo', 
                id :　'areaId',
                name : 'areaId',
                fieldLabel : '电压等级',
                mode : 'local',
                emptyText : '请选择',
                hiddenName : 'dyId',
                store : Ext.app.voltStore,
				displayField : 'text',
				valueField : 'value',
				triggerAction : 'all',
                anchor : '78%',
                editable : false,
                typeAhead : true
        	} ]
    	},{
    		columnWidth : .25,
        	layout : 'column',
        	border : false,
        	items : [{
        		xtype : 'button', 
        		text : '查询',
                id :　'ghdate',
                iconCls : 'query',
                handler : function(){
                	// 点击查询 加载数据
                	Ext.app.queryData();
                } 
        	},{
        		xtype : 'button', 
        		text : '重置',
                id :　'reset',
                iconCls : 'undo',
                style : 'margin-left : 20px;',
                handler : Ext.app.cancle
        	}]
    	} ]
	}]
});


/**
 * 负荷数据管理-加载数据集
 */
var loadStore = new Ext.data.Store({
	autoLoad : true,
	url : "reduction/loadDataAction/loadGridInfo.do",
	method : 'post',
	reader : new Ext.data.JsonReader({
		root : 'list',
		totalProperty : "size",
		fields : [ {
			name : "guid",
			mapping : "0"
		}, {
			name : "tab_year",
			mapping : "1"
		}, {
			name : "factory",
			mapping : "2"
		} , {
			name : "loadName",
			mapping : "3"
		}, {
			name : "loadType",
			mapping : "4"
		}, {
			name : "volt",
			mapping : "5"
		}, {
			name : "yggl",
			mapping : "6"
		}, {
			name : "wggl",
			mapping : "7"
		}, {
			name : "glys",
			mapping : "8"
		}, {
			name : "szgl",
			mapping : "9"
		}]
	})
});

 /**
 * 主页面工具条
 */
var loadTbar = [ '-', {
	xtype : 'button',
	text : '新增',
	iconCls : 'add',
	handler : function() {
		Ext.app.yearStore .load();
		new Ext.app.EditWindow({
			width : 260,
			height : 120,
			title : '新增负荷年份',
			id : 'addWindow'
		}).show();
	}
},'-', {
	xtype : 'button',
	text : '保存',
	iconCls : 'save',
	handler : function() {
		Ext.app.saveInfo('update');
	}
},  '-', {
	xtype : 'button',
	text : '删除',
	iconCls : 'remove',
	handler : function() {
		Ext.app.deleteFun();
	}
}, '-',{
	xtype : 'button',
	text : '导入',
	iconCls : 'llxs-import',
	handler : function() {
		
	}
},'-', {
	xtype : 'button',
	text : '导出',
	iconCls : 'llxs-export',
	handler : function() {
			grid2Excel(loadGrid, {
			title : '负荷数据管理'
		});
	}
}, '->','计量单位：MW、MVar' ]

var loadBbar = new Ext.PagingToolbar({
	pageSize : 15,
	store : loadStore,
	displayInfo : true,
	displayMsg : '显示第{0}条到{1}条记录,一共{2}条记录',
	emptyMsg : '无记录'
});

var sm = new Ext.grid.CheckboxSelectionModel();

/**
 * 负荷数据管理-表格模型
 */
var loadGrid = new Ext.grid.EditorGridPanel({
	id : 'loadGrid',
	region : "center",
	store : loadStore,
	tbar : loadTbar,
	bbar : loadBbar,
	sm : sm,
	cm : new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), sm, {
			header : 'id',
			hidden : true,
			align : 'center',
			dataIndex : 'guid'
		}, {
			header : '年份',
			align : 'center',
			dataIndex : 'tab_year'
		}, {
			header : '所属厂站/设备',
			align : 'center',
			dataIndex : 'factory'
			
		}, {
			header : '负荷名称',
			align : 'center',
			dataIndex : 'loadName'
		},{
			header : '负荷类型',
			align : 'center',
			dataIndex : 'loadType'
		},{
			header : '电压等级',
			align : 'center',
			dataIndex : 'volt'
		},{
			header : '有功功率',
			align : 'center',
			dataIndex : 'yggl',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		},{
			header : '无功功率',
			align : 'center',
			dataIndex : 'wggl',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		},{
			header : '功率因数',
			align : 'center',
			dataIndex : 'glys'
		},{
			header : '视在功率',
			align : 'center',
			dataIndex : 'szgl'
		} ]
	})
});
Ext.app.loadGrid = loadGrid;

loadGrid.getStore().on('beforeload',function(){
	var value = formPanel.getForm().getValues();
	this.baseParams = {
			'formValue' : '[' + Ext.util.JSON.encode(value) + "]",
			'baseYear' : baseYear, // 基准年
			'limit' : 15, 
			'start' : 0,
			'caseId' : arg.versionId //选择方案的 id
	}
});

/**
 * 页面显示
 * */ 
var viewport = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [ formPanel,loadGrid ]
});
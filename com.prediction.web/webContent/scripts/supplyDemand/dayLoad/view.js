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
		Ext.app.update(Ext.getCmp('dataGrid'));
	}
}, '-', {
	xtype : 'button',
	text : '删除',
	iconCls : 'remove',
	handler : function() {
		Ext.app.deleteData(Ext.getCmp('dataGrid'));
	}
}, '-', {
	id : 'import',
	xtype : 'button',
	text : '导入',
	iconCls : 'llxs-import',
	tooltip : '导入',
	handler : function() {
		// 数据导入
		var importType = "RFHQX";
		Ext.app.importExcel2Grid(taskVersionId, importType, 'T');
	}
}, '-', {
	id : 'export',
	xtype : 'button',
	text : '导出',
	iconCls : 'llxs-export',
	tooltip : '导出',
	handler : function() {
		if(!Ext.getCmp('dataGrid')) {
			Ext.MessageBox.alert('系统提示', '当前无数据，无法导出！');
			return;
		}
		grid2Excel(Ext.getCmp('dataGrid'), {
			title : '典型日负荷曲线'
		});
	}
}, '-' ]


function newDataGrid(){
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
     * 动态注入数据
     * */
    var columns = [ sm, {
		header : '典型日',
		dataindex : 'tab_year'
	} ];
	var fields = [ {
		name : "guid",
		mapping : "0"
	}, {
		name : "tab_year",// 年份
		mapping : "1"
	} ];
    var dataCol;
    var dataFiel;
    
    for(i = 0,f = 1; i <= 23; i++,f++){
    	dataCol = {
 			header : i + '点',
 			dataIndex : 'mw' + f
     	};
    	columns.push(dataCol);
    	
    	dataFiel = {
			name : "mw" + f,
			mapping : i + 2
     	};
    	fields.push(dataFiel);
    }
    
    /**
     * 加载数据集
     */
    var gridStore = new Ext.data.Store({
    	autoLoad : false,
    	url : "prediction/dayLoadAction/loadGrid.do",
    	method : 'post',
    	baseParams : {
    		'nodeId' : Ext.app.nodeId
    	},
    	reader : new Ext.data.JsonReader({
    		root : 'list',
    		fields : fields
    	}),
    	listeners : {
    		load : function(s) {
    			if(Ext.getCmp('chartDivs')) {
    				Ext.getCmp('chartDivs').hide();
    			}
    			var grid = Ext.getCmp('dataGrid');
    			grid.getSelectionModel().selectAll();
    		}
    	}
    });

    /**
     * 表格模型
     */
    var dataGrid = new Ext.grid.GridPanel({
    	id : 'dataGrid',
		height : height / 2 - 49,
		border : false,
    	region : 'center',
    	tbar : [ '->', '计量单位： MW' ],
    	store : gridStore,
    	sm : sm,
    	cm : new Ext.grid.ColumnModel({
    		columns : columns
    	})
    });
	
	var pp = Ext.getCmp('panelCen');
	if(pp){
		pp.add(dataGrid);
		Ext.getCmp('panelCen').doLayout();
	}
	Ext.app.dataGrid = dataGrid;
	return dataGrid;
}

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

//表格Panel
var gridPanel = new Ext.Panel({
	height : height / 2,
	id : 'panelCen',
	autoScroll: true,
	region : 'center',
	items : [ ]
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
		items : [ chartPanel, gridPanel ]
	} ]
});
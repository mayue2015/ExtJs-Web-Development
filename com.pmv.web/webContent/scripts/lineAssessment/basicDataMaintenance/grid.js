Ext.ns("Ext.app")

var gridStore = new Ext.data.Store({
	url : "pmv/basicDataAction/loadGrid.do",
	method : 'post',
	reader : new Ext.data.JsonReader({
		root : "list",
		totalProperty : "count",
		fields : [ {
			name : "GUID",
			mapping : "0"
		}, {
			name : "NAME",
			mapping : "1"
		}, {
			name : "SUBSTAION_ID",
			mapping : "2"
		}, {
			name : "VOLTAGELEVEL",
			mapping : "3"
		}, {
			name : "MODEL",
			mapping : "4"
		}, {
			name : "POWER_SUPPLY_AREA",
			mapping : "5"
		}, {
			name : "POWER_SUPPLY_RADIUS",
			mapping : "6"
		}, {
			name : "DATE",
			mapping : "7"
		}, {
			name : "RUN_UNIT",
			mapping : "8"
		} ]
	})
});
Ext.app.gridStore = gridStore;

var selectModel = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false,
	listeners : {
		 'rowselect' : function() {
			var dxrGrid = Ext.getCmp('viceGrid');
			dxrGrid.store.load();
		 }  
	}
});

var bbar = new Ext.PagingToolbar({
	pageSize : 15,
	store : gridStore,
	displayInfo : true,
	displayMsg : '显示第{0}条到{1}条记录,共{2}条',
	emptyMsg : "记录为空"
});

/**
 * 表格模型
 * */
var columnModel = new Ext.grid.ColumnModel({
	columns : [ new Ext.grid.RowNumberer(), selectModel, {
		header : "主键",
		dataIndex : "GUID",
		hidden : true
	}, {
		header : "名称",
		dataIndex : "NAME",
		editor : new Ext.form.TextField({
			id : 'name'
		})
	}, {
		header : "所属厂站",
		dataIndex : "SUBSTAION_ID",
		editor : new Ext.form.TextField({
			id : 'substationName'
		})
	}, {
		header : "电压等级",
		dataIndex : "VOLTAGELEVEL",
		editor : new Ext.form.ComboBox({
			id : 'volt',
			store : Ext.app.volt_store,
			editable : false,
			valueField : 'value',
			displayField : 'text',
			mode : 'local',
			triggerAction : 'all',
			typeAhead : true
		}),
		renderer : function(value) {
			return setComboValue(value, Ext.app.volt_store);
		}
	}, {
		header : "型号",
		dataIndex : "MODEL",
		editor : new Ext.form.ComboBox({
			id : 'model',
			store : Ext.app.model_store,
			editable : false,
			valueField : 'text',
			displayField : 'value',
			mode : 'local',
			triggerAction : 'all',
			typeAhead : true
		}),
		renderer : function(value) {
			return setComboValue(value, Ext.app.model_store);
		}
	}, {
		header : '供电分区',
		dataIndex : 'POWER_SUPPLY_AREA',
		editor : new Ext.form.ComboBox({
			id : 'area_combo',
			store : Ext.app.area_store,
			editable : false,
			valueField : 'value',
			displayField : 'text',
			mode : 'local',
			triggerAction : 'all',
			typeAhead : true
		}),
		renderer : function(value) {
			return setComboValue(value, Ext.app.area_store);
		}
	}, {
		header : '供电半径(km)',
		dataIndex : 'POWER_SUPPLY_RADIUS',
		editor : new Ext.form.NumberField({
			id : 'POWER_SUPPLY_RADIUS',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			allowBlank : false
		})
	}, {
		header : "典型日",
		dataIndex : "DATE",
		editor : new Ext.form.ComboBox({
			id : 'date_combo',
			store : Ext.app.date_store,
			valueField : 'value',
			displayField : 'text',
			editable : false,
			mode : 'local',
			value : Ext.app.defaultDxr,
			triggerAction : 'all',
			typeAhead : true,
			allowBlank : false
		}),
		render : function(value) {
			return setComboValue(value, Ext.app.date_store);
		}
	}, {
		header : "运行单位",
		dataIndex : "RUN_UNIT"
	} ]
});
Ext.app.columnModel = columnModel;

function setComboValue(value, store) {
	if (value != '') {
		var index = store.find('value', value.trim());
		var record = store.getAt(index);
		if (record != undefined && record != '') {
			return record.data.text;
		}
	}
}
/**
 * 主表数据模型
 * */
var grid = new Ext.grid.EditorGridPanel({
	id : 'mainGrid',
	region : 'center',
	autoScroll : true,
	rowNumberer : true,
	stripeRows : true,
	border : true,
	paging : true,
	height : height, // 窗体高度
	width : mainWidth,
	checkboxSelModel : true,
	clicksToEdit : 1,
	store : gridStore,
	tbar : Ext.app.mainGridTbar(),
	bbar : bbar,
	sm : selectModel,
	cm : columnModel,
	listeners : {
		 'beforeedit' : function(arg) {
			 	if(isCanModify == 1){
			 		return true;
			 	}else {
			 		return false;
				}
		  }
	}
});

Ext.app.grid = grid;

//加载数据前事件
Ext.getCmp('mainGrid').store.on('beforeload', function() {
	//页面参数
	var dxr = Ext.getCmp('dxr').getValue();
	var sbmc = Ext.getCmp('sbmc').getValue();
	var sjsb = Ext.getCmp('sjsb').getValue();
	var radios = document.getElementsByName("pointNum");
	var clds = '';
	for(var i = 0; i<radios.length; i++){
		if(radios[i].checked){
			clds = radios[i].value;
			break;
		}
	}
	//传递参数
	var _params;
	_params = {
		"dxr" : dxr,
		"sbmc" : sbmc,
		"sjsb" : sjsb,
		"clds" : clds,
		'start' : 0,
		'limit' : 15,
		'versionId' : versionId
	}
	this.baseParams = _params;
});
//延迟加载，等到方案和时间checkbox初始化完毕后执行加载GRID
function waitForCreateGrid(){
	if (gridStore&&gridStore.getCount() > 0) {
		Ext.app.search();
	}else {
		setTimeout('waitForCreateGrid()',50);
	}
}
var allPanel = new Ext.Panel({
	layout : 'border',
	region : 'center',
	border : false,
	bodyBorder : false,
	tbar : Ext.app.fromTbar('所属厂站：'),
	items : [ grid, Ext.app.vGrid('xl','DATE','GUID') ]
});

// 工程导航树
var projectNavTree = new Ext.tree.TreePanel({
	region : "west",
	border : false,
	split : true,
	width : "150",
	service : "project_Nav_Tree_Service",
	plugins : [ new Bp.plugin.TreePanel() ],
	listeners : {
		click : function(node) {
			if (node.attributes.attr) {
				versionId = node.id;
				Ext.app.node = node;
				Ext.getCmp('mainGrid').getStore().load();
				isCanModify = 0;
			}
		}
	}
});

var viewport = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [ projectNavTree, allPanel ]
});

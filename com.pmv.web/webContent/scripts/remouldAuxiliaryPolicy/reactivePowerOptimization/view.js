/**
 * 当前工程任务显示-工具栏
 * */
var taskViewTbar = new Ext.Toolbar({  
	id : 'taskViewTbar',
    items:[ '-','<div style ="border:1px solid red"><font size=2 color=red>工程任务:'+task_name+'</font></div>','-' ]  //taskVersionId
}); 

/**
 * 无功优化-数据源
 * */
var typeGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "pmv/reactivePowerOptimizationController/loadGrid.do",
	method : 'post',
	reader : new Ext.data.JsonReader({
		root : 'list',
		totalProperty : "size",
		fields : [ {
			name : "GUID",
			mapping : "0"
		}, {
			name : "VERSIONID",
			mapping : "1"
		}, {
			name : "SYS_DEPT_CODE",
			mapping : "2"
		}, {
			name : "NAME",
			mapping : "3"
		}, {
			name : "ASS_COS",
			mapping : "4"
		}, {
			name : "ASS_RESULT",
			mapping : "5"
		}, {
			name : "ASS_REFROM",
			mapping : "6"
		}]
	})
});

/**
 * 无功优化-分页栏
 * */
var bbar = new Ext.PagingToolbar({
	pageSize : 15,
	store : typeGridStore,
	displayInfo : true,
	displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
	emptyMsg : "无记录"
});

/**
 * 无功优化-表格模型
 * */
var columnModel = new Ext.grid.ColumnModel({
	columns : [ new Ext.grid.RowNumberer(), {
		header : 'GUID',
		dataIndex : 'GUID',
		hidden : true
	}, {
		header : '工程任务版本',
		align : 'center',
		dataIndex : 'VERSIONID',
		hidden : true
	}, {
		header : '系统管理单位',
		align : 'center',
		dataIndex : 'SYS_DEPT_CODE',
		hidden : true
	}, {
		header : '设备名称',
		width : 120,
		align : 'center',
		dataIndex : 'NAME'
	}, {
		header : '功率因数',
		width : 120,
		align : 'center',
		dataIndex : 'ASS_COS'
	}, {
		header : '评价结果',
		width : 120,
		align : 'center',
		dataIndex : 'ASS_RESULT'
	}, {
		header : '改造建议',
		width : 120,
		align : 'center',
		dataIndex : 'ASS_REFROM'
	}]
});

/**
 * 无功优化GridPanel
 */
var typeDataGrid = new Ext.grid.GridPanel({
	id : 'dataGrid',
	region : "center",
	width : document.documentElement.offsetWidth-780,
	height : document.documentElement.offsetHeight-23,
	store : typeGridStore,
	bbar : bbar,
	cm : columnModel,
	listeners : {
		  'rowclick' : function(){
			  Ext.app.caseDataGrid.getStore().clearModified();
			  Ext.app.caseDataGrid.store.load({
					params : {
						versionId : versionId,
						name : typeDataGrid.getSelectionModel().getSelected().data["NAME"],
						deptId : deptguid
					}
				});
		  }
	  }
});
Ext.app.typeDataGrid = typeDataGrid;
typeDataGrid.store.on('beforeload', function(){
	this.baseParams = {
		'start' : 0,
		'limit' : 15,
		versionId : versionId
	};
});
typeDataGrid.store.load();
/**
 * 数据源
 * */
var caseGridStore = new Ext.data.Store({
	url : "pmv/reactivePowerOptimizationController/loadCaseGrid.do",
	method : 'post',
	autoLoad : false,
	reader : new Ext.data.JsonReader({
		root : 'list',
		totalProperty : "size",
		fields : [ {
			name : "GUID",
			mapping : "0"
		}, {
			name : "VERSIONID",
			mapping : "1"
		}, {
			name : "SYS_DEPT_CODE",
			mapping : "2"
		}, {
			name : "ASS_SVC_PROJECT",
			mapping : "3"
		}, {
			name : "ASS_SVC_NAME",
			mapping : "4"
		}, {
			name : "ASS_COS",
			mapping : "5"
		}, {
			name : "ASS_REF_COS",
			mapping : "6"
		}, {
			name : "ASS_ALL_KVA",
			mapping : "7"
		}, {
			name : "ASS_ONE_KVA",
			mapping : "8"
		}, {
			name : "ASS_SVC_NUM",
			mapping : "9"
		}, {
			name : "ASS_MODEL",
			mapping : "10"
		}, {
			name : "ASS_MODEL_ID",
			mapping : "11"
		} ]
	})
});

var selectModel = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false
});

Ext.app.SVCModel = new Ext.data.JsonStore({
	url : "pmv/reactivePowerOptimizationController/loadSVCModel.do",
	fields : ['value', 'text'],
	autoLoad : false
});
Ext.app.SVCModel.load();
var caseTbar = [ 
                '-', 
                {
                	id : 'add',
            		xtype : 'button',
            		text : '新增',
            		iconCls : 'add',
            		handler : function(){
            			Ext.app.addNewRecord();
            		}
                }, 
                '-', 
               {
        		xtype : 'button',
        		text : '修改',
        		iconCls : 'edit',
        		handler : function() {
        			isCanModify = 1;
        		}
            }, 
                '-', 
                {
            		xtype : 'button',
            		text : '保存',
            		iconCls : 'save',
            		handler : function() {
            			Ext.app.saveData();
            		}
            	},
                '-', 
                {
            		xtype : 'button',
            		text : '删除',
            		iconCls : 'remove',
            		handler : function() {
            			Ext.app.deleteData(caseDataGrid);
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
            			grid2Excel(caseDataGrid, {title : '无功优化'});
            		}
            	},
            	'-'
            ]
var selectModel = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false
});
/**
 * 可编辑列模型
 */
var caseColumnModel = new Ext.grid.ColumnModel({
	columns : [ new Ext.grid.RowNumberer(), selectModel,{
		header : '主键',
		dataIndex : 'GUID',
		hidden : true
	}, {
		header : '工程任务版本',
		dataIndex : 'VERSIONID',
		hidden : true
	}, {
		header : '系统管理单位',
		dataIndex : 'SYS_DEPT_CODE',
		hidden : true
	}, {
		header : '补偿工程名称',
		dataIndex : 'ASS_SVC_PROJECT',
		hidden : true
	}, {
		header : '设备名称',
		align : 'center',
		dataIndex : 'ASS_SVC_NAME'
	}, {
		header : '功率因数（前）',
		editor : {
		    xtype : 'numberfield'
		},
		align : 'center',
		dataIndex : 'ASS_COS'
	}, {
		header : '功率因数（后）',
		editor : {
		    xtype : 'numberfield'
		},
		align : 'center',
		dataIndex : 'ASS_REF_COS'
	}, {
		header : '补偿容量',
		editor : {
		    xtype : 'numberfield'
		},
		align : 'center',
		dataIndex : 'ASS_ALL_KVA'
	}, {
		header : '单补偿容量',
		editor : new Ext.form.NumberField({
			disabled : true
		}),
		align : 'center',
		dataIndex : 'ASS_ONE_KVA'
	}, {
		header : '投入台/台数',
		editor : {
		    xtype : 'numberfield'
		},
		align : 'center',
		dataIndex : 'ASS_SVC_NUM'
	}, {  
		header : '<font color=red>补偿装置型号</font>',
		align : 'center',
		dataIndex : 'ASS_MODEL',
		
        renderer : function(value, metedata, record,columnIndex, rowIndex, store) {  
            var combo = Ext.getCmp("ass_svc_model_combo");  
            combo.getStore().load({params : {value:Ext.getCmp('ass_svc_model_combo').getValue()}});  
            if(combo.getStore().getCount()>0){  
                for(var i = 0; i < combo.getStore().getCount();i++){  
                    if(combo.getStore().getAt(i).get('value')==value) {  
                        value = combo.getStore().getAt(i).get('text');   
                    }  
                }  
            }  
            return value;  
        },  
        editor : new Ext.form.ComboBox({  
                    editable : false,  
                    id : 'ass_svc_model_combo',  
                    triggerAction : 'all',  
                    mode : 'local',  
                    store : Ext.app.SVCModel,
                    displayField : 'text',  
                    valueField : 'value',
                    listeners : {
            			'beforeselect' : function(combo,record,index){
            				var ass_ref_model_curr_value = Ext.getCmp('ass_svc_model_combo').getValue();
            				if(ass_ref_model_curr_value){
            					Ext.app.ass_ref_model_curr_value = ass_ref_model_curr_value;
            				}else{
            					return null;
            				}
            			},
            			'select' : function(combo,record,index){
            				var ass_ref_model_combo = Ext.getCmp('ass_svc_model_combo').getValue();
        					if(ass_ref_model_combo != Ext.app.ass_ref_model_curr_value){
        						Ext.app.showMediumVolLine();
        					}
            			}
            		}
               })  
    }, {
		header : '补偿装置型号Id',
		dataIndex : 'ASS_MODEL_ID',
		hidden : true
	}  ]
});

/**
 * 模型EditorGridPanel
 */
var caseDataGrid = new Ext.grid.EditorGridPanel({
	id : 'caseDataGrid',
	region : 'north',
	width : 780,
	height : document.documentElement.offsetHeight/3-30,
//	height : 300,
	store : caseGridStore,
	tbar : caseTbar,
	clicksToEdit : 1,
	cm : caseColumnModel,
	sm : selectModel,
	listeners : {
		  'rowclick' : function(){
			  	var record = Ext.app.caseDataGrid.getSelectionModel().getSelected();
//		  		var ass_model_id = Ext.app.getComboText(caseDataGrid,"ASS_MODEL");
		  		if(record!= undefined &&record.data["ASS_MODEL"] != null && record.data["ASS_MODEL"] != ''){
		  			//更新formpanel的值
		  			var model = record.data["ASS_MODEL"];
		  			var _model = Ext.app.getComboValue(model,Ext.app.SVCModel);
		  			if(_model != undefined){
		  				model = record.data["ASS_MODEL_ID"]
		  			}
		  			Ext.app.formPanel.getForm().reset();
		  			Ext.app.setFormPanel(model);
		  		}else{
		  			Ext.app.formPanel.getForm().reset();
		  		}
			  
		  		if(record.data["ASS_MODEL"] != null && record.data["ASS_SVC_NUM"] != null 
		  				&& record.data["ASS_MODEL"] != '' && record.data["ASS_SVC_NUM"] != ''){
		  			Ext.app.refreshTabpanel();
		  			Ext.app.tabPanel.setActiveTab(0);
		  		}else{
		  			Ext.app.setTabPanelBlank();
		  		}
		  },
		  afteredit : function(arg) {
				var field = arg.field;
				// 截面积
				if(field == "ASS_MODEL"){
					var type = arg.value;
					if(type != ''){
						arg.record.set('ASS_MODEL_ID',type);
						arg.record.set('ASS_ONE_KVA',Ext.app.ratedkva);
					}
				}
			},
		  'beforeedit' : function(arg) {
			 	if(isCanModify == 1){
			 		return true;
			 	}else {
			 		return false;
				}
		  }
	  }
});
Ext.app.caseDataGrid = caseDataGrid;

var rightPanel = new Ext.Panel({
	id : 'rightPanel',
	region : 'east',
	layout : 'border',
	width : 780,
	items : [ caseDataGrid,Ext.app.formPanel,Ext.app.tabPanel ]
});

/**
 * 表格总面板
 * */
var gridPanel = new Ext.Panel({
	region : 'center',
	layout : 'border',
	border : false,
	bodyBorder : false,
	tbar : taskViewTbar,
	items : [ typeDataGrid,rightPanel ]
});

/**
 * 页面显示
 * */
var viewport = new Ext.Viewport({
	layout : "border",
	defaults : {
		border : false
	},
	items : [ {
		region : 'center',
		layout : 'border',
		items : [ gridPanel ]
	} ]
});
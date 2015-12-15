/**
 * 当前工程任务显示-工具栏
 * */
var taskViewTbar = new Ext.Toolbar({  
	id : 'taskViewTbar',
    items:['<div style ="border:1px solid red"><font size=2 color=red>工程任务:'+'2015年春季改造工程'+'</font></div>']//task_name
}); 

/**
 * 更换配变型号-数据源
 * */
var typeGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "pmv/reTransformerModelAction/loadModelGrid.do",
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
			name : "MODEL",
			mapping : "4"
		}, {
			name : "L_LOSS",
			mapping : "5"
		}, {
			name : "ASS_LOAD_FACT",
			mapping : "6"
		}, {
			name : "ASS_RESULT",
			mapping : "7"
		}, {
			name : "ASS_REFROM",
			mapping : "8"
		} ]
	})
});

/**
 * 更换配变型号-分页栏
 * */
var bbar = new Ext.PagingToolbar({
	pageSize : 15,
	store : typeGridStore,
	displayInfo : true,
	displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
	emptyMsg : "无记录"
});

/**
 * 导线型号表格-表格模型
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
		header : '配变名称',
		align : 'center',
		dataIndex : 'NAME'
	}, {
		header : '型号',
		align : 'center',
		dataIndex : 'MODEL'
	}, {
		header : '线损率(%)',
		align : 'center',
		dataIndex : 'L_LOSS'
	}, {
		header : '负载率(%)',
		align : 'center',
		dataIndex : 'ASS_LOAD_FACT'
	}, {
		header : '评价结果',
		align : 'center',
		dataIndex : 'ASS_RESULT'
	}, {
		header : '改造建议',
		align : 'center',
		dataIndex : 'ASS_REFROM'
	}]
});

/**
 * 更换配变型号表格GridPanel
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
		'rowclick' : function(col){
			var record = typeDataGrid.getSelectionModel().getSelections();
			var guid = record[0].data["GUID"];
			var name = record[0].data["NAME"];
			Ext.app.modelguid = guid;
			Ext.app.modelname = name;
			Ext.app.caseDataGrid.getStore().clearModified();
			Ext.app.caseDataGrid.store.load({
				params : {
					versionId : versionId,
					guid : guid,
					deptId : deptguid
				}
			});
		}
	}
});
Ext.app.typeDataGrid = typeDataGrid;

typeDataGrid.store.on('beforeload', function() {
	var _params = {
			'login_dept' : deptguid
		};
	this.baseParams = _params;
});
typeDataGrid.store.load();

/**
 * 更换配变型号-数据源
 * */
var caseGridStore = new Ext.data.Store({
	url : "pmv/reTransformerModelAction/loadTransCaseGrid.do",
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
			name : "ASS_REF_PROJECT",
			mapping : "3"
		}, {
			name : "ASS_REF_NAME",
			mapping : "4"
		}, {
			name : "ASS_KVA",
			mapping : "5"
		}, {
			name : "ASS_REF_KVA",
			mapping : "6"
		}, {
			name : "ASS_MODEL",
			mapping : "7"
		}, {
			name : "ASS_REF_MODEL",
			mapping : "8"
		} ]
	})
});

/**
 * 更换配变型号方案-下拉选数据源
 * */
var ass_model_store = new Ext.data.JsonStore({
	url : "pmv/reTransformerModelAction/getAssModelCombo.do",
	fields : ['value', 'text'],
	autoLoad : false
});

ass_model_store.on("beforeload",function(){
	this.baseParams  = {
		'dept' : deptguid		
	}
});
ass_model_store.load();

/**
 * 更换配变型号方案-复选框
 * */
var selectModel = new Ext.grid.CheckboxSelectionModel({
	checkOnly : false
});

/**
 * 更换配变型号方案-按钮工具栏
 */
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
			grid2Excel(caseDataGrid, {title : '更换导线方案'});
		}
	},
	'-'
]

/**
 * 更换配变型号方案-可编辑列模型
 */
var caseColumnModel = new Ext.grid.ColumnModel({
	columns : [ new Ext.grid.RowNumberer(), selectModel, {
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
		header : '改造工程名称',
		dataIndex : 'ASS_REF_PROJECT',
		hidden : true
	}, {
		header : '改造配变名称',
		dataIndex : 'ASS_REF_NAME'
	}, {
		header : '改造前容量',
		editor : {
		    xtype : 'numberfield'
		},
		dataIndex : 'ASS_KVA'
	}, {
		header : '改造后容量',
		editor : {
		    xtype : 'numberfield'
		},
		dataIndex : 'ASS_REF_KVA'
	}, {
		header : '改造前型号',
		dataIndex : 'ASS_MODEL',
		 renderer : function(value, metedata, record,columnIndex, rowIndex, store) {
	            var combo = Ext.getCmp("ass_model_combo");  
	            combo.getStore().load({params : {value:Ext.getCmp('ass_model_combo').getValue()}});  
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
	                    id : 'ass_model_combo',  
	                    triggerAction : 'all',  
	                    mode : 'local',  
	                    store : ass_model_store,
	                    displayField : 'text',  
	                    valueField : 'value',
	                    listeners : {
	            			'beforeselect' : function(combo,record,index){
	            				var ass_ref_model_curr_value = Ext.getCmp('ass_model_combo').getValue();
	            				if(ass_ref_model_curr_value){
	            					Ext.app.ass_ref_model_curr_value = ass_ref_model_curr_value;
	            				}else{
	            					return null;
	            				}
	            			},
	            			'select' : function(combo,record,index){
	            				var ass_ref_model_combo = Ext.getCmp('ass_model_combo').getValue();
	        					if(ass_ref_model_combo != Ext.app.ass_ref_model_curr_value){
	        						Ext.app.showTransformerModel('before');
	        					}
	            			}
	            		}
	               })  
	}, {
		header : '<font color=red>改造后型号</font>',
		dataIndex : 'ASS_REF_MODEL',
		renderer : function(value, metedata, record,columnIndex, rowIndex, store) {
            var combo = Ext.getCmp("ass_ref_model_combo");  
            combo.getStore().load({params : {value:Ext.getCmp('ass_ref_model_combo').getValue()}});  
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
                    id : 'ass_ref_model_combo',  
                    triggerAction : 'all',  
                    mode : 'local',  
                    store : ass_model_store,
                    displayField : 'text',  
                    valueField : 'value',
                    listeners : {
            			'beforeselect' : function(combo,record,index){
            				var ass_ref_model_curr_value = Ext.getCmp('ass_ref_model_combo').getValue();
            				if(ass_ref_model_curr_value){
            					Ext.app.ass_ref_model_curr_value = ass_ref_model_curr_value;
            				}else{
            					return null;
            				}
            			},
            			'select' : function(combo,record,index){
            				var ass_ref_model_combo = Ext.getCmp('ass_ref_model_combo').getValue();
        					if(ass_ref_model_combo != Ext.app.ass_ref_model_curr_value){
        						Ext.app.showTransformerModel();
        					}
            			}
            		}
               })  
	} ]
});



/**
 * 更换配变型号方案-模型EditorGridPanel
 */
var caseDataGrid = new Ext.grid.EditorGridPanel({
	id : 'caseDataGrid',
	region : 'north',
	width : 780,
	height : document.documentElement.offsetHeight/3-30,
	store : caseGridStore,
	tbar : caseTbar,
	clicksToEdit : 1,
	sm : selectModel,
	cm : caseColumnModel,
	listeners : {
		  'rowclick' : function(){   
			  //工程费用和节电量标题信息
			  var recordArr = caseDataGrid.getSelectionModel().getSelections();
			  var record = recordArr[0];
			  
			  if(record!=undefined && record.data["ASS_REF_MODEL"] != null && record.data["ASS_REF_MODEL"] != ''){
		  		  //更新formPanel的值
		  		  Ext.app.formPanel.getForm().reset();
		  		  //formPanel赋值
		  		  Ext.app.setFormPanel(record.data["ASS_REF_MODEL"]);
		  		  Ext.app.tabPanel.setActiveTab(0);
		  	  }else{
		  		  Ext.app.formPanel.getForm().reset();
		  	  }
			  
//			  if(record.data["ASS_MODEL"] != null && record.data["ASS_REF_MODEL"] != null
//					  && record.data["ASS_MODEL"] != '' && record.data["ASS_REF_MODEL"] != ''){
//				  Ext.app.refreshTabpanel();
//				  Ext.app.tabPanel.setActiveTab(0);
//			  }else{
//				  Ext.app.setTabPanelBlank();
//			  }
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

caseDataGrid.store.on('beforeload', function() {
	var _params = {
			'modelname' : Ext.app.modelname,
			'login_dept' : deptguid
		};
	this.baseParams = _params;
});
caseDataGrid.store.load();

/**
 * 主界面右侧总面板
 * */
var rightPanel = new Ext.Panel({
	id : 'rightPanel',
	region : 'east',
	layout : 'border',
	width : 780,
	items : [ caseDataGrid,Ext.app.formPanel,Ext.app.tabPanel ]
});

/**
 * 页面总面板
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
Ext.onReady(function() {
	
	// 请求设置典型日默认值
	var url = "pmv/basicDataAction/getDefaultDate.do";
	var util = new Bp.util.RequestUtils();
	var flag = Ext.decode(util.sendRequest(url,{}));
	if (flag.success) {
		defaultDate = flag.value;
	}
	
	var typicalDayStore = new Ext.data.JsonStore({
		url : "pmv/basicDataAction/getDateComoBox.do",
		fields : ['value', 'text'],
		autoLoad:true
	});
	
	var pointPositionStore = new Ext.data.JsonStore({
		url : "pmv/disTraAssessDMAction/queryDataForPointPositionStoreJson.do",
		fields : ['value', 'text'],
		autoLoad:true
	});
	
	var lineNameStore = new Ext.data.JsonStore({
		url : "pmv/disTraAssessDMAction/queryDataForLineNameStoreJson.do",
		fields : ['value', 'text'],
		listeners : {
			'load' : function(store,record,opts) {
				Ext.getCmp('mainGrid').getStore().load();
			}
		}
	});
	
	// 加载数据前事件
	lineNameStore.on('beforeload', function() {
		// 传递参数
		this.baseParams = {
			"versionId" : versionId
		};
	});
	
	var disTraModelStore = new Ext.data.JsonStore({
		url : "pmv/disTraAssessDMAction/queryDataForDisTraModelStoreJson.do",
		fields : ['value', 'text'],
		autoLoad:true
	});
	
	var typicalDayCombo = new Ext.form.ComboBox({
		id : 'typicalDayCombo',
		fieldLabel : '典型日',
		anchor : '80%',
		mode : 'local',
		store : typicalDayStore,
		displayField : 'text',
		valueField : 'value',
		triggerAction : 'all',
		width : 100,
		value : defaultDate,
		editable : false
	});
	
	var devName = new Ext.form.TextField({
		id:"dev_name",
		width : 100,
        value : ''
	});
	
	var lineName = new Ext.form.TextField({
		id:"lineName",
		width : 100,
        value : ''
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners : {
			 'rowselect' : function() {
				 var dxrGrid = Ext.getCmp('viceGrid');
					dxrGrid.store.load();
			 } 
		}
	}); 
	
	// 查询grid
	var cm_p = new Ext.grid.ColumnModel([
	    new Ext.grid.RowNumberer(), 
	    sm,
	    {
			header : '典型日ID',
			dataIndex : 'rguid',
			align : 'center',
			hidden : true
		},
	    {
			header : '设备ID',
			dataIndex : 'devguid',
			align : 'center',
			hidden : true
		},
		{
			header : '名称',
			dataIndex : 'name',
			align : 'center',
			width : 120,
			editor : new Ext.form.TextField({
				allowBlank : false
			})
		}, {
			header : '所属配线',
			dataIndex : 'line_id',
			align : 'center',
			width : 120,
			editor : new Ext.form.ComboBox({
				id : 'lineNameCombo',
				store : lineNameStore,
				editable : false,
				valueField : 'value',
				displayField : 'text',
				mode : 'local',
				triggerAction : 'all',
				typeAhead : true,
				allowBlank : false
			}),
			renderer : function(value) {
				return setComboValue(value, lineNameStore);
			}
		}, {
			header : '配变型号',
			dataIndex : 'model',
			align : 'center',
			width : 100,
			editor : new Ext.form.ComboBox({
				id : 'disTraModelCombo',
				store : disTraModelStore,
				editable : false,
				valueField : 'value',
				displayField : 'text',
				mode : 'local',
				triggerAction : 'all',
				typeAhead : true,
				allowBlank : false
			}),
			renderer : function(value) {
				return setComboValue(value, disTraModelStore);
			}
		}, {
			header : '配变容量(MVA)',
			dataIndex : 'ratedmva',
			align : 'center',
			width : 100,
			editor : new Ext.form.NumberField({
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				allowBlank : false
			})
		}, {
			header : '计量位置',
			dataIndex : 'pointposition',
			align : 'center',
			width : 100,
			editor : new Ext.form.ComboBox({
				id : 'pointPositionCombo',
				store : pointPositionStore,
				editable : false,
				valueField : 'value',
				displayField : 'text',
				mode : 'local',
				triggerAction : 'all',
				typeAhead : true,
				allowBlank : false
			}),
			renderer : function(value) {
				return setComboValue(value, pointPositionStore);
			}
		}, {
			header : '典型日',
			dataIndex : 'typicalday',
			align : 'center',
			width : 100,
			editor : new Ext.form.ComboBox({
				id : 'typicalDayComboGrid',
				store : typicalDayStore,
				editable : false,
				valueField : 'value',
				displayField : 'text',
				mode : 'local',
				triggerAction : 'all',
				typeAhead : true,
				allowBlank : false
			}),
			renderer : function(value) {
				return setComboValue(value, typicalDayStore);
			}
		}, {
			header : '运行单位',
			dataIndex : 'run_unit',
			align : 'center',
			width : 100
		}]
	);

	var store_p = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'pmv/disTraAssessDMAction/queryDataForParentTableJson.do',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'root'
		}, [{
			name : 'rguid'
		},{
			name : 'devguid'
		}, {
			name : 'name'
		}, {
			name : 'line_id'
		}, {
			name : 'model'
		}, {
			name : 'ratedmva'
		}, {
			name : 'pointposition'
		}, {
			name : 'typicalday'
		}, {
			name : 'run_unit'
		}])
	});
	
	//加载数据前事件
	store_p.on('beforeload', function() {
		//页面参数
		var typicalDay = Ext.getCmp('typicalDayCombo').getValue();
		var dev_name = Ext.getCmp('dev_name').getValue();
		var lineName = Ext.getCmp('lineName').getValue();
		//传递参数
		var _params;
		_params = {
			"versionId" : versionId,
			"typicalDay" : typicalDay,
			"dev_name" : dev_name,
			"lineName" : lineName,
			'start' : 0,
			'limit' : 15
		}
		this.baseParams = _params;
	});
	
	var tb_p = new Ext.Toolbar({  
		id:'tb_p',
	    items:[ '-',
	            {
					text:'增加',
					iconCls:'add',
					handler:function(){Ext.app.create();}
				},'-',{
					text:'修改',
					iconCls:'edit',
					handler:function(){isCanModify=1;}
				},'-',{
					text:'保存',
					iconCls:'save',
					handler:function(){Ext.app.saveData_p();}
				},'-',{
					text:'删除',
					iconCls:'remove',
					handler:function(){Ext.app.deleteData();}
				},'-',{
					text:'查询',
					iconCls:'query',
					handler:function(){Ext.getCmp('mainGrid').getStore().load();refreshGridPS();}
				},'-',{
					text:'撤销',
					iconCls:'undo',
					handler:function(){Ext.app.resetData();}
				},'-'/*,{
					text:'导入',
					iconCls:'import',
					handler:function(){}
				},'-',{
					text:'导出',
					iconCls:'export',
					handler:function(){}
				},*/
	           ]  
	}); 
	
	var gridPanel_p = new Ext.grid.EditorGridPanel({
		id : 'mainGrid',
		region : 'center',
		store : store_p,
		cm : cm_p,
		sm : sm,
		loadMask : true,
		tbar:tb_p,
		clicksToEdit : 1,
		bbar : new Ext.PagingToolbar({
			id : 'bbr_p',
			pageSize :20,
			store : store_p,
			displayInfo : true,
			displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
			emptyMsg : "无数据。"
		}),
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
	
	var mainPanelToolbar = new Ext.Toolbar({  
		id:'mainPanelToolbar',
	    items:[
	           '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;典型日：',typicalDayCombo,
	           '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设备名称：',devName,
	           '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所属配线：',lineName,
	           '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;测量点数：'
	           ]  
	}); 
	mainPanelToolbar.add("<div style = 'height:25px;'><input type='radio' name='pointNum' value='1' checked='checked' />24点 <input type='radio' name='pointNum' value='2' />96点 </div>");
	var mainPanel = new Ext.Panel({
		layout : 'border',
		region : 'center',
		border : false,
		bodyBorder : false,
		tbar:mainPanelToolbar,
		items : [gridPanel_p,Ext.app.vGrid('pb','typicalday','devguid') ]
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
					lineNameStore.load();
					isCanModify = 0;
				}
			}
		}
	});
	/**
	 * 页面显示
	 */
	var viewport = new Ext.Viewport({
		layout : "border",
		items : [ projectNavTree,mainPanel]
	});
		
});
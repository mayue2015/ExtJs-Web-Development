Ext.onReady(function() {
	/**
	 * 多选框
	 */
	var selectModel = new Ext.grid.CheckboxSelectionModel({
		checkOnly : false,
		listeners : {
			'rowselect' : function() {
				var dxrGrid = Ext.getCmp('viceGrid');
				dxrGrid.store.load();
			}
		}
	});

	/**
	 * 主表分页工具
	 */
	var bbar = new Ext.PagingToolbar({
		pageSize : 15,
		store : Ext.app.mainStore,
		displayInfo : true,
		displayMsg : '显示第{0}条到{1}条记录,共{2}条',
		emptyMsg : "记录为空"
	});

	/**
	 * 列
	 */
	var columns = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), selectModel, {
			header : '主键',
			dataIndex : 'GUID',
			hidden : true
		}, {
			header : '名称',
			dataIndex : 'NAME',
			editor : new Ext.form.TextField({
				id : 'NAME'
			})
		}, {
			header : '所属配线/配变',
			dataIndex : 'DISTRICT_NAME',
			editor : new Ext.form.ComboBox({
				id : 'district_name_combo',
				store : Ext.app.xl_store,
				valueField : 'value',
				displayField : 'text',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				typeAhead : true,
				allowBlank : false
			}),
			renderer : function(value) {
				return Ext.app.setComboValue(value, Ext.app.xl_store);
			}
		}, {
			header : '配变型号',
			dataIndex : 'PBXH'
		}, {
			header : '配变容量(MVA)',
			dataIndex : 'PBRL'
		}, {
			header : '计量位置',
			dataIndex : 'JLDW'
		}, {
			header : '相别',
			dataIndex : 'XB',
			editor : new Ext.form.ComboBox({
				id : 'xb_combo',
				store : Ext.app.xb_store,
				valueField : 'value',
				displayField : 'text',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				typeAhead : true,
				allowBlank : false
			}),
			renderer : function(value) {
				return Ext.app.setComboValue(value, Ext.app.xb_store);
			}
		}, {
			header : '典型日',
			dataIndex : 'DATE',
			editor : new Ext.form.ComboBox({
				id : 'date_combo',
				store : Ext.app.date_store,
				valueField : 'value',
				displayField : 'text',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				typeAhead : true,
				allowBlank : false
			}),
			renderer : function(value) {
				return Ext.app.setComboValue(value, Ext.app.date_store);
			}
		}, {
			header : '运行单位',
			dataIndex : 'RUN_UNIT'
		} ]
	});

	/**
	 * 主表表格模型
	 */
	var mainGrid = new Ext.grid.EditorGridPanel({
		id : 'mainGrid',
		region : 'center',
		width : mainWidth,
		height : height,
		store : Ext.app.mainStore,
		tbar : Ext.app.mainGridTbar(),
		bbar : bbar,
		sm : selectModel,
		clicksToEdit : 1,
		cm : columns,
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
	Ext.app.mainGrid = mainGrid;

	// 加载数据前事件
	mainGrid.store.on('beforeload', function() {
		// 页面参数
		var dxr = Ext.getCmp('dxr').getValue();
		var sbmc = Ext.getCmp('sbmc').getValue();
		var sjsb = Ext.getCmp('sjsb').getValue();
		var clds = document.getElementsByName("pointNum");
		var _param = {
			"dxr" : dxr,
			"sbmc" : sbmc,
			"sjsb" : sjsb,
			"clds" : clds,
			'start' : 0,
			'limit' : 15,
			'versionId' : versionId
		};
		this.baseParams = _param;
	});
	
	var piePanel = new Ext.Panel({
		id : 'radarDivs',
		width : viceWidth,
		height : height,
		region : 'east'
	});

	var mainPanel = new Ext.Panel({
		layout : 'border',
		region : 'center',
		border : false,
		bodyBorder : false,
		height : height,
		tbar : Ext.app.fromTbar('所属设备：'),
		items : [ mainGrid, Ext.app.vGrid('dyq','DATE','GUID') ]
//		items : [ mainGrid, piePanel ]
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
					Ext.app.xl_store.load();
					isCanModify = 0;
//					Ext.getCmp('mainGrid').getStore().load();
				}
			}
		}
	});

	/**
	 * 页面显示
	 */
	var viewport = new Ext.Viewport({
		layout : "border",
		items : [ projectNavTree, mainPanel ]
	});

});
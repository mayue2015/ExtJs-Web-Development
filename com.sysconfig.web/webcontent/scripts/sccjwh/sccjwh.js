Ext.onReady(function(){
//-------------------------------------生产厂家维护-制造厂家(左侧)-表格--------------------------------------------------//
	var returnValue;
	var isave = 1;
	
	var viewConfig =  {
		forceFit : true,
		getRowClass: function(record, index) {
		    var state = record.get('state');
		    if (state != '0402201' && state != "") {	
		        return 'x-grid-record-blue';
		    }else {
		        return '';
		    }
		}
	};
	
	var gridStore = new Ext.data.Store({
		url : "sysconfig/manufacturerController/cmdListManufacturer.do",
		method : 'post',
		reader : new Ext.data.JsonReader({
			root : "list",
			totalProperty : "size",
			fields : [ {
				name : "guid",
				mapping : "0"
			}, {
				name : "code",
				mapping : "1"
			}, {
				name : "sccj",
				mapping : "2"
			}, {
				name : "sblxmc",
				mapping : "3"
			}, {
				name : "state",
				mapping : "4"
			}
			]
		})
	});
	
	var selectModel = new Ext.grid.CheckboxSelectionModel({
		checkOnly : false
	});
	
	var bbar = new Ext.PagingToolbar({
		pageSize : 15,
		store : gridStore,
		displayInfo : true,
		displayMsg : '显示 第{0}条-{1}条记录  /共{2}条',
		emptyMsg : "记录为空"
	});
	
	var columnModel = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(),selectModel,
		{
			header : "guid",
			dataIndex : "guid",
		    hidden : true
		}, 
		{
			header : "code",
			dataIndex : "code",
		    hidden : true
		},
		{
			header : "生产厂家",
			dataIndex : "sccj"
		},
		{
			header : "设备类型名称",
			dataIndex : "sblxmc",
			hidden : true
		}, 
		{
			header : "状态",
			dataIndex : "state",
			hidden : true
		}
		]
	});
		
	/**
	 * 增加-弹窗-面板
	 */
	var addFormPanel = new Ext.form.FormPanel({
		id : 'addFormPanel',
		width : 500,
		height : 130,
		border : false,
		frame : true,
		region : 'center',
		autoScroll : false,
		labelAlign : "right",
		items : [ {
			layout : 'column',
			style : 'margin-top:8px',
			items : [ {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [{
					xtype : 'textfield',
					id : 'sccj',
					name : 'sccj',
					fieldLabel : '<font color=red>*</font>生产厂家',
					anchor : '98%'
				}]
			}],
			buttonAlign : 'center',
			buttons : [ {
				text : '保存',
				width : 80,
				iconCls : 'save',
				handler : function(){
					if (Ext.getCmp('sccj').getValue() == '') {
						Ext.Msg.alert('系统提示', '请输入生产厂家名称！');
						return;
					}
					//请求后台服务
					Ext.Ajax.request({
						url : 'sysconfig/manufacturerController/ZZupdateOrinsert.do',
						params : {
							guid : 'new',
							sccj : Ext.getCmp('sccj').getValue()
						},
						success : function(response, options) {
							if (response.status == 200) {
								var data = Ext.util.JSON.decode(response.responseText);
								if (data.success) {
									Ext.Msg.alert('系统提示', '数据保存成功！');
									Ext.getCmp('sccjGrid').store.reload();
									return true;
								}else {
									Ext.Msg.alert('系统提示', data.failure);
									return false;
								}
							} else {
								Ext.Msg.alert('系统提示', '数据保存失败！');
								Ext.getCmp('sccjGrid').store.reload();
								return false;
							}
					   }
					});
					Ext.getCmp('addWindow').hide();
				}
			}, {
				text : '取消',
				width : 80,
				icon : 'sysconfig/public/images/cancel_2.png',
				handler : function(){
					Ext.getCmp('addWindow').hide();
				}
			} ]
		} ]
	});
	
	/**
	 * 修改-弹窗-面板
	 */
	var updateFormPanel = new Ext.form.FormPanel({
		id : 'updateFormPanel',
		width : 500,
		height : 130,
		border : false,
		frame : true,
		region : 'center',
		autoScroll : false,
		labelAlign : "right",
		items : [ {
			layout : 'column',
			style : 'margin-top:8px',
			items : [ {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [{
					xtype : 'textfield',
					id : 'xgsccj',
					name : 'xgsccj',
					fieldLabel : '<font color=red>*</font>生产厂家',
					anchor : '98%'
				}]
			}],
			buttonAlign : 'center',
			buttons : [{
				text : '保存',
				width : 80,
				iconCls : 'save',
				handler : function(){
					var xgsccj = Ext.getCmp('xgsccj').getValue();
					if (xgsccj == ''){
						Ext.Msg.alert('系统提示','请输入生产厂家名称！');
						return false;
					}else{
						var record = Ext.getCmp('sccjGrid').getSelectionModel().getSelected();
						var guid = record.get('guid');
						//请求后台服务
						Ext.Ajax.request({
							url : 'sysconfig/manufacturerController/ZZupdateOrinsert.do',
							params : {
								guid : guid,
								sccj : Ext.getCmp('xgsccj').getValue()
							},
							success : function(response, options) {
								if (response.status == 200) {
									var data = Ext.util.JSON.decode(response.responseText);
									if (data.success) {
										Ext.Msg.alert('系统提示', '数据修改成功！');
										Ext.getCmp('sccjGrid').store.reload();
										return true;
									}else {
										Ext.Msg.alert('系统提示', data.failure);
										return false;
									}
								} else {
									Ext.Msg.alert('系统提示', '数据修改失败！');
									Ext.getCmp('sccjGrid').store.reload();
									return false;
								}
						   }
						});
						Ext.getCmp('updateWindow').hide();
					}
				}
			}, {
				text : '取消',
				width : 80,
				icon : 'sysconfig/public/images/cancel_2.png',
				handler : function(){
					Ext.getCmp('updateWindow').hide();
				}
			}]
		} ]
	});
	
	/**
	 * 增加-弹窗
	 */
	var addWindow = new Ext.Window({
		id : 'addWindow',
		title : '增加生产厂家',
		layout : 'fit',
		x : 600,
		y :　150,
		width : 500,
		height : 130,
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : false,
		items : [ Ext.getCmp('addFormPanel') ]
	});
	
	/**
	 * 修改-弹窗
	 */
	var updateWindow = new Ext.Window({
		id : 'updateWindow',
		title : '修改生产厂家',
		layout : 'fit',
		x : 600,
		y :　150,
		width : 500,
		height : 130,
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : false,
		items : [ Ext.getCmp('updateFormPanel') ]
	});

	/**
	 * 生产厂家-数据表格
	 */
	var GridPanel = new Ext.grid.GridPanel({
		id : 'sccjGrid',
		region : 'west',
		title : '生产厂家',
		viewConfig: viewConfig,
		autoScroll : true,
		stripeRows:true,//间隔斑马条纹显示
		loadMask : true,//loading...
		width : 800,
		clicksToEdit : 1,
		border : false,
		paging:true,
		split : true,
		store : gridStore,
		tbar : ['-',{
			id : 'btn_add',
			text : '增加',
			tooltip : '增加',
			iconCls : 'add',
			handler : function() {
				Ext.getCmp('sccj').setValue('');
				Ext.getCmp('addWindow').show();
		   }
		},
		'-', 
		{
			id : 'btn_modify',
			text : '修改',
			tooltip : '修改',
			iconCls : 'edit',
			handler : function() {
				var selModel = Ext.getCmp('sccjGrid').getSelectionModel();
				var len = selModel.getCount();
				if (len == 0){
					Ext.Msg.alert('系统提示', '请选择一条记录进行修改！');
					return;
				}
				if (len > 1){
					Ext.Msg.alert('系统提示', '只能选择一条记录进行修改！');
					return;
				}
				//赋值
				var record = Ext.getCmp('sccjGrid').getSelectionModel().getSelected();
				var sccj = record.get('sccj');
				Ext.getCmp('xgsccj').setValue(sccj);
				//显示窗体
				Ext.getCmp('updateWindow').show();
		   }
		},
		'-',{
			id : 'btn_delete',
			text : '删除',
			tooltip : '删除',
			iconCls : 'remove',
			handler : function(obj) {
				var selModel = Ext.getCmp('sccjGrid').getSelectionModel();
				var len = selModel.getCount();
				if (len == 0){
					Ext.Msg.alert('系统提示', '请选择要删除的记录！');
					return;
				}
				
				var hint = "确认要删除所选厂家吗？";
				
				Ext.MessageBox.confirm('系统消息', hint, function(btn) {
					if (btn == 'yes') {
						var rows = selModel.getSelections();
						var permissionId = '';
						/** 迭代记录集* */
						for (var i = 0; i < rows.length; i++) {
							if (rows[i].get("state") == "0402201"){
								permissionId = permissionId + '' + ""
									+ rows[i].get("guid") + ",";
								continue;
							}
							
							permissionId = permissionId + '' + ""
								+ rows[i].get("guid") + ",";							
						}
						permissionId = permissionId.substring(0,permissionId.length - 1);
						
						/** 请求数据删除操作* */
						Ext.Ajax.request({
									url : 'sysconfig/manufacturerController/cmdDeleteGrid.do?guid=' + permissionId,
									method : 'post',
									params : obj,
									success : function(response, options) {
										var obj = Ext.decode(response.responseText);
										
										if (obj.failure){
											Ext.Msg.alert("系统提示", obj.failure);
											return ;
										}
										
										/** 重载数据结果集* */
										GridPanel.getStore().reload();
										loadManufacturerDevType("GridPanel"); // 1
									}
								});
					} else {
						return;
					}
				});
			}
		},'-','厂家名称：',
		new Ext.form.TextField({
	    	id : 'sccjText'
	    }),{
			id : 'btn_query',
			text : '查询',
			tooltip : '查询',
			iconCls : 'query',
			handler : function (){
				search();
			}
		},'-',{
			id : 'reset',
			text : '重置',
			tooltip : '重置',
			icon : 'sysconfig/public/images/eraser.png',
			handler : function (){
				Ext.getCmp('sccjText').setValue("");
			}
		},'-'
		],
		bbar : bbar,
		cm : columnModel,
		sm : selectModel,
		listeners : {
			'cellclick' : {
				fn : function(grid, rowIndex, columnIndex, e) {
					var _editCombo;
					var record = grid.getSelectionModel().getSelected();
					if (columnIndex==4){
						_editCombo = new Ext.grid.GridEditor(new Ext.form.TextField(
						{
							        value:record.get('sccj'),
									minHeight : 150,
									maxLength : 200,
									listeners : {
										'focus' : function(t){
											t.setValue(t.getValue() + '');
										},
										
										'change' : function(field,newValue,oldValue){
											var vRecords = GridPanel.store.data.items;
											if(vRecords.length>0){
												for(var j=0;j<vRecords.length;j++){
													var record2=vRecords[j].data;
													var w2=record2['sccj'];
													if(newValue==w2){
														Ext.Msg.alert('提示','厂家名称已存在，请重新编写！');
														
														GridPanel.store.reload();
														GridPanel.store.commitChanges();
														return false;
													}
												}
												
												Ext.Ajax.request({
													url : 'sysconfig/manufacturerController/pDCM.do?cjcm='+newValue,
													method : 'post',
													success : function(response,options){
														var text = Ext.util.JSON.decode(response.responseText);
														if(text.info == 'cming'){
													    	Ext.Msg.alert('系统提示', '厂家名称已存在，请重新编写！');
													    	GridPanel.store.reload();
													    	GridPanel.store.commitChanges();
															return false;
														}
														return true;
													}
												});
											}else{
												return true;
											}
										}
									}
						}));
						setEditable(columnIndex, _editCombo);
					}else if (columnIndex == 5) {
						_editCombo = new Ext.grid.GridEditor(
								new Ext.form.TextField(
										{
											value : record.get('sblxmc'),
											minHeight : 150,
											maxLength : 200,
											editable :false,
											listeners:{
												'focus':function(){
													var codes = record.get('code');
													var sblxmcs = record.get('sblxmc');
													var args = {
														codes : codes,
														sblxmcs : sblxmcs,
														isMultiSelect : true
													};
													var width = 800;
													var height = 600;
													
													returnValue = showModalDialog(
														basePath + "sysconfig/views/sccjwh/SblxSelectDialog.jsp",
														args,
														"dialogWidth="+width+"px;dialogHeight="+height+"px");
													
													if(!Ext.isEmpty(returnValue)){
													    record.set('sblxmc',returnValue.names);
													    record.set('code',returnValue.codes);
													    this.setValue(returnValue.names);
													}
												}
											}
										}));
						setEditable(columnIndex, _editCombo);
					}
				}
			}
		}
	});
	
	// grid行单击事件
	GridPanel.on('rowclick', function (grid, rowIdx, e){
		var selModel = grid.getSelectionModel();
		var selections = selModel.selections;
		var len = selections.length;
		// 设置上报按钮是否可用
		if (len == 1){
			var record = selModel.getSelected();
			var state = record.get("state");
			var guid = record.get("guid");
			var cjmc = record.get("sccj");
			if (guid && state == "0402201"){
//				Ext.getCmp("btn_send").setDisabled(false);
			}

			if (guid && state && state != "0402201"){
//				Ext.getCmp("btn_showWorkFlowPic").setDisabled(false);
			}else {
//				Ext.getCmp("btn_showWorkFlowPic").setDisabled(true);
			}
			
			if (guid){
				loadManufacturerDevType(guid); // 2
				sblxGridPanel.setTitle(cjmc + '生产的设备及附件类型');
			}
		}else {
//			btn_showWorkFlowPic
//			Ext.getCmp("btn_send").setDisabled(true);
//			Ext.getCmp("btn_showWorkFlowPic").setDisabled(true);
		}
	});
	
	var setEditable = function(columnIndex, _editCombo) {
		GridPanel.getColumnModel().setEditor(columnIndex, _editCombo);
		GridPanel.getColumnModel().setRenderer(columnIndex,function(value){
			return value;
	    });
	};
	
	Ext.override(Ext.grid.GridPanel, {
		validationGridTest : function(validations) {
			// 取得集合
			var vRecords = this.store.data.items;
			// 循环
			for ( var row = 0; row < vRecords.length; row++) {
				var record = vRecords[row].data;
				var temps = validations.split(",");
				for ( var j = 0; j < temps.length; j++) {
					if (Ext.isEmpty(record[temps[j]])) {
						return false;
					}
				}
			}
			return true;
		}
	});
    
	var saveGridData = function(grid,action, command, validationName) {
		if (grid.validationGridTest(validationName)) {
			var _saveDate = grid.getModifiedRecordsByString();
			if (_saveDate) {
				isave = 0;
				grid.callSaveAction(action, command, params = {
					'saveDate' : _saveDate,
					'type' : 'sccj',
					'sfqylc' : sfqylc
				}, function(response, options) {
					if (response.status == 200) {
						var data = Ext.util.JSON.decode(response.responseText);
						if (data.success) {
							isave = 1;
							Ext.Msg.alert('系统提示', '数据保存成功！');
							return true;
						}
					} else {
						Ext.Msg.alert('系统提示', '数据保存失败！');
						return false;
					}
				});
			} else {
				Ext.Msg.alert('系统提示', '数据未发生改变，不需要保存！');
				return false;
			}
		} else {
			Ext.Msg.alert('系统提示', '还有必填项没有填写，请核实后重新保存！');
			return false;
		}
	};
	
	// 页面参数
 	GridPanel.store.on('beforeload',function(){
		this.baseParams = {
				start : 0,
				limit : 15,
				'name' : Ext.getCmp("sccjText").getValue()
		}
	});
 	GridPanel.store.load();
 	
	// 查询厂家
	function search(){
		GridPanel.store.load();
	}
	
//--------------------------------------------生产厂家维护-厂家生产的设备及附件类型(右侧)-表格--------------------------------------------------
	var SblxGridStore = new Ext.data.Store({
		url : "sysconfig/manufacturerController/cmdListManufacturerDevType.do",
		method : 'post',
		reader : new Ext.data.JsonReader({
			root : "list",
			totalProperty : "size",
			fields : [ {
				name : "guid",
				mapping : "0"
			}, {
				name : "sblx",
				mapping : "1"
			}, {
				name : "fjlx",
				mapping : "3"
			}, {
				name : "sblxmc",
				mapping : "2"
			}, {
				name : "fjlxmc",
				mapping : "4"
			}
			]
		})
	});
	
	var TypeBar = [{
		id : 'addType',
		text : '配置',
		iconCls : 'edit',
		handler : function (){
			var selModel = GridPanel.getSelectionModel();				
			if (selModel.getCount() == 1){
				var record = selModel.getSelected();
				var cjbm = record.get("guid");
				var cjmc = record.get("sccj");
				var codeAry = [];
				var nameAry = [];
				
				if (!cjbm || cjbm == "new"){
					Ext.Msg.alert("系统提示", "请先保存厂家数据！");
					return;
				}
				
				sblxGridPanel.store.each(function(record){
					var fjlx = record.get("fjlx");
    				if (fjlx){
    					codeAry.push(fjlx);
    					nameAry.push(record.get("fjlxmc"));
    				}else {
    					codeAry.push(record.get("sblx"));
    					nameAry.push(record.get("sblxmc"));
    				}
    			});
				
				var codes = codeAry.join(",");
				var sblxmcs = nameAry.join(",");
				var args = {
					codes : codes,
					sblxmcs : sblxmcs,
					isMultiSelect : true
//					area:area
				};
				var width = 800;
				var height = 600;
				
				returnValue = showModalDialog(
					basePath + "sysconfig/views/sccjwh/SblxSelectDialog.jsp",
					args,
					"dialogWidth="+width+"px;dialogHeight="+height+"px");
					
				if(!Ext.isEmpty(returnValue)){
					sblxmcs = returnValue.names;
				    codes = returnValue.codes;
				    // 调用保存方法
					Ext.Ajax.request({
						url : "sysconfig/manufacturerController/cmdUpdateManufacturerDevType.do",
						method : 'post',
						params : {
							'cjbm' : cjbm,
							'cjmc' : cjmc,
							'codes' : codes,
							'sblxmcs' : sblxmcs
						},
						success : function(response, options) {
							// 重新查询
							sblxGridPanel.store.reload();
						}
					});
				}
			}else {
				Ext.Msg.alert("系统提示", "请选择一个厂家进行配置！");
			}
		}
	}];
	
	var TypeBBar = new Ext.PagingToolbar({
		pageSize : 15,
		store : SblxGridStore,
		displayInfo : true,
		displayMsg : '显示 第{0}条-{1}条记录  /共{2}条',
		emptyMsg : "记录为空"
	});
	
	var CM = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(),
		{
			header : "guid",
			dataIndex : "guid",
		    hidden : true
		}, 
		{
			header : "sblx",
			dataIndex : "sblx",
		    hidden : true
		},
		{
			header : "fjlx",
			dataIndex : "fjlx",
			hidden : true
		},
		{
			header : "设备类型名称",
			dataIndex : "sblxmc",
			width : 160
		}, 
		{
			header : "附件类型名称",
			dataIndex : "fjlxmc",
			width : 160
		}
		]
	});
	
	// 厂家所生产的设备及附件类型列表
	var sblxGridPanel =  new Ext.grid.GridPanel({
		id : 'sblxGrid',
		title : '厂家生产的设备及附件类型',
		region : 'center',
		border : false,
		rowNumberer : true,
		paging : true,
//		properties : 'guid,sblx,fjlx,sblxmc,fjlxmc',
//		propertiesName : 'guid,sblx,fjlx,设备类型名称,附件类型名称',
		store : SblxGridStore,
		tbar : TypeBar,
		bbar : TypeBBar,
		cm : CM
	});
	
	var mainPanel = new Ext.Panel({
		layout : 'border',
		items:[ GridPanel,sblxGridPanel ]
	});
	
	function loadManufacturerDevType(cjbm){
		if (cjbm && cjbm != "new"){
			sblxGridPanel.store.on('beforeload', function (){
				this.baseParams = {
						'cjbm' : cjbm,
						start : 0,
						limit : 15
				}
			});
			sblxGridPanel.store.load();
		}else if (cjbm == "GridPanel"){
			sblxGridPanel.setTitle('厂家生产的设备及附件类型');
		}
	}

	new Ext.Viewport({
		layout : 'fit',
		items : [mainPanel]
	});
})
	

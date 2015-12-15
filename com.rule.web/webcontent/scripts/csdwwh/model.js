/**
 * 编辑窗口
 * 
 * @class Ext.app.EditWindow
 * @extend Ext.Window
 */ 

Ext.app.EditWindow = Ext.extend(Ext.Window, {

	modal : true,

	resizable : false,

//	padding : "10px 5px 10px 5px",

	buttonAlign : "center",

	appID : undefined,

	clsID : undefined,

	objId : undefined,

	dataSource : undefined,

	validate : function() {
		return true;
	},

	initComponent : function() {

		var win = this;
		this.dataSource = new Ext.ux.BDDataSource({
			appID : this.appID,
			clsID : this.clsID
		});
		// 增加
		if (this.editType == "new") {
			this.dataSource.create();
			this.dataSource.on("aftercreate", function(ds, args) {
				win.addFormPanel();
			});
		}
		// 修改
		if (this.editType == "update") {
			this.dataSource.loadData(this.objId, this.clsID);
			this.dataSource.on("afterload", function(ds, args) {
				win.addFormPanel();
			});
		}
		this.addButtons();
		Ext.app.EditWindow.superclass.initComponent.call(this);
	},

	addButtons : function() {

		var win = this;
		var dataSource = this.dataSource;
		var save = new Ext.Button({
			text : "保存",
			iconCls : "save",
			handler : function() {
				var flag = win.validate();
				if (flag) {
					dataSource.on("aftersave", function() {
						win.close();
						win.getGrid().getStore().reload();
					});
					dataSource.save();
				}
			}
		});
		var close = new Ext.Button({
			text : "返回",
			icon : 'rule/public/images/cancel_2.png',
			handler : function() {
				win.close();
			}
		});
		this.buttons = [ save, close ];
	},

	addFormPanel : function() {

		var formPanel = new Ext.ux.BDForm({
			border : false,
			frame : true,
			dataSource : this.dataSource,
			labelAlign : "right",
			defaults : {
				anchor : "97%"
			},
			items : this.bdforms
		});
		this.add(formPanel);
		this.doLayout();
	}
});

// 城市电网APPID
Ext.appCsdw.appID = "894163C0-63A9-4643-9E4F-048A5E3FAD6D";

// 城市电网CLSID
Ext.appCsdw.clsID = "E2703CE1-484C-4859-88A1-E42C0A748050";

// 城市电网表格按钮
Ext.appCsdw.gridBtn = [ {
	text : "增加",
	iconCls : "add",
	handler : function() {
		if (Ext.util.isNull(Ext.app.currentNodeId)) {
			Ext.Msg.alert("提示信息", "请选择一个部门节点");
			return;
		}
		new Ext.appCsdw.EditWindow({
			width : 500,
			editType : "new"
		}).show();
	}
}, {
	text : "修改",
	iconCls : "edit",
	handler : function() {
		var rows = Ext.app.csdwGrid.getSelectionModel().getSelections();
		if (rows.length == 0) {
			Ext.MessageBox.alert("提示信息", "请选择一条数据!");
			return;
		} else if (rows.length > 1) {
			Ext.MessageBox.alert("提示信息", "只能选择一项进行修改!");
			return;
		}
		new Ext.appCsdw.EditWindow({
			width : 500,
			editType : "update",
			objId : rows[0].get("GUID")
		}).show();
	}
}, {
	text : "删除",
	iconCls : "remove",
	handler : function() {
		var grid = Ext.app.csdwGrid;
		var method = "deleteCsdw.do";
		//调用删除公共方法
		Ext.app.afterDelete(grid,method);
		
/*		var rows = Ext.app.csdwGrid.getSelectionModel().getSelections();
		if (rows.length == 0) {
			Ext.MessageBox.alert("提示信息", "请至少选择一项!");
		} else {
			Ext.MessageBox.confirm("提示信息", "确定删除当前选中项?", function(btn) {
				if (btn === "yes") {
					var guids = new Array();
					Ext.each(rows, function(row) {
						guids.push(row.get("GUID"));
					});
					Ext.Ajax.request({
						url : "rule/csdwwh/deleteCsdw.do",
						method : "post",
						params : {
							guids : guids
						},
						success : function() {
							Ext.MessageBox.alert("提示信息", "操作成功!", function() {
								Ext.app.csdwGrid.getStore().reload();
							});
						},
						failure : function() {
							Ext.MessageBox.alert("提示信息", "操作失败!");
						}
					});
				}
			});
		}*/
	}
} ];

/**
 * 城市电网编辑窗口
 * 
 * @class Ext.appCsdw.EditWindow
 * @extend Ext.Window
 */
Ext.appCsdw.EditWindow = Ext.extend(Ext.app.EditWindow, {

	appID : Ext.appCsdw.appID,

	clsID : Ext.appCsdw.clsID,

	getGrid : function() {
		return Ext.app.csdwGrid;
	},

	initComponent : function() {
		var type = this.editType;
		if (type == "new") {
			this.title = "新建城市电网";
		} else {
			this.title = "城市电网维护";
		}
		this.bdforms = [ {
			fieldLabel : "<font color=\"red\">*</font>城市电网名称",
			columnName : "CSDWMC",
			width : 335,
			labelAlign : "right"
		}, {
			fieldLabel : "<font color=\"red\">*</font>管辖单位",
			columnName : "GLDW",
			width : 335,
			labelAlign : "right",
			listeners : {
				afterrender : function() {
					var f = this;
					if (type == "new") {
						var s = f.getEditor().getStore();
						s.on("load", function() {
							f.setValue(Ext.app.currentNodeId);
						});
						s.load();
					}
				}
			}
		}, {
			id : "BDFORM_ZGDYDJ",
			width : 335,
			fieldLabel : "<font color=\"red\">*</font>最高电压等级",
			columnName : "ZGDYDJ",
			labelAlign : "right",
			listeners : {
				afterrender : function() {
					var f = this;
					if (type == "new") {
						var s = f.getEditor().getStore();
						s.on("load", function() {
							f.setValue("0200210");
						});
						s.load();
					}
				}
			}
		}, {
			fieldLabel : "备注",
			columnName : "BZ",
			width : 335,
			labelAlign : "right"
		} ];
		Ext.appCsdw.EditWindow.superclass.initComponent.call(this);
	}
});

// 配电网区域APPID
Ext.appPdwqy.appID = "A6514A87-746C-4C2B-9928-888EAE709A4C";

// 配电网区域CLSID
Ext.appPdwqy.clsID = "FB21CCD6-2E12-49DC-8981-A3695EFB7D15";

// 配电网区域表格按钮
Ext.appPdwqy.gridBtn = [ "配电网区域", {
	text : "增加",
	iconCls : "add",
	handler : function() {
		if (Ext.util.isNull(Ext.app.currentNodeId)) {
			Ext.Msg.alert("提示信息", "请选择一个部门节点");
			return;
		}
		new Ext.appPdwqy.EditWindow({
			width : 500,
			editType : "new"
		}).show();
	}
}, {
	text : "修改",
	iconCls : "edit",
	handler : function() {
		var rows = Ext.app.pdwqyGrid.getSelectionModel().getSelections();
		if (rows.length == 0) {
			Ext.MessageBox.alert("提示信息", "请选择一条数据!");
			return;
		} else if (rows.length > 1) {
			Ext.MessageBox.alert("提示信息", "只能选择一项进行修改!");
			return;
		}
		new Ext.appPdwqy.EditWindow({
			width : 500,
			editType : "update",
			objId : rows[0].get("GUID")
		}).show();
	}
}, {
	text : "删除",
	iconCls : "remove",
	handler : function() {
		var grid = Ext.app.pdwqyGrid;
		var method = "deletePdwqy.do";
		//调用删除公共方法
		Ext.app.afterDelete(grid,method);
		
/*		var rows = Ext.app.pdwqyGrid.getSelectionModel().getSelections();
		if (rows.length == 0) {
			Ext.MessageBox.alert("提示信息", "请至少选择一项!");
		} else {
			Ext.MessageBox.confirm("提示信息", "确定删除当前选中项?", function(btn) {
				if (btn === "yes") {
					var guids = new Array();
					Ext.each(rows, function(row) {
						guids.push(row.get("GUID"));
					});
					Ext.Ajax.request({
						url : "rule/csdwwh/deletePdwqy.do",
						method : "post",
						params : {
							guids : guids
						},
						success : function() {
							Ext.MessageBox.alert("提示信息", "操作成功!", function() {
								Ext.app.pdwqyGrid.getStore().reload();
							});
						},
						failure : function() {
							Ext.MessageBox.alert("提示信息", "操作失败!");
						}
					});
				}
			});
		}*/
	}
} ];

/**
 * 配电网区域编辑窗口
 * 
 * @class Ext.appPdwqy.EditWindow
 * @extend Ext.Window
 */
Ext.appPdwqy.EditWindow = Ext.extend(Ext.app.EditWindow, {
	
	appID : Ext.appPdwqy.appID,

	clsID : Ext.appPdwqy.clsID,

	getGrid : function() {
		return Ext.app.pdwqyGrid;
	},

	validate : function() {
		
		var xh = Ext.getCmp("BDFORM_XH").getEditor();
		var cspdwmc = Ext.getCmp("BDFORM_CSPDWMC").getEditor();
		
		if (Ext.util.isNull(xh.getValue())) {
			Ext.MessageBox.alert("提示信息", "序号不能为空");
			return false;
		} else {
			// 调用去重方法
			var type = this.editType;// 操作类型
			var v = Ext.app.validateDate(xh.getValue(),
						cspdwmc.getValue(),
						type);
			if (v == false) {
				return false;
			}
		}
		return true;
	},

	initComponent : function() {
		var win = this;
		var type = this.editType;
		if(type == "new"){
			this.title = "新建配电网区域";
		}else {
			this.title = "配电网区域维护";
		}
		
		this.bdforms = [ {
			id : "BDFORM_XH",
			fieldLabel : "<font color=\"red\">*</font>序号",
			columnName : "XH",
			width : 335,
			labelAlign : "right",
			listeners : {
				render : function() {
					this.getEditor().events.change = true;
					this.getEditor().on("change", function(f, n, o) {
						if (!Ext.util.isNull(n)) {
							win.dataSource.setValue("XH", n);
						}
					});
				}
			}
		}, {
			fieldLabel : "<font color=\"red\">*</font>配电网区域名称",
			id : "BDFORM_CSPDWMC",
			columnName : "CSPDWMC",
			width : 335,
			labelAlign : "right"
		}, {
			fieldLabel : "<font color=\"red\">*</font>管辖单位",
			columnName : "GLDW",
			width : 335,
			labelAlign : "right",
			listeners : {
				afterrender : function() {
					var f = this;
					if (type == "new") {
						var s = f.getEditor().getStore();
						s.on("load", function() {
							f.setValue(Ext.app.currentNodeId);
						});
						s.load();
					}
				}
			}
		}, {
			id : "BDFORM_BZ",
			fieldLabel : "备注",
			columnName : "BZ",
			width : 335,
			labelAlign : "right"
		} ];
		Ext.appPdwqy.EditWindow.superclass.initComponent.call(this);
	}
});

// 评价线路APPID
Ext.appPjxl.appID = "D26DD450-6350-4330-9361-358FE5C8451B";

// 评价线路CLSID
Ext.appPjxl.clsID = "5466AF1B-548B-43BF-91A1-C136B38F799C";

// 评价线路表格按钮
Ext.appPjxl.gridBtn = [ "评价线路", {
	text : "增加",
	iconCls : "add",
	handler : function() {
		if (Ext.util.isNull(Ext.app.currentNodeId)) {
			Ext.Msg.alert("提示信息", "请选择一个部门节点");
			return;
		}
		if (Ext.util.isNull(Ext.app.getPdwqyGuid())) {
			Ext.Msg.alert("提示信息", "请选择配电网区域");
			return;
		}
		new Ext.appPjxl.EditWindow({
			width : 950,
			height : 500,
			title : '增加线路'
		}).show();
	}
}, {
	text : "删除",
	iconCls : "remove",
	handler : function() {
		var grid = Ext.app.pjxlGrid;
		var method = "deletePjxl.do";
		//调用删除公共方法
		Ext.app.afterDelete(grid,method);
		
/*		var rows = Ext.app.pjxlGrid.getSelectionModel().getSelections();
		if (rows.length == 0) {
			Ext.MessageBox.alert("提示信息", "请至少选择一项!");
		} else {
			Ext.MessageBox.confirm("提示信息", "确定删除当前选中项?", function(btn) {
				if (btn === "yes") {
					var guids = new Array();
					Ext.each(rows, function(row) {
						guids.push(row.get("GUID"));
					});
					Ext.Ajax.request({
						url : "rule/csdwwh/deletePjxl.do",
						method : "post",
						params : {
							guids : guids
						},
						success : function() {
							Ext.MessageBox.alert("提示信息", "操作成功!", function() {
								Ext.app.pjxlGrid.getStore().reload();
							});
						},
						failure : function() {
							Ext.MessageBox.alert("提示信息", "操作失败!");
						}
					});
				}
			});
		}*/
	}
} ];

/**
 * 评价线路编辑窗口
 * 
 * @class Ext.appPjxl.EditWindow
 * @extend Ext.Window
 */
Ext.appPjxl.EditWindow = Ext.extend(Ext.Window, {

	modal : true,

	resizable : false,
	
	addFormPanel : function(){
		var formPanel = new Ext.form.FormPanel({
			region : 'north',
			frame : true,
			height : 80,
			id : 'formPanel',
			autoScroll : true,
			labelAlign : 'right',
			labelWidth : 80,
			split : true,
			border : false,
			items : [{
				items : [ {
					defaults : {
						layout : 'form'
					},
					layout : 'column',
					bodyStyle: 'text-align:center',
					items : [{
						columnWidth : .3,
						items : [ {
							xtype : 'textfield',
							id : 'xltydwmc',
							anchor : '95%',
							readOnly : true,
							fieldLabel : '运行单位',
							listeners : {
								afterrender : function(cmp) {
									var rows = Ext.app.pdwqyGrid.getSelectionModel()
									.getSelected();
									this.setValue(rows.get('GLDW_DSPVALUE'));
								}
							}
						} ]
					},{
						columnWidth : .3,
						items : [ {
							xtype : 'textfield',
							id : 'xlmc',
							anchor : '95%',
							fieldLabel : '线路名称'
						} ]
					},{
						columnWidth : .3,
						items : [ {
							xtype : 'datefield',
							id : 'xltyrq',
							anchor : '95%',
							format : 'Y-m-d',
							fieldLabel : '投运日期',
							editable : false,
							listeners:{ 
								 'select': function(){ 
									// Ext.getCmp('pgrqz').setMinValue(Ext.getCmp('pgrq').getValue());
								 }
						    } 
						} ]
					}]
				},{
					defaults : {
						layout : 'form'
					},
					layout : 'column',
					bodyStyle: 'text-align:center',
					items : [{
						columnWidth : .3,
						items : [ {
							xtype : 'combo',
							id : 'xlyxzt',
							anchor : '95%',
							mode : 'local',
							editable : false,
							store : new Ext.data.SimpleStore({
								fields : ['value','text'],
								data : [
											['','\u3000'],
											['31501','在运'],
											['31502','未投运'],
											['31503','退运'],
											['31504','现场留用'],
											['31505','库存留用']
								       ]
							}),
							fieldLabel : '运行状态',
							displayField : 'text',
							triggerAction : 'all',
							hiddenName : 'pgztjg_id',
							valueField : 'value'
						} ]
					},{
						columnWidth : .3,
						items : [ {
							xtype : 'textfield',
							id : 'xlqszd',
							anchor : '95%',
							fieldLabel : '起始站点'
						} ]
					}, {
						columnWidth : .3,
						items : [ {
							xtype : 'combo',
							id : 'xllb',
							anchor : '95%',
							mode : 'local',
							editable : false,
							store : new Ext.data.SimpleStore({
								fields : ['value','text'],
								data : [
											['','\u3000'],
											['01','架空线路'],
											['02','电缆线路']
								       ]
							}),
							fieldLabel : '线路类别',
							displayField : 'text',
							triggerAction : 'all',
							hiddenName : 'pgztjg_id',
							valueField : 'value'
						} ]
					}]
				}]
			}]
	    });
		this.add(formPanel);
		this.doLayout();
	},
	
	addGrid : function() {
		//获得当前编辑窗口
		var win = this;
		var tbar = ['-',{
			xtype:'button',
			tooltip:'查询',
			id:'search',
			iconCls:'search',
			text:'查询',
			handler:function(){
				xlPanel.store.reload();
			}
		},'-',{
			xtype:'button',
			tooltip:'确认',
			id:'add2',
			iconCls:'Accept',
			text:'确认',
			handler:function(){
				//线路窗口数据
				var record=xlPanel.getSelectionModel().getSelected();
				var selRows = xlPanel.getSelectionModel().getSelections();
				//获取配电网区域选择行
				var pdwqyRecord = Ext.app.pdwqyGrid.getSelectionModel().getSelected();
				var pdwqy = pdwqyRecord.get('GLDW');
				var pdwqyGuid = pdwqyRecord.get('GUID');
				
				if(Ext.isEmpty(record)){
					Ext.Msg.alert('系统提示','请选择一条记录!');
					return false;
				}
				Ext.Msg.confirm('提示','确定要增加！',function(btn){
					if(btn=='no'){
						xlPanel.store.reload();
						return;
					}else{
						var guids = '';
						for(var i=0; i < selRows.length; i++){
							guids = guids + selRows[i].get('guid') + ",";
						}
						guids = guids.substring(0,guids.length - 1);
	    				Ext.Ajax.request({
	    					url:'rule/csdwwh/savePjxl.do',
	    					params : {
	    						'xlguid' : guids,
	    						'csqy' : pdwqy,
    							'pdwqyGuid' : pdwqyGuid	// 用于保存在配网库中--对应区域id
    						},
	    					method : 'post',
	    					success : function(response,options){
	    						var text = Ext.util.JSON.decode(response.responseText);
	    						if(text.info == 'success'){
	    							Ext.Msg.alert('提示','增加成功!',function(){
	    								//关闭当前窗口并刷新线路表单
	    								win.close();
	    								Ext.app.pjxlGrid.getStore().reload();
	    							});
	    						}
	    						//刷新增加线路数据
	    						xlPanel.store.reload();
	    					}
	    				});
					}
				});
			}
		}];

	var store = new Ext.data.Store({
		autoLoad : false,
		url : "rule/csdwwh/getXlGrid.do",
		method : 'post',
		reader : new Ext.data.JsonReader({
			root : "list",
			totalProperty : "size",
			fields : [ {
				name : "guid",
				mapping : "0"
			}, {
				name : "xlmc",
				mapping : "1"
			}, {
				name : "yxdw",
				mapping : "2"
			}, {
				name : "yxzt",
				mapping : "3"
			}, {
				name : "tyrq",
				mapping : "4"
			}, {
				name : "qszd",
				mapping : "5"
			}, {
				name : "sbzyx",
				mapping : "6"
			}, {
				name : "xllb",
				mapping : "7"
			}, {
				name : "xlzcd",
				mapping : "8"
			} ]
		})
	
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var bbar = new Ext.PagingToolbar({
		pageSize : 15,
		store : store,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条记录,一共{2}条',
		emptyMsg : '无数据'
	});
	
	//增加线路表单
	var xlPanel = new Ext.grid.GridPanel({
		region : 'center',
		height : 390,
		sm : sm,
		store : store,
		bbar : bbar,
		cm : new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(),sm,{
				header : "guid",
				dataIndex : "guid",
				hidden : true
			},{
				header : '线路名称',
				dataIndex : 'xlmc'
			},{
				header : '运行单位',
				width : 140,
				dataIndex : 'yxdw'
			},{
				header : '运行状态',
				dataIndex : 'yxzt'
			},{
				header : '投运日期',
				dataIndex : 'tyrq'
			},{
				header : '起始站点',
				dataIndex : 'qszd'
			},{
				header : '设备重要性',
				dataIndex : 'sbzyx'
			},{
				header : '线路类别',
				dataIndex : 'xllb'
			},{
				header : '线路总长度',
				dataIndex : 'xlzcd'
			}]
		}),
		tbar: tbar
	});
	xlPanel.store.on('beforeload', function(){
		var record = Ext.app.pdwqyGrid.getSelectionModel().getSelected();
		var pdwqy= record.get('GLDW');
		var pdwqyGuid= record.get('GUID');
		this.baseParams = {
				'xltydwmc' : Ext.getCmp('xltydwmc').getValue(),	//运行单位
				'xlmc' : Ext.getCmp('xlmc').getValue(),		//线路名称
				'xltyrq' : Ext.getCmp('xltyrq').getValue(),	//投运日期
				'xlyxzt' : Ext.getCmp('xlyxzt').getValue(),	//运行状态
				'xlqszd' : Ext.getCmp('xlqszd').getValue(),	//起始站点
				'xllb' : Ext.getCmp('xllb').getValue(),	//线路类别
				'csqy' : pdwqy,
				'pdwqyGuid' : pdwqyGuid,	//过滤掉已经增加过的数据
				'limit' : 15,
				'start' : 0
		};
	});
	
	this.add(xlPanel);
	this.doLayout();
},
	initComponent : function() {
		
		Ext.appPjxl.EditWindow.superclass.initComponent.call(this);
		this.addFormPanel();
		this.addGrid();
	
	}
});

// 当前用户
Ext.app.user = new Ext.util.UserModel();

// 当前选中节点id
Ext.app.currentNodeId = null;

// 当前选中节点是否是根节点
Ext.app.currentNodeIsRoot = false;

// 当前选择配电网区域GUID
Ext.app.pdwqyGuid = null;

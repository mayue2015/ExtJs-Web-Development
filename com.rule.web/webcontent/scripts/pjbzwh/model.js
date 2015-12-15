// 应用 ID
Ext.app.appID = "9EC6DCA4-5677-4BEE-B8ED-A63B8A32330C";

// 类型 ID
Ext.app.clsID = "6BE021C7-277C-453E-A3C6-7DF6A556D90E";

// 查询条件表单
Ext.app.queryItems = [ {
	layout : 'column',
	hideLabels : true,
	region : 'center',
	defaults : {
		labelAlign : "right"
	},
	items : [ {
		columnWidth : .25,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'textfield',
			fieldLabel : '序号',
			name : 'XH',
			width : 180,
			operate : new Bp.query.Like({
				target : "XH"
			})
		} ]
	}, {
		columnWidth : .25,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'textfield',
			fieldLabel : '评价项目',
			name : 'PJXMMC',
			width : 180,
			operate : new Bp.query.Like({
				target : "PJXMMC"
			})
		} ]
	}, {
		columnWidth : .25,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'textfield',
			fieldLabel : '父级项目',
			name : 'PJXMMC',
			width : 180,
			operate : new Bp.query.Like({
				target : "PJXMMC"
			})
		} ]
	} ]

} ];

/**
 * 评价标准维护编辑窗口,新增、修改时根据type参数区分
 * 
 * @class Ext.app.EditWindow
 * @extend Ext.Window
 */
Ext.app.EditWindow = Ext.extend(Ext.Window, {
	border : false,
	modal : true,
//	padding : 10,
	/**
	 * 对象私有数据仓库,函数内部调用
	 * 
	 * @private
	 * @type {Ext.ux.BDDataSource}
	 */
	dataSource : undefined,
	/**
	 * 向窗口添加按钮
	 */
	addButtons : function() {
		var win = this;
		var saveBtn = new Ext.Button({
			text : "保存",
			iconCls : "save",
			handler : function() {
				if(leftTree && leftTree.getSelectionModel().selNode){
					var selNode = leftTree.getSelectionModel().selNode;
					var nodeId = selNode.id;
					win.dataSource.setValue("FPJXMID", Ext.app.nodeId);
				}
			
				var xh = win.dataSource.data.XH;
				var bzf = win.dataSource.data.BZF;
				var zbbm = win.dataSource.data.ZBBM;
				var ztlbm = win.dataSource.data.ZTLBM;
				
				var reg = new RegExp("^[0-9]*$");
				var regXh = new RegExp("([-\\+]?[1-9]([0-9]*)(\\.[0-9]+)?)|(^0$)");
				
				if(xh != undefined){
					if(xh != "" && (!regXh.test(xh))){
						Ext.MessageBox.alert("提示信息","序号只能由1-9数字或和小数点组合组成！");
						return;
					}
				}
				
				if (Ext.util.isNull(Ext.getCmp("bzf_id").getEditor().getValue())) {
					Ext.MessageBox.alert("系统提示","标准分不能为空!");
					return;
				}
				
				if(Ext.app.type == "new"){
					if(bzf != undefined){
						if(bzf != "" && (!reg.test(bzf))){
							setTimeout(function(){
								Ext.MessageBox.alert("系统提示","标准分只能输入数字!");
								return;
							},1);
						}
					}
				}
				if(Ext.app.type == "update"){
					if(bzf != "" && (!reg.test(bzf))){
						setTimeout(function(){
							Ext.MessageBox.alert("系统提示","标准分只能输入数字!");
							return;
						},1);
					}
				}
				
				if(zbbm != undefined){
					if(zbbm != "" && (!reg.test(zbbm))){
						Ext.MessageBox.alert("提示信息","指标编码只能输入数字!");
						return;
					}
				}
				
				if(ztlbm != undefined){
					if(ztlbm != "" && (!reg.test(ztlbm))){
						Ext.MessageBox.alert("提示信息","状态量编码只能输入数字!");
						return;
					}
				}
				
				var v = Ext.app.validateXmlx(selNode,win);
				if(v == false){
					return v;
				}			
				var isSave = win.dataSource.save();
				if(Ext.util.isNull(isSave)){
					win.close();
					Ext.app.lefttree.getRootNode().reload();
					win.winArgs.grid.store.reload();
				}
			}
		});
		var returnBtn = new Ext.Button({
			text : "返回",
			icon : 'rule/public/images/cancel_2.png',
			handler : function() {
				win.close();
			}
		});
		this.buttonAlign = "center";
		this.buttons = [ saveBtn, returnBtn ];
	},

	/**
	 * 向窗口添加表单组件
	 */
	addFormPanel : function() {
		var dataSource = this.dataSource;
		var hidden = this.winArgs.type == "update" ? true : false;
		var FJXM = new Ext.ux.BDField({
			id : 'fpjxmid',
			dataSource : dataSource,
			readOnly : true,
			columnName : "FPJXMID",
			fieldLabel : "父级项目",
			width : 443,
			hidden : hidden,
			value : this.winArgs.nodeText
		});
		var XH = new Ext.ux.BDField({
			id : 'xh_id',
			dataSource : dataSource,
			columnName : "XH",
			fieldLabel : "<font color=red>*</font>序号"
		});
		var PJXMMC = new Ext.ux.BDField({
			id : 'pjxm_id',
			dataSource : dataSource,
			columnName : "PJXMMC",
			fieldLabel : "<font color=red>*</font>评价项目"
		});
		var PJXMLX = new Ext.ux.BDField({
			id : 'bd_pjxmlx',
			dataSource : dataSource,
			columnName : "PJXMLX",
			fieldLabel : "<font color=red>*</font>项目类型"
		});
		var BZF = new Ext.ux.BDField({
			id : 'bzf_id',
			dataSource : dataSource,
			columnName : "BZF",
			fieldLabel : "<font color=red>*</font>标准分",
			listeners : {
				render : function() {
					this.getEditor().events.change = true;
					this.getEditor().on("change", function(f, n, o) {
						if (!Ext.util.isNull(n)) {
							dataSource.setValue("BZF", n);
						}
					});
				}
			}
		});
		var SFZL = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "SFZL",
			fieldLabel : "是否总览",
			listeners : {// 设置监听进行初始值的设置
				afterrender : function() {
					if (Ext.app.type == "new") {
						var sfzl = this;
						var s = this.editor.getStore();
						s.on("load", function() {
							sfzl.setValue("T");
						});
						s.load();
					}
				}
			}
		});
		var SFMX = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "SFMX",
			fieldLabel : "是否明细",
			listeners : {
				afterrender : function() {
					if (Ext.app.type == "new") {
						var sfmx = this;
						var s = this.editor.getStore();
						s.on("load", function() {
							sfmx.setValue("T");
						});
						s.load();
					}
				}
			}
		});
		var PJXMQC = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "PJXMQC",
			fieldLabel : "项目全称"
		});
		var ZY = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "ZY",
			fieldLabel : "所属专业",
			listeners : {
				afterrender : function() {
					if (Ext.app.type == "new") {
						var zy = this;
						var s = this.editor.getStore();
						s.on("load", function() {
							zy.setValue("1700301");
						});
						s.load();
					}
				}
			}
		});
		var ZBBM = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "ZBBM",
			fieldLabel : "指标编码"
		});
		var ZTLBM = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "ZTLBM",
			fieldLabel : "状态量编码"
		});
		var PFBZ = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "PFBZ",
			fieldLabel : "评分标准"
		});
		var CPBF = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "CPBF",
			fieldLabel : "查证办法"
		});
		var PJFF = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "PJFF",
			fieldLabel : "评价方法"
		});
		var BZ = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "BZ",
			fieldLabel : "备注"
		});
		var formPanel = new Ext.ux.BDForm({
			border : false,
			frame : true,
			dataSource : dataSource,
			defaults : {
				border : false,
				layout : "column",
				defaults : {
					border : false,
					layout : "form"
				}
			},
			labelAlign : "right",
			labelWidth : 80,
			items : [ {
				items : [ {
					columnWidth : 1,
					items : [ FJXM ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ XH ]
				}, {
					columnWidth : 0.5,
					items : [ PJXMMC ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ PJXMLX ]
				}, {
					columnWidth : 0.5,
					items : [ BZF ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ SFZL ]
				}, {
					columnWidth : 0.5,
					items : [ SFMX ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ PJXMQC ]
				}, {
					columnWidth : 0.5,
					items : [ ZY ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ ZBBM ]
				}, {
					columnWidth : 0.5,
					items : [ ZTLBM ]
				} ]
			}, {
				items : [ {
					columnWidth : 1,
					items : [ PFBZ ]
				} ]
			}, {
				items : [ {
					columnWidth : 1,
					items : [ CPBF ]
				} ]
			}, {
				items : [ {
					columnWidth : 1,
					items : [ PJFF ]
				} ]
			}, {
				items : [ {
					columnWidth : 1,
					items : [ BZ ]
				} ]
			} ]
		});
		this.add(formPanel);
		this.doLayout();
	},

	/**
	 * 组件初始化
	 */
	initComponent : function() {
		var win = this;
		var winArgs = this.winArgs;
		type = winArgs.type;
		appID = winArgs.appID;
		clsID = winArgs.clsID;
		objID = winArgs.objID;
		var dataSource = new Ext.ux.BDDataSource({
			appID : appID,
			clsID : clsID
		});
		this.dataSource = dataSource;
		
		//type设为全局变量
		Ext.app.type = type;
		// 增加
		if (type == "new") {
			dataSource.create();
			dataSource.on("aftercreate", function(g, p) {
				// BDForm,BDField组件依赖dataSource,所以等待dataSource创建完成,再创建表单
				win.addFormPanel();
			});
		}
		// 修改
		if (type == "update") {
			dataSource.loadData(objID, clsID);
			dataSource.on("afterload", function(g, p) {
				win.addFormPanel();
			});
		}
		this.addButtons();
		Ext.app.EditWindow.superclass.initComponent.call(this);
	}
});

/**
 * 数据表格工具条按钮
 */
Ext.app.gridBtn = [ {
	text : '查询',
	iconCls : 'search',
	tooltip : '查询',
	handler : function() {
		Ext.app.queryClick();
	}
}, {
	text : "增加",
	iconCls : "add",
	tooltip : '增加',
	handler : function() {
		Ext.app.addClick();
	}
}, {
	text : '修改',
	iconCls : 'edit',
	tooltip : '修改',
	handler : function() {
		Ext.app.xgClick();
	}
}, {
	iconCls : 'remove',
	text : '删除',
	tooltip : '删除',
	handler : function() {
		Ext.app.removeClick();
	}
}, {
	text : '重置查询条件',
	icon : 'rule/public/images/eraser.png',
	tooltip : '重置查询条件',
	handler : function() {
		Ext.app.restClick();
	}
} ];


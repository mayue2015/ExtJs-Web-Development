//工程任务：应用ID
Ext.app.appID = "3C072DD1-7D52-4870-9819-0A529BA53054";

//工程任务：类型ID
Ext.app.clsID = "269B0C20-2FEF-4666-8E60-8BC86AAE3D01-00007";

Ext.app.EditWindow = Ext.extend(Ext.Window, {
	border : false,
	modal : true,
	dataSource : undefined,
	/**
	 * 向窗口添加按钮
	 */
	addButtons : function() {
		var win = this;
		var saveBtn = new Ext.Button({
			text : "保存",
			iconCls : "save",
			width : 65,
			handler : function() {
				win.dataSource.on("aftersave", function() {
					win.close();
					win.winArgs.grid.store.reload();
				});
				var guid = win.dataSource.data.GUID == undefined?'':win.dataSource.data.GUID;
				var now_in_use = win.dataSource.data.IN_USE;
				Ext.Ajax.request({
					url : 'pmv/engineeringTaskAction/getVersionId.do',
					method : 'post',
					async : false,
					params : {
						type : type,
						in_use : now_in_use,
						guid : guid
					},
					success : function(response, opts) {
						var responseArray = Ext.util.JSON.decode(response.responseText);
						if (responseArray.isCanSave=='false') {
							Ext.Msg.alert('系统提示','已存在一个处于使用状态的工程，请核实！')
							return;
						}
						if (type=='new') {
							win.dataSource.setValue("VERSIONID", Number(responseArray.versionId));
						}
						win.dataSource.save();
						
						if(now_in_use == '1'){// 重新设置任务session
							Ext.Ajax.request({
								url : 'planning/taskController/getCurrentTask.do',
								method : 'post',
							    success : function(response,options) {
							    }
						    });
						}
					},
					failure : function(response, opts) {
						return false;
					}
				});
			}
		});
		
		var returnBtn = new Ext.Button({
			text : "取消",
			icon : 'pmv/icons/cancel_2.png',
			width : 65,
			handler : function() {
				win.close();
			}
		});
		
		this.buttonAlign = "right";
		this.buttons = [ saveBtn, returnBtn ];
	},
	/**
	 * 向窗口添加表单组件
	 */
	addFormPanel : function() {
		var grid = Ext.getCmp('dataGrid');
		var record = grid.getSelectionModel().getSelected();
		var dataSource = this.dataSource;
		var hidden = this.winArgs.type == "update" ? true : false;
		if (!hidden) {
			dataSource.setValue("CREATEUSER", user_name);
			dataSource.setValue("CREATETIME", new Date());
			dataSource.setValue("IN_USE", '0');//新增时默认否
			dataSource.setValue("IN_USE_DSPVALUE", '否');//新增时默认否
			dataSource.setValue("SYS_DEPT_CODE", deptguid);
			dataSource.setValue("SYS_DEPT_CODE_DSPVALUE", dept_name);
		}
		//任务名称
		var TASK_NAME = new Ext.ux.BDField({
			id : 'TASK_NAME',
			fieldLabel : "任务名称",
			dataSource : dataSource,
			columnName : "TASK_NAME"
		});
		
		//创建人
		var CREATEUSER = new Ext.ux.BDField({
			id : 'CREATEUSER',
			fieldLabel : "创建人",
			dataSource : dataSource,
			columnName : "CREATEUSER"
		});
		
		//所属单位
		var SYS_DEPT_CODE = new Ext.ux.BDField({
			 id : 'SYS_DEPT_CODE',
			 fieldLabel : '所属单位',
			 dataSource : dataSource,
			 columnName : "SYS_DEPT_CODE"
		 });
		

		//创建时间
		var CREATETIME = new Ext.ux.BDField({
			 id : 'CREATETIME',
			 fieldLabel : '创建时间',
			 dataSource : dataSource,
			 columnName : "CREATETIME"
		});
		
		
		//使用状态
		var IN_USE = new Ext.ux.BDField({
			id : 'IN_USE',
			fieldLabel : "使用状态",
			dataSource : dataSource,
			columnName : "IN_USE"
		});

		
		var formPanel = new Ext.ux.BDForm({
			border : false,
			frame : true,
			height : 250,
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
			labelWidth : 90,
			items : [{
						height : 12
					},{  
						items : [ {
							columnWidth : 1,
							items : [ TASK_NAME ]
						} ]
					},{  
						items : [ {
							columnWidth : 1,
							items : [ CREATEUSER ]
						} ]
					},{
						items : [ {
							columnWidth : 1,
							items : [ SYS_DEPT_CODE ]
						}]
					},{
						items : [ {
							columnWidth : 1,
							items : [ CREATETIME ]
						} ]
					},{
						items : [ {
							columnWidth : 1,
							items : [ IN_USE ]
						} ]
					}
			]
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
		// 增加
		if (type == "new") {
			dataSource.on("aftercreate", function(g, p) {
				win.addFormPanel();		
			});
			dataSource.create();
		}
		// 修改
		if (type == "update") {
			dataSource.on("afterload", function(g, p) {
				win.addFormPanel();				
			});
			dataSource.loadData(objID, clsID);
		}
		this.addButtons();
		Ext.app.EditWindow.superclass.initComponent.call(this);
	}	
});
Ext.onReady(function() {
	//命名空间
	Ext.ns("Ext.app");
	
	//中压线路型号单位造价库：应用ID
	Ext.app.appID = "744522E1-6C4E-4577-A7C3-E790C92D9638";

	//中压线路型号单位造价库：类型ID
	Ext.app.clsID = "8BEA3542-EAE7-409E-9A13-B109B9DCC30D";
	
	/**
	 * 确定按钮事件
	 * */
	var okButton = new Ext.Button({
		text : '确定',
		iconCls : 'accept',
		tooltip : '确定',
		listeners : {
			click : function() {
				var record = datagrid.getSelectionModel().getSelections();
				if (record.length != 1) {
					Ext.Msg.alert('系统提示', '请选择一行数据!');
					return;
				};

				var ratedkva_1 = record[0].data["RATEDKVA_1"];//容量
				var cost_building = record[0].data["COST_BUILDING"];//建筑工程费
				var cost_equipment = record[0].data["COST_EQUIPMENT"];//设备购置费
				var cost_install = record[0].data["COST_INSTALL"];//安装工程费
				var cost_others = record[0].data["COST_OTHERS"];//其他费用
				var cost_static = record[0].data["COST_STATIC"];//静态投资
				var cost_dynamic = record[0].data["COST_DYNAMIC"];//动态投资
				var svc_model = record[0].data["SVC_MODEL"];//
				var guid = record[0].data["GUID"];//
				
				window.returnValue = {
						ratedkva_1 : ratedkva_1,
						cost_building : cost_building,
						cost_equipment : cost_equipment,
						cost_install : cost_install,
						cost_others : cost_others,
						cost_static : cost_static,
						cost_dynamic : cost_dynamic,
						svc_model : svc_model,
						guid : guid
				};  
				window.close();
			}
		}
	});
	
	/**
	 * 取消按钮事件
	 * */
	var cancleButton = new Ext.Button({
		text : '取消',
		icon : 'pmv/icons/cancel_2.png',
		tooltip : '取消',
		listeners : {
			click : function() {
				window.close();
			}
		}
	});
	
	/**
	 * 中压线路型号单位造价库-表格数据展示
	 * */
	var datagrid = new Ext.ux.BDGrid({
		region : "center",
		detailView : false,
		listeners : {
			afterrender : function(grid) {
				for(var i=0; i < 13; i++){
					this.getTopToolbar().items.items[i].hide();
				}
				
				this.getTopToolbar().add(okButton,'-',cancleButton);
				this.getTopToolbar().add('->','单位：万元/台');
				
				this.loadData(Ext.app.appID, Ext.app.clsID);
			},
			beforeedit : function(arg) {
			    return false;
			}
		}
	});

	/**
	 * 页面显示
	 * */
	var viewport = new Ext.Viewport({
		layout : "border",
		border : "center",
		items : [ datagrid ]
	});
});

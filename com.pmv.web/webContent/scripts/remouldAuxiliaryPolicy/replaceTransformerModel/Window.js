Ext.onReady(function() {
	//命名空间
	Ext.ns("Ext.app");
	
	//变压器型号单位造价库：应用ID
	Ext.app.appID = "BE7499FA-93BB-462E-88B8-A3114E27A127";

	//变压器型号单位造价库：类型ID
	Ext.app.clsID = "76F61444-F485-415C-84E6-1D2C2AAC5172";
	
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
				if (record.length == 0) {
					Ext.Msg.alert('系统提示', '请至少选择一行数据!');
					return;
				};
				var guid = record[0].data["GUID"];
				var h_ratedmva = record[0].data["H_RATEDMVA"];//额定容量
				var cost_building = record[0].data["COST_BUILDING"];//建筑工程费
				var cost_equipment = record[0].data["COST_EQUIPMENT"];//设备购置费
				var cost_install = record[0].data["COST_INSTALL"];//安装工程费
				var cost_others = record[0].data["COST_OTHERS"];//其他费用
				var cost_static = record[0].data["COST_STATIC"];//静态投资
				var cost_dynamic = record[0].data["COST_DYNAMIC"];//动态投资
				
				window.returnValue = {
						guid : guid,
						h_ratedmva : h_ratedmva,
						cost_building : cost_building,
						cost_equipment : cost_equipment,
						cost_install : cost_install,
						cost_others : cost_others,
						cost_static : cost_static,
						cost_dynamic : cost_dynamic
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
	 * 变压器型号单位造价库-表格数据展示
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
				this.getTopToolbar().add('->','单位：kVA,万元/台');
				
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

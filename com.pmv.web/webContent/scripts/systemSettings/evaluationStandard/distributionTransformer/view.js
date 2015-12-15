/**
 * 配变评价标准-表格数据展示
 * */
var datagrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function(grid) {
			for(var i=8; i < 11; i+=2){
				this.getTopToolbar().items.items[i].hide();
			}
			this.getTopToolbar().items.items[9].hide();
			this.getTopToolbar().items.items[11].hide();
			
			this.setDefaultValues({
				'SYS_DEPT_CODE' : deptguid,
				'SYS_DEPT_CODE_DSPVALUE' : dept_name
			});
			
			this.loadData(Ext.app.appID, Ext.app.clsID);
		},
		//编辑前， 设置二级指标下拉框条件
		beforeedit : function(arg) {
			//获得到选择字段
			var v = arg.field;
			//二级指标
			if(v == "STA_L_SECOND"){
				var record = arg.record;
				if (record == undefined)
					return;
				var firstCol = record.get('STA_L_FIRST');
				arg.fieldEditor.setFilter(" LABEL_CODE = '" + firstCol  + "'");
			}
		},
		aftersave : function(){
			datagrid.store.reload();
		},
		afterdelete : function(){
			datagrid.store.reload();
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
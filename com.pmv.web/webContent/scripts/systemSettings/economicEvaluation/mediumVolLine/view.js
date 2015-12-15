/**
 * 中压线路型号单位造价库-表格数据展示
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
			this.getTopToolbar().add('->');
			this.getTopToolbar().add('单位：mm2,万元/km');
			
			this.setDefaultValues({
				'SYS_DEPT_CODE' : deptguid,
				'SYS_DEPT_CODE_DSPVALUE' : dept_name
			});
			
			this.loadData(Ext.app.appID, Ext.app.clsID);
		},
		beforeedit : function(arg) {
			var field = arg.field;
			if(field == "CONDUCTOR_TYPE"){
				arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
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
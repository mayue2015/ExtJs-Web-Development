/**
 * 线路无功单位造价库-表格数据展示
 * */
var datagrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function(grid) {
			for(var i=8; i < 13; i+=2){
				this.getTopToolbar().items.items[i].hide();
			}
			this.getTopToolbar().items.items[9].hide();
			this.getTopToolbar().items.items[11].hide();
			this.getTopToolbar().add('->');
			this.getTopToolbar().add('单位：万元/台');
			this.setDefaultValues({
				'SYS_DEPT_CODE' : deptguid
			});
			
			this.loadData(Ext.app.appID, Ext.app.clsID);
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
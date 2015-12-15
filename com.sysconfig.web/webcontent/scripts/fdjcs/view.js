Ext.app.code=[];
/**
 * 数据表格
 */
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			// 移除多余按钮
			Ext.app.addRemoveToolbar(this);
			// 增加按钮
			Ext.each(Ext.app.gridBtn, function(btn) {
				dataGrid.getTopToolbar().add(btn);
				dataGrid.getTopToolbar().add("-");
			});
			// 设置默认值
			Ext.app.setDefaultValue();
			// 加载数据
			var sql = "DEPT_CODE='"+deptguid+"'";
			this.loadData(Ext.app.appID, Ext.app.clsID,"","",sql);
		},
		beforeedit : function(arg){
			var field = arg.field;
			//机端电压
			if(field == "MACHINE_SIDE_VOLT"){
				arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
			}
		},
		aftersave : function() {
			this.getStore().reload();
		},
		afterdelete : function() {
			this.getStore().reload();
		}
	}
});
Ext.app.dataGrid = dataGrid;

var p = new Ext.Viewport({
	layout : "border",
	region : "center",
	defaults : {
		border : false
	},
	items : [ dataGrid ]
});
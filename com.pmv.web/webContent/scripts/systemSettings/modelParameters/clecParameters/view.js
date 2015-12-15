// 页面表格
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			for (var i = 9; i < 13; i++) {
				this.getTopToolbar().items.items[i].hide();
			};
//			Ext.each(Ext.app.gridBtn, function(btn) {
//				dataGrid.getTopToolbar().add(btn);
//				dataGrid.getTopToolbar().add("-");
//			});
			//设置默认值
			Ext.app.setDefaultValue();
			//加载数据表格
			var sql = "DEPT_CODE='"+deptguid+"'";
			this.loadData(Ext.app.appID, Ext.app.clsID,"","",sql);
		},
		beforeedit : function(arg) {
			var field = arg.field;
			// 截面积
			if(field == "CONDUCTOR_TYPE"){
				var type = arg.value;
				if(type != ''){
					var s = /[0-9]+(?=[^0-9]*$)/.exec(type);
					arg.record.set('SECTIONAL',s[0]);
				}else {
					arg.record.set('SECTIONAL','');
				}
			}
		},
		beforesave : function(a, data) {
//			if(this.activeEditor != null) {// 未失去焦点点击保存
//                this.activeEditor.completeEdit();
//            }
//			return Ext.app.checkData(data);
		},
		aftersave : function() {
			this.getStore().reload();
		},
		afterdelete : function() {
			this.getStore().reload();
		}
	}
});

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [ dataGrid ]
});
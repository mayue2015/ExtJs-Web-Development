// 页面表格
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			for (var i = 9; i < 13; i++) {
				this.getTopToolbar().items.items[i].hide();
			};
			Ext.each(Ext.app.gridBtn, function(btn) {
				dataGrid.getTopToolbar().add(btn);
				dataGrid.getTopToolbar().add("-");
			});
			//设置默认值
			Ext.app.setDefaultValue();
			//加载数据表格
			var sql = "DEPT_CODE='"+deptguid+"'";
			this.loadData(Ext.app.appID, Ext.app.clsID,"","",sql);
		},
		beforeedit : function(arg) {
			var field = arg.field;
			//高压测电压等级
			if(field == "H_VOLTAGELEVEL"){
				arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
			}
			//中压测电压等级
			if(field == "M_VOLTAGELEVEL"){
				var h_voltagelevel = arg.record.get('H_VOLTAGELEVEL');
				if(h_voltagelevel){
					var h_vol = parseFloat(h_voltagelevel);
					arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "' AND TO_NUMBER(ID) > '"+ h_vol +"'");
				}else{
					arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
				}
			}
			//低压测电压等级
			//第四测电压等级
			if(field == "L_VOLTAGELEVEL" || field == "F_VOLTAGELEVEL"){
				//获得高压测编码值
				var h_voltagelevel = arg.record.get('H_VOLTAGELEVEL');
				//获得中压测编码值
				var m_voltagelevel = arg.record.get('M_VOLTAGELEVEL');
				if(m_voltagelevel){
					var m_vol = parseFloat(m_voltagelevel);
					arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "' AND TO_NUMBER(ID) > '"+ m_vol +"'");
				}else{
					if(h_voltagelevel){
						var h_vol = parseFloat(h_voltagelevel);
						arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "' AND TO_NUMBER(ID) > '"+ h_vol +"'");
					}else{
						arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
					}
				}
			}
		},
		beforesave : function(a, data) {
			if(this.activeEditor != null) {// 未失去焦点点击保存
                this.activeEditor.completeEdit();
            }
			return Ext.app.checkData(data);
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
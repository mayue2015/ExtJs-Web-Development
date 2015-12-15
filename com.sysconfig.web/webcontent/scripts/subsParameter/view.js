var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			for (var i = 9; i < 13; i++) {
				this.getTopToolbar().items.items[i].hide();
			}
			;
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
		//编辑前， 设置电压等级下拉框值（高->中->低）
		beforeedit : function(arg) {
			//获得到选择字段
			var v = arg.field;
			//高压测电压等级
			if(v == "H_VOLTAGELEVEL"){
				arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
			}
			//中压测电压等级
			if(v == 'M_VOLTAGELEVEL'){
				//获得高等电压值
				var h_volt = arg.record.get('H_VOLTAGELEVEL');
				if(h_volt){
					var h = parseFloat(h_volt);
//					arg.fieldEditor.setFilter(" to_number(CODE) > " + h + "");
					arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "' AND TO_NUMBER(ID) > '"+ h +"'");
				}else{
					arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
				}
			}
			//低压测电压等级
			if(v == 'L_VOLTAGELEVEL') {
				//获得高压测编码值
				var h_voltagelevel = arg.record.get('H_VOLTAGELEVEL');
				//获得中等电压值
				var m_volt = arg.record.get('M_VOLTAGELEVEL');
				if(m_volt){
					var m = parseFloat(m_volt);
//					arg.fieldEditor.setFilter(" to_number(CODE) > " + m + "");
					arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "' AND TO_NUMBER(ID) > '"+ m +"'");
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
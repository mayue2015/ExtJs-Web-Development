/**
 * 中压线路型号单位造价库-表格数据展示
 */
var isSave = false;
var datagrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	saveData : function() {
		this.plugins[0].saveData(this);
	},
	listeners : {
		afterrender : function(grid) {
			for (var i = 8; i < 13; i += 2) {
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
		beforesave : function(a, b) {
			if (!isSave) {
				Ext.app.defaultDayCount = 0;
				if (b.adddata.length != 0) {
					for (var j = 0; j < b.adddata.length; j++) {
						if (b.adddata[j].D_DEFAULT == 1) {
							Ext.app.defaultDayCount++;
						}
						var typDate = b.adddata[j].D_TYP_DATE;
						// 新增：检查新增页面数据中是否有重复
						for (var n = j + 1; n < b.adddata.length; n++) {
							if (typDate == b.adddata[n].D_TYP_DATE) {
								Ext.MessageBox.alert('系统提示', '典型日重复，请您重新输入!');
								return false;
							}
						}
					}
				}
				if (b.edtdata.length != 0) { // 修改类型名称时
					for (var j = 0; j < b.edtdata.length; j++) {
						if (b.edtdata[j].D_DEFAULT != undefined
								&& b.edtdata[j].D_DEFAULT == 1) {
							Ext.app.defaultDayCount++;
						}
						var typDate = b.edtdata[j].D_TYP_DATE;
						// 修改：检查修改页面数据中是否有重复
						for (var n = j + 1; n < b.edtdata.length; n++) {
							if (typDate != undefined
									&& b.edtdata[n].D_TYP_DATE != undefined) {
								if (typDate == b.edtdata[n].D_TYP_DATE) {
									Ext.MessageBox
											.alert('系统提示', '典型日重复，请重新修改!');
									return false;
								}
							}
						}
					}
				}
				if (b.adddata.length != 0 && b.edtdata.length != 0) {
					for (var i = 0; i < b.adddata.length; i++) {
						var addDate = b.adddata[i].D_TYP_DATE;
						for (var j = 0; j < b.edtdata.length; j++) {
							var edtDate = b.edtdata[j].D_TYP_DATE;
							if (addDate == edtDate) {
								Ext.MessageBox.alert('系统提示', '典型日重复，请重新修改!');
								return false;
							}
						}
					}
				}
				if (b.adddata.length != 0 || b.edtdata.length != 0) {
					if (!Ext.app.checkData(b))
						return false;
				}
				if (Ext.app.defaultDayCount > 1) {
					Ext.MessageBox.alert('系统提示', '只能设置一个默认日!');
					return false;
				} else if (Ext.app.defaultDayCount == 1) {
					var _data = datagrid.getStore().getModifiedRecords();
					Ext.each(_data, function(row) {
						if (row.get('D_DEFAULT') == 1) {
							Ext.app.date = row.get('D_TYP_DATE');
						}
					});
					Ext.Msg.confirm('系统提示', '是否将' + Ext.app.date.substr(0, 10)
							+ '设置为默认典型日?', function(btn) {
						if (btn == 'yes') {
							Ext.app.delDefaultDay();
							isSave = true;
							datagrid.saveData();
							isSave = false;
						} else {
							return false;
						}
					});
				}
				return false;
			}
			isSave = false;
		},
		aftersave : function() {
			Ext.app.setDefaultDay();
			datagrid.store.reload();
		},
		afterdelete : function() {
			Ext.app.setDefaultDay();
			datagrid.store.reload();
		}
	}
});

/**
 * 页面显示
 */
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [ datagrid ]
});
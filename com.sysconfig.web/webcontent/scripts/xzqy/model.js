// 行政区域维护：应用ID
Ext.app.appID = "F9E0F82C-3AD8-44F1-A56E-DE02EF92C3E9";
// 行政区域维护：类型ID
Ext.app.clsID = "E3328BC2-941E-4738-A244-61EB49CA61FE";

// 单位区域对照：应用ID
Ext.app.appID_dz = "A33B3493-DD2A-4517-BEB1-F5E7424DB6C3";
// 单位区域对照：类型ID
Ext.app.clsID_dz = "111A20FD-ECB9-4079-9E06-BE5DEF2AB8AE";

// 区域表格按钮
Ext.app.qy_gridBtn = [ {
	text : "删除",
	iconCls : "remove",
	handler : function() {
		Ext.app.qy_grid_del();
	}
}, {
	text : "导入",
	icon : 'sysconfig/public/images/llxs-import.png',
	handler : function() {
		Ext.app.implExl();
	}
}, {
	text : "导出",
	icon : 'sysconfig/public/images/llxs-export.png',
	handler : function() {
		grid2Excel(dataGrid, {
			title : '行政区域'
		});
	}
} ];
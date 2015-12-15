// 断面参数维护：应用ID
Ext.app.appID = "95D3E56F-C9FB-426B-9370-4F091E40CF05";

// 断面参数维护：类型ID
Ext.app.clsID = "2104FB18-31F3-414C-AA9C-55E2C4526F5F";

//断面参数维护：应用ID
Ext.app.selConLineAppID = "AAD0645C-09AD-405D-AB5B-0626F20E7DCD";

//断面参数维护：类型ID
Ext.app.selConLineClsID = "93A2F21A-4082-4F7A-810D-36B80CB61429-GUL9U";

Ext.app.gridBtn = [ {
	text : '导入',
	icon : 'sysconfig/public/images/llxs-import.png',
	handler : function() {
		Ext.app.implExl();
	}
}, {
	text : '导出',
	icon : 'sysconfig/public/images/llxs-export.png',
	handler : function() {
		grid2Excel(dataGrid, {
			title : '断面参数'
		});
	}
} ]
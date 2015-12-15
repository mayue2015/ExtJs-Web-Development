// 应用ID
Ext.app.appID = "AC6204CB-6EA2-4442-9DF2-2C9B06664BB3";

// 类型ID
Ext.app.clsID = "C2B999F9-9361-4F48-92EF-3F33CE225AED-00017";

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
			title : '变压器参数'
		});
	}
} ]
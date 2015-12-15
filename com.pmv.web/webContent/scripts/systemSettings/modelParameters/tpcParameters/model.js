// 应用ID
Ext.app.appID = "2CEF3A56-9EB0-4715-AE21-F681EFB69204";

// 类型ID
Ext.app.clsID = "C4E1022B-3426-46AD-85A2-5BC971BBF22B-00005";

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
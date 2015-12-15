// 应用ID
Ext.app.appID = "71FBDBA8-F821-4F29-9CF5-0127B0639EF5";
// 类型ID
Ext.app.clsID = "0AB6D32B-5180-4ADB-B26D-4210A197D53F-00001";

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
			title : '发电机参数'
		});
	}
}, {
	text : '基准参数提取',
	iconCls : 'doc_list',
	handler : function() {
		Ext.app.getBaseData();
	}
} ]

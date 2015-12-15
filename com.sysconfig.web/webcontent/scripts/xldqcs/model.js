// 应用ID
Ext.app.appID = "1DB2150F-2318-483F-AEBF-E9C5699AD4BD";

// 类型ID
Ext.app.clsID = "F38EE598-7738-4FF6-BBD4-8AE27047F881-00008";

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
			title : '线路参数'
		});
	}
}, {
	text : '基准参数提取',
	iconCls : 'doc_list',
	handler : function() {
		Ext.app.getBaseData();
	}
} ]
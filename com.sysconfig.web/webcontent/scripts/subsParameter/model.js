// 应用ID
Ext.app.appID = "8B5C2944-BD97-4C2F-A712-7705A04BA186";

// 类型ID
Ext.app.clsID = "F94237C1-567F-4187-8165-C8B091F65739";

Ext.app.gridBtn = [ {
	text : '导入',
	iconCls : 'llxs-import',
	handler : function() {
		Ext.app.implExl();
	}
}, {
	text : '导出',
	iconCls : 'llxs-export',
	handler : function() {
		grid2Excel(dataGrid,{
			title : '变电站参数'
		});
	}
}, {
	text : '基准参数提取',
	iconCls : 'doc_list',
	handler : function() {
		Ext.app.getBaseData();
	}
} ]
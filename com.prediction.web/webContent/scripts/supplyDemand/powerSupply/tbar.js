/**
 * 主页面工具条
 */
Ext.app.tbar = [ '-', {
	id : 'add',
	xtype : 'button',
	text : '新增',
	iconCls : 'add',
	handler : function() {
		Ext.app.insert(dataGrid,"new");
	} 
}, '-', {
	xtype : 'button',
	text : '修改',
	iconCls : 'edit',
	handler : function() {
		Ext.app.insert(dataGrid,"update");
	}
}, '-', {
	xtype : 'button',
	text : '删除',
	iconCls : 'remove',
	handler : function() {
		Ext.app.remove(dataGrid);
	}
}, '-',{
	id : 'import',
	xtype : 'button',
	text : '导入',
	iconCls : 'llxs-import',
	handler : function() {
		Ext.app.importExcel2Grid(versionId,'POWERSUPPLY','T');
	}
}, '-',{
	id : 'export',
	xtype : 'button',
	text : '导出',
	iconCls : 'llxs-export',
	handler : function() {
		grid2Excel(dataGrid,{
			title : '网供电量和售电量统计'
		})
	}
}, '->','计量单位：万千瓦、兆瓦']

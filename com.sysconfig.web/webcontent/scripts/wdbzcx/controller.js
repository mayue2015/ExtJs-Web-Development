//查询
Ext.app.queryClick = function() {
	var sql = queryPanel.getSqlString() ;
	datagrid.loadData(Ext.app.appID, Ext.app.clsID, '', '',sql);
}

//重置
Ext.app.restClick = function() {
	Ext.getCmp('queryPanel').form.reset();
}

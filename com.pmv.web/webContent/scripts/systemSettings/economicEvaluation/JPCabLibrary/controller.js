/**
 * JP柜单位造价库-刷新按钮
 * */
Ext.app.addRefreshBtn = function(grid) {
	var refreshButton = new Ext.Button({
		text : '刷新',
		iconCls : 'pms_grid_refresh',
		tooltip : '刷新',
		listeners : {
			click : function() {
				grid.store.reload();
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(refreshButton);
}
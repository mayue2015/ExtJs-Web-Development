// 中心区域
var panel = new Ext.ux.QGPanel({
	id : "centerPanel",
	region : "center",
	appID : Ext.app.appID,
	clsID : Ext.app.clsID,
	detailView : false,
	autoQuery : true,
	queryItems : Ext.app.queryItems,
	gridButtons : Ext.app.gridButtons,
	listeners : {
		render : Ext.app.qgPanelRender
	}
});

// 页面显示区
var vp = new Ext.Viewport({
	layout : "border",
	items : [ panel ]
});

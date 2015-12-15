/**
 * "数据来源-编辑数据"据链接点击事件
 *
 * @param record
 */
Ext.app.sjlyBjsjOnClick = function(record) {
	var tabPanel = new Ext.TabPanel({
		activeTab : 0,
		defaults : {
			border : false,
			defaults : {
				border : false
			}
		},
		items : [ {
			title : "本次评价数据",
			items : [ new Ext.app.BcpjsjPanel({
				guid : record.get("GUID")
			}) ]
		}, {
			title : "历次数据详单",
			items : [ new Ext.app.LssjxdPanel({
				guid : record.get("GUID")
			}) ]
		}, {
			title : "历史数据图表",
			items : [ new Ext.app.LssjtbPanel({
				guid : record.get("GUID")
			}) ]
		} ],
		listeners : {
			render : function(cmp) {
				cmp.setHeight(cmp.ownerCt.getHeight());
			}
		}
	});
	new Ext.Window({
		modal : true,
		resizable : false,
		layout : "fit",
		width : 700,
		height : 550,
		autoScroll : true,
		items : [ {
			border : false,
			items : [ tabPanel ]
		} ]
	}).show();
};
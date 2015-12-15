// 评价周期：类型ID
Ext.app.clsID = "698E01EE-7A59-4730-96CF-1D6795BCF1F0-00017";
// 评价周期：应用ID
Ext.app.appID = "60BB07F2-F4B3-4E3F-8DBA-EFBE4D89DD31";

// 周期范围：类型ID
Ext.app.zqfwClsID = "CBFC4708-56A5-4DD3-B2D4-E84C5FDB2198";
// 周期范围：应用ID
Ext.app.zqfwAppID = "E39D29EF-4878-4000-9165-98233E50EA8C";

/**
 * 查询条件表单
 */
Ext.app.queryItems = [ {
	items : [ {
		id : 'BD_SBLX',
		xtype : "bdqueryfield",
		fieldLabel : "设备类型",
		operate : new Bp.query.Eq({
//			target : ZQ_ID
		}),
		name : "SBLX",
		edtID : "617D6FF7-6AA1-44D4-B022-A0893987C356-00007"
	} ]
}, {
	items : [ {
		id : 'BD_BDZ',
		xtype : "bdqueryfield",
		fieldLabel : "变电站",
		operate : new Bp.query.Eq({
//			target : "BDZ"
		}),
		name : "BDZ",
		edtID : "617D6FF7-6AA1-44D4-B022-A0893987C356-00008"
	} ]
}, {
	items : [ {
		id : 'BD_DYDJ',
		xtype : "bdqueryfield",
		fieldLabel : "电压等级",
		operate : new Bp.query.Eq({
//			target : "DYDJ"
		}),
		name : "DYDJ",
		edtID : "3C262960-F1E7-4B50-911D-B763F30C7437-00003"
	} ]
} ];

/**
 * 表格工具按钮
 */
Ext.app.gridButtons = [ {
	text : "刷新",
	iconCls : "pms_grid_refresh",
	handler : function() {
		Ext.app.refreshHandler();
	}
}, {
	text : "查询",
	iconCls : "query",
	handler : function() {
		Ext.app.queryHandler();
	}
}, {
	text : "适用范围",
	iconCls : "edit",
	handler : function() {
		Ext.app.fitRangeHandler();
	}
} ];

/**
 * 适用范围窗口
 * 
 * @class Ext.app.FitRangeWindow
 * @extend Ext.Window
 */
Ext.app.FitRangeWindow = Ext.extend(Ext.Window, {

	layout : "column",

	defaults : {
		border : false,
		columnWidth : 0.333,
		style : "margin: 5"
	},

	initComponent : function() {
		var guid = this.guid;
		var bdzPanel = new Ext.Panel({
			title : "变电站",
			items : [ new Ext.app.bdzGrid({
				appID : "appid",
				clsID : "clsid",
				guid : guid,
				otype : "bdz",
				service : "fbdw_tree_service"//pjzqwh_bdz_tree_service
			}) ]
		});
		var dydjPanel = new Ext.Panel({
			title : "电压等级",
			items : [ new Ext.app.dydjGrid({
				appID : "appid",
				clsID : "clsid",
				guid : guid,
				otype : 'dydj',
				service : "dydj_tree_service"//pjzqwh_dydj_tree_service
			}) ]
		});
		var sblxPanel = new Ext.Panel({

			title : "设备类型",
			items : [ new Ext.app.sblxGrid({
				appID : "appid",
				clsID : "clsid",
				guid : guid,
				otype : 'sblx',
				service : "sbxh_tree_service"
			}) ]
		});
		this.items = [ bdzPanel, dydjPanel, sblxPanel ];
		Ext.app.FitRangeWindow.superclass.initComponent.call(this);
	}
});

/**
 * 获取所选周期GUID
 */
Ext.app.getZqGuid = function() {

	var zqGrid = Ext.app.getBDGrid();
	var recode = zqGrid.getSelectionModel().getSelections();
	return recode[0].get('GUID');
}

/**
 * 变电站表格
 * 
 * @class Ext.app.bdzGrid
 * @extend Ext.ux.BDGrid
 */
Ext.app.bdzGrid = Ext.extend(Ext.ux.BDGrid, {
	detailView : false,
	height : 400,
	needPage : false,// 是否需要分页
	id : 'bdzGrid',
	listeners : {
		render : function() {
			var guid = this.guid;
			var service = this.service;
			var otype = this.otype; // 窗口区分
			var grid = Ext.getCmp('bdzGrid');
			this.getTopToolbar().removeAll();
			this.getTopToolbar().add("-");
			this.getTopToolbar().add(new Ext.Button({
				text : "增加",
				iconCls : "add",
				handler : function() {
					var title = "变电站多选";
					Ext.app.showTreeWindow(guid, service, otype, grid,title);
				}
			}));
			this.getTopToolbar().add("-");
			this.getTopToolbar().add(new Ext.Button({
				text : "删除",
				iconCls : "remove",
				handler : function() {
					Ext.app.removeInfo(grid);
				}
			}));
			this.getTopToolbar().add("-");
		},
		afterrender : function() {
			var zqGuid = Ext.app.getZqGuid();
			var sql = "ZQ_ID ='" + zqGuid + "' AND LX='1500801' ";
			this.loadData(Ext.app.zqfwAppID, Ext.app.zqfwClsID, '', '', sql);
		}
	},
	initComponent : function() {
		Ext.app.bdzGrid.superclass.initComponent.call(this);
	}
});

/**
 * 电压等级表格
 * 
 * @class Ext.app.dydjGrid
 * @extend Ext.ux.BDGrid
 */
Ext.app.dydjGrid = Ext.extend(Ext.ux.BDGrid, {
	detailView : false,
	height : 400,
	needPage : false,// 是否需要分页
	id : 'dydjGrid',
	listeners : {
		render : function() {
			var guid = this.guid;
			var service = this.service;
			var otype = this.otype; // 窗口区分
			var grid = Ext.getCmp('dydjGrid');
			this.getTopToolbar().removeAll();
			this.getTopToolbar().add("-");
			this.getTopToolbar().add(new Ext.Button({
				text : "增加",
				iconCls : "add",
				handler : function() {
					var title = "电压等级多选";
					Ext.app.showTreeWindow(guid, service, otype, grid,title);
				}
			}));
			this.getTopToolbar().add("-");
			this.getTopToolbar().add(new Ext.Button({
				text : "删除",
				iconCls : "remove",
				handler : function() {
					Ext.app.removeInfo(grid);
				}
			}));
			this.getTopToolbar().add("-");
		},
		afterrender : function() {
			var zqGuid = Ext.app.getZqGuid();
			var sql = "ZQ_ID ='" + zqGuid + "' AND LX='1500802' ";
			this.loadData(Ext.app.zqfwAppID, Ext.app.zqfwClsID, '', '', sql);
		}
	},
	initComponent : function() {
		Ext.app.dydjGrid.superclass.initComponent.call(this);
	}
});

/**
 * 设备类型表格
 * 
 * @class Ext.app.sblxGrid
 * @extend Ext.ux.BDGrid
 */
Ext.app.sblxGrid = Ext.extend(Ext.ux.BDGrid, {
	detailView : false,
	height : 400,
	needPage : false,// 是否需要分页
	id : 'sblxGrid',
	listeners : {
		render : function() {
			var guid = this.guid;
			var service = this.service;
			var otype = this.otype; // 窗口区分
			var grid = Ext.getCmp('sblxGrid');
			this.getTopToolbar().removeAll();
			this.getTopToolbar().add("-");
			this.getTopToolbar().add(new Ext.Button({
				text : "增加",
				iconCls : "add",
				handler : function() {
					var title = "设备类型多选";
					Ext.app.showTreeWindow(guid, service, otype, grid,title);
				}
			}));
			this.getTopToolbar().add("-");
			this.getTopToolbar().add(new Ext.Button({
				text : "删除",
				iconCls : "remove",
				handler : function() {
					Ext.app.removeInfo(grid);
				}
			}));
			this.getTopToolbar().add("-");
		},
		afterrender : function() {
			var zqGuid = Ext.app.getZqGuid();
			var sql = "ZQ_ID ='" + zqGuid + "' AND LX='1500803' ";
			this.loadData(Ext.app.zqfwAppID, Ext.app.zqfwClsID, '', '', sql);
		}
	},
	initComponent : function() {
		Ext.app.sblxGrid.superclass.initComponent.call(this);
	}
});

/**
 * 显示树模型窗口
 * 
 * @param guid
 * @param service
 */
Ext.app.showTreeWindow = function(guid, service, otype, grid,title) {

	var tree = new Ext.tree.TreePanel({
		border : true,
		height : 390,
		split: true,
		service : service,
		root : new Ext.tree.AsyncTreeNode(),
		plugins : [ new Bp.plugin.TreePanel() ]
	});
	tree.on('click', Ext.app.leftTree);
	
	var win = new Ext.Window({
		title : title,
		width : 300,
		height : 450,
		modal : true,
		bbar : new Ext.Toolbar({
			buttonAlign : "center",
			items : [ {
				text : '确定',
				iconCls : 'save',
				width : 70,
				handler : function() {
					Ext.app.saveZqfw(win, otype, grid);
				}
			}, {
				text : '返回',
				icon : 'rule/public/images/cancel_2.png',
				width : 70,
				handler : function() {
					win.close();
				}
			} ]
		}),
		items : [ tree ]
	}).show();
};

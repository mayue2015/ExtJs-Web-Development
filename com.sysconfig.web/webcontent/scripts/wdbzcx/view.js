//查询面板
var queryPanel = new Ext.ux.BDQueryPanel({
	id : "queryPanel",
	region : "north",
	frame : true,
	autoScroll : false,
	border : false,
	layout : 'column',
	labelAlign : 'right',
	labelWidth : 60,
	width : window.screen.width,
	height : 45,
	items : [{
	    defaults : {
			xtype : 'panel',
			layout : 'column',
			labelWidth : 60
		},
		defaults : {
			layout : 'form',
			labelWidth : 60
		},
		layout : 'column',
		items : [{
			width : 250,
			items : [{
				xtype : 'bdqueryfield',
				name : 'FLAG_BZ',
				anchor : '95%',
				fieldLabel : '标准类型',
				edtID : "3460AF5D-0A9B-43B2-85AF-B831FD30B6A9-00004",
				operate : new Bp.query.Like({
					target : "FLAG_BZ"
				})
			}]
			}, {
				width : 250,
				items : [{
					xtype : 'textfield',
					anchor : '80%',
					fieldLabel : '文档名称',
					name : 'TITLE',
					operate : new Bp.query.Like({
						target : "TITLE"
					})
				}]
			}, {
				width : 250,
				items : [{
					xtype : 'bdqueryfield',
					anchor : '95%',
					fieldLabel : '文档类型',
					name : 'TYPE_GUID',
					edtID : "46C85AB9-267A-4180-A964-E5A22D98EEF4-00001",
					operate : new Bp.query.Like({
						target : "TYPE_GUID"
					})
				}]
			}, {
				width : 250,
				items : [{
					xtype : 'bdqueryfield',
					fieldLabel : '发布单位',
					name : 'FBDW',
					anchor : '95%',
					edtID : "995BECF5-498A-45DC-ADD1-2309B6B63696-00004",
					operate : new Bp.query.Like({
						target : "FBDW"
					})
				}]
			}, {
				width : 240,
				items : [{
					xtype : 'textfield',
					fieldLabel : '发布人',
					name : 'FBR',
					anchor : '80%',
					operate : new Bp.query.Like({
						target : "FBR"
					})
				}]
			}
		]
	}]
});

//表格数据展示
var datagrid = new Ext.ux.BDGrid({
	region : "center",
	readOnly : true,
	displayCheckBox : false,
	detailView : false,
	listeners : {
		afterrender : function(grid) {
			this.getTopToolbar().removeAll();
			datagrid.getTopToolbar().add("-");
			Ext.each(Ext.app.gridBtn, function(btn) {
				datagrid.getTopToolbar().add(btn);
				datagrid.getTopToolbar().add("-");
			});
			
			this.loadData(Ext.app.appID, Ext.app.clsID);
		}
	}
});

//页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [ queryPanel,datagrid ]
});
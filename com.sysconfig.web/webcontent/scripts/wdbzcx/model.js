// 文档标准查询：应用ID
Ext.app.appID = "C51890C8-5B95-4577-9835-C0EFEFA1E4C8";

// 文档标准查询：类型ID
Ext.app.clsID = "6385C2DB-A152-404F-A76D-038453239C56-00010";

//查询条件表单
Ext.app.queryItems = [ {
	layout : 'column',
	hideLabels : true,
	region : 'center',
	defaults : {
		labelAlign : "right"
	},
	items : [ {
		columnWidth : .15,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'bdqueryfield',
			fieldLabel : '标准类型',
			name : 'FLAG_BZ',
			width : 140,
			edtID : "3460AF5D-0A9B-43B2-85AF-B831FD30B6A9-00004",
			operate : new Bp.query.Like({
				target : "FLAG_BZ"
			})
		} ]
	}, {
		columnWidth : .15,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'textfield',
			fieldLabel : '文档名称',
			name : 'TITLE',
			width : 140,
			operate : new Bp.query.Like({
				target : "TITLE"
			})
		} ]
	}, {
		columnWidth : .15,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'bdqueryfield',
			fieldLabel : '文档类型',
			name : 'TYPE_GUID',
			width : 140,
			edtID : "46C85AB9-267A-4180-A964-E5A22D98EEF4-00001",
			operate : new Bp.query.Like({
				target : "TYPE_GUID"
			})
		} ]
	}, {
		columnWidth : .15,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'bdqueryfield',
			fieldLabel : '发布单位',
			name : 'FBDW',
			width : 140,
			edtID : "995BECF5-498A-45DC-ADD1-2309B6B63696-00004",
			operate : new Bp.query.Like({
				target : "FBDW"
			})
		} ]
	}, {
		columnWidth : .15,
		layout : 'form',
		border : false,
		items : [ {
			xtype : 'textfield',
			fieldLabel : '发布人',
			name : 'FBR',
			width : 140,
			operate : new Bp.query.Like({
				target : "FBR"
			})
		} ]
	} 
	]

} ];


//数据表格工具条按钮
Ext.app.gridBtn = [ {
	text : '查询',
	iconCls : 'search',
	tooltip : '查询',
	handler : function() {
		Ext.app.queryClick();
	}
}, {
	text : '重置查询条件',
	icon : 'sysconfig/public/images/eraser.png',
	tooltip : '重置查询条件',
	handler : function() {
		Ext.app.restClick();
	}
} ];

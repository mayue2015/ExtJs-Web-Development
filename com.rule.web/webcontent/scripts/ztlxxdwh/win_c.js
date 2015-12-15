Ext.onReady(function() {

	(function() {
		Ext.Ajax.request({
			url : 'rule/ztlxqEditorAction/getxxdDataProxy.do',
			params : {
				'xxd_guid' : guid,
				'type' : 'current'
			},
			async : false,
			success : function(response) {
				if (response.status == 200) {
					var data = Ext.util.JSON.decode(response.responseText);
					if (data.length == 0)
						return;
					Ext.getCmp('sql').setValue(data[0][1]);
					Ext.getCmp('Ecolumn').setValue(data[0][2]);
					Ext.getCmp('Zcolumn').setValue(data[0][3]);
				}
			}
		});
	})();

	var gridStore = new Ext.data.Store({
		autoLoad : false,
		url : "rule/ztlxqEditorAction/cmdDataProxy.do",
		method : "post",
		reader : new Ext.data.JsonReader({
			root : "list",
			totalProperty : "size",
			fields : []
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly : false
	});

	var cm = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), sm ]

	});

	var bbar = new Ext.PagingToolbar({
		pageSize : 15,
		store : gridStore,
		displayInfo : true,
		displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg : "无记录"
	});

	var gridPanel = new Ext.grid.GridPanel({
		region : 'center',
		title : '数据展示',
		paging : true,
		height : 285,
		store : gridStore,
		cm : cm,
		sm : sm,
		// bbar : bbar,
		rowNumberer : true
	});

	var field = function() {
		var es = Ext.getCmp("Ecolumn").getValue().split(",");
		var f = new Array();
		Ext.each(es, function(e) {
			f.push({
				name : e
			})
		});
		return f;
	};

	var columnHead = function() {
		var es = Ext.getCmp("Ecolumn").getValue().split(",");
		var zs = Ext.getCmp("Zcolumn").getValue().split(",");
		var c = new Array();
		for (var i = 0; i < es.length; i++) {
			c.push({
				dataIndex : es[i],
				header : zs[i]
			})
		}
		return c;
	};

	var form = new Ext.FormPanel({
		region : 'north',
		border : true,
		autoScroll : true,
		height : 205,
		frame : true,
		items : [ {
			xtype : 'textarea',
			id : 'sql',
			//style : 'font-size:20px;',
			fieldLabel : '配置数据',
			width : 400,
			height : 55
		}, {
			xtype : 'textarea',
			//style : 'font-size:20px;',
			id : 'Ecolumn',
			fieldLabel : '配置英文列名',
			width : 400,
			height : 30
		}, {
			xtype : 'textarea',
			//style : 'font-size:20px;',
			id : 'Zcolumn',
			fieldLabel : '配置中文列名',
			width : 400,
			height : 30
		} ],
		bbar : [ {
			xtype : 'button',
			text : '展示数据',
			handler : function() {
				Ext.Ajax.request({
					url : "rule/ztlxqEditorAction/cmdDataProxy.do",
					params : {
						'start' : 0,
						'limit' : 15,
						'test' : 'test',
						'ecolumn' : Ext.getCmp('Ecolumn').getValue(),
						'zcolumn' : Ext.getCmp('Zcolumn').getValue(),
						'sql' : Ext.getCmp('sql').getValue(),
						'xxd_guid' : guid
					},
					success : function(response, options) {

						var value = Ext.decode(response.responseText);
						if(value.success != true){
							Ext.Msg.alert('系统提示',value.success+",请重新输入数据！");
							return;
						};
						var store = new Ext.data.Store({
							data : value,
							reader : new Ext.data.JsonReader({
								root : "list",
								totalProperty : "size",
								fields : field()
							})
						});
						var columns = [ new Ext.grid.RowNumberer(), sm ];
						Ext.each(columnHead(), function(c) {
							columns.push(c);
						});
						var columnModel = new Ext.grid.ColumnModel({
							columns : columns
						});
						gridPanel.reconfigure(store, columnModel);
					}
				});
				gridPanel.store.load();
			}
		} ],
		tbar : [ {
			text : '保存',
			tooltip : '保存',
			iconCls : 'save',
			handler : function() {
				var Ecolumn = Ext.encode(Ext.getCmp('Ecolumn').getValue());
				var Zcolumn = Ext.encode(Ext.getCmp('Zcolumn').getValue());
				Ext.Ajax.request({
					url : 'rule/ztlxqEditorAction/updatexxdDataProxy.do',
					params : {
						'ecolumn' : Ext.getCmp('Ecolumn').getValue(),
						'zcolumn' : Ext.getCmp('Zcolumn').getValue(),
						'sql' : Ext.getCmp('sql').getValue(),
						'type' : 'current',
						'xxd_guid' : guid
					},
					success : function() {
						Ext.Msg.alert('系统提示', '保存成功!');
					},
					failure : function() {
						Ext.Msg.alert('系统提示', '保存失败!');
					}
				});
			}
		} ]
	});

	gridPanel.store.on('beforeload', function() {
		var Ecolumn = Ext.encode(Ext.getCmp('Ecolumn').getValue());
		var Zcolumn = Ext.encode(Ext.getCmp('Zcolumn').getValue());
		this.baseParams = {
			'start' : 0,
			'limit' : 15,
			'test' : 'test',
			'ecolumn' : Ext.getCmp('Ecolumn').getValue(),
			'zcolumn' : Ext.getCmp('Zcolumn').getValue(),
			'sql' : Ext.getCmp('sql').getValue(),
			'xxd_guid' : guid
		}
	});

	new Ext.Viewport({
		items : [ form, gridPanel ]
	});
});
Ext.onReady(function() {
	var winArgs = window.dialogArguments;
	var code = "";
	var sblxbms = "";
	var sblxmcs = "";
	var area = '';
	var isMultiSelect = true;
	if (winArgs) {
		code = winArgs.code;
		isMultiSelect = (typeof (winArgs.isMultiSelect) === "undefined" ? true
				: winArgs.isMultiSelect);
		sblxbms = winArgs.codes;
		sblxmcs = winArgs.sblxmcs;
		area = winArgs.area;
	}

	var sblxTree = new Ext.tree.TreePanel({
		collapsible : false,
		split : true,
		autoHeight : false,
		animate : true,
		autoScroll : true,
		height : 575,
		region : 'center',
		service : 'sbxh_tree_service',
		loader : new Ext.tree.TreeLoader(),
		plugins : [ new Bp.plugin.TreePanel() ]
	});

	var bbar = new Ext.Toolbar({
		hidden : isMultiSelect,
		items : [ '->', {
			text : ' 确   定  ',
			handler : function() {
				var codes = "";
				var names = "";
				var selModel = sblxTree.getSelectionModel();
				var node = selModel.selNode;
				if (!node) {
					Ext.Msg.alert("系统提示", "请选择设备类型！");
					return;
				}

				// 自定义节点不能选择
				// 本页面有两处维护，多选时也需要维护
				switch (node.text) {
				case "设备类型":
				case "一次设备":
				case "保护类别":
				case "辅助设备类型":
				case "保护设备部件":
					Ext.Msg.alert("系统提示", "请选择具体的设备类型！");
					break;
				default:
					window.returnValue = {
						codes : node.id,
						names : node.text
					};
					window.close();
					break;
				}
			}
		}, {
			text : ' 清  空  ',
			handler : function() {
				window.returnValue = {
					codes : '',
					names : ''
				};
				window.close();
			}
		}, '-', {
			text : ' 取  消  ',
			handler : function() {
				window.close();
			}
		} ]
	});

	var centerPanel = new Ext.Panel({
		region : 'west',
		hight : 580,
		width : 260,
		title : (isMultiSelect ? '双击导航树选择设备类型' : '设备类型'),
		collapsible : true,
		split : true,
		items : [ sblxTree ],
		bbar : bbar
	});

	var Employee = Ext.data.Record.create([ {
		name : 'code'
	}, {
		name : 'sblx'
	} ]);

	var sm = new Ext.grid.CheckboxSelectionModel();
	var grid = new Ext.grid.GridPanel({
		sm : sm,
		store : new Ext.data.ArrayStore({
			fields : [ {
				name : 'code'
			}, {
				name : 'sblx'
			} ]
		}),
		cm : new Ext.grid.ColumnModel({
			defaults : {
				width : 120
			},
			columns : [ sm, {
				id : 'code',
				header : 'code',
				sortable : true,
				hidden : true,
				dataIndex : 'code'
			}, {
				header : '设备类型',
				width : 200,
				dataIndex : 'sblx'
			} ]
		}),
		id : 'ecsbGrid'
	});

	var eastPanel = new Ext.Panel({
		region : 'center',
		hidden : (!isMultiSelect),
		layout : 'fit',
		items : [ grid ],
		tbar : [ {
			text : '删除',
			iconCls : 'remove',
			handler : function() {
				var selModel = grid.getSelectionModel();
				var selections = selModel.selections;
				var len = selections.length;
				if (len == 0) {
					Ext.Msg.alert("系统提示", "请选择需要删除的行！");
					return;
				}
				for (var i = 0; i < len; len > 0) {
					var data = selections.get(0).data;
					grid.store.each(function(record) {
						if (data.code === record.get("code")) {
							grid.store.remove(record);
						}
					});
					len = selections.length;
				}
			}
		} ],
		bbar : [ '->', {
			text : ' 确   定  ',
			width : 70,
			iconCls : 'save',
			handler : function() {
				var codes = "";
				var names = "";
				if (isMultiSelect) {
					var store = grid.getStore();
					var len = store.getCount();
					var codeAry = [];
					var nameAry = [];

					if (len == 0) {
						Ext.Msg.alert("系统提示", "请选择设备类型！");
						return;
					}

					for (var i = 0; i < len; i++) {
						var data = store.getAt(i).data;
						codeAry.push(data.code);
						nameAry.push(data.sblx);
					}

					codes = codeAry.join(",");
					names = nameAry.join(",")
				} else {
					var selModel = sblxTree.getSelectionModel();
					var node = selModel.selNode;
					codes = node.id
					names = node.text;
				}
				window.returnValue = {
					codes : codes,
					names : names
				};
				window.close();
			}
		}, {
			text : ' 清  空  ',
			width : 70,
			icon : 'sysconfig/public/images/eraser.png',
			handler : function() {
				window.returnValue = {
					codes : '',
					names : ''
				};
				window.close();
			}
		}, {
			text : ' 取  消  ',
			width : 70,
			icon : 'sysconfig/public/images/cancel_2.png',
			handler : function() {
				window.close();
			}
		} ]
	});

	var dataAry = [];
	sblxTree.on('dblclick', function(node) {
		var code = node.attributes.attr.sblxbm;
		var name = node.text;

		// 自定义节点不能选择
		switch (name) {
		case "设备类型":
		case "一次设备":
		case "保护设备":
		case "辅助设备类型":
		case "保护设备部件":
			break;
		default:
			addDataToGrid(code, name)
			break;
		}
	})

	// 接收传递的参数，并赋值到grid
	if (isMultiSelect && sblxbms) {
		var bmAry = sblxbms.split(",", sblxbms.length);
		var mcAry = sblxmcs.split(",", sblxmcs.length);

		for (var i = 0; i < bmAry.length; i++) {
			var sblxbm = bmAry[i];
			var sblxmc = mcAry[i];
			addDataToGrid(sblxbm, sblxmc);
		}
	}

	// 添加数据到grid
	function addDataToGrid(code, name) {
		var exist = false;
		grid.store.each(function(record) {
			if (code == record.get('code')) {
				exist = true;
				return;
			}
		});
		if (!exist) {
			grid.store.add(new Employee({
				code : code,
				sblx : name
			}));
		}
	}

	new Ext.Viewport({
		layout : 'border',
		items : [ centerPanel, eastPanel ]
	});
});
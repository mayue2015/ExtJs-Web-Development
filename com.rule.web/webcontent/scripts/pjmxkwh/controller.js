/**
 * 修正模型维护平台按钮 平台按钮索引:新增(0,1),保存(2,3),删除(4,5),撤销(6,7),发送(8,9),流程图(10,11)
 */
Ext.appPjmxkwh.fixToolbar = function() {
	var items = Ext.appPjmxkwh.mxGrid.getTopToolbar().items.items;
	Ext.each(items, function(item, index) {
		if (index == 4 || index == 5 || index == 8 || index == 9 || index == 10
				|| index == 11) {
			item.hide();
		}
	})
};

/**
 * 修正平台按钮 平台按钮索引:新增(0,1),保存(2,3),删除(4,5),撤销(6,7),发送(8,9),流程图(10,11)
 */
Ext.appPjmxkwh.showToolbar = function(grid) {
	var items = grid.getTopToolbar().items.items;
	Ext.each(items, function(item, index) {
		if (index == 8 || index == 9 || index == 10 || index == 11) {
			item.hide();
		}
	})
};

/**
 * 表格刷新
 */
Ext.appPjmxkwh.gridReload = function(grid, appID, clsID, columnId) {
	var filterColumn = '';
	if (!Ext.util.isNull(columnId)) {
		if (!Ext.util.isNull(Ext.appPjmxkwh.currentNode)) {// 根据模型id读取数据
			var id = Ext.appPjmxkwh.currentNode.id;
			filterColumn = columnId + "= '" + id + "'";
		}
	}
	grid.loadData(appID, clsID, '', '', filterColumn);
}

/**
 * 模型维护列表设置默认值
 */
Ext.appPjmxkwh.mxwhGridSetDefaultValues = function() {
	Ext.appPjmxkwh.mxGrid.setDefaultValues({
		'SFYX' : 'F',
		'SFYX_DSPVALUE' : '否'
	});
}

/**
 * 评价指标列表设置默认值
 */
Ext.appPjzbwh.pjzbwhGridSetDefaultValues = function() {
	if (!Ext.util.isNull(Ext.appPjmxkwh.currentNode)) {
		var node = Ext.appPjmxkwh.currentNode;
		var bm = node.attributes.attr.BM;
		var id = node.id;
		Ext.appPjzbwh.pjzbwhGrid.setDefaultValues({// 设置默认值
			'SSPJMX_ID' : id,
			'SSPJMX_ID_DSPVALUE' : node.text,
			'BM' : bm
		});
	}
}

/**
 * 状态量库列表设置默认值
 */
Ext.appZtlwh.ztlwhGridSetDefaultValues = function() {
	if (!Ext.util.isNull(Ext.appPjmxkwh.currentNode)) {
		var node = Ext.appPjmxkwh.currentNode;
		var bm = node.attributes.attr.BM;
		var id = node.id;
		Ext.appZtlwh.ztlwhGrid.setDefaultValues({// 设置默认值
			'SSPJMX_ID' : id,
			'SSPJMX_ID_DSPVALUE' : node.text,
			'BM' : bm
		});
	}
}

/**
 * 评价对象列表设置默认值
 */
Ext.appPjdxwh.pjdxwhGridSetDefaultValues = function() {
	if (!Ext.util.isNull(Ext.appPjmxkwh.currentNode)) {
		var node = Ext.appPjmxkwh.currentNode;
		var bm = node.attributes.attr.BM;
		var id = node.id;
		Ext.appPjdxwh.pjdxwhGrid.setDefaultValues({// 设置默认值
			'SSMX_ID' : id,
			'SSMX_ID_DSPVALUE' : node.text,
			'DXSF' : '',
			'ZTSF' : ''
		});
	}
}

/**
 * 算法变量列表设置默认值
 */
Ext.appSfblwh.gridSetDefaultValues = function() {
	if (!Ext.util.isNull(Ext.appPjmxkwh.currentNode)) {
		var node = Ext.appPjmxkwh.currentNode;
		var bm = node.attributes.attr.BM;
		var id = node.id;
		Ext.appSfblwh.grid.setDefaultValues({// 设置默认值
			'PJMX_ID' : id,
			'PJMX_ID_DSPVALUE' : node.text,
			'BM' : bm
		});
	}
}

/**
 * 模型树节点点击事件
 */
Ext.appPjmxkwh.pjmxkTreeClick = function(node) {
	if (!Ext.util.isNull(node.id)) {

		Ext.appPjmxkwh.currentNode = node;
		if (node.getDepth() == 1) {// 第一层(模型根节点)

			// 显示模型grid
			Ext.getCmp("mxTabPanel").hide();
			Ext.getCmp("mxGridPanel").show();
			// 加载数据
			Ext.appPjmxkwh.gridReload(Ext.appPjmxkwh.mxGrid,
					Ext.appPjmxkwh.appID, Ext.appPjmxkwh.clsID);

		} else if (node.getDepth() == 2) {// 第二层(模型子节点)

			// 显示标签页
			Ext.getCmp("mxGridPanel").hide();
			Ext.getCmp("mxTabPanel").show();

			if (Ext.appPjzbwh.pjzbwhGrid.rendered) {// 指标维护
				Ext.appPjzbwh.pjzbwhGridSetDefaultValues();// 默认值
				// 读取表格数据
				Ext.appPjmxkwh.gridReload(Ext.appPjzbwh.pjzbwhGrid,
						Ext.appPjzbwh.appID, Ext.appPjzbwh.clsID, "SSPJMX_ID");
			}

			if (Ext.appZtlwh.ztlwhGrid.rendered) {// 状态量维护

				Ext.appZtlwh.ztlwhGridSetDefaultValues();// 默认值
				// 读取表格数据
				Ext.appPjmxkwh.gridReload(Ext.appZtlwh.ztlwhGrid,
						Ext.appZtlwh.appID, Ext.appZtlwh.clsID, "SSPJMX_ID");
			}
			if (Ext.appPjdxwh.pjdxwhGrid.rendered) {// 评价对象维护

				Ext.appPjdxwh.pjdxwhGridSetDefaultValues();// 默认值
				// 读取表格数据
				Ext.appPjmxkwh.gridReload(Ext.appPjdxwh.pjdxwhGrid,
						Ext.appPjdxwh.appID, Ext.appPjdxwh.clsID, "SSMX_ID");
			}
			if (Ext.appSfblwh.grid.rendered) {// 算法变量维护

				Ext.appSfblwh.gridSetDefaultValues();// 默认值
				// 读取算法变量表格数据
				Ext.appPjmxkwh.gridReload(Ext.appSfblwh.grid,
						Ext.appSfblwh.appID, Ext.appSfblwh.clsID, "PJMX_ID");
			}
		}
		Ext.getCmp("centerPanel").doLayout();
	}
}

/**
 * 模型删除事件
 */
Ext.appPjmxkwh.mxwhRemoveClick = function() {
	var rows = Ext.appPjmxkwh.mxGrid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.Msg.alert("系统提示", "请至少选择一项!");
		return;
	}
	Ext.Msg.confirm("请确认", "是否要删除所选内容?", function(button, text) {
		if (button == 'yes') {
			var guids = new Array();
			Ext.each(rows, function(row) {
				guids.push("'" + row.get("GUID") + "'");
			});
			Ext.Ajax.request({
				url : 'rule/pjmxwhAction/deletePjmx.do',
				params : {
					guid : guids.join(",")
				},
				async : false,
				success : function(response, options) {
					var res = Ext.util.JSON.decode(response.responseText);
					if (res.success == 'success') {
						// 刷新grid
						Ext.appPjmxkwh.mxGrid.getStore().reload();
						// 刷新树
						if (!Ext.util.isNull(Ext.appPjmxkwh.currentNode)) {
							Ext.appPjmxkwh.currentNode.reload();
						} else {
							leftTree.getRootNode().reload();
						}
						Ext.Msg.alert('系统提示', '删除成功！');
					} else {
						Ext.Msg.alert('系统提示', '包含子项无法删除！');
					}
				}
			});
		}
	});
}

/**
 * 修正算法变量维护平台按钮 平台按钮索引:新增(0,1),保存(2,3),删除(4,5),撤销(6,7),发送(8,9),流程图(10,11)
 */
Ext.appSfblwh.fixToolbar = function() {
	var items = Ext.appSfblwh.grid.getTopToolbar().items.items;
	Ext.each(items, function(item, index) {// 只显示新增
		if (index != 0 && index != 1 && index != 2 && index != 3) {
			item.hide();
		}
	})
}

/**
 * 删除算法变量
 */
Ext.appSfblwh.delClick = function() {
	var rows = Ext.appSfblwh.grid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.Msg.alert("系统提示", "请至少选择一项进行删除!");
		return;
	}
	Ext.Msg.confirm("请确认", "是否要删除所选内容?", function(button, text) {
		if (button == 'yes') {
			var guids = new Array();
			Ext.each(rows, function(row) {
				guids.push("'" + row.get("GUID") + "'");
			});
			Ext.Ajax.request({
				url : 'rule/pjmxwhAction/delSfbl.do',
				params : {
					guids : guids.join(",")
				},
				async : false,
				success : function(response, options) {
					var res = Ext.util.JSON.decode(response.responseText);
					if (res.success) {
						// 刷新grid
						Ext.appSfblwh.grid.getStore().reload();
						Ext.Msg.alert('系统提示', '删除成功！');
					} else {
						Ext.Msg.alert('系统提示', '删除失败！');
					}
				}
			});
		}
	});
}

/**
 * 查看算法变量历史
 */
Ext.appSfblwh.viewHistory = function() {
	var rows = Ext.appSfblwh.grid.getSelectionModel().getSelections();
	if (rows.length != 1) {
		Ext.Msg.alert("系统提示", "请选择一项进行查看!");
		return;
	}

	// 历史变量Grid
	var lsblGrid = new Ext.ux.BDGrid({
		detailView : false,
		listeners : {
			render : function() {
				this.getTopToolbar().removeAll();
				var condition = "BL_ID = '" + rows[0].get("GUID") + "'";
				this.loadData(Ext.appSfblwh.appID, Ext.appSfblwh.clsID_ls, '',
						'', condition);
			}
		}
	});

	var win = new Ext.Window({
		layout : "fit",
		border : false,
		modal : true,
		resizable : false,
		width : 710,
		height : 400,
		title : "历史变量值",
		items : [ lsblGrid ]
	});
	win.show();
}

/**
 * 算法定义 function
 */
Ext.appPjdxwh.sfdyFun = function(type) {
	Ext.appPjdxwh.SFTYPE = type;
	Ext.getCmp('sfdyWin').show();
	Ext.getCmp('sfdyWin').setTitle(Ext.appPjdxwh.winTitle);
	if(type=="DXSF"){
		Ext.getCmp('sfdy_sfdyArea').setValue(Ext.appPjdxwh.DXSF);
		Ext.getCmp('sfdy_sfms').setValue(Ext.appPjdxwh.DXSFMS);
		Ext.appPjdxwh.sfdyText = Ext.appPjdxwh.DXSF;
	}else {
		Ext.getCmp('sfdy_sfdyArea').setValue(Ext.appPjdxwh.ZTSF);
		Ext.getCmp('sfdy_sfms').setValue(Ext.appPjdxwh.ZTSFMS);
		Ext.appPjdxwh.sfdyText = Ext.appPjdxwh.ZTSF;
	}
	
}

/**
 * 算法定义 左侧树点击事件
 */
Ext.appPjdxwh.sfdyLeftTree = function(node) {
	if (!node.hasChildNodes()) {
//		Ext.appPjdxwh.sfdyInsert(node.text);
		Ext.app.sfdySFNR = node.attributes.attr.SFNR;
		Ext.appPjdxwh.sfdyInsert(Ext.app.sfdySFNR);
	}
}

/**
 * 向光标处插入字符串
 */
Ext.appPjdxwh.sfdyInsert = function(insertStr) {
	if(!Ext.util.isNull(insertStr)){
		var obj = Ext.getCmp("sfdy_sfdyArea").el.dom;
		if (Ext.isIE) {// 如果是IE
			Ext.getCmp('sfdy_sfdyArea').el.focus();
			var sel = document.selection.createRange();  
			sel.text = insertStr;  
			sel.moveEnd('character',insertStr.length);  
			sel.moveStart('character',insertStr.length);
		} else {
			var startPos = obj.selectionStart;
			var endPos = obj.selectionEnd;
			obj.value = obj.value.substring(0, startPos) + insertStr
					+ obj.value.substring(endPos, obj.value.length);
			Ext.getCmp("sfdy_sfdyArea").el.focus();
			obj.setSelectionRange(endPos + insertStr.length, endPos + insertStr.length);
		}
	}
}

/**
 * 算法定义 初始化
 */
Ext.appPjdxwh.sfdyInit = function() {
	var sfdyText = 'if (){\n';
	sfdyText += '	return 1;\n';
	sfdyText += '} else{\n';
	sfdyText += '	return 0;\n';
	sfdyText += '}';
	return sfdyText;
}

/**
 * 点击左侧树节点 文本域添加参数
 */
Ext.appPjdxwh.sfdyAddParamTree = function(node) {
//	if (!node.hasChildNodes() && !Ext.util.isNull(node.attributes.attr)) {
//		Ext.appPjdxwh.sfdyInsert(node.attributes.attr.SFNR);
//	}
	if((node.getDepth() > 4) && !Ext.util.isNull(node.attributes.attr)){
		Ext.app.sfdyBM = node.attributes.attr.BM;
		Ext.appPjdxwh.sfdyInsert(Ext.app.sfdyBM);
	}
}

/**
 * 获取算法和算法描述
 */
Ext.appPjdxwh.getDxsfInfo = function(rec,type){
	Ext.appPjdxwh.DXMS = rec.get("DXMS");
	var title = "算法定义";
	if(title = "算法定义"){
		Ext.appPjdxwh.DXSF = "";
		Ext.appPjdxwh.DXSFMS = "";
		Ext.appPjdxwh.ZTSF = "";
		Ext.appPjdxwh.ZTSFMS = "";
	}
	if(type=="DXSF"){
		if(!Ext.util.isNull(rec.get("DXSF"))){
			Ext.appPjdxwh.DXSF = rec.get("DXSF");
			title = "查看算法";
		};
		if(!Ext.util.isNull(rec.get("DXSFMS"))){
			Ext.appPjdxwh.DXSFMS = rec.get("DXSFMS");
		}
	}else {
		if(!Ext.util.isNull(rec.get("ZTSF"))){
			Ext.appPjdxwh.ZTSF = rec.get("ZTSF");
			title = "查看算法";
		};
		if(!Ext.util.isNull(rec.get("ZTSFMS"))){
			Ext.appPjdxwh.ZTSFMS = rec.get("ZTSFMS");
		}
	}
	Ext.appPjdxwh.winTitle = title;
}

/**
 * 算法定义 确定按钮 事件方法
 */
Ext.appPjdxwh.sfdyConfirm = function() {
	var row = Ext.appPjdxwh.pjdxwhGrid.getSelectionModel().getSelected();
	Ext.Ajax.request({
		url : 'rule/pjmxwhAction/sfdyMethod.do',
		params : {
			guid : row.get('GUID'),
			sfdyText : Ext.getCmp('sfdy_sfdyArea').getValue(),
			sfmsText : Ext.getCmp('sfdy_sfms').getValue(),
			sfType : Ext.appPjdxwh.SFTYPE
		},
		success : function() {
			Ext.getCmp('sfdyWin').hide();
			var sql = " SSMX_ID = '"+ Ext.appPjmxkwh.currentNode.id +"'";
			Ext.appPjdxwh.pjdxwhGrid.loadData(Ext.appPjdxwh.appID,Ext.appPjdxwh.clsID,'','',sql);
		}
	});
}
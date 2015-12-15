/**
 * 按钮开关
 */
Ext.app.tools_on_off = function(grid, flag) {
	var fun = function() {
		for (var int = 0; int < grid.getTopToolbar().items.items.length; int++) {
			var array_element = grid.getTopToolbar().items.items[int];
			if (flag)
				array_element.enable();
			else
				array_element.disable();
		}
	}

	grid.getStore().on("load", function() {
		fun();
	});
}

/**
 * 树节点点击事件
 */
Ext.app.xzqyTreeClick = function(node) {

	Ext.app.node = node; // 树节点设置全局变量
	Ext.app.nodeId = node.id; // 树节点ID设置全局变量
	Ext.app.parentNodeId = node.parentNode.id; // 当前节点的父级节点ID设置全局变量

	Ext.app.node.expand();// 点击当前节点，子节点自动展开

	Ext.app.tools_on_off(dataGrid, true);
	Ext.app.tools_on_off(dwGrid, false);

	if (node.getDepth() == 1) {// 第1级:中国

		Ext.app.area_type = '0100202';
		Ext.app.area_type_name = '区域电网';
		var sql = " AREA_TYPE = '0100202' AND SUPER_AREA IS NULL ";// 显示区域
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);

	} else if (node.getDepth() == 2) {// 第2级:区域

		Ext.app.area_type = '0100203';
		Ext.app.area_type_name = '省级电网';
		var sql = " AREA_TYPE = '0100203' AND SUPER_AREA = '"+Ext.app.nodeId+"' ";// 显示省
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);

	} else if (node.getDepth() == 3) {// 第3级:省

		Ext.app.area_type = '0100204';
		Ext.app.area_type_name = '地市级电网';
		var sql = " AREA_TYPE = '0100204' AND SUPER_AREA = '"+Ext.app.nodeId+"' ";// 显示地市
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);

	} else if (node.getDepth() == 4) {// 第4级:地市

		Ext.app.area_type = '0100205';
		Ext.app.area_type_name = '县级电网';
		var sql = " AREA_TYPE = '0100205' AND SUPER_AREA = '"+Ext.app.nodeId+"' ";// 显示县
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);

	} else if (node.getDepth() == 5) {// 第5级:县

		Ext.app.tools_on_off(dataGrid, false);

		Ext.app.area_type = '';
		Ext.app.area_type_name = '';
		var sql = " AREA_TYPE = '9999999' ";// 不显示
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
	}
	// 调用设置初始默认值方法
	Ext.app.xzqyGridSetDefaultValues();
};

/**
 * 配电网区域表格点击事件,点击表格刷新评价线路表格
 * 
 * @param 表格对象
 * @param 行索引
 */
Ext.app.XzqyRowClick = function(g, i) {
	var record = dataGrid.getSelectionModel().getSelected();
	var xzqyGuid = '';
	if (Ext.app.node.getDepth() != 1) {
		if (record != undefined) {
			xzqyGuid = record.get("GUID");
			Ext.app.tools_on_off(dwGrid, true);// 根据节点失效单位按钮
		}
	}
	// 获取部门Id
	Ext.app.getDeptId(xzqyGuid);

	Ext.app.dwGridSetDefaultValues();
};

Ext.app.getDeptId = function(xzqyGuid) {
	var deptIds = '';
	Ext.Ajax.request({
		url : 'sysconfig/xzqywhAction/getDeptId.do',
		params : {
			xzqyGuid : xzqyGuid
		},
		async : false,
		success : function(response, options) {
			var deptIds = response.responseText;
			Ext.app.deptIds = deptIds;
			var sql = '';
			if (deptIds != null && deptIds != '') {
				sql = " DEPT_ID in (" + deptIds + ") ";
			} else {
				sql = " DEPT_ID = ''";
			}
			dwGrid.loadData(Ext.app.appID_dz, Ext.app.clsID_dz, '', '', sql);
		}
	});
}

/**
 * 区域grid默认值
 */
Ext.app.xzqyGridSetDefaultValues = function() {
	if (!Ext.app.node)
		return;
	dataGrid.setDefaultValues({
		'AREA_TYPE' : Ext.app.area_type,
		'AREA_TYPE_DSPVALUE' : Ext.app.area_type_name,
		'SUPER_AREA' : Ext.app.node.getDepth() == 1 ? null : Ext.app.nodeId
	});
};

/**
 * 单位grid默认值
 */
Ext.app.dwGridSetDefaultValues = function() {
	if (!Ext.app.node)
		return;
	var record = dataGrid.getSelectionModel().getSelected();
	if (record != undefined) {
		dwGrid.setDefaultValues({
			'AREA_ID' : record.get('GUID')
		});
	}
};

/**
 * 修正模型维护平台按钮 平台按钮索引:新增(0,1),保存(2,3),删除(4,5),撤销(6,7),发送(8,9),流程图(10,11)
 */
Ext.app.fixToolbar_qy = function() {
	var items = dataGrid.getTopToolbar().items.items;
	Ext.each(items, function(item, index) {
		if (index == 4 || index == 5 || index == 6 || index == 7 || index == 8
				|| index == 9 || index == 10 || index == 11) {
			item.hide();
		}
	})
};

Ext.app.fixToolbar_dw = function() {
	var items = dwGrid.getTopToolbar().items.items;
	Ext.each(items, function(item, index) {
		if (index == 6 || index == 7 || index == 8 || index == 9 || index == 10
				|| index == 11) {
			item.hide();
		}
	})
};

/**
 * 区域删除
 */
Ext.app.qy_grid_del = function() {
	var rows = dataGrid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.Msg.alert("系统提示", "请至少选择一项进行删除!");
		return;
	}
	Ext.Msg.confirm("请确认", "此操作将删除所有下级区域及相关单位对应关系,是否要删除所选内容?", function(button,
			text) {
		if (button == 'yes') {
			var guids = new Array();
			Ext.each(rows, function(row) {
				guids.push("'" + row.get("GUID") + "'");
			});
			Ext.Ajax.request({
				url : 'sysconfig/xzqywhAction/delQy.do',
				params : {
					guids : guids.join(",")
				},
				async : false,
				success : function(response, options) {
					var res = Ext.util.JSON.decode(response.responseText);
					if (res.success) {
						if (Ext.app.node)
							Ext.app.node.reload();
						dataGrid.store.reload();
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
 * 导入数据
 */
Ext.app.implExl = function() {
	var form1 = new Ext.form.FormPanel({
		baseCls : 'x-plain',
		labelWidth : 150,
		fileUpload : true,
		defaultType : 'textfield',
		items : [{
			xtype : 'textfield',
			fieldLabel : '请选择要导入的文件',
			name : 'userfile',
			id : 'userfile',
			inputType : 'file',
			blankText : 'File can\'t not empty.',
			anchor : '100%'
		}]
	});
	var win = new Ext.Window({
		title : '导入',
		width : 400,
		height : 100,
		minWidth : 300,
		minHeight : 100,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : form1,
		buttons : [{
			text : '确定',
			handler : function() {
				if (form1.form.isValid()) {
					if(Ext.getCmp('userfile').getValue() == ''){
					     Ext.Msg.alert('系统提示', '请选择你要导入的文件');
					     return;
					}
					form1.getForm().submit({
						url:'planning/excelAction/excelImport.do',
						method : 'post',
						params : {
							type : 'XZQY'
						},
						success:function(form, action){
							win.close();
							var res = action.result;
							if(res == undefined){
								Ext.Msg.alert("系统提示", "导入失败，请检查原因!");
								return;
							}
							var fh = res.info;
							if(fh == "tips"){
								Ext.Msg.alert("系统提示", res.gridInfo);
								return;
							}else if(fh == "fileTips" || fh == 'sysExist'){
								var jspWeb = '';
								var data = res.gridInfo;
								var param = {};
								if(fh == "fileTips"){
									param = {data: data};
									jspWeb = 'tzwhImportError.jsp';
								}else if(fh == 'sysExist'){
									var path = res.path;
									var cfId = res.cfId;
									var templateId = res.templateId;
									var temVersion = res.versionId;
									param = {data: data, path : path, cfId : cfId, versionId : temVersion, templateId : templateId};
									jspWeb = 'tzwhImportUpdate.jsp';
								}
								var windowParam = "dialogWidth:650px;dialogHeight:400px;toolbar=no;" +
										"menubar=no;scrollbars=no;resizable=no;location=no;status=no";
						    	var paraObj = window.showModalDialog(basePath+"/equipment/webViews/tzwh/"+jspWeb, param ,windowParam);
							}else if (fh=='success') {
								Ext.Msg.alert("系统提示", "导入数据成功！");
								if (Ext.app.node)
									Ext.app.node.reload();
								dataGrid.store.reload();
								return;
							}else{
								Ext.Msg.alert("系统提示", "导入数据失败！");
								return;
							}
						},
						failure : function(form, action){
							Ext.Msg.alert('系统提示', '导入数据失败!');
							win.close();
						}
					});
				}else{
				    Ext.Msg.alert("系统提示", "请选择文件后再上传！");
				}
			}
	     }, {
			text : '关闭',
			handler : function() {
				win.close();
			}
	     }]
	});
	win.show();
};
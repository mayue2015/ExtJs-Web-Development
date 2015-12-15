/**
 * 状态量信息点维护 评价模型树 树点击事件
 * 
 * @param node
 *            树节点
 */
Ext.app.ztlxxdTreeClick = function(node) {
	var selNode = leftTree.getSelectionModel().selNode;
	// 设置全局变量
	Ext.app.node = node;
	Ext.app.nodeId = node.id;
	Ext.app.nodeText = node.text;
	Ext.app.parentNodeId = node.parentNode.id;
	Ext.app.nodechildNodes = node.childNodes;
	// 点击根节点时不显示数据列表
	if (node.getDepth() == 1) {
		dataGrid.getStore().on("load", function() {
			var addButton = dataGrid.getTopToolbar().items.items[1]; // 获得表格工具栏中的新增按钮
			var exportButton = dataGrid.getTopToolbar().items.items[16]; // 获得表格工具栏中的导出按钮
			addButton.disable();
			exportButton.disable();
		});
		var sql = " SSZTL_ID = '" + Ext.app.nodeId + "' ";
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
	}
	// 选择第二级节点，展示此模型下所有状态量的信息点
	if(node.getDepth() == 2){
		dataGrid.getStore().on("load", function() {
			var addButton = dataGrid.getTopToolbar().items.items[1]; // 获得表格工具栏中的新增按钮
			var exportButton = dataGrid.getTopToolbar().items.items[16]; // 获得表格工具栏中的导出按钮
			addButton.disable();
			exportButton.disable();
		});
		// 获得此节点下的所有子节点的GUID
		var node_length = node.childNodes.length;
		var guid = "";
		for ( var i = 0; i < node_length; i++) {
			guid += "'";
			guid += node.childNodes[i].id;
			guid += "'";
			guid +=",";
		}
		guid = guid.substring(0, guid.length-1);
		// 若无子节点则弹出提示信息
		if(guid == ""){
			var sql = " SSZTL_ID = '" + guid +"' ";
			dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
			Ext.Msg.alert("提示信息","该节点下没有状态量！");
			return;
		}
		// 加载表格数据
		var sql = " SSZTL_ID in (" + guid  +") ";
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
	}
	// 选择第三级节点显示此状态量下的信息点
	if(node.getDepth() == 3) {
		// dataGrid.getTopToolbar().items.items[1].enable();
		dataGrid.getStore().on("load", function() {
			var addButton = dataGrid.getTopToolbar().items.items[1]; // 新增按钮
			addButton.enable();
			var exportButton = dataGrid.getTopToolbar().items.items[16]; // 导出按钮
 			exportButton.enable();
		});
		// 加载表格数据
		var sql = " SSZTL_ID = '" + Ext.app.nodeId + "' ";
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
		// 调用所属状态量设置默认值方法
		Ext.app.ztlxxdwhDataSetDefaultValues();
	}
};

/**
 * 状态量信息点维护 所属状态量设置默认值
 * 
 * @param node
 *            树节点
 */
Ext.app.ztlxxdwhDataSetDefaultValues = function(){
	// 第三级节点下新增信息点时有效
	if(Ext.app.node.getDepth() == 3){
		var node = Ext.app.node;
		var bm = node.attributes.attr.BM;
		dataGrid.setDefaultValues({
			'SSZTL_ID' : node.id,
			'SSZTL_ID_DSPVALUE' : node.text,
			'BM' : bm + "001"
		});
	}
};

/**
 * 状态量信息点维护 向光标处插入字符串
 * 
 * @param insertStr
 *            字符串
 */
Ext.app.sfdyInsert = function(insertStr) {
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
 * 状态量信息点维护 表格数据刷新
 * 
 * @param grid
 *            表格
 */
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

/**
 * 在数据表格 添加导出按钮
 * 
 * @param grid
 *            表格对象
 */
Ext.app.addExportBtn = function(grid) {
	var addExportBtn = new Ext.Button(
			{
				text : "导出",
				iconCls : 'excel',
				listeners : {
					click : function() {
						// 获得当前页面的显示值
						var cursor = Ext.app.dataGrid.getBottomToolbar().cursor;
						// 获得当前页面的页数
						var pageSize = Ext.app.dataGrid.getBottomToolbar().pageSize;
						// 计算得出当前为第几页
						var activePage = Math.ceil((cursor + pageSize)/ pageSize);
						// 导出事件请求路径URL
						window.location.href = basePath
								+ "rule/ztlxxdwhAction/ztlxxdExport.do?ztlId="
								+ Ext.app.node.id + "&activePage=" + activePage
								+ "&pageSize=" + pageSize;
					}
				}
			});
	grid.getTopToolbar().add("-");
	grid.getTopToolbar().add(addExportBtn);
	grid.getTopToolbar().add("-");
};

/**
 * 算法定义 显示窗体
 */
Ext.app.sfdyFun = function() {
	Ext.getCmp('sfdyWin').show();
	Ext.getCmp('sfdy_sfdyArea').setValue(Ext.app.clsf);
	Ext.getCmp('sfdy_sfmsArea').setValue(Ext.app.sfms);
}

/**
 * 算法定义 左侧树点击添加函数响应事件
 */
Ext.app.sfdyLeftTree = function(node) {
	if (!node.hasChildNodes()) {
		Ext.app.sfdyInsert(node.attributes.attr.SFNR);
	}
}

/**
 * 算法定义 初始化
 */
Ext.app.sfdyInit = function() {
	var sfdyText = 'if (){\n';
	sfdyText += '	return 1;\n';
	sfdyText += '} else{\n';
	sfdyText += '	return 0;\n';
	sfdyText += '}';
	return sfdyText;
}

/**
 * 点击添加参数树节点 文本域添加算法参数/算法变量
 */
Ext.app.sfdyAddParamTree = function(node) {
	if (!node.hasChildNodes()) {
		Ext.app.sfdyInsert(node.attributes.attr.BM);
	}
}

/**
 * 状态量信息点维护 算法定义 确定按钮 事件方法
 */
Ext.app.sfdyConfirm = function() {
	var row = dataGrid.getSelectionModel().getSelected();
	Ext.Ajax.request({
		url : 'rule/ztlxxdwhAction/sfdyMethod.do',
		params : {
			guid : row.get('GUID'),
			sfdyText : Ext.getCmp('sfdy_sfdyArea').getValue(),
			sfmsText : Ext.getCmp('sfdy_sfmsArea').getValue(),
			depth : Ext.app.node.getDepth()
//			clsf : Ext.app.clsf
		},
		success : function() {
			Ext.Msg.alert("提示信息","保存成功！");
			Ext.getCmp('sfdyWin').hide();
			if(Ext.app.node.getDepth() == 3){
				var sql = " SSZTL_ID = '" + Ext.app.nodeId + "' ";
				dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
			}
		}
	});
}

/**
 * 状态量信息点维护 算法定义 获取'处理算法'和'算法描述'
 */
Ext.app.getClsfInfo = function(record){
	if(record.get("CLSF") != null){
		Ext.app.clsf = record.get("CLSF");
	}else{
		Ext.app.clsf = "";
	}
	
	if(record.get("SFMS") != null){
		Ext.app.sfms = record.get("SFMS");
	}else{
		Ext.app.sfms = "";
	}
}
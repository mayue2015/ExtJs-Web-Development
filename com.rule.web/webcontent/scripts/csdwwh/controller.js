
//值存储
Ext.app.deptId = undefined;
/**
 * 递归遍历所选节点子节点
 */
Ext.app.getNodes = function(_node) {
	if (_node) {
		_node.expand();//展开节点
		var nodes = _node.childNodes;
		if (nodes.length == 0) {//
			return;
		}
		for (var i = 0; i < nodes.length; i++) {
			Ext.app.deptId += "'";
			Ext.app.deptId += _node.childNodes[i].id;
			Ext.app.deptId += "'";
			Ext.app.deptId += ",";
			if (!nodes[i].leaf) {// 是否为末节点
				Ext.app.getNodes(nodes[i]);
			}
		}
	}
}

/**
 * 调用获取表格数据方法
 */
Ext.app.getDataFun = function(currentNode,pdw) {
	
	var deptId = "";
	if (currentNode.leaf) {// 判断是否为叶子节点
		deptId += "'";
		deptId += currentNode.id;
		deptId += "'";
	} else if (Ext.app.deptId != undefined) {
		Ext.app.deptId = Ext.app.deptId + "'" + currentNode.id + "',";
		deptId = Ext.app.deptId.substring(9, Ext.app.deptId.length - 1);
	}
	var sql = "GLDW IN (" + deptId + ")";
	if(Ext.util.isNull(pdw)) {
		Ext.app.csdwGrid.loadData(Ext.appCsdw.appID, Ext.appCsdw.clsID, null, null,
				sql);
		if (Ext.app.pdwqyGrid.rendered) {
			Ext.app.pdwqyGrid.loadData(Ext.appPdwqy.appID, Ext.appPdwqy.clsID,
					null, null, sql);
		}
	}else {
		Ext.app.pdwqyGrid.loadData(Ext.appPdwqy.appID, Ext.appPdwqy.clsID,
				null, null, sql);
	}

	Ext.app.deptId = undefined;
}

/**
 * 点击导航树节点事件
 *
 * @param 选中节点
 */
Ext.app.navTreeNodeClick = function(node) {
	if (!Ext.util.isNull(node.id)) {
		Ext.app.currentNodeId = node.id;
		Ext.app.node = node;
		// 根节点判断
		if (node.attributes.attr) {
			Ext.app.currentNodeIsRoot = node.attributes.attr.isRoot;
		} else {
			Ext.app.currentNodeIsRoot = false;
		}
		// 按钮控制
		Ext.app.buttonPermission();
		// 表格数据查询
		if (Ext.app.getIsRootNode()) {
			Ext.app.csdwGrid.loadData(Ext.appCsdw.appID, Ext.appCsdw.clsID);
			if (Ext.app.pdwqyGrid.rendered) {
				Ext.app.pdwqyGrid.loadData(Ext.appPdwqy.appID,
						Ext.appPdwqy.clsID);
			}
		} else {
			// 调用获取子节点方法
			Ext.app.getNodes(node);
			// 调用获取表格数据方法
			Ext.app.getDataFun(node);
		}
	} else {
		Ext.app.currentNodeId = null;
	}
};

/**
 * 禁用按钮
 */
Ext.app.disableButton = function(btn) {
	btn.disable();
};

/**
 * 启用按钮
 */
Ext.app.enableButton = function(btn) {
	btn.enable();
};

/**
 * 按钮控制
 */
Ext.app.buttonPermission = function() {

	if (Ext.app.node != undefined) {
		var permission = Ext.app.node.attributes.attr.permission;
		if (permission == 'true') {// 如果有权限
			Ext.app.csdwGrid.getTopToolbar().items.each(Ext.app.enableButton);
			Ext.app.pdwqyGrid.getTopToolbar().items.each(Ext.app.enableButton);
			Ext.app.pjxlGrid.getTopToolbar().items.each(Ext.app.enableButton);
		}
	}
	if (Ext.app.node == undefined || permission != 'true') {
		Ext.app.csdwGrid.getTopToolbar().items.each(Ext.app.disableButton);
		Ext.app.pdwqyGrid.getTopToolbar().items.each(Ext.app.disableButton);
		Ext.app.pjxlGrid.getTopToolbar().items.each(Ext.app.disableButton);
	}

};

/**
 * 返回当前选中节点是否为根节点
 */
Ext.app.getIsRootNode = function() {
	return Ext.app.currentNodeIsRoot;
};

/**
 * 第2个TAB页渲染事件(该TAB页面不自动渲染)
 */
Ext.app.TabPanelRender = function() {
	if (!Ext.util.isNull(Ext.app.currentNodeId)) {
		// 查询配电网区域表格
		if (Ext.app.getIsRootNode()) {
			Ext.app.pdwqyGrid.loadData(Ext.appPdwqy.appID, Ext.appPdwqy.clsID);
		} else {
			//区分是否 点击树 
			var pdw = 'pdw';
			// 调用获取子节点方法
			Ext.app.getNodes(Ext.app.node);
			// 调用获取表格数据方法
			Ext.app.getDataFun(Ext.app.node,pdw);
//		
//			var sql = "GLDW = '" + Ext.app.currentNodeId + "'";
//			Ext.app.pdwqyGrid.loadData(Ext.appPdwqy.appID, Ext.appPdwqy.clsID,
//					null, null, sql);
		}
	}
};

/**
 * 重复值校验
 */
Ext.app.validateDate = function(xh, cspdwmc, type) {

	var url = "rule/csdwwh/validateDate.do";
	var util = new Bp.util.RequestUtils();
	var data = "";
	// 获取页面值当前修改行 去重方法 是通过现有值和原有值进行比较）
	var row = Ext.app.pdwqyGrid.getSelectionModel().getSelections();
	if (type == 'new') {
		data = util.sendRequest(url, {
			treeGuid : Ext.app.currentNodeId,
			xh : xh,
			cspdwmc : cspdwmc
		});
		var obj = Ext.decode(data);
		var xhFlag = obj.xh;
		var mcFlag = obj.mc;
		if (xhFlag != 0) {
			Ext.Msg.alert('系统提示', '该序号已存在,请重新输入!');
			return false;
		} else if (mcFlag != 0) {
			Ext.Msg.alert('系统提示', '该名称已存在,请重新输入!');
			return false;
		}
	} else {
		// 原值
		var xhValue = row[0].get("XH");
		var cspdwmcValue = row[0].get("CSPDWMC");

		if (xhValue != xh && cspdwmcValue == cspdwmc) {
			data = util.sendRequest(url, {
				treeGuid : row[0].get('GLDW'),
				xh : xh,
				cspdwmc : ""
			});
		} else if (xhValue == xh && cspdwmcValue != cspdwmc) {
			data = util.sendRequest(url, {
				treeGuid : Ext.app.currentNodeId,
				xh : "",
				cspdwmc : cspdwmc
			});
		} else if (xhValue != xh && cspdwmcValue != cspdwmc) {
			data = util.sendRequest(url, {
				treeGuid : Ext.app.currentNodeId,
				xh : xh,
				cspdwmc : cspdwmc
			});
		} else {// 如果两个都未修改
			return true;
		}
		var obj = Ext.decode(data);
		var xhFlag = obj.xh;
		var mcFlag = obj.mc;
		if (xhFlag != 0) {
			Ext.Msg.alert('系统提示', '该序号已存在,请重新输入!');
			return false;
		} else if (mcFlag != 0) {
			Ext.Msg.alert('系统提示', '该名称已存在,请重新输入!');
			return false;
		}
	}
}

/**
 * 配电网区域表格点击事件,点击表格刷新评价线路表格
 *
 * @param 表格对象
 * @param 行索引
 */
Ext.app.PdwqyRowClick = function(g, i) {
	Ext.app.pdwqyGuid = g.getStore().getAt(i).get("GUID");
	//var sql = "YXDW = '" + Ext.app.node.text + "'";
	//点击配电网加载关联线路数据
	var sql = "PDWQYID = '" + Ext.app.pdwqyGuid + "'";
	Ext.app.pjxlGrid.loadData(Ext.appPjxl.appID, Ext.appPjxl.clsID, null, null, sql);
};

/**
 * 获取当前选中节点id
 */
Ext.app.getCurrentNodeId = function() {
	return Ext.app.currentNodeId;
};

/**
 * 获取当前选择配电网区域GUID
 */
Ext.app.getPdwqyGuid = function() {
	return Ext.app.pdwqyGuid;
};

/**
 * 获取当前用户部门ID
 */
Ext.app.getUserDeptId = function() {
	return Ext.app.user.getDeptId();
};

/**
 * 删除事件执行之后解决页码报错问题(公共方法)
 */
Ext.app.afterDelete = function(grid,method){
	var record = grid.getSelectionModel().getSelections();
	Ext.app.record = record;
	if (record.length == 0) {
		Ext.Msg.alert("系统提示", "请至少选择一条数据!");
		return;
	}
	Ext.Msg.confirm("系统确认", "确实要删除所选的 " + record.length + " 条数据吗？", function(button, text) {
		if (button == 'yes') {
			var guid = "";
			var guids = [];
			var objRowId = [];
			// 清空数组
			grid.businessDTO.remove = [];
			for (var i = 0; i < record.length; i++) {
				grid.businessDTO.remove.push(record[i].data);
				guid += "'";
				guid += record[i].get('GUID');
				guid += "'";
				guid += ",";
				guids.push(record[i].get('GUID'));
				objRowId.push(record[i].id);
			}
			guid = guid.substring(0, guid.length - 1);
			
			// 删除前事件
			var args = {
				count : record.length,
				objids : guid
			};
			
			if (grid.fireEvent("beforedelete", grid, args) !== false) {
				// 保存、更新结果集
				Ext.Ajax.request({
					url : "rule/csdwwh/" + method ,
					method : "post",
					params : {
						guids : guids
					},
					async : false,
					success : function(response,options) {
						// 删除执行之后解决页码报错问题:
						// 此处需要处理分页的逻辑，如果本页的所有数据都删除了且不是第一页的
						// 话需要将页码设置到上一页,如果后续调用了表格加载操作也不会导致错误
						if (grid.store.lastOptions.params) {
							var start = grid.store.lastOptions.params.start; //起始行数
							var limit = grid.store.lastOptions.params.limit; //每页行数
							if (limit != 0) {
								var rowCount = grid.store.getCount(); //当前数据条数
								// 删除数据条数与当前数据条数一致，处理条数
								if (Ext.app.record.length == rowCount && start != 0) {
									grid.store.lastOptions.params.start = start - limit;
									grid.store.baseParams.start = start - limit;
									grid.store.baseParams.pageNo = grid.store.baseParams.pageNo - 1;
									grid.store.lastOptions.params.pageNo = grid.store.lastOptions.params.pageNo - 1;
								}
							}
						}
						
						// 先清理一遍内存的数据
						var md = grid.store.getModifiedRecords();
						for (var i = 0; i < objRowId.length; i++) {
							var record = grid.store.getById(objRowId[i]);
							if (md.contains(record)) {
								md.removeAt(md.indexOf(record));
							}
							grid.store.remove(record);
						}
						
						// 弹出提示对话框
						Ext.Msg.alert("系统消息", "删除记录成功!", function(btn) {
							if(btn == 'yes'){
								// 强制执行afterdelete事件
								grid.fireEvent('afterdelete',grid, args);
							}
							// 删除后重新加载表格数据
							grid.store.reload();
						});
					},
					failure : function(form, action) {
						// 弹出错误对话框
						Ext.Msg.alert(form.statusText + " " + form.status,"系统出现未知错误，请与管理员联系!",function() {
							// 强制执行afterdelete事件
							grid.fireEvent('afterdelete',grid, args);
						});
						// 删除后重新加载表格数据
						grid.store.reload();
					}
				});	
			}
		}
	});
}

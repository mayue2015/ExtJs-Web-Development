
//存放所有子节点guid  
Ext.app.guid=undefined;
/**
 * 递归获取所选节点下所有子节点GUID
 */
Ext.app.getNodes = function(_node) {

	if (_node) {
		var nodes = _node.childNodes;
		if (nodes.length == 0) {
			return;
		}	
		for (var i = 0; i < nodes.length; i++) {		
			Ext.app.guid += "'";
			Ext.app.guid += _node.childNodes[i].id;
			Ext.app.guid += "'";
			Ext.app.guid += ",";
			if (!nodes[i].leaf) {//如果节点不为叶子节点则递归调用
				Ext.app.getNodes(nodes[i]);
			}
		}
	}
}

/**
 * 执行表格数据加载
 */
Ext.app.getDataFun=function(){
	
	var guids="";
	if(Ext.app.node.leaf){//判断是否为叶子节点
		guids+="'";
		guids+=Ext.app.node.id;
		guids+="'";
	}else if(Ext.app.guid!=undefined){
		//添加自身节点id
		Ext.app.guid=Ext.app.guid+"'"+Ext.app.node.id+"'"+",";
		
		guids=Ext.app.guid.substring(9,Ext.app.guid.length-1);
	}
	//执行查询
	var sql = queryPanel.getSqlString() +" AND FPJXMID in (" + guids  +") AND PJXMLX = '1700103' ";
	dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '',sql);
	//每执行一次查询结束，将全局变量置为默认值 undefined
	Ext.app.guid=undefined;
}


/**
 * 评价标准维护 项目导航树 点击事件
 * 
 * @param node 
 */
Ext.app.PjbzwhProTree = function(node) {
	if (!Ext.util.isNull(node.id)) {
		
		var selNode = leftTree.getSelectionModel().selNode;
		Ext.app.nodeText = node.text;
		Ext.app.node = node;
		Ext.app.nodeId = node.id;
		
		//调用递归方法获取所选节点下所有的子节点 GUID
		Ext.app.getNodes(node);
		//调用获取表格数据方法
		Ext.app.getDataFun();		
	}
};

/**
 * 评价标准维护 表格面板添加增加按钮
 * 
 * @param {Ext.ux.BDGrid} 表格对象
 */
Ext.app.addClick = function() {
	if (Ext.util.isNull(Ext.app.nodeText)) {
		Ext.Msg.alert('系统提示', '请选择父级项目！');
	} else {
		new Ext.app.EditWindow({
			title : "评价标准维护",
			width : 600,
			height : 520,
			winArgs : {
				appID : Ext.app.dataGrid.appID,
				clsID : Ext.app.dataGrid.clsID,
				type : "new",
				grid : Ext.app.dataGrid,
				nodeText : Ext.app.nodeText
			}
		}).show();
	}
	return false;
}

/**
 * 评价标准维护 表格面板添加查询按钮
 * 
 * @param {Ext.ux.BDGrid} 表格对象
 */
Ext.app.queryClick = function() {

	if(Ext.app.node==undefined){
		
		//暂不明确查询设计要求结果暂保留两个
		//1 Ext.Msg.alert('系统提示','请选择树节点后在进行查询操作！');
		//2 现使用中的
		var sql = queryPanel.getSqlString() +" AND PJXMLX = '1700103' ";
		dataGrid.loadData(Ext.app.dataGrid.appID, Ext.app.dataGrid.clsID, '', '',sql);
		
	}else{
		//调用获取所有子节点方法
		Ext.app.getNodes(Ext.app.node);
		//调用获取表格数据方法
		Ext.app.getDataFun();
	}
}

/**
 * 评价标准维护 表格面板添加重置按钮
 * 
 * @param {Ext.ux.BDGrid} 表格对象
 */
Ext.app.restClick = function() {
	Ext.getCmp('queryPanel').form.reset();
}

/**
 * 在表格工具条上添加修改按钮
 * 
 * @param {Ext.ux.BDGrid} 表格对象
 */
Ext.app.xgClick = function() {
	var row = Ext.app.dataGrid.getSelectionModel().getSelections();
	if (row.length == 0) {
		Ext.MessageBox.alert("系统提示", "请选择一条数据!");
		return;
	} else if (row.length > 1) {
		Ext.MessageBox.alert("系统提示", "只能选择一项进行修改!");
		return;
	}
	new Ext.app.EditWindow({
		title : "评价标准维护",
		width : 600,
		height : 490,
		winArgs : {
			appID : Ext.app.dataGrid.appID,
			clsID : Ext.app.dataGrid.clsID,
			objID : row[0].get("GUID"),
			type : "update",
			grid : Ext.app.dataGrid
		}
	}).show();
	return false;
}

/**
 * 评价标准维护 表格面板添加删除按钮
 * 
 * @param {Ext.ux.BDGrid} 表格对象
 */
Ext.app.removeClick = function() {
	var rows = Ext.app.dataGrid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.Msg.alert("系统提示", "请至少选择一项!");
		return;
	}
	Ext.Msg.confirm("请确认", "是否要删除所选内容", function(button, text) {
		if (button == 'yes') {
			var guids = new Array();
			// 遍历选中行结果集
			Ext.each(rows, function(row) {
				guids.push("'" + row.get("GUID") + "'");
			});
			Ext.Ajax.request({
				url : 'rule/pjbzwhAction/pjbzwhDel.do',
				params : {
					guid : guids.join(",")
				},
				async : false,
				success : function(response, options) {
					// 删除后重新加载数据
					Ext.app.dataGrid.store.reload();
					// 刷新树
					if (!Ext.util.isNull(Ext.app.lefttree.getRootNode())) {
						Ext.app.lefttree.getRootNode().reload();
					}
					Ext.Msg.alert('系统提示', '删除成功！');
				}
			});
		}
	});
};

/**
 * 保存进行项目类型校验 
 */
Ext.app.validateXmlx = function(selNode,win){
	var xmlx = win.dataSource.data.PJXMLX;
	var depth = selNode.getDepth();
	if(depth !=1){
		if(xmlx == '1700101'){
			Ext.Msg.alert('系统提示','中间级项目不能增加上级类型项目！');
			return false;
		}
	}
	
	
};

Ext.app.saveDetail = Ext.emptyFn

Ext.app.returnMain = Ext.emptyFn

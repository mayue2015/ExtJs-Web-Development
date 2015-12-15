/**
 * 评价规则维护 模型指标树 树节点点击事件
 * 
 * @param node 树节点
 */
Ext.app.pjgzTreeClick = function(node){
		var selNode = leftTree.getSelectionModel().selNode;
		
		Ext.app.node = node; //树节点设置全局变量
		Ext.app.nodeId = node.id; //树节点ID设置全局变量
		Ext.app.parentNodeId = node.parentNode.id; //当前节点的父级节点ID设置全局变量
		// 节点自动展开
		Ext.app.node.expand();
		// 点击第一级和第二级节点时新增按钮失效，加载数据
		if (node.getDepth() == 1 || node.getDepth() == 2) {
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].disable();
			});
			var sql = " PJXZID = '"+ node.id +"' ";
			datagrid.loadData(Ext.app.appID2,  Ext.app.clsID,'','',sql);
		}else if(node.getDepth() == 3){
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].enable();
			});
			var sql = " PJXZID = '"+ node.id +"' ";
			datagrid.loadData(Ext.app.appID2,  Ext.app.clsID,'','',sql); 
			// datagrid.setOrderType('desc'); 排序：此对象不支持该方法！
			
			// 调用设置初始默认值方法(评价细则)
			Ext.app.pjgzwhGridSetDefaultValues();
		}else{
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].enable();
			});
			var sql = " PJXZID = '"+ node.parentNode.id +"' AND XZZBID = '"+ node.id +"' ";
			datagrid.loadData(Ext.app.appID,  Ext.app.clsID,'','',sql); 
			// 调用设置初始默认值方法(细则指标)
			Ext.app.pjgzwhGridSetDefaultValues();
		}
};

/**
 * 评价规则维护 评价细则/细则指标 设置默认值
 * 
 * @param node 树节点
 */
Ext.app.pjgzwhGridSetDefaultValues = function() {
	if (!Ext.util.isNull(Ext.app.node)) {
		if(Ext.app.node.getDepth() == 3){
			var node = Ext.app.node;
			datagrid.setDefaultValues({ //评价细则设置默认值
				'PJXZID' : node.id,
				'PJXZID_DSPVALUE' : node.text,
				'XZZBID' : null
			});
		}
		if(Ext.app.node.getDepth() == 4){
			var node = Ext.app.node;
			datagrid.setDefaultValues({ //细则指标设置默认值
				'XZZBID' : node.id,
				'XZZBID_DSPVALUE' : node.text,
				'PJXZID' : node.parentNode.id
			});
		}
	}
};

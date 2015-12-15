/**
 * 文档类型维护-文档类型导航树-树节点点击事件
 * 
 * @param node 树节点
 */
Ext.app.wdlxwhTreeClick = function(node){
		var selNode = leftTree.getSelectionModel().selNode;
		Ext.app.node = node; //树节点设置全局变量
		Ext.app.nodeId = node.id; //树节点ID设置全局变量
		Ext.app.parentNodeId = node.parentNode.id; //当前节点的父级节点ID设置全局变量
		//点击当前节点，子节点自动展开
		Ext.app.node.expand();
		
		//点击树节点加载数据
		if (node.getDepth() == 1) {
			//点击根节点时新增/保存/删除/撤销按钮变灰失效
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].disable();//新增失效
				datagrid.getTopToolbar().items.items[3].disable();//保存失效
				datagrid.getTopToolbar().items.items[5].disable();//删除失效
				datagrid.getTopToolbar().items.items[7].disable();//撤销失效
			});
			
			//点击根节点加载数据
			var sql = " TYPE_PARENT IS NULL ";
			datagrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
			
			//根节点下新增数据设置默认值
			datagrid.setDefaultValues({ 
				'TYPE_PARENT' : ''
			});
		}else if(node.getDepth() >= 2) {
			//点击第二级节点及其子节点时按钮区恢复有效
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].enable();//新增有效
				datagrid.getTopToolbar().items.items[3].enable();//保存有效
				datagrid.getTopToolbar().items.items[5].enable();//删除有效
				datagrid.getTopToolbar().items.items[7].enable();//撤销有效
			});
			
			//加载(刷新)数据
			var sql = " TYPE_PARENT = '"+ node.id +"' ";
			datagrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql); 
			
			//调用设置初始默认值方法
			Ext.app.wdlxwhGridSetDefaultValues();
		}
};

/**
 * 文档类型维护-父类型-设置默认值
 * 
 * @param
 */
Ext.app.wdlxwhGridSetDefaultValues = function() {
	if (Ext.app.node != null) {
		if(Ext.app.node.getDepth() >= 2){
			datagrid.setDefaultValues({ 
				'TYPE_PARENT' : Ext.app.nodeId
			});
		}
	}
};

/**
 * 获取数据库表中文档类型名称/父类型GUID查询结果集合
 */
Ext.app.dataJson = function() {
	Ext.Ajax.request({
		url : 'sysconfig/wdlxwhAction/getData.do',
		method : 'post',
		success : function(response, options) {
			var value = Ext.util.JSON.decode(response.responseText);
			Ext.app.data = value;
		}
	});
};


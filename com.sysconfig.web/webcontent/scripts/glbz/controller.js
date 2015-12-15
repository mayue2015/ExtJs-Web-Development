/**
 * 管理标准-文档类型导航树-树节点点击事件
 * 
 * @param node 树节点
 */
Ext.app.glbzTreeClick = function(node){
		var selNode = leftTree.getSelectionModel().selNode;
		Ext.app.node = node; //树节点设置全局变量
		Ext.app.nodeId = node.id; //树节点ID设置全局变量
		Ext.app.parentNodeId = node.parentNode.id; //当前节点的父级节点ID设置全局变量
		//点击当前节点，子节点自动展开
		Ext.app.node.expand();
		
		//点击第一级和第二级节点时新增/保存按钮变灰失效，加载数据
		if (node.getDepth() == 1 || node.getDepth() == 2) {
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].disable();//新增失效
				datagrid.getTopToolbar().items.items[3].disable();//保存失效
			});
			//加载表格数据
			var sql = " FLAG_BZ = 001 ";
			datagrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
		}else if(node.getDepth() == 3){
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].enable();
				datagrid.getTopToolbar().items.items[3].enable();
			});
			//加载表格数据
			var sql = " FLAG_BZ = 001 ";
			datagrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
			//调用设置初始默认值方法
			Ext.app.glbzGridSetDefaultValues();
		}else if(node.getDepth() == 4){
			//点击第4级节点时按钮恢复有效
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].enable();
				datagrid.getTopToolbar().items.items[3].enable();
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
			
			//判断有无子节点
			if(guid == ""){
				//加载表格数据
				var sql = " TYPE_GUID = '"+ Ext.app.nodeId +"' ";
				datagrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
				
				//调用设置初始默认值方法
				Ext.app.glbzGridSetDefaultValues();
			}else{
				var sql = " TYPE_GUID in (" + guid  +") OR TYPE_GUID = '"+ Ext.app.nodeId +"'";
				datagrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
				
				//调用设置初始默认值方法
				Ext.app.glbzGridSetDefaultValues();
			}
		}else if(node.getDepth() >= 5){
			datagrid.getStore().on("load", function() {
				datagrid.getTopToolbar().items.items[1].enable();
				datagrid.getTopToolbar().items.items[3].enable();
			});
			
			var node_length = node.childNodes.length;
			var guid = "";
			for ( var i = 0; i < node_length; i++) {
				guid += "'";
				guid += node.childNodes[i].id;
				guid += "'";
				guid +=",";
			}
			guid = guid.substring(0, guid.length-1);
			
			if(guid == ""){
				var sql = " TYPE_GUID = '"+ Ext.app.nodeId +"' ";
				datagrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
				Ext.app.glbzGridSetDefaultValues();
			}else{
				var sql = " TYPE_GUID in (" + guid  +") OR TYPE_GUID = '"+ Ext.app.nodeId +"'";
				datagrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);
				Ext.app.glbzGridSetDefaultValues();
			}
		}
};

/**
 * 管理标准-设置默认值
 * 
 * @param
 */
Ext.app.glbzGridSetDefaultValues = function() {
	if (Ext.app.node != null) {
		if(Ext.app.node.getDepth() >= 3){
			var node = Ext.app.node;
			var fbsj = Ext.util.Format.date(new Date(), "Y-m-d H:i:s");
			datagrid.setDefaultValues({ 
				'TYPE_GUID' : node.id,
				'FBR' : user_name,
				'FLAG_BZ' : '001',
				'FBSJ' : fbsj,
				'FBDW' : deptguid,
				'FBDW_DSPVALUE' : dept_name
			});
		}
	}
};

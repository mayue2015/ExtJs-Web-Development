Ext.app.node = null;
Ext.app.nodeId = null;
Ext.app.nodeText = null;

/**
 * 左侧导航树面板-行政区划
 */
Ext.app.selectedTreeNode = '';
Ext.app.nodeText = '';
Ext.app.tree = function() {
	var treePanel = new Ext.tree.TreePanel({
		region : 'west',
		id : 'treePanel',
		width : "17%",
		minSize : 200,
		maxSize : 400,
		title : '节电量项目类型管理',
		animate : true,
		rootVisible : false,
		containerScroll : true,
		collapsible : true,
		border : true,
		split : true,
		autoScroll : true
	});

	/**
	 * 根节点-异步树
	 */
	var root = new Ext.tree.AsyncTreeNode({
		id : "root", 
		expanded : true,
		text : "root",
		iconCls : 'treeroot'
	});

	/**
	 * 设置根节点
	 */
	treePanel.setRootNode(root);

	/**
	 * 装载树
	 */
	treePanel.on('beforeload', function(node) {
		var nodeID = node.id;
		if(nodeID == "root") {
			treePanel.loader.dataUrl = 'pmv/projectTypeAction/loadTree.do';
		}else{
			treePanel.loader.dataUrl = 'pmv/projectTypeAction/loadTreeNode.do';
		}
	});
	
	//默认选中第一个节点
	treePanel.on('load', function(node) {
        if(treePanel.getRootNode() == node){
    	   var firstNode = node.firstChild;
    	   if(firstNode != null) {
    		   var getPath = firstNode.getPath();
    		   treePanel.selectPath(getPath, null, function(bSuccess, bNode) {
                   bNode.fireEvent("click",bNode);
    		   });
    	   }
        }
	});

	//添加展开节点事件
	treePanel.on('expandnode', function(node) {
		var leafNode = Ext.getCmp('treePanel').getNodeById(node.id);
		Ext.getCmp('treePanel').getSelectionModel().select(leafNode);
	});

	//添加收起节点事件
	treePanel.on('collapsenode', function(node) {
		var leafNode = Ext.getCmp('treePanel').getNodeById(node.id);
		Ext.getCmp('treePanel').getSelectionModel().select(leafNode);
	});
	
	//添加点击树节点事件
	treePanel.on('click', function(node) {
		if(node.id == '-1'){
			 //选中上级单位时：新增/导入按钮置灰
		     Ext.getCmp("add").setDisabled(true);
		     Ext.getCmp("edit").setDisabled(true);
		     Ext.getCmp("remove").setDisabled(true);
		}else{
		     Ext.getCmp("add").setDisabled(false);
		     Ext.getCmp("edit").setDisabled(false);
		     Ext.getCmp("remove").setDisabled(false);
		}
		Ext.app.node = node;
		Ext.app.nodeId = node.id;
		Ext.app.nodeText = node.text;

		Ext.app.dataGrid.store.load();
		//查询信息
//		Ext.app.queryData();
	});

	return treePanel;
}
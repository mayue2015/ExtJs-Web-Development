//管理标准： 文档类型导航树
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
	region : 'west',
	autoHeight : false,
	autoScroll : true,
	animate : true,
	width : "15%",
	height : "100%",
	title : '文档类型',
	service : 'glbz_tree_service',
	filterStr : '',
	root : new Ext.tree.AsyncTreeNode({
		text : '文档类型',
		expanded : true,
		id : 'treeroot',
		iconCls : 'treeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader',
		dataUrl : ''
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
leftTree.on('click', Ext.app.glbzTreeClick);

//管理标准-表格数据展示-表格组件
var datagrid = new Ext.ux.BDGrid({
	region : "center",
	title : '管理标准',
	detailView : false,
	listeners : {
		afterrender : function() {
			for(var i=10; i < 13; i+=2){
				this.getTopToolbar().items.items[i].hide();
			}
			this.getTopToolbar().items.items[9].hide();
			this.getTopToolbar().items.items[11].hide();
			
			var grid = this;//默认使增加&保存按钮变灰失效
			this.getStore().on("load", function() {
				grid.getTopToolbar().items.items[1].disable();//新增
				grid.getTopToolbar().items.items[3].disable();//保存
			});
			
			//加载数据表格
			var sql = " FLAG_BZ = 001 ";
			this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
		},
		aftersave : function(){
			var node = leftTree.getSelectionModel().selNode;
			if(node.getDepth() >= 3){
				//刷新树节点
				//Ext.app.node.reload();
				//获得此节点下的所有子节点的GUID
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
					//加载表格数据
					var sql = " TYPE_GUID = '"+ Ext.app.nodeId +"' ";
					this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
				}else{
					//刷新表格数据
					var sql = " TYPE_GUID in (" + guid  +") OR TYPE_GUID = '"+ Ext.app.nodeId +"' ";
					this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
				}
			}
		},
		afterdelete : function() {
			//刷新数据表格
			datagrid.store.reload();
			//刷新根节点
			//leftTree.getRootNode().reload();
			//表格数据删除之后事件
			var node = leftTree.getSelectionModel().selNode;
			if(node != null){
				if(node.getDepth() >= 1){
					//加载(刷新)数据
					datagrid.store.reload();
				}
			}
		}
	}
    
});

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [leftTree,datagrid]
});
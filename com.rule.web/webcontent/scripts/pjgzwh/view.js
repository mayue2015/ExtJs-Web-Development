// 评价规则维护： 模型指标导航树
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
	region : 'west',
	autoHeight : false,
	autoScroll : true,
	animate : true,
	width : "14.8%",
	height : "100%",
	title : '模型指标树',
	service : 'pjgzwh_TreeService',
	filterStr : '',
	root : new Ext.tree.AsyncTreeNode({
		text : '评价模型',
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
leftTree.on('click', Ext.app.pjgzTreeClick);

// 评价规则维护：表格数据展示
var datagrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			for(var i=10; i < 13; i+=2){
				this.getTopToolbar().items.items[i].hide();
			}
			this.getTopToolbar().items.items[9].hide();
			this.getTopToolbar().items.items[11].hide();
			
			var grid = this;// 默认使增加按钮失效
			this.getStore().on("load", function() {
				grid.getTopToolbar().items.items[1].disable();
			});
			
			var sql = " PJXZID = '"+ Ext.app.nodeId +"' ";
			this.loadData(Ext.app.appID2, Ext.app.clsID,'','',sql);
		},
		aftersave : function(){
			var node = leftTree.getSelectionModel().selNode;
			if(node.getDepth() == 3){
				Ext.app.node.reload();
				var sql = " PJXZID = '"+ Ext.app.nodeId +"' ";
				this.loadData(Ext.app.appID2, Ext.app.clsID,'','',sql);
			}else if(node.getDepth() == 4){
				Ext.app.node.reload();
				var sql = " XZZBID = '"+ Ext.app.nodeId +"' ";
				this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
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
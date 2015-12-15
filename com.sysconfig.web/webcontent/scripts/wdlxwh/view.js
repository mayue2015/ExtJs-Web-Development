// 文档类型维护： 文档类型导航树
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
	service : 'wdlxwh_tree_service',
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
leftTree.on('click', Ext.app.wdlxwhTreeClick);

// 文档类型维护：表格数据展示
var datagrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			//加载文档类型名称/父类型GUID数据集
			Ext.app.dataJson();
			//隐藏平台提供功能按钮
			for(var i=10; i < 13; i+=2){
				this.getTopToolbar().items.items[i].hide();
			}
			this.getTopToolbar().items.items[9].hide();
			this.getTopToolbar().items.items[11].hide();
			
			//默认使新增/保存/删除/撤销按钮变灰失效
			var grid = this;
			this.getStore().on("load", function() {
				grid.getTopToolbar().items.items[1].disable();//新增
				grid.getTopToolbar().items.items[3].disable();//保存
				grid.getTopToolbar().items.items[5].disable();//删除
				grid.getTopToolbar().items.items[7].disable();//撤销
			});
			
			//加载数据表格
			var sql = " TYPE_PARENT IS NULL ";
			this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
		},
		beforesave : function(a,b) { //数据保存前非空/去重校验
			if(b.adddata.length != 0){ //新增类型名称时
				for(var j = 0; j < b.adddata.length; j++){
					var typeName = b.adddata[j].TYPE_NAME;
					if(typeName == null ||　typeName == ""){
						Ext.MessageBox.alert('系统提示','请输入文档类型名称！');
						return false;
					}
					
					//新增：检查新增页面数据中是否有重复
					for(var n = j+1; n < b.adddata.length; n++){	
						if(typeName == b.adddata[n].TYPE_NAME ){
							 Ext.MessageBox.alert('系统提示','文档类型名称重复，请您重新输入!');
							 return false;
						}
					}
					
					//新增：检查数据库表中是否有类型名称重复数据
					for(var i = 0; i < Ext.app.data.length; i++){
						var type_parent = Ext.app.data[i].type_parent;
						var type_name = Ext.app.data[i].type_name;
						if(Ext.app.nodeId == type_parent && typeName == type_name){
							Ext.MessageBox.alert('系统提示','文档类型名称已存在，请您重新输入!');
							return false;
						}
					}
				}				
			}
			if(b.edtdata.length != 0){ //修改类型名称时
				for(var j = 0; j < b.edtdata.length; j++){
					var typeName = b.edtdata[j].TYPE_NAME;
					if(typeName == null || typeName == ""){
						Ext.MessageBox.alert('系统提示','文档类型名称不能为空！');
						return false;
					}
					//修改：检查修改页面数据中是否有重复
					for(var n = j+1; n < b.edtdata.length; n++){
						if(typeName != undefined && b.edtdata[n].TYPE_NAME != undefined){
							if(typeName == b.edtdata[n].TYPE_NAME ){
								 Ext.MessageBox.alert('系统提示','文档类型名称重复，请重新修改!');
								 return false;
							}
						}
					}
					
					//修改：检查数据库表中是否有类型名称重复数据		
					for(var i = 0; i < Ext.app.data.length; i++){
						var type_parent = Ext.app.data[i].type_parent;
						var type_name = Ext.app.data[i].type_name;
						if(Ext.app.nodeId == type_parent && typeName == type_name){
							Ext.MessageBox.alert('系统提示','文档类型名称已存在，请您重新修改!');
							return false;
						}
					}
				}				
			}	
		},
		aftersave : function() {
			//加载文档类型名称/父类型GUID数据集
			Ext.app.dataJson();
			var node = leftTree.getSelectionModel().selNode;
			//表格数据保存之后事件
			if(node == null){
				//刷新根节点
				leftTree.getRootNode().reload();
				//加载(刷新)数据
				var sql = " TYPE_PARENT IS NULL ";
				this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
			}else if(node.getDepth() == 1){
				//刷新根节点
				leftTree.getRootNode().reload();
				//加载(刷新)数据
				var sql = " TYPE_PARENT IS NULL ";
				this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
			}else if(node.getDepth() >= 2){
				//刷新节点
				Ext.app.node.reload();
				//加载(刷新)数据
				var sql = " TYPE_PARENT = '"+ Ext.app.nodeId +"' ";
				this.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);
			}
		},
		afterdelete : function() {
			//加载文档类型名称/父类型GUID数据集
			Ext.app.dataJson();
			//表格数据删除之后事件
			var node = leftTree.getSelectionModel().selNode;
			if(node != null){
				if(node.getDepth() >= 1){
					//刷新根节点
					//leftTree.getRootNode().reload();
					//刷新子节点
					Ext.app.node.reload();
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
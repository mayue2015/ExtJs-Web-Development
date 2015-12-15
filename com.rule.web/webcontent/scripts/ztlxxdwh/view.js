// 状态量信息点维护： 评价模型树
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
    region : 'west',
    auotHeight : false,
    autoScroll : true,
    animate : true,
    width : "15%",
    height : "100%",
    title : '评价模型',
    service : 'ztlxxdwh_leftTree_TreeService',
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
Ext.app.leftTree = leftTree;
leftTree.on('click',Ext.app.ztlxxdTreeClick);

// 状态量信息点维护： 表格数据展示
var dataGrid = new Ext.ux.BDGrid({
	region : 'center',
	detailView : false,
	listeners : {
		afterrender : function() {
			// 隐藏封装工具栏中的部分按钮和分割线
			for(var i=8; i<13; i+=2){
				this.getTopToolbar().items.items[i].hide();
			}
			this.getTopToolbar().items.items[9].hide();
			this.getTopToolbar().items.items[11].hide();
			
			Ext.app.addRefreshBtn(this);// 添加刷新按钮
			Ext.app.addExportBtn(this);// 添加导出按钮
			
			// Ext.app.xxdmc = grid.data.MC;
			// 默认使增加&导出按钮失效变灰
			var grid = this;
			this.getStore().on("load", function() {
				var addButton = grid.getTopToolbar().items.items[1];
				var exportButton = grid.getTopToolbar().items.items[16];
				addButton.disable();
				exportButton.disable();
			});
			
			//添加是否点击新增按钮事件
			this.getStore().on('add',function(s,rs){
				Ext.each(rs, function(record) {
					record.isAdd = true;
				});
			})
			
			// 根据SSZTL_ID加载表格数据
			var sql = " SSZTL_ID = '" + Ext.app.nodeId + "' ";
			this.loadData(Ext.app.appID,Ext.app.clsID,'','',sql);
			
			// "处理算法-算法定义/查看算法"据链接
			new Ext.util.GridColumnLinkRenderer({
				grid : grid,
				dataIndex : "CLSF",
				displayRenderer : function(v, m, r, ri, ci, s) {
					var d;
					if (Ext.util.isNull(v)) {
						d = "算法定义";
					} else {
						d = "查看算法";
					}
					return d;
				},
				onClick : function(record) {
					if(record.isAdd){
						Ext.Msg.alert("提示信息","请先保存数据");
						return;
					}
					Ext.app.xxdmc = record.get("MC");
					Ext.app.getClsfInfo(record);
					Ext.app.sfdyFun();
				}
			}).render();
			
			// "数据来源-编辑数据"据链接
			new Ext.util.GridColumnLinkRenderer({
				grid : grid,
				dataIndex : "SJLY",
				displayRenderer : function(v, m, r, ri, ci, s) {
					return "编辑数据";
				},
				onClick : Ext.app.sjlyBjsjOnClick
			}).render();
		},
		aftersave : function() {
			if(Ext.app.node.getDepth() == 3){
				var sql = " SSZTL_ID = '" + Ext.app.nodeId + "' ";
				dataGrid.loadData(Ext.app.appID,Ext.app.clsID,'','',sql);
			}
		}
	}
});
Ext.app.dataGrid = dataGrid;

// 算法定义弹出窗体 ：左侧算法库模型树 
new Ext.tree.TreePanel({
	id : 'sfdyLeftTree',
	region : 'west',
	width : 200,
	title : '双击选择函数',
	service : 'ztlxxd_sfdy_TreeService',
	root : new Ext.tree.AsyncTreeNode({
		text : '算法库',
		expanded : true,
		id : 'treeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader'
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
Ext.getCmp('sfdyLeftTree').on('dblclick', Ext.app.sfdyLeftTree);

new Ext.form.FormPanel({
	id : 'sfdyForm',
	height : 210,
	border : false,
	region : 'north',
	autoScroll : false,
	items : Ext.app.sfdyFormItems
});

new Ext.form.FormPanel({
	id : 'sfdyMain',
	region : 'center',
	border : false,
	layout : 'form',
	height : 100,
	items : Ext.app.sfdySfmsItems,
	buttons : Ext.app.sfdyButtons
});

// 算法定义窗体 右侧面板
new Ext.Panel({
	id : 'sfdyCenterPanel',
	layout : 'border',
	frame : true,
	border : false,
	title : '-',
	region : 'center',
	height : 610,
	width : 300,
	items : [ Ext.getCmp('sfdyForm'),
	          Ext.getCmp('sfdyMain') ]
})
Ext.getCmp('sfdyCenterPanel').on('render',function(t){
	t.setTitle('计算对象： ' + Ext.app.xxdmc); //计算对象标题动态传值
});

// 算法定义：弹出窗体 
new Ext.Window({
	id : 'sfdyWin',
	title : '算法定义',
	layout : 'border',
	width : 700,
	height : 450,
	x : 250,
	y : 33,
	closeAction : 'hide',
	autoScroll : true,
	plain : true,
	modal : true,
	resizable : false,
	items : [ Ext.getCmp('sfdyLeftTree'),Ext.getCmp('sfdyCenterPanel') ],
	listeners : {
		show : function() {
			var cmp = Ext.getCmp('sfdyCenterPanel');
			if (cmp.rendered) {
				cmp.fireEvent("render", cmp);
			}
		},
       hide : function() {
    	   Ext.getCmp('sfdy_sfdyArea').reset();
		   Ext.getCmp('sfdy_sfmsArea').reset();
       }
	}
})

// 添加参数 弹出框 树 
new Ext.tree.TreePanel({
	id : 'sfdyAddParamTree',
	region : 'west',
	border : false,
	width : 210,
	height : 360,
	title : '双击选择参数',
	service : 'tjcs_tree_service',
	root : new Ext.tree.AsyncTreeNode({
		text : '双击选择参数',
		expanded : true,
		id : 'treeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader'
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
Ext.getCmp('sfdyAddParamTree').on('dblclick', Ext.app.sfdyAddParamTree);

// 添加参数 窗体Window
new Ext.Window({
	id : 'sfdyAddParamWin',
	title : '添加参数',
	layout : 'column',
	width : 220,
	height : 400,
	x : 960,
	y : 33,
	border : false,
	closeAction : 'hide',
	modal : true,
	resizable : false,
	items : [ Ext.getCmp('sfdyAddParamTree') ]
})

// 页面布局 显示
var vp =  new Ext.Viewport({
	layout : 'border',
	border : 'center',
	items : [leftTree,dataGrid]
});













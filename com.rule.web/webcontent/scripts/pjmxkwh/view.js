// 评价模型维护： 模型指标导航树
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
	region : 'west',
	autoHeight : false,
	autoScroll : true,
	animate : true,
	width : "15%",
	height : "100%",
	title : '评价模型树',
	service : 'pjmxkwh_tree_service',
	filterStr : '',
	plugins : [ new Bp.plugin.TreePanel() ]
});
leftTree.on('click', Ext.appPjmxkwh.pjmxkTreeClick);

// 评价模型Grid
var mxGrid = new Ext.ux.BDGrid({
	detailView : false,
	listeners : {
		render : function() {
			Ext.appPjmxkwh.fixToolbar();
			Ext.each(Ext.appPjmxkwh.gridBtn, function(btn) {
				mxGrid.getTopToolbar().add(btn);
				mxGrid.getTopToolbar().add("-");
			});
			Ext.appPjmxkwh.gridReload(mxGrid, Ext.appPjmxkwh.appID,
					Ext.appPjmxkwh.clsID);
			Ext.appPjmxkwh.mxwhGridSetDefaultValues();
		},
		aftersave : function() {
			// 添加成功后刷新grid
			Ext.appPjmxkwh.gridReload(mxGrid, Ext.appPjmxkwh.appID,
					Ext.appPjmxkwh.clsID);
			// 添加成功后刷新左侧树
			if (!Ext.util.isNull(Ext.appPjmxkwh.currentNode)) {
				Ext.appPjmxkwh.currentNode.reload();
			} else {
				leftTree.getRootNode().reload();
			}
		}
	}
});
Ext.appPjmxkwh.mxGrid = mxGrid;

// 算法变量维护Grid
var sfblwhGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		render : function() {// 渲染
			Ext.appSfblwh.fixToolbar();
			Ext.each(Ext.appSfblwh.gridBtn, function(btn) {
				sfblwhGrid.getTopToolbar().add("-");
				sfblwhGrid.getTopToolbar().add(btn);
			});
			Ext.appPjmxkwh.gridReload(sfblwhGrid, Ext.appSfblwh.appID,
					Ext.appSfblwh.clsID, "PJMX_ID");
			Ext.appSfblwh.gridSetDefaultValues();
		},
		aftersave : function() {// 保存后
			Ext.appPjmxkwh.gridReload(sfblwhGrid, Ext.appSfblwh.appID,
					Ext.appSfblwh.clsID, "PJMX_ID");
		}
	}
});
Ext.appSfblwh.grid = sfblwhGrid;

// 评价指标Grid
var pjzbwhGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		beforerender : function() {
			Ext.appPjmxkwh.showToolbar(pjzbwhGrid);
			Ext.each(Ext.appPjzbwh.gridBtn, function(btn) {
				pjzbwhGrid.getTopToolbar().add(btn);
				pjzbwhGrid.getTopToolbar().add("-");
			});
			Ext.appPjmxkwh.gridReload(pjzbwhGrid, Ext.appPjzbwh.appID,
					Ext.appPjzbwh.clsID, "SSPJMX_ID");
		},
		aftersave : function() {
			// 读取评价指标表格数据
			Ext.appPjmxkwh.gridReload(pjzbwhGrid, Ext.appPjzbwh.appID,
					Ext.appPjzbwh.clsID, "SSPJMX_ID");
		}
	}
});
Ext.appPjzbwh.pjzbwhGrid = pjzbwhGrid;

// 状态量维护Grid
var ztlwhGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		beforerender : function() {
			Ext.appPjmxkwh.showToolbar(ztlwhGrid);
			Ext.each(Ext.appZtlwh.gridBtn, function(btn) {
				ztlwhGrid.getTopToolbar().add(btn);
				ztlwhGrid.getTopToolbar().add("-");
			});
			Ext.appPjmxkwh.gridReload(ztlwhGrid, Ext.appZtlwh.appID,
					Ext.appZtlwh.clsID, "SSPJMX_ID");
			// 状态量维护默认值
			Ext.appZtlwh.ztlwhGridSetDefaultValues();
		},
		aftersave : function() {
			// 读取评价指标表格数据
			Ext.appPjmxkwh.gridReload(ztlwhGrid, Ext.appZtlwh.appID,
					Ext.appZtlwh.clsID, "SSPJMX_ID");
		}
	}
});
Ext.appZtlwh.ztlwhGrid = ztlwhGrid;

// 评价对象维护 数据表格Grid
var pjdxwhGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		beforerender : function() {
			Ext.appPjmxkwh.showToolbar(pjdxwhGrid);
			Ext.each(Ext.appZtlwh.gridBtn, function(btn) {
				pjdxwhGrid.getTopToolbar().add(btn);
				pjdxwhGrid.getTopToolbar().add("-");
			});
			Ext.appPjmxkwh.gridReload(pjdxwhGrid, Ext.appPjdxwh.appID,
					Ext.appPjdxwh.clsID, "SSMX_ID");
			// 评价对象设置默认值
			Ext.appPjdxwh.pjdxwhGridSetDefaultValues();
		},
		afterrender : function() {
			this.getStore().on('add',function(s,rs){
				Ext.each(rs, function(r) {
					r.isAdd = true;
				});
			})
			// 对象算法链接处理
			new Ext.util.GridColumnLinkRenderer({
				grid : pjdxwhGrid,
				dataIndex : "DXSF",
				displayRenderer : function(v, m, r, ri, ci, s) {
					var d = "查看算法";
					if (Ext.util.isNull(v)) {
						d = "算法定义";
					}
					return d;
				},
				onClick : function(rec) {
					if(rec.isAdd){
						Ext.Msg.alert("提示信息","请先保存数据");
						return;
					}
					Ext.appPjdxwh.getDxsfInfo(rec, "DXSF");
					Ext.appPjdxwh.sfdyFun("DXSF");
				}
			}).render();
			// 状态算法链接处理
			new Ext.util.GridColumnLinkRenderer({
				grid : pjdxwhGrid,
				dataIndex : "ZTSF",
				displayRenderer : function(v, m, r, ri, ci, s) {
					var d = "查看算法";
					if (Ext.util.isNull(v)) {
						d = "算法定义";
					}
					return d;
				},
				onClick : function(rec) {
					if(rec.isAdd){
						Ext.Msg.alert("提示信息","请先保存数据");
						return;
					}
					Ext.appPjdxwh.getDxsfInfo(rec, "ZTSF");
					Ext.appPjdxwh.sfdyFun("ZTSF");
				}
			}).render();
		},
		aftersave : function() {
			// 读取评价指标表格数据
			Ext.appPjmxkwh.gridReload(pjdxwhGrid, Ext.appPjdxwh.appID,
					Ext.appPjdxwh.clsID, "SSMX_ID");
		}
	}
});
Ext.appPjdxwh.pjdxwhGrid = pjdxwhGrid;

// TAB面板
var tabPanel = new Ext.TabPanel({
	activeTab : 0,
	region : "center",
	items : [ {
		layout : "fit",
		border : false,
		title : "评价指标维护",
		items : [ pjzbwhGrid ]
	}, {
		layout : "border",
		border : false,
		title : "状态量维护",
		items : [ ztlwhGrid ]
	}, {
		layout : "border",
		border : false,
		title : "评价对象维护",
		items : [ pjdxwhGrid ]
	}, {
		layout : "border",
		border : false,
		title : "算法变量维护",
		items : [ sfblwhGrid ]
	} ],
	listeners : {
		beforerender : function(c) {
			c.setHeight(centerPanel.getHeight());
		}
	}
});

// 中心区域面板
var centerPanel = new Ext.Panel({
	id : "centerPanel",
	region : "center",
	border : false,
	layout : "border",
	defaults : {
		border : false
	},
	items : [ {
		id : "mxGridPanel",
		region : "center",
		layout : "fit",
		items : [ mxGrid ]
	}, {
		id : "mxTabPanel",
		region : "north",
		height : "100%",
		items : [ tabPanel ],
		listeners : {
			beforerender : function(c) {
				c.setHeight(centerPanel.getHeight());
			}
		}
	} ]
});

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	items : [ leftTree, centerPanel ]
});

// 默认展示模型grid,隐藏tab页
Ext.getCmp("mxTabPanel").hide();
// 中心区域面板重绘
Ext.getCmp("centerPanel").doLayout();

// 算法定义弹出窗体 ：左侧树
new Ext.tree.TreePanel({
	id : 'sfdyLeftTree',
	region : 'west',
	width : 200,
	title : '双击选择函数',
	service : 'ztlxxd_sfdy_TreeService',
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader'
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
Ext.getCmp('sfdyLeftTree').on('dblclick', Ext.appPjdxwh.sfdyLeftTree);

new Ext.form.FormPanel({
	id : 'sfdyForm',
	height : 210,
	border : false,
	region : 'north',
	autoScroll : false,
	items : Ext.appPjdxwh.sfdyFormItems
});

new Ext.form.FormPanel({
	id : 'sfdyMain',
	region : 'center',
	border : false,
	layout : 'form',
	height : 100,
	items : Ext.appPjdxwh.sfdySfmsItems,
	buttons : Ext.appPjdxwh.sfdyButtons
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
	items : [ Ext.getCmp('sfdyForm'), Ext.getCmp('sfdyMain') ]
})
Ext.getCmp('sfdyCenterPanel').on('render', function(t) {
	t.setTitle('计算对象： ' + Ext.appPjdxwh.DXMS); // 计算对象标题动态传值
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
	items : [ Ext.getCmp('sfdyLeftTree'), Ext.getCmp('sfdyCenterPanel') ],
	listeners : {
		show : function() {
			var cmp = Ext.getCmp('sfdyCenterPanel');
			if (cmp.rendered) {
				cmp.fireEvent("render", cmp);
			}
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
Ext.getCmp('sfdyAddParamTree').on('dblclick', Ext.appPjdxwh.sfdyAddParamTree);

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
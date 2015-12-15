/**
 * 评价细则维护 主界面 左侧树
 */
var leftTree = new Ext.tree.TreePanel({
	title : '评价模型',
	region : 'west',
	collapsible : true,
	width : "15%",
	height : "100%",
	rootVisible: true,
	service : 'pjxzwh_tree_service',
	filterStr : '',
	root : new Ext.tree.AsyncTreeNode({
		text : '评价模型',
		expanded : true,
		id : 'treeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader',
		dataUrl : ''
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
// 注册树节点点击事件
leftTree.on('click', Ext.app.pjxzTreeClick);

/**
 * 评价细则维护 评价模型 数据表格
 */
var pjmxGrid = new Ext.ux.BDGrid({
	id : 'pjmxGrid',
	title : '评价模型',
	region : 'center',
	detailView : false,
	listeners : {
		afterrender : function() {
			var appID = Ext.app.mxkAppID;
			var clsID = Ext.app.mxkClsID;
			pjmxGrid.loadData(appID, clsID);// 加载Grid数据
			pjmxGrid.getTopToolbar().hide();
					
			Ext.app.deleteBtn(this);//删除
			Ext.app.exportBtn(this);// 导出
			Ext.app.appRangeBtn(this);// 设置应用范围
			Ext.app.decisionBtn(this);//决策建议规则维护
			Ext.app.addByModBtn(this);//按模板新建
			Ext.app.addPjModBtn(this);//增加评价指标
			Ext.app.addZtlBtn(this);//增加状态量
			Ext.app.evaluateRuleBtn(this);//增加评价规则
		},
		beforesave : function(){
			var v=Ext.app.vlidateDate(this);
			if(v==false){
				return false;
			}
		},
		aftersave : function() {
			Ext.app.refreshTreeData();
		},
		afterdelete : function() {
			Ext.app.refreshTreeData();
		}
	}
});

/**
 * 增加指标 数据表格
 */
var zjzbGrid = new Ext.ux.BDGrid({
	id : 'zjzbGrid',
	region : 'center',
	height : 300,
	detailView : false,
	listeners : {
		afterrender : function() {
			zjzbGrid.getTopToolbar().removeAll();
			Ext.app.okPjModBtn(this);// 确定
			Ext.app.cancelPjModBtn(this);// 取消
		}
	}
});

/**
 * 增加指标 弹出窗口
 */
var zjzbWinWin = new Ext.Window({
	id : 'zjzbWin',
	title : '指标配置',
	layout : 'column',
	width : 550,
	height : 335,
	closeAction : 'hide',
	plain : true,
	modal : true,
	resizable : false,
	items : [ zjzbGrid ]
})

/**
 * 设置应用范围 数据表格
 */
var editAppGrid = new Ext.ux.BDGrid({
	id : 'editAppGrid',
	region : 'center',
	height : 365,
	detailView : false,
	listeners : {
		afterrender : function() {		
			editAppGrid.getTopToolbar().items.items[12].hide();
			Ext.app.exportBtn(this, "app");// 导出
			Ext.app.hideSdFlBtn(this);
		},
		aftersave : function() {
			
		}
	}
});

/**
 * 设置应用范围 弹出窗口
 */
var editAppRangeWin = new Ext.Window({
	id : 'editAppRangeWin',
	layout : 'column',
	title : '设置应用范围',
	width : 700,
	height : 400,
	closeAction : 'hide',
	plain : true,
	modal : true,
	resizable : false,
	items : [ Ext.getCmp('editAppGrid') ]
})

/**
 * 决策建议规则维护 数据表格
 */
var jcjygzGrid = new Ext.ux.BDGrid({
	id : 'jcjygzGrid',
	region : 'center',
	height : 400,
	detailView : false,
	listeners : {
		afterrender : function() {
			this.loadData(Ext.app.jcjygzAppID, Ext.app.jcjygzClsID,'',
					''," PJXZID = '"+ Ext.app.jcjygzObjID+"'");
			
			jcjygzGrid.getTopToolbar().items.items[12].hide();
			Ext.app.hideSdFlBtn(this);
			Ext.app.exportBtn(this,"jcjy");// 导出
			
		},
		beforesave : function() {
			jcjygzGrid.getSelectionModel().getSelected().data.PJXZID = Ext.app.jcjygzObjID;
		},
		aftersave : function() {
			jcjygzGrid.loadData(Ext.app.jcjygzAppID, Ext.app.jcjygzClsID,'',
					''," PJXZID = '"+ Ext.app.jcjygzObjID+"'");
		}
	}
});

/**
 * 决策建议规则维护 弹出窗口
 */
var jcjygzWin = new Ext.Window({
	id : 'jcjygzWin',
	title : '决策建议规则维护',
	layout : 'column',
	width : 950,
	height : 435,
	closeAction : 'hide',
	plain : true,
	modal : true,
	resizable : false,
	items : [ Ext.getCmp('jcjygzGrid') ]
})

/**
 * 按模板新建 弹出窗口
 */
var addByModWin = new Ext.Window({
	id : 'addByModWin',
	layout : 'column',
	width : 300,
	height : 100,
	closeAction : 'hide',
	plain : true,
	modal : true,
	resizable : false,
	items : [ ]
})

/**
 * 算法定义/查看算法 左侧导航(函数)树
 */
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
// 注册双击点击事件
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

/**
 * 算法定义/查看算法 右侧主面板
 */
new Ext.Panel({
	id : 'sfdyCenterPanel',
	layout : 'border',
	frame : true,
	border : false,
	title : '-',
	region : 'center',
	height : 610,
	width : 300,
	items : [ Ext.getCmp('sfdyForm'),Ext.getCmp('sfdyMain') ]
})

/**
 * 算法定义/查看算法 弹出窗体
 */
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
	items : [ Ext.getCmp('sfdyLeftTree'),Ext.getCmp('sfdyCenterPanel') ]
})

/**
 * 添加参数面板 导航树 
 */
new Ext.tree.TreePanel({
	id : 'sfdyAddParamTree',
	region : 'west',
	border : false,
	width : 210,
	height : 360,
	title : '双击选择参数',
	service : 'tjcs_tree_service',
	root : new Ext.tree.AsyncTreeNode({
		text : '添加参数',
		expanded : true,
		id : 'treeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader'
	}),
	plugins : [ new Bp.plugin.TreePanel() ]
});
// 注册树节点双击点击事件
Ext.getCmp('sfdyAddParamTree').on('dblclick', Ext.app.sfdyAddParamTree);

/**
 * 添加参数 弹出窗口面板
 */
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

/**
 * 增加状态量 数据表格
 */
var zjztlGrid = new Ext.ux.BDGrid({
	id : 'zjztlGrid',
	region : 'center',
	height : 315,
	detailView : false,
	listeners : {
		afterrender : function() {
			zjztlGrid.getTopToolbar().removeAll();
			Ext.app.okPjModBtn(this);// 确定
			Ext.app.cancelZtlListBtn(this);// 取消
		}
	}
});

/**
 * 增加状态量 弹出窗口
 */
var zjztlWinWin = new Ext.Window({
	id : 'zjztlWin',
	title : '状态量列表',
	layout : 'column',
	width : 700,
	height : 350,
	closeAction : 'hide',
	plain : true,
	modal : true,
	resizable : false,
	items : [ zjztlGrid ]
})

/**
 * 增加评价规则 左侧导航树
 */
var zjpjgzTree = new Ext.tree.TreePanel({
	id : 'zjpjgzTree',
	region : 'west',
	width : 200,
	filterStr : '',
	rootVisible: true,
	root : new Ext.tree.AsyncTreeNode({
		text : '增加评价规则',
		expanded : true,
		id : 'treeroot'
	}),
	loader : new Ext.tree.TreeLoader({
		id : 'treeLoader',
		dataUrl : 'rule/pjxzwhAction/zjpjgzTree.do'
	})
});

/**
 * 增加评价规则 右侧面板
 */
new Ext.form.FormPanel({
	id : 'zjpjgzForm',
	region : 'center',
	layout : 'form',
	labelWidth : 100,
	frame : true,
	autoScroll : true,
	labelAlign : 'right',
	reader : Ext.app.jsonBusReader,
	items : Ext.app.zjpjgzItems,
	tbar : Ext.app.zjpjgzTbar
});

/**
 * 增加评价规则 弹出窗口
 */
var addEvRuleWin = new Ext.Window({
	id : 'addEvRuleWin',
	title : '增加评价规则',
	layout : 'border',
	width : 1000,
	height : 500,
	closeAction : 'hide',
	autoScroll : true,
	plain : true,
	modal : true,
	resizable : false,
	items : [ Ext.getCmp('zjpjgzTree'),Ext.getCmp('zjpjgzForm') ]
})

/**
 * 按模板新增 查询面板
 */
new Ext.form.FormPanel({
	id : 'ambxzForm',
	height : 120,
	border : false,
	frame : true,
	region : 'center',
	autoScroll : true,
	labelAlign : "right",
	items : Ext.app.ambxzItems
});

/**
 * 按模板新增 弹出窗口
 */
var ambxzWin = new Ext.Window({
	id : 'ambxzWin',
	title : '按模板新建',
	layout : 'fit',
	width : 300,
	height : 120,
	closeAction : 'hide',
	plain : true,
	modal : true,
	resizable : false,
	items : [ Ext.getCmp('ambxzForm') ]
})

/**
 * 评价细则维护 主界面显示
 */
new Ext.Viewport({
	layout : 'border',
	items : [ leftTree, pjmxGrid ]
});

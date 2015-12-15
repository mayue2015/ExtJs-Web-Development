Ext.app.appID = "0929DEAE-619F-412F-A67A-37C3E3B369CB";
Ext.app.clsID = "D01245FB-2DE5-41D5-B76A-4939E9EB23C9";

/**
 * 初始化窗口
 */
Ext.app.InitWindow = Ext.extend(Ext.Window, {
	border : false,
	modal : true,
	addPanel : function() {// panel信息
		var initPanel = new Ext.Panel({
			region : "north",
			width : 500,
			height : 50,
			html : "<font  size='3'  color=red>初始化完成，"
					+ "有以下设备重复设置了评价版本，请检查 <br>评价配置！</font>"
		});
		this.add(initPanel);
		this.doLayout();
	},
	addBDGrid : function() {// 数据表格
		var store = new Ext.data.Store({
			autoLoad : true,
			proxy : new Ext.data.HttpProxy({
				url : 'rule/ztpjcshAction/getCshjyData.do',
				method : 'post'
			}),
			baseParams : {
				'start' : 0,
				'limit' : 15
			},
			reader : new Ext.data.JsonReader({
		
				root : "list",
				totalProperty : "size",
				fields : [ {
						name : 'sb_id',
						mapping : "0"
					}, {
						name : 'sbmc',
						mapping : "1"
					}, {
						name : 'xzmc',
						mapping : "2"
					}, {
						name : 'mxmc',
						mapping : "3"
					} ]
			} )
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
	
			columns : [ new Ext.grid.RowNumberer(), sm, {
				header : '设备Id',
				dataIndex : 'sb_id',
				width : 120,
				hidden : true
			}, {
				header : '设备名称',
				width : 120,
				dataIndex : 'sbmc'
			}, {
				header : '细则名称',
				width : 120,
				dataIndex : 'xzmc'
			}, {
				header : '模型名称',
				width : 120,
				dataIndex : 'mxmc'
			} ]
		});

		
		var initGrid = new Ext.grid.GridPanel({
			region : 'center',
			height : 370,
			width : 440,
			sm : sm,
			cm : cm,
			store : store,
			bbar : new Ext.PagingToolbar({
				pageSize : 15,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : "无记录"
			})
		})
		this.add(initGrid);
		this.doLayout();
	},
	// 窗口初始化组件
	initComponent : function() {
		Ext.app.InitWindow.superclass.initComponent.call(this);
		this.addPanel();
		this.addBDGrid();
	}
});

/**
 * 中间添加按钮
 */
Ext.app.addButn = new Ext.Button({
	text : '添&nbsp&nbsp&nbsp加',
	iconCls : 'left',
	style : {
		margin : '120px 50px 70px 50px'
	},
	listeners : {
		click : function() {
			Ext.app.clickAddFun();
		}
	}
});

/**
 * 中间移出按钮
 */
Ext.app.removeButn = new Ext.Button({
	text : '移&nbsp&nbsp&nbsp出',
	iconCls : 'right',
	style : {
		margin : '0px 50px 70px 50px'
	},
	listeners : {
		click : function() {
			Ext.app.clickRemoveFun();
		}
	}
});

/**
 * 中间初始化按钮
 */
Ext.app.initButn = new Ext.Button({
	text : '初始化',
	icon : 'rule/public/images/wand.png',
	style : {
		margin : '0px 50px 100px 50px'
	},
	listeners : {
		click : function() {
			Ext.app.clickInitFun();
		}
	}
});

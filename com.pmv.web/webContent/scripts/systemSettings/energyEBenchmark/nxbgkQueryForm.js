$import("planning/scripts/complat/com.js");
$import("planning/scripts/complat/Ext.ux.WidgetBaseTree.js");

var area_type_store = new Ext.data.JsonStore({// 区域类型
	url : "pmv/nxbgkAction/areaType.do",
	fields : [ 'value', 'text' ]
});

var volt_store = new Ext.data.JsonStore({// 电压等级
	url : "planning/volevel/getVolCode.do?id=" + id + "&deptId=" + deptguid,
	fields : [ 'value', 'text' ]
});

var queryTop = new Ext.form.FormPanel({
	id : 'queryTopForm',
	labelWidth : 80,
	region : 'north',
	border : false,
	frame : true,
	height : 50,
	split : true,
	layout : 'fit',
	collapseMode : 'mini',
	hideLabels : true,
	labelAlign : 'right',
	autoScroll : false,
	items : [ {
		border : false,
		columnWidth : 0.8,
		layout : 'column',
		style : 'margin-top:10px;margin-bottom:10px;',
		items : [ {
			columnWidth : .34,
			layout : 'form',
			border : false,
			style : 'padding-left:0px;',
			items : [ {
				xtype : 'combo',
				fieldLabel : '指标单位',
				id : 'queryGrid_sys_dept_code',
				editable : false,
				checkboxToggle : true,
				triggerAction : 'all',
				listeners : {
					'expand' : function() {
						if (Ext.isEmpty(this.menu))
							this.menu = subTreeRunUnitMenu;
						this.menu.show(this.el);
					},
					'focus' : function() {
						subselectID = this.id;
					}
				},
				store : new Ext.data.SimpleStore({
					fields : [ 'value', 'text' ],
					data : [ [] ]
				}),
				displayField : 'text',
				valueField : 'value',
				mode : 'local',
				emptyText : '请选择',
				width : 130
			} ]
		}, {
			columnWidth : .13,
			layout : 'form',
			border : false,
			style : 'padding-left:0px;',
			items : [ {
				xtype : 'combo',
				fieldLabel : '区域类型',
				id : 'area_type',
				editable : false,
				checkboxToggle : true,
				triggerAction : 'all',
				store : area_type_store,
				displayField : 'text',
				valueField : 'value',
				mode : 'local',
				emptyText : '请选择',
				width : 80
			} ]
		}, {
			columnWidth : .13,
			layout : 'form',
			border : false,
			style : 'padding-left:0px;',
			items : [ {
				xtype : 'combo',
				fieldLabel : '电压等级',
				id : 'volt',
				editable : false,
				checkboxToggle : true,
				triggerAction : 'all',
				store : volt_store,
				displayField : 'text',
				valueField : 'value',
				mode : 'local',
				emptyText : '请选择',
				width : 80
			} ]
		} ]
	} ],
	listeners : {
		'afterrender' : function() {
			volt_store.load();
			area_type_store.load();
		}
	}
});

/**
 * 
 * 类型树
 */
var subRunUnitTree = new Ext.ux.WidgetBaseTree({
	title : '单位选择',
	loader : new Ext.tree.TreeLoader({
		dataUrl : 'pmv/nxbgkAction/getDeptTreeComboBox.do'
	}),
	width : 190,
	height : 220,
	extension : true,
	tbar : [ {
		xtype : 'button',
		id : 'remove_dw',
		text : '清空',
		iconCls : 'remove',
		handler : function() {
			Ext.getCmp(subselectID).clearValue();
			subTreeRunUnitMenu.hide();
		}
	} ]
});

var subTreeRunUnitMenu = new Ext.menu.Menu({
	items : [ subRunUnitTree ]
});
var subRunUnitMenu = Ext.data.Record.create([ {
	name : 'value',
	type : 'string'
}, {
	name : 'text',
	type : 'string'
} ]);

subRunUnitTree
		.on(
				'beforeload',
				function(node) {
					if (node.isRoot)
						subRunUnitTree.loader.dataUrl = 'pmv/nxbgkAction/getDeptTreeComboBox.do';
					else
						subRunUnitTree.loader.dataUrl = 'pmv/nxbgkAction/getDeptTreeComboBox.do?id='
								+ node.attributes.value;
				});

subRunUnitTree.on('click', function(node) {
	Ext.getCmp(subselectID).store.removeAll();
	// if(node.getDepth()=='1'){
	// return false;
	// }
	Ext.getCmp(subselectID).store.add(new subRunUnitMenu({
		value : node.attributes.value,
		text : node.text
	}));
	Ext.getCmp(subselectID).setValue(node.attributes.value);
	subTreeRunUnitMenu.hide();
});

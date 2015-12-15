/**
 * QG类型显示页面,Q:QueryPanel表示为查询条件面板, G:GridPanel表示为数据表格面板
 * 
 * @class Ext.ux.QGPanel
 * @extends Ext.Panel
 */
Ext.ux.QGPanel = Ext.extend(Ext.Panel, {

	/**
	 * 应用ID
	 * 
	 * @required
	 * @property appID
	 * @type {String}
	 */
	appID : undefined,

	/**
	 * 类型ID
	 * 
	 * @required
	 * @property appID
	 * @type {String}
	 */
	clsID : undefined,

	/**
	 * 是否显示BDGrid默认按钮,默认选择是
	 * 
	 * @property showDefaultToolbar
	 * @type {Boolean}
	 */
	showDefaultToolbar : true,

	/**
	 * 工具栏按钮
	 * 
	 * @property gridButtons
	 * @type {Array}
	 */
	gridButtons : [],

	/**
	 * 是否自动查询
	 * 
	 * @property autoQuery
	 * @type {Boolean}
	 */
	autoQuery : false,

	/**
	 * 表单标签宽度
	 * 
	 * @property labelWidth
	 * @type {Number}
	 */
	labelWidth : 100,

	/**
	 * 查询条件
	 * 
	 * @property queryItems
	 * @type {Array}
	 */
	queryItems : [],

	/**
	 * 获取查询条件面板对象
	 * 
	 * @return {Ext.ux.BDQueryPanel}
	 */
	getQueryPanel : function() {
		return this.queryPanel;
	},

	/**
	 * 获取数据表格对象
	 * 
	 * @return {Ext.ux.BDGrid}
	 */
	getGridPanel : function() {
		return this.gridPanel;
	},

	/**
	 * 组件初始化
	 */
	initComponent : function() {
		this.layout = "border";
		var appID = this.appID;
		var clsID = this.clsID;
		var queryItemsModel = this.queryItems;
		var queryItems = queryItemsModel.slice(0);
		var labelWidth = this.labelWidth;
		var queryPanel = new Ext.ux.BDQueryPanel({
			region : "north",
			layout : "column",
			defaults : {
				border : false,
				layout : "form",
				labelAlign : "right",
				columnWidth : 0.2
			},
			labelWidth : labelWidth,
			items : queryItems,
			listeners : {
				render : function() {
					var maxCount = 0;
					Ext.each(queryItems, function(item) {
						if (item.items) {
							if (item.items.length > maxCount) {
								maxCount = item.items.length;
							}
						}
					});
					if (maxCount === 1) {
						this.height = 45;
					} else if (maxCount === 2) {
						this.height = 70;
					} else if (maxCount === 3) {
						this.height = 100;
					} else if (maxCount === 4) {
						this.height = 120;
					}
				}
			}
		});
		this.queryPanel = queryPanel;
		var gridButtons = this.gridButtons;
		var showDefaultToolbar = this.showDefaultToolbar;
		var autoQuery = this.autoQuery;
		var gridPanel = new Ext.ux.BDGrid({
			detailView : false,
			region : "center",
			listeners : {
				render : function() {
					// 重新组装工具栏, refs中对应BDGrid中的按钮分别为‘新增’、‘保存’、‘删除’、‘撤消’
					var refs = [ "addBtn", "saveBtn", "removeBtn", "undoBtn" ];
					var items = this.getTopToolbar().items;
					var defaultButtons = new Array();
					items.each(function(item) {
						Ext.each(refs, function(ref) {
							if (item.ref == ref) {
								defaultButtons.push(item);
							}
						});
					});
					gridPanel.getTopToolbar().removeAll();
					gridPanel.getTopToolbar().add("-");
					if (showDefaultToolbar) {
						Ext.each(defaultButtons, function(btn) {
							gridPanel.getTopToolbar().add(btn);
							gridPanel.getTopToolbar().add("-");
						});
					}
					// 在表格默认按钮后添加自定义按钮
					Ext.each(gridButtons, function(btn) {
						gridPanel.getTopToolbar().add(btn);
						gridPanel.getTopToolbar().add("-");
					});
				},
				afterrender : function() {
					if (autoQuery) {
						this.loadData(appID, clsID);
					}
				}
			}
		});
		this.gridPanel = gridPanel;
		this.items = new Array();
		this.items.push(this.queryPanel);
		this.items.push(this.gridPanel);
		Ext.ux.QGPanel.superclass.initComponent.call(this);
	}
});

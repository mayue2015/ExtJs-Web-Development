/**
 * 基本参数数据表格
 */
var jbcsGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			//加载属性名称数据集
			Ext.app.dataJson();
			Ext.app.addRemoveToolbar(this);
			this.getTopToolbar().items.each(Ext.app.disableButton);
			this.getStore().on("load", function() {
				jbcsGrid.getTopToolbar().disable();			
			});
//			this.loadData(Ext.appJbcs.appID,Ext.appJbcs.clsID);
		},
		beforesave : function(a,b) {
			if(b.adddata.length != 0){ //新增属性名称数据时
				b.adddata[0].GDX = 'T'
				for(var j = 0; j < b.adddata.length; j++){
					var sxmc = b.adddata[j].SXMC;
					
					//新增：检查新增页面数据中属性名称是否有重复
					for(var n = j+1; n < b.adddata.length; n++){
						if(sxmc == b.adddata[n].SXMC ){
							 Ext.MessageBox.alert('系统提示','属性名称重复，请您重新输入!');
							 return false;
						}
					}
					
					//新增：检查数据库表中是否有属性名称重复数据
					for(var i = 0; i < Ext.app.data.length; i++){
						if(sxmc == Ext.app.data[i].sxmc){
							Ext.MessageBox.alert('系统提示','属性名称已存在，请您重新输入!');
							return false;
						}
					}
				}				
			}
			if(b.edtdata.length != 0){ //修改属性名称数据时
				for(var j = 0; j < b.edtdata.length; j++){
					var sxmc = b.edtdata[j].SXMC;
					
					//修改：检查修改页面数据中属性名称是否有重复
					for(var n = j+1; n < b.edtdata.length; n++){
						if(sxmc != undefined && b.edtdata[n].SXMC != undefined){
							if(sxmc == b.edtdata[n].SXMC ){
								Ext.MessageBox.alert('系统提示','属性名称重复或已存在，请重新修改!');
								return false;
							}
						}
					}
					
					//修改：检查数据库表中是否有属性名称重复数据		
					for(var i = 0; i < Ext.app.data.length; i++){
						if(sxmc == Ext.app.data[i].sxmc){
							Ext.MessageBox.alert('系统提示','属性名称已存在，请您重新输入!');
							return false;
						}
					}
				}				
			}	
		},
		aftersave : function(){ //基本参数表格数据保存后事件
			jbcsGrid.getStore().reload();
			Ext.app.dataJson();
		},
		afterdelete : function() { //基本参数表格数据删除后事件
			jbcsGrid.getStore().reload();
			Ext.app.dataJson();
		},
		click : Ext.app.jbcsTabClick
	}
});
Ext.app.jbcsGrid = jbcsGrid;

/**
 * 扩展参数数据表格
 */
var kzcsGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			//加载属性名称数据集
			Ext.app.dataJson();
			Ext.app.addRemoveToolbar(this);
//			this.getTopToolbar().items.each(Ext.app.disableButton);
//			this.loadData(Ext.appKzcs.appID,Ext.appKzcs.clsID);
			kzcsGrid.getStore().on("load", function() {
				if(Ext.app.node.getDepth() > 2){
					kzcsGrid.getTopToolbar().enable();
				}else{
					kzcsGrid.getTopToolbar().disable();
				}
			});
		},
		beforesave : function(a,b) {
			if(b.adddata.length != 0){ //新增属性名称数据时
				b.adddata[0].GDX = 'F'
				for(var j = 0; j < b.adddata.length; j++){
					var sxmc = b.adddata[j].SXMC;
					
					//新增：检查新增页面数据中属性名称是否有重复
					for(var n = j+1; n < b.adddata.length; n++){
						if(sxmc == b.adddata[n].SXMC ){
							Ext.MessageBox.alert('系统提示','属性名称重复，请您重新输入!');
							return false;
						}
					}
					
					//新增：检查数据库表中是否有属性名称重复数据
					for(var i = 0; i < Ext.app.data.length; i++){
						if(sxmc == Ext.app.data[i].sxmc){
							Ext.MessageBox.alert('系统提示','属性名称已存在，请您重新输入!');
							return false;
						}
					}
				}				
			}
			if(b.edtdata.length != 0){ //修改属性名称数据时
				for(var j = 0; j < b.edtdata.length; j++){
					var sxmc = b.edtdata[j].SXMC;
					
					//修改：检查修改页面数据中属性名称是否有重复
					for(var n = j+1; n < b.edtdata.length; n++){
						if(sxmc != undefined && b.edtdata[n].SXMC != undefined){
							if(sxmc == b.edtdata[n].SXMC ){
								Ext.MessageBox.alert('系统提示','属性名称重复或已存在，请重新修改!');
								return false;
							}
						}
					}
					
					//修改：检查数据库表中是否有属性名称重复数据		
					for(var i = 0; i < Ext.app.data.length; i++){
						if(sxmc == Ext.app.data[i].sxmc){
							Ext.MessageBox.alert('系统提示','属性名称已存在，请您重新输入!');
							return false;
						}
					}
				}				
			}	
		},
		aftersave : function(){ //扩展参数表格数据保存后事件
			kzcsGrid.getStore().reload();
			Ext.app.dataJson();
		},
		afterdelete : function() { //扩展参数表格数据删除后事件
			kzcsGrid.getStore().reload();
			Ext.app.dataJson();
		},
		click : Ext.app.kzcsTabClick
	}
});
Ext.app.kzcsGrid = kzcsGrid;

/**
 * 设备类型导航树
 */
var navTree = new Ext.tree.TreePanel({
	region : "west",
	width : "15%",
	height : "100%",
	title : '设备类型',
	collapsible : true,
	split : true,
	service : "sbxh_tree_service",
	plugins : [ new Bp.plugin.TreePanel() ]
});
navTree.on('click', Ext.app.leftTree);

/**
 * TAB页面板
 */
var tabPanel = new Ext.TabPanel({
	region : "center",
	activeTab : 0,
	items : [ {
		layout : "fit",
		border : false,
		title : "基本参数",
		items : [ jbcsGrid ]
	}, {
		layout : "border",
		border : false,
		title : "扩展参数",
		items : [ kzcsGrid],
		listeners : {
			afterrender : Ext.app.TabPanelRender
		}
	} ]
});

/**
 * 页面显示区
 */
var vp = new Ext.Viewport({
	layout : "border",
	items : [ navTree, tabPanel ]
});

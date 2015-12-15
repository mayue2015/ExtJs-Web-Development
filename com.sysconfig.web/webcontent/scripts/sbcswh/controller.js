/**
 * 设置默认值
 */
Ext.app.setDefaultValue = function() {
	// 基本参数Tab页默认值
	jbcsGrid.setDefaultValues({
		'BMX' : 'F',
		'BMX_DSPVALUE' : '否',
		'GDX' : 'T',
		//'SBLX' : Ext.app.node.id,
		'SBLX' : Ext.app.node.attributes.attr.sblxbm,
		'SBLX_DSPVALUE' :Ext.app.node.text
	});	
    // 扩展参数Tab页默认值	 
	kzcsGrid.setDefaultValues({
		'BMX' : 'F',
		'BMX_DSPVALUE' : '否',
		'GDX' : 'F',
		//'SBLX' : Ext.app.node.id,
		'SBLX' : Ext.app.node.attributes.attr.sblxbm,
		'SBLX_DSPVALUE' :Ext.app.node.text
	});	
};

/**
 * 左侧导航树
 */
Ext.app.leftTree = function(node) {
	Ext.app.node = node;
	//var id = "'"+node.id +"'";
	var id = "'"+node.attributes.attr.sblxbm +"'";
	node.expand();
	Ext.app.setDefaultValue();
	Ext.app.buttonPermission();
	if(node.getDepth() == 4){
		tabPanel.hideTabStripItem(0);
		tabPanel.hideTabStripItem(1);
		tabPanel.setActiveTab(1); // 设置当前tab页
	}else{
		tabPanel.unhideTabStripItem(0);
		tabPanel.unhideTabStripItem(1);
	}
	var sql;
	if(tabPanel.getActiveTab().title == '基本参数') {
		sql = "SBLX  IN("+id +") AND GDX = 'T' ";
		jbcsGrid.loadData(Ext.appJbcs.appID, Ext.appJbcs.clsID,'','',sql);
	}else{
		sql = "SBLX  IN("+id +") AND GDX = 'F' ";
		Ext.app.kzcsGrid.loadData(Ext.appKzcs.appID, Ext.appKzcs.clsID,
				'', '', sql);
	}	
//	if(tabPanel.getActiveTab().title == '基本参数'){
//		var sql = " SBLX IN("+id +") AND GDX = 'T' ";
//			
//	}else{
//		var sql = "SBLX = IN(" + id + ") AND GDX = 'F' ";
//		
//				'', '', sql);
//	}
	
}

/**
 * 移除平台按钮
 * 
 * @param {Ext.ux.BDGrid}
 */
Ext.app.addRemoveToolbar = function(grid) {
	var items = grid.getTopToolbar().items.items;
	for(var i = 9;i < 13 ;i++){
		items[i].hide();
	}
};

/**
 * 第2个TAB页渲染事件(该TAB页面不自动渲染)
 */
Ext.app.TabPanelRender = function() {	
	Ext.app.setDefaultValue;
	var sql;
	if (Ext.app.node == undefined || Ext.app.node.getDepth() == 1) {
		sql = ' 1 = 2 ';
	}else {
		// 查询配电网区域表格						
		sql = "SBLX  IN('"+Ext.app.node.id +"') AND GDX = 'F' ";
	}
		Ext.app.kzcsGrid.loadData(Ext.appKzcs.appID, Ext.appKzcs.clsID,
				'', '', sql);	
};

/**
* 基本参数-表格点击事件
*/
Ext.app.jbcsTabClick  = function(){
	var selectRow = jbcsGrid.getSelectionModel();
	if(selectRow.getCount() < 1){
		return;
	}	
	var record = selectRow.getSelected();
	var sjlx = record.get("SJLX");
	
	var cm = jbcsGrid.getColumnModel();
	var index = cm.findColumnIndex('BMX');
	var bmxId = cm.getColumnId(index);//编码项
	var bmnrId = cm.getColumnId(index+1);//编码内容	
	var bmx = cm.getColumnById(bmxId).getEditor();
	var bmnr = cm.getColumnById(bmnrId).getEditor();
	
	var szsxIndex = cm.findColumnIndex('SZSX');
	var szxxIndex = cm.findColumnIndex('SZXX');
	var szsxId = cm.getColumnId(szsxIndex);
	var szxxId = cm.getColumnId(szxxIndex);
	var szsx = cm.getColumnById(szsxId).getEditor();
	var szxx = cm.getColumnById(szxxId).getEditor();
	if(bmx.getValue() == "T"){
		bmnr.setDisabled(false);
	}else{
		bmnr.setValue('');
		bmnr.setDisabled(true);
	}
	if(sjlx == '1600601' || sjlx == '1600602'){		
		szsx.setDisabled(false);
		szxx.setDisabled(false);
	}else{
		szsx.setValue(0);
		szxx.setValue(0);
		szsx.setDisabled(true);
		szxx.setDisabled(true);
	}
};

/**
* 扩展参数-表格点击事件
*/
Ext.app.kzcsTabClick  = function(){
	var selectRow = kzcsGrid.getSelectionModel();
	if(selectRow.getCount() < 1){
		return;
	}	
	var record = selectRow.getSelected();
	var sjlx = record.get("SJLX");
	
	var cm = kzcsGrid.getColumnModel();
	var index = cm.findColumnIndex('BMX');
	var bmxId = cm.getColumnId(index);//编码项
	var bmnrId = cm.getColumnId(index+1);//编码内容	
	var bmx = cm.getColumnById(bmxId).getEditor();
	var bmnr = cm.getColumnById(bmnrId).getEditor();

	var szsxIndex = cm.findColumnIndex('SZSX');
	var szxxIndex = cm.findColumnIndex('SZXX');
	var szsxId = cm.getColumnId(szsxIndex);
	var szxxId = cm.getColumnId(szxxIndex);
	var szsx = cm.getColumnById(szsxId).getEditor();
	var szxx = cm.getColumnById(szxxId).getEditor();
	if(bmx.getValue() == "T"){
		bmnr.setDisabled(false);
	}else{
		bmnr.setValue('');
		bmnr.setDisabled(true);
	}
	if(sjlx == '1600601' || sjlx == '1600602'){		
		szsx.setDisabled(false);
		szxx.setDisabled(false);
	}else{
		szsx.setValue(0);
		szxx.setValue(0);
		szsx.setDisabled(true);
		szxx.setDisabled(true);
	}
};

/**
* 禁用按钮
*/
Ext.app.disableButton = function(btn) {
	btn.disable();
};

/**
* 启用按钮
*/
Ext.app.enableButton = function(btn) {
	btn.enable();
};

/**
* 按钮控制
*/
Ext.app.buttonPermission = function() {
	if (Ext.app.node.getDepth() > 2) {		
//		Ext.app.jbcsGrid.getTopToolbar().items.each(Ext.app.enableButton);
//		Ext.app.kzcsGrid.getTopToolbar().items.each(Ext.app.enableButton);	
		Ext.app.jbcsGrid.getStore().on("load", function() {
			Ext.app.jbcsGrid.getTopToolbar().enable();
		});
		Ext.app.kzcsGrid.getStore().on("load", function() {
			Ext.app.kzcsGrid.getTopToolbar().enable();
		});
	}else{
//		Ext.app.jbcsGrid.getTopToolbar().items.each(Ext.app.disableButton);
//		Ext.app.kzcsGrid.getTopToolbar().items.each(Ext.app.disableButton);	
		Ext.app.jbcsGrid.getStore().on("load", function() {
			Ext.app.jbcsGrid.getTopToolbar().disable();
		});
		Ext.app.kzcsGrid.getStore().on("load", function() {
			Ext.app.kzcsGrid.getTopToolbar().disable();
		});
	}
};

/**
 * 获取数据库表中属性名称查询结果集合
 */
Ext.app.dataJson = function() {
	Ext.Ajax.request({
		url : 'sysconfig/sbcswhAction/getData.do',
		method : 'post',
		success : function(response, options) {
			var value = Ext.util.JSON.decode(response.responseText);
			Ext.app.data = value;
		}
	});
};





/**
 * 获取QGPanel对象
 * 
 * @return {Ext.ux.QGPanel}
 */
Ext.app.getQGPanel = function() {
	return Ext.getCmp("centerPanel");
};

/**
 * 获取QGPanel对象绑定的查询条件面板对象
 * 
 * @return {Ext.ux.BDQueryPanel}
 */
Ext.app.getQueryPanel = function() {
	return Ext.app.getQGPanel().getQueryPanel();
};

/**
 * 获取QGPanel对象绑定的数据表格对象
 * 
 * @return {Ext.ux.BDGrid}
 */
Ext.app.getBDGrid = function() {
	return Ext.app.getQGPanel().getGridPanel();
};

/**
 * 刷新按钮事件句柄
 */
Ext.app.refreshHandler = function() {
	var grid = Ext.app.getBDGrid();
	grid.loadData(grid.appID, grid.clsID);
};

/**
 * 查询按钮事件句柄
 */
Ext.app.queryHandler = function() {
	var grid = Ext.app.getBDGrid();
	var bd_sblx = Ext.getCmp('BD_SBLX');
	
	// 得到设备类型值
	var sblx = bd_sblx.getEditor().getStore().data.items[0].data.text;
	var sql = Ext.app.getQueryPanel().getSqlString();
	grid.loadData(grid.appID, grid.clsID, null, null, sql);
};

/**
 * 适用范围按钮事件句柄
 */
Ext.app.fitRangeHandler = function() {
	var grid = Ext.app.getBDGrid();
	var rows = grid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.MessageBox.alert("系统提示", "请至少选择一项!");
	} else if (rows.length > 1) {
		Ext.MessageBox.alert("系统提示", "只能选择一项进行修改!");
	} else {
		new Ext.app.FitRangeWindow({
			title : "周期范围管理",
			guid : rows[0].get("GUID"),
			width : 800
		}).show();
	}
};

/**
 * 面板渲染事句柄
 */
Ext.app.qgPanelRender = function(c) {
	var g = c.getGridPanel();
	
	g.on("beforesave", function(a,b) {
		if(b.adddata.length != 0){
			for(var i = 0; i < b.adddata.length; i++){
				if((b.adddata[i].ZQ).toString().length >= 3){
					Ext.MessageBox.alert('系统提示','周期长度超出范围,请重新输入!');
					return false;
				}
			}
		}
		if(b.edtdata.length != 0){
			for(var j = 0; j < b.edtdata.length; j++){
				if((b.edtdata[j].ZQ).toString().length >= 3){
					Ext.MessageBox.alert('系统提示','周期长度修改超出范围,请重新输入!');
					return false;
				}
			}
		}
	});
	
	g.on("aftersave", function() {
		Ext.app.refreshHandler();
	});
	
	var qssj = Ext.util.Format.date(new Date(), "Y-m-d");
	var whsj = Ext.util.Format.date(new Date(), "Y-m-d H:i:s");
	g.setDefaultValues({
		'WHR' : user_name,
		'QSSJ' : qssj,
		'WHSJ' : whsj
	});
};

/**
 * 点击树获取node节点
 */
Ext.app.leftTree = function(node) {
	Ext.app.node = node;
	Ext.app.node.expand();
}

/**
 * 插入数据TO ZQFW 表
 */
Ext.app.saveZqfw = function(win, otype, grid) {

	var bdGrid = Ext.app.getBDGrid();// 评价周期表单
	var recode = bdGrid.getSelectionModel().getSelections();
	var guid = recode[0].get('GUID');// 评价周期GUID

	if (Ext.app.node != undefined) {
		Ext.Ajax.request({
			url : 'rule/pjzqwhAction/saveZqfw.do',
			params : {
				// 区分数据来源
				otype : otype,
				zqId : guid,
				bm : Ext.app.node.id,
				mc : Ext.app.node.text,
				clsID : Ext.app.zqfwClsID
			},
			success : function(response, options) {
				
				var res = Ext.util.JSON.decode(response.responseText);
				var flag = res.success;
				if (flag == true) {//数据存在
					Ext.Msg.alert('系统提示', '该数据已添加过,请重新选择数据！');
				} else {
					grid.store.reload();
					win.close();
				}
			}
		})
	} else {
		Ext.Msg.alert('系统提示', '请选择一条数据！');
	}
};

/**
 * 删除数据From ZQFW 表
 */
Ext.app.removeInfo = function(grid) {
	// 获取删除GUID
	var recode = grid.getSelectionModel().getSelections();
	if (recode.length == 0) {
		Ext.Msg.alert('系统提示', '请至少选择一条数据！');
		return;
	}
	Ext.Msg.confirm('请确认', '是否要删除所选内容！', function(button, text) {
		if (button == 'yes') {
			var guid = new Array();
			Ext.each(recode, function(row) {
				guid.push("'" + row.get('GUID') + "'");
			});
			Ext.Ajax.request({
				url : 'rule/pjzqwhAction/removeZqfw.do',
				params : {
					guids : guid.join(',')
				},
				async : false,
				success : function() {
					Ext.Msg.alert('系统提示', '删除成功！');
					grid.store.reload();
				}
			});
		}
	});
};

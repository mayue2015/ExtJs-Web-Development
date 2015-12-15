/**
 * 移除平台按钮
 * 
 * @param {Ext.ux.BDGrid}
 */
Ext.app.addRemoveToolbar = function(grid) {
	var items = grid.getTopToolbar().items.items;
	for(var i= 8;i<12 ;i++){
		items[i].hide();
	}
};

/**
 * 设置默认值
 */
Ext.app.setDefaultValue = function(){

	if(Ext.app.node.getDepth()!=1){
		dataGrid.setDefaultValues({
			'DEV_TYPE_CODE' : Ext.app.id,//设备类型编码
			'DEV_TYPE_CODE_DSPVALUE' : Ext.app.node.text,
			'STATE' : '0501901' //状态
		});
	}	
};

/**
 * 左侧导航树
 */
Ext.app.leftTree = function(node) {
	Ext.app.node = node;
	// 编码
	Ext.app.id = node.attributes.attr.sblxbm
	if (node.getDepth() == 1 || node.getDepth() == 2) {
		dataGrid.store.on('load', function() {// 失效新增按钮
			dataGrid.getTopToolbar().disable();
		});
	} else {
		dataGrid.store.on('load', function() {
			dataGrid.getTopToolbar().enable();
		});
	}

	var id = "'" + node.attributes.attr.sblxbm + "'";
	node.expand();
	// 调用设置默认值方法
	Ext.app.setDefaultValue();

	var sql = " DEV_TYPE_CODE IN(" + id + ")";
	var recode = Ext.app.dataGrid.getStore().getModifiedRecords();
	if (recode.length != 0) {
		Ext.Msg.confirm('请确认', '存在未保存的数据,是否放弃此操作?', function(btn) {
			if (btn == 'no') {
				return;
			} else {
				//删除数据
				Ext.app.dataGrid.store.remove(recode);
				recode.length = 0;
				dataGrid.loadData(Ext.app.appID, Ext.app.clsID, "", "", sql);
			}
		});
		return;
	}

	dataGrid.loadData(Ext.app.appID, Ext.app.clsID, "", "", sql);

}

/**
 * 校验去重
 */
Ext.app.validate = function(grid) {
	// 获取所有修改过的值集合
	var recode = grid.getStore().getModifiedRecords();
	var name = new Array();
	// 获得当前页数据仓库值
	var data = grid.getStore().data.items;
	// 调用后台进行判断
	var url = "sysconfig/sbxhAction/validateData.do";
	// 创建同步请求对象
	var util = new Bp.util.RequestUtils();
	// 请求返回参数
	var result = "";
	// 输入值GUID
	var guid = new Array();
	var sslxId = Ext.app.id;
	// 标识
	var flag = "";
	// 封装 获取的GUID
	Ext.each(recode, function(row){
		guid.push("'" + row.get('GUID') + "'");
	});

	// 封装 获取的设备类型编码值
	Ext.each(recode, function(row) {
		name.push("'" + row.get('MODEL_NAME') + "'");
	});

	result = util.sendRequest(url, {
		guid : guid.join(','),
		name : name.join(','),
		sslxId : sslxId
	});
	
	flag = Ext.decode(result).success;
	if (flag == 'success') {
		// 调用增加去重校验
		var v = Ext.app.addValidate(data, util, url, name, sslxId);
		return v;
	} else {// 表示修改
		var v = Ext.app.xgValidate(recode, util, name, sslxId, guid);
		return v;
	}
	
};

/**
 * 新增时进行 去重校验
 */

Ext.app.addValidate = function(data, util, url, name, sslxId) {

	var result = "";
	// 判断所增加的数据中是否存在重名
	for (var j = 1; j < data.length; j++) {
		var first = data[0].get('MODEL_NAME');
		if (first == data[j].get('MODEL_NAME')) {
			Ext.Msg.alert('系统提示', '输入型号存在重复值,请重新输入！');
			return false;
		}
	}
	// 调用请求方法
	result = util.sendRequest(url, {// 已经判断出为新增，则判断 型号是否存在
		sblxbm : name,
		fsblx : sslxId,
		type : 'new'
	});
	// 获取返回值
	var flag = Ext.decode(result).success;
	if (flag != 'success') {
		Ext.Msg.alert('系统提示', '输入的型号已存在请重新输入！');
		return false;
	}
}

/**
 * 修改时进行去重校验
 */
Ext.app.xgValidate = function(rows, util, name, sslxId, guid) {

	var xgUrl = "sysconfig/sbxhAction/validateDateForXg.do"
	// 调用请求方法
	// 已经判断出为修改，则判断 名称是否存在(包括对同时修改多行  进行校验)
	var result = util.sendRequest(xgUrl, {
		name : name,
		sslxId : sslxId,
		guid : guid
	});
	// 获取返回值
	var flag = Ext.decode(result).success;
	var type = Ext.decode(result).type;
	if (flag != 'success') {// 修改
		Ext.Msg.alert('系统提示', '输入的型号已存在请重新输入！');
		return false;
	} else {
		if (type == 'true') {
			for (var j = 1; j < rows.length; j++) {
				var first = rows[0].get('MODEL_NAME');
				if (first == rows[j].get('MODEL_NAME')) {
					Ext.Msg.alert('系统提示', '输入型号存在重复值,请重新输入！');
					return false;
				}
			}
		}
	}

}

/**
 * 刷新左侧树,自动展开到最后选择节点处
 */
Ext.app.refshTree = function(leftTree) {
	// 获得选中节点
	var node = leftTree.getSelectionModel().getSelectedNode();
	if (node == null) {
		leftTree.getRootNode().reload();
	} else {
		var id = node.id;
		var path = node.getPath("id");// 得到当前选中节点Path
		leftTree.getLoader().load(leftTree.getRootNode(), function() {
			leftTree.expandPath(path, "id", function(b, lastNode) {
				leftTree.getSelectionModel().select(lastNode);
			});
		}, this);
	}
};



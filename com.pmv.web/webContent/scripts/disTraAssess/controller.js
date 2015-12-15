/**
 * 增加行记录
 */
Ext.app.create = function() {
	var grid_p = Ext.getCmp('mainGrid');
	var row = grid_p.getStore().getModifiedRecords();
	if (row.length > 0) {
		Ext.Msg.alert('系统提示', '只能单条记录增加！');
		return;
	}
	// 获得记录数
	var count = grid_p.store.getCount(); 
	var record = new Ext.data.Record.create([ {
		name : 'devguid',
		type : 'String'
	}, {
		name : 'rguid',
		type : 'String'
	}, {
		name : 'name',
		type : 'String'
	}, {
		name : 'line_id',
		type : 'String'
	}, // 所属厂站
	{
		name : 'model',
		type : 'String'
	}, // 型号
	{
		name : 'ratedmva',
		type : 'double'
	}, // 容量
	{
		name : 'pointposition',
		type : 'String'
	}, // 计量位置
	{
		name : 'typicalday',
		type : 'String'
	}, // 典型日
	{
		name : 'run_unit',
		type : 'String'
	} // 运行单位
	]);

	var p = new record({
		devguid : '',
		rguid : '',
		name : '',
		line_id : '',
		model : '',
		ratedmva : '',
		pointposition : '',
		typicalday : defaultDate,
		run_unit : dept_name
	// 运行单位此处设置 名称 后台保存时插入编码
	});
	isCanModify = 1;
	grid_p.stopEditing();
	grid_p.getStore().insert(count, p);
	grid_p.startEditing(0, 0);
}

/**
 * 删除
 */
Ext.app.deleteData = function() {
	var grid = Ext.getCmp('mainGrid');
	var record = grid.getSelectionModel().getSelections();
	if (record.length == 0) {
		Ext.Msg.alert('系统提示', '请至少选择一行数据!');
		return;
	}
	;

	Ext.Msg.confirm("确认信息", "确定要删除所选内容？", function(button, text) {
		if (button == 'yes') {
			var rguids = new Array();
			var devguids = new Array();
			Ext.each(record, function(record) {
				rguids.push("'" + record.get("rguid") + "'");
				devguids.push("'" + record.get("devguid") + "'");
			});

			Ext.Ajax.request({
				url : 'pmv/disTraAssessDMAction/deleteMainData.do',
				params : {
					rguids : rguids.join(","),
					devguids : devguids.join(","),
					versionId : versionId
				},
				async : false,// 非异步请求
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						// 删除成功后重新加载数据
						grid.getStore().reload();
						Ext.Msg.alert('系统提示', '删除成功！');
						isCanModify = 0;
					} else {
						Ext.Msg.alert('系统提示', '操作失败！');
					}
				}
			});
		}
	});
};

/**
 * 保存
 */
Ext.app.saveData_p = function() {
	var grid_p = Ext.getCmp('mainGrid');
	// 获取参数值
	var editorRecord = grid_p.getStore().getModifiedRecords();
	if (editorRecord.length > 1) {
		Ext.Msg.alert('系统提示', '只能单条记录修改!');
		return;
	}
	// 装载参数
	var saveEditor = [];
	Ext.each(editorRecord, function(record) {
		saveEditor.push(record.data);
	});

	if (saveEditor == '') {
		Ext.Msg.alert('系统提示', '没有要保存的数据!');
		return;
	}
	
	if(!isNotNull(editorRecord[0])){
		Ext.Msg.alert('系统提示', '有未填项，所有项均必填!');
		return;
	}

	Ext.Ajax.request({
		url : 'pmv/disTraAssessDMAction/saveDataForPGrid.do',
		method : 'post',
		params : {
			'saveEditor' : Ext.encode(saveEditor),
			versionId : versionId
		},
		success : function(response, options) {
			var res = Ext.util.JSON.decode(response.responseText);
			if (res.success) {
				Ext.Msg.alert('系统提示', '保存成功!');
				editorRecord.clear();
				grid_p.getStore().load();
				isCanModify = 0;
			} else {
				var msgstr = "保存失败!";
				if (res.msg) {
					msgstr = "数据重复，请核查!";
				}
				Ext.Msg.alert('系统提示', msgstr);
				return false;
			}
		},
		failure : function(form, action) {
			Ext.Msg.alert('系统提示', '数据保存失败!');
			return false;
		}
	});
}

/**
 * 重置
 */
Ext.app.resetData = function() {
	Ext.getCmp('dev_name').setValue('');
	Ext.getCmp('lineName').setValue('');
	refreshGridPS();
}
/**
 * 主表刷新子表刷无
 */
function refreshGridPS() {
	isCanModify = 0;
	Ext.getCmp('mainGrid').getStore().load();
	Ext.getCmp('viceGrid').getStore().removeAll();
}
function setComboValue(value, store) {
	if (value != '') {
		var index = store.find('value', value.trim());
		var record = store.getAt(index);
		if (record != undefined && record != '') {
			return record.data.text;
		}
	}
}

/**
 * 非空检验
 */
function isNotNull(editorRecord) {
	var cm = Ext.getCmp('mainGrid').getColumnModel();
	var cmnum = cm.getColumnCount();
	for (var i = 0; i < cmnum; i++) {
		var cmi = cm.getColumnById(i);
		if(cmi&&cm.getColumnById(i).editor){
			if(cm.getColumnById(i).editor.allowBlank==false){
				var value = editorRecord.get(cm.getDataIndex(i));
				if(value==undefined||value==''||value=='null'||value==null){
					return false;
				}
			}
		}
	}
	return true;
}
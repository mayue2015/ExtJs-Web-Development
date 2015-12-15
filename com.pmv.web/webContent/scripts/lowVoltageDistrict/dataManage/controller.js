/**
 * 相别数据集
 */
Ext.app.xb_store = new Ext.data.JsonStore({
	url : 'pmv/lowVoltageDistrictAction/getZBComoBox.do',
	fields : [ 'value', 'text' ],
	baseParams : {
		label_code : '03008'
	},
	autoLoad : true
});

/**
 * 配变名称数据集
 */
Ext.app.xl_store = new Ext.data.JsonStore({
	url : 'pmv/lowVoltageDistrictAction/getPBComoBox.do',
	fields : [ 'value', 'text' ],
	baseParams : {
		versionId : versionId
	},
	listeners : {
		'load': function(store,record,opts) {
			Ext.getCmp('mainGrid').store.load();
		}
	}

});
// 加载数据前事件
Ext.app.xl_store.on('beforeload', function() {
	var _param = {
		'versionId' : versionId
	};
	this.baseParams = _param;
});

/**
 * 典型日数据集
 */
Ext.app.date_store = new Ext.data.JsonStore({
	url : 'pmv/basicDataAction/getDateComoBox.do',
	fields : [ 'value', 'text' ],
	autoLoad : true
});

/**
 * 主表加载数据集
 */
Ext.app.mainStore = new Ext.data.Store({
	url : "pmv/lowVoltageDistrictAction/loadGrid.do",
	method : 'post',
//	autoLoad : true,
	reader : new Ext.data.JsonReader({
		root : 'list',
		totalProperty : "size",
		fields : [ {
			name : "GUID",
			mapping : "0"
		}, {
			name : "NAME",
			mapping : "1"
		}, {
			name : "DISTRICT_NAME",
			mapping : "2"
		}, {
			name : "PBXH",
			mapping : "3"
		}, {
			name : "PBRL",
			mapping : "4"
		}, {
			name : "JLDW",
			mapping : "5"
		}, {
			name : "XB",
			mapping : "6"
		}, {
			name : "DATE",
			mapping : "7"
		}, {
			name : "RUN_UNIT",
			mapping : "8"
		} ]
	})
});

/**
 * 查询
 */
Ext.app.search = function() {
	Ext.getCmp('mainGrid').store.load();
	isCanModify = 0;
}

/**
 * 下拉框设置值
 */
Ext.app.setComboValue = function(value, store) {
	if (value != '' && value != null) {
		var index = store.find('value', value.trim());
		var record = store.getAt(index);
		if (record != undefined && record != '') {
			return record.data.text;
		}
	}
}

/**
 * 增加行记录
 */
Ext.app.create = function() {
	var row = Ext.app.mainGrid.store.getModifiedRecords();
	if (row.length >= 1) {
		Ext.getCmp('add').setDisabled(true);
		Ext.Msg.alert('系统提示', '只能单条记录增加！');
		return;
	}
	// 获得记录数
	var count = Ext.app.mainGrid.store.getCount(); 
	
	var record = new Ext.data.Record.create([ {
		name : 'GUID',
		type : 'String'
	}, {
		name : 'NAME',
		type : 'String'
	}, {
		name : 'DISTRICT_NAME',
		type : 'String'
	}, // 所属配线
	{
		name : 'PBXH',
		type : 'String'
	}, // 配变型号
	{
		name : 'PBRL',
		type : 'String'
	}, // 配变容量
	{
		name : 'JLDW',
		type : 'String'
	}, // 计量单位
	{
		name : 'XB',
		type : 'double'
	},// 相别
	{
		name : 'DATE',
		type : 'String'
	}, // 典型日
	{
		name : 'RUN_UNIT',
		type : 'String'
	} // 运行单位
	]);

	var p = new record({
		GUID : '',
		NAME : '',
		DISTRICT_NAME : '',
		PBXH : '-',
		PBRL : '-',
		JLDW : '-',
		XB : '',
		DATE : Ext.app.defaultDxr,
		RUN_UNIT : dept_name
	});
	isCanModify = 1;
	Ext.app.mainGrid.stopEditing();
	Ext.app.mainGrid.store.insert(count, p);
	Ext.app.mainGrid.startEditing(0, 0);
}

/**
 * 保存
 */
Ext.app.saveData = function() {
	// 获取参数值
	var editorRecord = Ext.app.mainGrid.store.getModifiedRecords();
	if(editorRecord == '') {
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
		url : 'pmv/lowVoltageDistrictAction/saveData.do',
		method : 'post',
		params : {
			'saveEditor' : Ext.encode(saveEditor),
			'versionId' : versionId,
			'run_unit' : deptguid
		},
		success : function(response, options) {
			var res = Ext.util.JSON.decode(response.responseText);
			if(res.success == 'exist') {
				Ext.Msg.alert('系统提示', '数据重复，请核查!');
				return;
			} else if (res.success) {
				Ext.Msg.alert('系统提示', '保存成功!');
				editorRecord.clear();
				Ext.app.mainGrid.getStore().load();
				isCanModify = 0;
			} else {
				Ext.Msg.alert('系统提示', '保存失败!');
			}
		},
		failure : function(form, action) {
			Ext.Msg.alert('系统提示', '数据保存失败!');
		}
	});
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

	Ext.Msg.confirm("确认信息", "确定要删除所选内容？", function(button, text) {
		if (button == 'yes') {
			var guid = new Array();
			Ext.each(record, function(record) {
				guid.push("'" + record.get("GUID") + "'");
			});

			Ext.Ajax.request({
				url : 'pmv/lowVoltageDistrictAction/deleteData.do',
				params : {
					guid : guid.join(","),
					versionId : versionId
				},
				async : false,// 非异步请求
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						// 删除成功后重新加载数据
						grid.getStore().reload();
						Ext.app.viceGrid.getStore().load();
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
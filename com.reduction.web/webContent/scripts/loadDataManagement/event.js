var arg = window.dialogArguments;//获得父窗口 
/**
 * 年份 基准年- 目标年
 */
Ext.app.yearStore = new Ext.data.JsonStore({
	url : 'reduction/loadDataAction/yearBox.do',
	fields : [ 'value', 'text' ],
	baseParams : {
		baseYear : baseYear,
		endYear : endYear
	}
});

/**
 * 电压等级
 */
Ext.app.voltStore = new Ext.data.JsonStore({
	url : "planning/volevel/getVolCode.do?id=" + id + "&deptId=" + deptguid,
	fields : [ 'value', 'text' ],
	autoLoad : true
});

/**
 * 所属厂站下拉框
 */
Ext.app.factoryStore = new Ext.data.JsonStore({
	url : 'reduction/loadDataAction/getFactory.do?caseId=' + arg.versionId,
	fields : ['value','text'],
	autoLoad : true
})

/**
 * 清空查询条件
 */
Ext.app.cancle = function() {
	Ext.getCmp('searchForm').form.reset();
};

/**
 * 查询
 */
Ext.app.queryData = function() {
	loadGrid.getStore().load();
}

/**
 * 新增保存
 */
Ext.app.saveInfo = function(type) {
	var guids = new Array();
	var yggl = new Array();
	var wggl = new Array();
	var endY = 0;

	if (type == 'update') {
		var records = loadGrid.getStore().getModifiedRecords();
		if (records.length == 0) {
			Ext.Msg.alert('系统提示', '数据无变化!');
			return;
		}
		for (var i = 0; i < records.length; i++) {
			guids.push(records[i].get('guid'));
			if (records[i].get('yggl') == '-') {
				yggl.push(0);
			} else {
				yggl.push(records[i].get('yggl'));
			}
			if (records[i].get('wggl') == '-') {
				wggl.push(0);
			} else {
				wggl.push(records[i].get('wggl'));
			}
		}
	} else {
		endY = Ext.getCmp('year').getValue();
	}
	Ext.Ajax.request({
		url : 'reduction/loadDataAction/saveInfo.do',
		method : 'post',
		params : {
			'type' : type,
			'guids' : guids,
			'yggl' : yggl,
			'wggl' : wggl,
			'endY' : endY, // 目标年
			'caseId' : arg.versionId  // 方案id
		},
		success : function(res, o) {
			var result = Ext.decode(res.responseText);
			if (result.success) {
				Ext.Msg.alert('系统提示', result.info);
				loadGrid.getStore().load(); // 表格刷新
				if(type == 'new'){
					Ext.getCmp("addWindow").close(); // 窗口关闭
				}
				return;
			} else {
				Ext.Msg.alert('系统提示', result.info);
				return;
			}
		}
	});
};

/**
 * 删除
 */
Ext.app.deleteFun = function() {
	var rows = loadGrid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.Msg.alert("系统提示", "请至少选择一项!");
		return;
	}
	Ext.Msg.confirm("请确认", "是否要删除所选内容", function(button, text) {
		if (button == 'yes') {
			var guids = new Array();
			// 遍历选中行结果集
			Ext.each(rows, function(row) {
				guids.push("'" + row.get("guid") + "'");
			});
			Ext.Ajax.request({
				url : 'reduction/loadDataAction/deltInfo.do',
				params : {
					guid : guids.join(","),
					caseId : arg.versionId // 方案id
				},
				async : false,
				success : function(response, options) {
					// 删除后重新加载数据
					Ext.app.loadGrid.store.reload();
					// 刷新树
					Ext.Msg.alert('系统提示', '删除成功！');
				}
			});
		}
	});
};

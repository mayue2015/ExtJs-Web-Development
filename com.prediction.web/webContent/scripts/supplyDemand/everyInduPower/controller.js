/**
 * 各产业用电量统计-查询
 */
Ext.app.queryData = function(){
	Ext.app.dataGrid.store.on('beforeload', function() {
		var _params = {
				'nodeId' : Ext.app.nodeId,
				'start' : 0,
				'limit' : 15
			};
		this.baseParams = _params;
	});
	//加载数据表格
	Ext.app.dataGrid.store.load();
}

/**
 * 各产业用电量统计-新增
 */
Ext.app.create = function(grid) {
	var url = basePath + "prediction/webViews/supplyDemand/everyInduPower/Window.jsp";
	var args = {
		qy :　Ext.app.nodeText,
		nodeId : Ext.app.nodeId,
		type : 'insert'
	};
	var width = 620;
	var height = 260;
	window.showModalDialog(url, args, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	//重新加载表格数据
	grid.store.reload();
};

/**
 * 各产业用电量统计-修改
 */
Ext.app.update = function(grid) {
	var record = grid.getSelectionModel().getSelections();
	if(record.length !=1){
		Ext.Msg.alert('系统提示','请选择一项记录进行修改！');
		return;
	};
	
	var url = basePath + "prediction/webViews/supplyDemand/everyInduPower/Window.jsp";
	var obj = {
		qy :　Ext.app.nodeText,
		nodeId : Ext.app.nodeId,
		record : record,
		type : 'update'
	};
	var width = 620;
	var height = 260;
	window.showModalDialog(url, obj, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	//重新加载表格数据
	grid.store.reload();
};

/**
 * 各产业用电量统计-删除
 */
Ext.app.deleteData = function(grid) {
	var record = grid.getSelectionModel().getSelections();
	if (record.length == 0) {
		Ext.Msg.alert('系统提示', '请至少选择一行数据!');
		return;
	};
	
	Ext.Msg.confirm("确认信息", "确定要删除所选内容？", function(button, text) {
		if (button == 'yes') {
			var guid = new Array();
			Ext.each(record, function(record) {
				guid.push("'" + record.get("GUID") + "'");
			});
			
			Ext.Ajax.request({
				url : 'prediction/everyInduPowerAction/deleteData.do',
				params : {
					guid : guid.join(",")
				},
				async : false,//非异步请求
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						//删除成功后重新加载数据
						grid.getStore().reload();
						Ext.Msg.alert('系统提示', '删除成功！');
					} else {
						Ext.Msg.alert('系统提示', '操作失败！');
					}
				}
			});
		}
	});
};

/**
 * 各产业用电量统计-保存
 */
Ext.app.save = function(form, window,type,record) {
	var winArgs = window.dialogArguments || '';
	var value = form.getValues();
	if (!form.isValid()){
		Ext.Msg.alert('系统提示', '请完成必填项信息！');
		return;
	}
			
	if(type == 'insert'){
		Ext.Ajax.request({
			url : 'prediction/everyInduPowerAction/saveData.do',
			method : 'post',
			params : {
				formValue : '[' + Ext.util.JSON.encode(value) + ']',
				nodeId : winArgs.nodeId,
				deptguid : deptguid
			},
			success : function(response, options) {
				var res = Ext.decode(response.responseText);
				if (res.success == 'exist') {
					Ext.Msg.alert('系统提示', '此年份数据已存在！');
				} else if (res.success == 'none') {
					Ext.Msg.alert('系统提示', '请填写上年份数据！');
				} else if (res.success) {
					Ext.Msg.alert('系统提示', '保存成功！', function() {
						window.close();
					});
				} else {
					Ext.Msg.alert('系统提示', '操作失败！');
				}
			}
		});
	}else{
		Ext.Ajax.request({
			url : 'prediction/everyInduPowerAction/updateData.do',
			method : 'post',
			params : {
				formValue : '[' + Ext.util.JSON.encode(value) + ']',
				guid : record[0].get("GUID"),
				tab_year : record[0].get("TAB_YEAR"),
				nodeId : winArgs.nodeId
			},
			success : function(response, options) {
				var res = Ext.decode(response.responseText);
				if (res.success == 'exist') {
					Ext.Msg.alert('系统提示', '此年份数据已存在！');
				} else if (res.success == 'none') {
					Ext.Msg.alert('系统提示', '请填写上年份数据！');
				} else if (res.success) {
					Ext.Msg.alert('系统提示', '修改成功！', function() {
						window.close();
					});
				} else {
					Ext.Msg.alert('系统提示', '操作失败！');
				}
			}
		});
	}
};

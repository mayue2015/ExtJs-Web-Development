/**
 * 查询面板-查询
 */
Ext.app.queryData = function(){
	if(Ext.app.nodeId == null || Ext.app.nodeId == undefined){
		Ext.Msg.alert('系统提示','请选择要查询的行政单位！');
		return;
	}
	
	Ext.app.dataGrid.store.on('beforeload', function() {
		var _params = {
				'nodeId' : Ext.app.nodeId
			};
		this.baseParams = _params;
	});
	
	Ext.app.dataGrid.store.load();
}

/**
 * 新建
 */
Ext.app.create = function(grid) {
	if(Ext.app.nodeId == null || Ext.app.nodeId == undefined){
		Ext.Msg.alert('系统提示','请选择一级行政单位！');
		return;
	}
	var url = basePath + "prediction/webViews/supplyDemand/yearLoad/window.jsp";
	
	var args = {
		qy :　Ext.app.nodeText,
		nodeId : Ext.app.nodeId,
		type : 'insert'
	};
	var width = 600;
	var height = 250;
	window.showModalDialog(url, args, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	// 重新加载表格数据
	grid.store.reload();
};

/**
 * 修改
 */
Ext.app.update = function(grid) {
	
	var record = grid.getSelectionModel().getSelections();
	if(record.length !=1){
		Ext.Msg.alert('系统提示','请选择一项记录进行修改！');
		return;
	};
	
	var url = basePath + "prediction/webViews/supplyDemand/yearLoad/window.jsp";
	var obj = {
		qy :　Ext.app.nodeText,
		nodeId : Ext.app.nodeId,
		record : record,
		type : 'update'
	};
	var width = 600;
	var height = 250;
	window.showModalDialog(url, obj, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	// 重新加载表格数据
	grid.store.reload();
};

/**
 * 删除
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
				guid.push("'" + record.get("guid") + "'");
			});
			
			Ext.Ajax.request({
				url : 'prediction/yearLoadAction/deleteData.do',
				params : {
					guid : guid.join(",")
				},
				async : false,// 非异步请求
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						// 删除成功后重新加载数据
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
 * 保存
 */
Ext.app.save = function(form, window,type,record) {
	var winArgs = window.dialogArguments || '';
	// 不可编辑且置灰项需手动设置值
	if (!form.isValid()){
		Ext.Msg.alert('系统提示', '请完成必填项信息！');
		return;
	}

	var value = form.getValues();
	if(type == 'insert'){
		Ext.Ajax.request({
			url : 'prediction/yearLoadAction/saveData.do',
			method : 'post',
			params : {
				formValue : '[' + Ext.util.JSON.encode(value) + ']',
				nodeId : winArgs.nodeId
			},
			success : function(response, options) {
				var res = Ext.decode(response.responseText);
				if (res.success == 'have') {
					Ext.Msg.alert('系统提示', '该年份数据已存在！');
				} else if(res.success) {
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
			url : 'prediction/yearLoadAction/updateData.do',
			method : 'post',
			params : {
				formValue : '[' + Ext.util.JSON.encode(value) + ']',
				guid : record[0].get("guid")
			},
			success : function(response, options) {
				var res = Ext.decode(response.responseText);
				if (res.success) {
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
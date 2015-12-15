
/**
 * 获取全社会最大负荷年增长率
 */
Ext.app.getYear_rate_fun = function (nodeId) {
	
	var soci_max_load = Ext.getCmp('all_soci_max_load').getValue();
	var tab_year = Ext.getCmp("tab_year").getValue();
	if (beginYear == tab_year){
		Ext.getCmp('max_load_yr_rate').setValue('-');
		return;
	}
	if(soci_max_load != ''){
		Ext.Ajax.request({
			url : 'prediction/powerLoad/getYear_rate.do',
			method : 'post',
			params : {
				soci_max_load : soci_max_load,
				tab_year : tab_year,
				nodeId : nodeId
			},
			success : function(response, options) {
				// 返回值设置年增长率
				var res = Ext.decode(response.responseText);
				Ext.getCmp('max_load_yr_rate').setValue(res);
			}
		})
	}else {
		// 为空重置数据
		Ext.getCmp('max_load_yr_rate').reset();
	}
};

/**
 * 增加窗口
 */
Ext.app.insert = function(grid,type) {
	
	var record = grid.getSelectionModel().getSelections();
	if(type == "update" ){
		if(record.length !=1){
			Ext.Msg.alert('系统提示','请选择一行数据,进行修改！');
			return;
		}
//		if(record[0].get("dept_code") != deptguid) {
//			Ext.Msg.alert('系统提示','您不能修改此条数据！');
//			return;
//		}
	}
	var url = basePath
			+ "prediction/webViews/supplyDemand/powerLoad/window.jsp";
	var obj = {
		type : type,
		nodeText : Ext.app.node.text,
		nodeId : Ext.app.node.id,
		record : record,
		beginYear : beginYear
	};
	var width =	640;
	var height = 220;
	window.showModalDialog(url, obj, "dialogWidth=" + width
			+ "px;dialogHeight=" + height + "px");
	grid.store.reload();
};

/**
 * 获取数据
 */
Ext.app.queryData = function() {
	Ext.getCmp("dataGrid").store.load();
};

/**
 * 保存
 */
Ext.app.save = function(form, window) {

	if (!form.isValid()){
		Ext.Msg.alert('系统提示', '请完成必填项信息！');
		return;
	}
	var winArgs = window.dialogArguments || '';
	var type = winArgs.type;
	var formValue = form.getValues();
	var record =winArgs.record;
	var guid,oldYear;

	if(type == 'update') {
		guid = record[0].get("guid");
		oldYear = record[0].get("tab_year");
	}
	Ext.Ajax.request({
		url : 'prediction/powerLoad/saveData.do',
		method : 'post',
		params : {
			type : type,
			guid : guid,
			oldYear : oldYear,
			nodeId : winArgs.nodeId,
			formValue : '[' + Ext.util.JSON.encode(formValue) + ']'
		},
		success : function(response, options) {
			var res = Ext.decode(response.responseText);
			if(res.success == 'exist') {
				Ext.Msg.alert('系统提示',res.info);
				return;
			}
			if (res.success) {
				if(type == "update"){
					Ext.Msg.alert('系统提示', '修改成功！', function() {
						window.close();
					});
				}else {
					Ext.Msg.alert('系统提示', '添加成功！', function() {
						window.close();
					});
				}
			} else {
				Ext.Msg.alert('系统提示', '操作失败！');
			}
		}
	});
};

/**
 * 删除
 */
Ext.app.remove = function(grid) {
	var rows = grid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.Msg.alert('系统提示', '请至少选择一行数据!');
		return;
	}
//	for(var i = 0;i<rows.length; i++) {
//		var deptCode = rows[i].get("DEPT_CODE");
//		if(deptCode != deptguid){
//			Ext.Msg.alert('系统提示','您不能删除此条数据！');
//			return;
//		}
//	}
	Ext.Msg.confirm("请确认", "是否要删除所选内容", function(button, text) {
		if (button == 'yes') {
			var guids = new Array();
			// 遍历选中行结果集
			Ext.each(rows, function(row) {
				guids.push("'" + row.get("guid") + "'");
			});
			Ext.Ajax.request({
				url : 'prediction/powerLoad/deltInfo.do',
				params : {
					guid : guids.join(",")
				},
				async : false,
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						// 删除后重新加载数据
						grid.getStore().reload();
						Ext.Msg.alert('系统提示', '删除成功！');
					} else {
						Ext.Msg.alert('系统提示', '删除失败！');
					}
				}
			});
		}
	});
}
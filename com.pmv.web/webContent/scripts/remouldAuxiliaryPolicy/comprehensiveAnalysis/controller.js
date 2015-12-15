/**
 * 增加行记录
 */
Ext.app.insertIntoSub = function() {
	var actId = Ext.getCmp('data_tab').getActiveTab().getId();
	var frameId = '';
	if(actId=='data_all'){
		frameId = "all";
	}else if(actId=='data_line'){
		frameId = "line";
	}else if(actId=='data_trans'){
		frameId = "trans";
	}else if(actId=='data_compensation'){
		frameId = "compensation";
	}else if(actId=='data_merge'){
		Ext.Msg.alert('系统提示', '请选择单一工程合并！');
		return;
	}
	var subGrid = window.frames[frameId].frameElement.contentWindow.Ext.getCmp('dataGrid');
	var records = subGrid.getSelectionModel().getSelections();
	if (records.length==0) {
		Ext.Msg.alert('系统提示', '请选择需要合并的工程！');
		return;
	}
	var add_grid = Ext.getCmp('subGrid');
	add_grid.getStore().add(records);
}
	
/**移除记录**/
Ext.app.deleteSubRecords = function() {
	var add_grid = Ext.getCmp('subGrid');
	var records = add_grid.getSelectionModel().getSelections();
	if (records.length==0) {
		Ext.Msg.alert('系统提示', '请选择需要移除的工程！');
		return;
	}
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		add_grid.getStore().remove(record);
	}
	
}

/**合并保存**/
Ext.app.mergeProject = function() {
	debugger
	var add_grid = Ext.getCmp('subGrid');
	var add_store = add_grid.getStore();
	var mergeProjectName = Ext.getCmp('mergeProjectName').getValue();
	if (mergeProjectName=='') {
		Ext.Msg.alert('系统提示', '请输入合并工程名称！');
		return;
	}
	var total_num = add_store.getCount();
	if (total_num==1) {
		Ext.Msg.alert('系统提示', '请选择添加需要合并的工程！');
		return;
	}
	var proids = '';
	for (var i = 1; i < total_num; i++) {
		var record = add_store.getAt(i);
		proids = proids+','+record.get('project_id');
	}
	if (proids!='') {
		proids = proids.substring(1);
	}
	var record0 = add_store.getAt(0);
	Ext.Ajax.request({
		url : 'pmv/comprehensiveAnalysisAction/mergeProject.do',
		params : {
			proIds : proids,
			proName : mergeProjectName,
			cost_static : record0.get('cost_static'),
			cost_dynamic : record0.get('cost_dynamic'),
			y_save_kwh : record0.get('y_save_kwh'),
			ass_cst_inrate : record0.get('ass_cst_inrate')
		},
		success : function(response, options) {
			var res = Ext.util.JSON.decode(response.responseText);
			if (res.success) {
				Ext.Msg.alert('系统提示', '保存成功!',function(){window.location.href = window.location.href; });
			} else {
				Ext.Msg.alert('系统提示', '保存失败!');
				return false;
			}
		},
		failure : function(form, action) {
			Ext.Msg.alert('系统提示', '保存失败!');
			return false;
		}
	});
}
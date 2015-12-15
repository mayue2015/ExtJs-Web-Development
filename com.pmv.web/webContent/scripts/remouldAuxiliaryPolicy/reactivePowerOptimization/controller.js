/**
 * 增加一行新记录
 */
Ext.app.addNewRecord = function (){
	var record = new Ext.data.Record.create([  
		{name:'GUID',type:'String'},  
		{name:'VERSIONID',type:'double'},  
		{name:'SYS_DEPT_CODE',type:'String'},  
		{name:'ASS_SVC_PROJECT',type:'String'},
		{name:'ASS_SVC_NAME',type:'String'},
		{name:'ASS_COS',type:'double'},
		{name:'ASS_REF_COS',type:'double'},
		{name:'ASS_ALL_KVA',type:'double'},
		{name:'ASS_ONE_KVA',type:'double'},
		{name:'ASS_SVC_NUM',type:'double'},
		{name:'ASS_MODEL',type:'String'}
	]); 
	var p = new record({  
		GUID : '',  
		VERSIONID : versionId,  
		SYS_DEPT_CODE : deptguid,
		ASS_SVC_PROJECT : '',
		ASS_SVC_NAME : Ext.app.typeDataGrid.getSelectionModel().getSelected().data["NAME"],
		ASS_COS : '',
		ASS_REF_COS : '',
		ASS_ALL_KVA : '',
		ASS_ONE_KVA : '',
		ASS_SVC_NUM : '',
		ASS_MODEL : ''
		
	});  
	isCanModify = 1;
	Ext.app.caseDataGrid.stopEditing();  
	Ext.app.caseDataGrid.store.insert(0,p);  
	Ext.app.caseDataGrid.startEditing(0,0); 	
	
	Ext.app.formPanel.getForm().reset();
	Ext.app.setTabPanelBlank();
}

/**
 * 下拉框返回文本值
 */
Ext.app.setComboValue = function(value,store) {
	if (value != '' && value != null) {
		var index = store.find('value', value.trim());
		var record = store.getAt(index);
		if (record != undefined && record != '') {
			return record.data.text;
		}
	}
}
/**
 * 下拉框返回value
 */
Ext.app.getComboValue = function(value,store) {
	if (value != '' && value != null) {
		var index = store.find('text', value.trim());
		var record = store.getAt(index);
		if (record != undefined && record != '') {
			return record.data.value;
		}
	}
}
/**
 * 删除
 */
Ext.app.deleteData = function(grid) {
	var record = grid.getSelectionModel().getSelections();
	if (record.length == 0) {
		Ext.Msg.alert('系统提示', '请至少选择一行数据!');
		return;
	};
	// 向后台发送请求
	Ext.Msg.confirm("系统提示", "是否确认删除所选记录？", function(button, text) {
		if (button == 'yes') {
			var guid = new Array();
			Ext.each(record, function(record) {
				guid.push("'" + record.get("GUID") + "'");
			});
			
			Ext.Ajax.request({
				url : 'pmv/reactivePowerOptimizationController/deleteCaseData.do',
				params : {
					guid : guid.join(",")
				},
				async : false,
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						// 删除成功后重新加载数据
						Ext.Msg.alert('系统提示', '删除方案成功！');
						Ext.app.caseDataGrid.getStore().commitChanges();
						grid.getStore().reload();
						Ext.app.formPanel.getForm().reset();
						Ext.app.setTabPanelBlank();
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
Ext.app.saveData = function() {
	var emptyFlag = false;
	var editorRecord = Ext.app.caseDataGrid.getStore().getModifiedRecords();

	if (editorRecord.length == 0) {
		Ext.Msg.alert('系统提示', '没有要保存的数据!');
		return;
	}
	// 装载参数
	var saveEditor = [];
	Ext.each(editorRecord, function(record) {
		if(record.data['ASS_ALL_KVA']==''||record.data['ASS_COS']==''||record.data['ASS_MODEL']==''
			||record.data['ASS_ONE_KVA']==''||record.data['ASS_REF_COS']==''||record.data['	ASS_SVC_NAME']==''
			||record.data['ASS_SVC_NUM']==''){
			Ext.Msg.alert('系统提示', '数据不能为空!');
			return;
		}else{
			emptyFlag = true;
		}
		saveEditor.push(record.data);
	});
	if(emptyFlag){
		Ext.Ajax.request({
			url : 'pmv/reactivePowerOptimizationController/saveCaseData.do',
			method : 'post',
			params : {
				'saveEditor' : Ext.encode(saveEditor)
			},
			success : function(response, options) {
				var res = Ext.util.JSON.decode(response.responseText);
				if (res.success) {
					Ext.Msg.alert('系统提示', '保存成功!');
					Ext.app.caseDataGrid.getStore().commitChanges();
					Ext.app.caseDataGrid.getStore().clearModified();
					Ext.app.caseDataGrid.getStore().reload();
					Ext.app.formPanel.getForm().reset();
					Ext.app.setTabPanelBlank();
					isCanModify = 0;
				} else {
					Ext.Msg.alert('系统提示', '保存失败!');
					Ext.app.caseDataGrid.getStore().commitChanges();
					Ext.app.caseDataGrid.getStore().clearModified();
					Ext.app.caseDataGrid.getStore().reload();
					Ext.app.formPanel.getForm().reset();
					Ext.app.setTabPanelBlank();
				}
			}
		});
	}
};

/**
 * 弹窗显示
 */
Ext.app.showMediumVolLine = function(){
	var url = basePath + "pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/Window.jsp";
	var args = {
			
	};
	var width = 1120;
	var height = 500;
	
	var returnValue = window.showModalDialog(url, args, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	if (returnValue != undefined) {
		Ext.getCmp('ratedkva').setValue(returnValue.ratedkva_1);
		Ext.getCmp('costBuilding').setValue(returnValue.cost_building);
		Ext.getCmp('costEquipment').setValue(returnValue.cost_equipment);
		Ext.getCmp('costInstall').setValue(returnValue.cost_install);
		Ext.getCmp('costOthers').setValue(returnValue.cost_others);
		Ext.getCmp('costStatic').setValue(returnValue.cost_static);
		Ext.getCmp('costDynamic').setValue(returnValue.cost_dynamic);
		
		Ext.app.ratedkva = returnValue.ratedkva_1;
		Ext.app.costBuilding = returnValue.cost_building;
		Ext.app.costInstall = returnValue.cost_install;
		Ext.app.costEquipment = returnValue.cost_equipment;
		Ext.app.costOthers = returnValue.cost_others;
		Ext.app.costStatic = returnValue.cost_static;
		Ext.app.costDynamic = returnValue.cost_dynamic;
		
		Ext.getCmp('ass_svc_model_combo').setValue(returnValue.guid);
		Ext.app.caseDataGrid.activeEditor.completeEdit();
		Ext.app.refreshTabpanel();
	}else{
		Ext.getCmp('ass_svc_model_combo').setValue('');
		Ext.app.caseDataGrid.activeEditor.completeEdit();
	}
}

/**
 * 获取下拉选显示文本值
 */
Ext.app.getComboText = function(grid,columnName){
	var recordArr = grid.getSelectionModel().getSelections();
	var cm = grid.getColumnModel();
	var index = cm.findColumnIndex(columnName);
	var bmxId = cm.getColumnId(index);// 编码项
	var data = recordArr[0].data;
	var v = data[cm.getDataIndex(bmxId)];
	return cm.config[bmxId].renderer(v);
}

// 移除tabpanel中的内容
Ext.app.setTabPanelBlank = function (){
	var blankJsp = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
	if(document.getElementById('projectCost') != null){
		document.getElementById('projectCost').src=blankJsp;
	}
	if(document.getElementById('saveElectricity') != null){
		document.getElementById('saveElectricity').src=blankJsp;
	}
	if(document.getElementById('roi') != null){
		document.getElementById('roi').src=blankJsp;
	}
	Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
	Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
	Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
}

// 设置formpanel中的值
Ext.app.setFormPanel　=　function(id){
	var util =new Bp.util.RequestUtils();
	var res = Ext.decode(util.sendRequest('pmv/reactivePowerOptimizationController/loadLsvcInfo.do',{
			id : id
	}));
	if (res != undefined && res.success) {
		Ext.app.costBuilding = res.data.cost_building;
		Ext.app.costInstall = res.data.cost_install;
		Ext.app.costEquipment = res.data.cost_equipment;
		Ext.app.costOthers = res.data.cost_others;
		Ext.app.costStatic = res.data.cost_static;
		Ext.app.costDynamic = res.data.cost_dynamic;
		Ext.getCmp('ratedkva').setValue(res.data.ratedkva_1);
		Ext.getCmp('costBuilding').setValue(res.data.cost_building);
		Ext.getCmp('costEquipment').setValue(res.data.cost_equipment);
		Ext.getCmp('costInstall').setValue(res.data.cost_install);
		Ext.getCmp('costOthers').setValue(res.data.cost_others);
		Ext.getCmp('costStatic').setValue(res.data.cost_static);
		Ext.getCmp('costDynamic').setValue(res.data.cost_dynamic);
	}
}

Ext.app.refreshTabpanel = function (){
	var record = Ext.app.caseDataGrid.getSelectionModel().getSelected();
	Ext.app.record = record;
	var model = record.data["ASS_MODEL"];
	var _model = Ext.app.setComboValue(model,Ext.app.SVCModel);
	if(_model!=undefined){
		model = _model
	}
//	var title = record.data["ASS_SVC_NAME"]+',功率因数有'+record.data["ASS_COS"]+'提高至'+record.data["ASS_REF_COS"]+'采用型号'+model+'无功补偿装置.'
//	title = encodeURIComponent(encodeURIComponent(title));
//	//工程费用
//		var num = record.data["ASS_SVC_NUM"];
//		Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/projectCost.jsp';
//		Ext.app.projectCostsrc += '?title='+title+'&costBuilding='+Ext.app.costBuilding*num+'&costInstall='+Ext.app.costInstall*num+'&costEquipment='+Ext.app.costEquipment*num
//		+'&costOthers='+Ext.app.costOthers*num+'&costStatic='+Ext.app.costStatic*num+'&costDynamic='+Ext.app.costDynamic*num;
//		if(document.getElementById('projectCost') != null){
//			document.getElementById('projectCost').src=Ext.app.projectCostsrc;
//		}
//		
//		//节电量
//		var allKVA = record.data["ASS_ONE_KVA"]*num;
//		Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/saveElectricity.jsp';
//		Ext.app.saveElectricitysrc += '?title='+title+'&allKVA='+allKVA;
//		if(document.getElementById('saveElectricity') != null){
//			document.getElementById('saveElectricity').src=Ext.app.saveElectricitysrc;
//		}
//		
//		//总投资收益
//		Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/roi.jsp';
//		if(document.getElementById('roi') != null){
//			document.getElementById('roi').src= Ext.app.roisrc;
//		}
}
//计算
Ext.app.calculate = function (){
	var editorRecord = Ext.app.caseDataGrid.getStore().getModifiedRecords();
	if (editorRecord.length > 0) {
		Ext.Msg.alert('系统提示', '请先保存数据!');
		Ext.app.tabPanel.setActiveTab(0);
		return;
	}
	var record = Ext.app.caseDataGrid.getSelectionModel().getSelections();
	if (record.length == 0) {
		Ext.Msg.alert('系统提示', '请选择一行数据!');
		Ext.app.tabPanel.setActiveTab(0);
		return;
	};
	var util =new Bp.util.RequestUtils();
	var num = Ext.app.record.data["ASS_SVC_NUM"];
	var res = Ext.decode(util.sendRequest('pmv/reactivePowerOptimizationController/calculate.do',{
		versionId : versionId,
		assSvcId : Ext.app.record.data["GUID"],
		assSvcProject : Ext.app.record.data["ASS_SVC_PROJECT"],
		costBuilding : Ext.app.costBuilding*num,
		costEquipment : Ext.app.costEquipment*num,
		costInstall : Ext.app.costInstall*num,
		costOthers : Ext.app.costOthers*num,
		costStatic : ((Ext.app.costBuilding-0)+(Ext.app.costEquipment-0)+(Ext.app.costInstall-0)+(Ext.app.costOthers-0))*num,
		costDynamic : Ext.app.costDynamic*num,
		assAllKva : Ext.app.record.data["ASS_ALL_KVA"],
		ySaveKwh : Ext.app.record.data["ASS_ALL_KVA"]*(0.05-0.008)*1000

	}));
	if (res != undefined && res.success) {
		Ext.app.tabPanel.setActiveTab(3);
	}else{
		Ext.app.tabPanel.setActiveTab(0);
	}
};
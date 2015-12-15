/**
 * 更换导线方案-增加一行新记录
 * */
Ext.app.addNewRecord = function (){
	var record = new Ext.data.Record.create([  
		{name:'GUID',type:'String'},  
		{name:'VERSIONID',type:'double'},  
		{name:'SYS_DEPT_CODE',type:'String'},  
		{name:'ASS_REF_PROJECT',type:'String'},
		{name:'ASS_REF_NAME',type:'String'},
		{name:'LINE_ID',type:'String'},
		{name:'LINE_NAME',type:'String'},
		{name:'ASS_REF_LONG',type:'Number'},
		{name:'ASS_MODEL',type:'String'},
		{name:'ASS_REF_MODEL',type:'String'}
	]); 
	
	var p = new record({  
		GUID : '',  
		VERSIONID : versionId,
		SYS_DEPT_CODE : deptguid,
		ASS_REF_PROJECT : task_name,
		ASS_REF_NAME : '',
		LINE_ID : Ext.app.modelguid,
		LINE_NAME : Ext.app.modelname,
		ASS_REF_LONG : '',
		ASS_MODEL : '',
		ASS_REF_MODEL : ''
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
 * 更换导线方案-删除
 */
Ext.app.deleteData = function(grid) {
	var record = grid.getSelectionModel().getSelections();
	if (record.length == 0) {
		Ext.Msg.alert('系统提示', '请至少选择一行数据!');
		return;
	};
	//向后台发送请求
	Ext.Msg.confirm("系统提示", "是否确认删除所选记录？", function(button, text) {
		if (button == 'yes') {
			var guid = new Array();
			Ext.each(record, function(record) {
				guid.push("'" + record.get("GUID") + "'");
			});
			
			Ext.Ajax.request({
				url : 'pmv/replaceWireTypeAction/deleteLineCaseData.do',
				params : {
					guid : guid.join(",")
				},
				async : false,
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						//删除成功后重新加载数据
						grid.getStore().reload();
						Ext.Msg.alert('系统提示', '删除导线方案成功！');
						Ext.app.caseDataGrid.getStore().commitChanges();
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
 * 更换导线方案-保存
 */
Ext.app.saveData = function() {
	var emptyFlag = false;
	//获取新增或修改的行记录
	var editorRecord = Ext.app.caseDataGrid.getStore().getModifiedRecords();
	
	if (editorRecord.length == 0) {
		Ext.Msg.alert('系统提示', '没有要保存的数据!');
		return;
	}
	
	//装载参数
	var saveEditor = []; 
	Ext.each(editorRecord,function(record){
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
			url : 'pmv/replaceWireTypeAction/saveLineCaseData.do',
			method : 'post',
			params : {
				'saveEditor' : Ext.encode(saveEditor)
			},
			success : function(response, options) {
				var res = Ext.util.JSON.decode(response.responseText);
				if(res.success){
					Ext.Msg.alert('系统提示','保存成功!');
					Ext.app.caseDataGrid.getStore().commitChanges();
					Ext.app.caseDataGrid.getStore().clearModified();
					Ext.app.caseDataGrid.getStore().reload();
					Ext.app.formPanel.getForm().reset();
					Ext.app.setTabPanelBlank();
					isCanModify = 0;
				}else{
					Ext.Msg.alert('系统提示','保存失败!');
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
 * 弹窗显示-中压线路单位造价库信息
 * */
Ext.app.showMediumVolLine = function(col){
	//获取单击选中行模型
	var record = Ext.app.caseDataGrid.getSelectionModel().getSelections();
	var data = record[0].data;
	
	var url = basePath + "pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/Window.jsp";
	var args = {
			
	};
	var width = 1120;
	var height = 500;
	
	var returnValue = window.showModalDialog(url, args, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	
	if (returnValue != undefined) {
		if(col == "ass_model_combo"){
			Ext.getCmp('ass_model_combo').setValue(returnValue.conductor_type);
		}else{
			Ext.getCmp('ass_ref_model_combo').setValue(returnValue.conductor_type);
			Ext.getCmp('type_landform').setValue(returnValue.type_landform);
			Ext.getCmp('cost_building').setValue(returnValue.cost_building);
			Ext.getCmp('cost_equipment').setValue(returnValue.cost_equipment);
			Ext.getCmp('cost_install').setValue(returnValue.cost_install);
			Ext.getCmp('cost_others').setValue(returnValue.cost_others);
			Ext.getCmp('cost_static').setValue(returnValue.cost_static);
			Ext.getCmp('cost_dynamic').setValue(returnValue.cost_dynamic);
			
			Ext.app.costBuilding = returnValue.cost_building;
			Ext.app.costInstall = returnValue.cost_install;
			Ext.app.costEquipment = returnValue.cost_equipment;
			Ext.app.costOthers = returnValue.cost_others;
			Ext.app.costStatic = returnValue.cost_static;
			Ext.app.costDynamic = returnValue.cost_dynamic;
			
			Ext.app.caseDataGrid.activeEditor.completeEdit();
			Ext.app.refreshTabpanel();
		}
	}else{
		if(col == "ass_model_combo"){
			Ext.getCmp('ass_model_combo').setValue('');
		}else{
			Ext.getCmp('ass_ref_model_combo').setValue('');
		}
		Ext.app.caseDataGrid.activeEditor.completeEdit();
	}
}

/**
 * 获取下拉选显示的文本值
 * */
Ext.app.getComboText = function(grid,columnName){
    //取得选中表格记录
	var recordArr = grid.getSelectionModel().getSelections();
	var cm = grid.getColumnModel();
	var index = cm.findColumnIndex(columnName);
	//编码项
	var bmxId = cm.getColumnId(index);
	var data = recordArr[0].data;
	var v = data[cm.getDataIndex(bmxId)];
	//返回显示文本内容
	return cm.config[bmxId].renderer(v);
}

/**
 * 移除tabPanel中的内容
 * */
Ext.app.setTabPanelBlank = function (){
	var blankJsp = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';
	
	if(document.getElementById('projectCost') != null){
		document.getElementById('projectCost').src = blankJsp;
	}
	if(document.getElementById('saveElectricity') != null){
		document.getElementById('saveElectricity').src = blankJsp;
	}
	if(document.getElementById('roi') != null){
		document.getElementById('roi').src = blankJsp;
	}
	
	Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';
	Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';
	Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';
}

/**
 * 设置formPanel中的值
 * */ 
Ext.app.setFormPanel　=　function(value){
	var util = new Bp.util.RequestUtils();
	var res = Ext.decode(util.sendRequest('pmv/replaceWireTypeAction/loadLNECostInfo.do',{
		value : value,
		deptId : deptguid
	}));
	if (res != undefined && res.success) {
		Ext.app.type_landform = res.data.type_landform;
		Ext.app.costBuilding = res.data.cost_building;
		Ext.app.costEquipment = res.data.cost_equipment;
		Ext.app.costInstall = res.data.cost_install;
		Ext.app.costOthers = res.data.cost_others;
		Ext.app.costStatic = res.data.cost_static;
		Ext.app.costDynamic = res.data.cost_dynamic;
		
		Ext.getCmp('type_landform').setValue(res.data.type_landform);
		Ext.getCmp('cost_building').setValue(res.data.cost_building);
		Ext.getCmp('cost_equipment').setValue(res.data.cost_equipment);
		Ext.getCmp('cost_install').setValue(res.data.cost_install);
		Ext.getCmp('cost_others').setValue(res.data.cost_others);
		Ext.getCmp('cost_static').setValue(res.data.cost_static);
		Ext.getCmp('cost_dynamic').setValue(res.data.cost_dynamic);
	}
}

Ext.app.refreshTabpanel = function (){
	  var recordArr = caseDataGrid.getSelectionModel().getSelections();
	  var record = recordArr[0];
	  Ext.app.record = record;
	  
	  var ass_model = Ext.app.getComboText(caseDataGrid,'ASS_MODEL');//改造前型号
	  var ass_ref_model = Ext.app.getComboText(caseDataGrid,'ASS_REF_MODEL');//改造后型号
}

/**
 * 计算
 * */
Ext.app.calculate = function (){
	var record = Ext.app.caseDataGrid.getSelectionModel().getSelections();
	if (record.length == 0) {
		Ext.Msg.alert('系统提示', '请选择一行数据!');
		Ext.app.tabPanel.setActiveTab(0);
		return;
	};
	
	var editorRecord = Ext.app.caseDataGrid.getStore().getModifiedRecords();
	if (editorRecord.length > 0) {
		Ext.Msg.alert('系统提示', '请先保存数据!');
		Ext.app.tabPanel.setActiveTab(0);
		return;
	}
	
	var util = new Bp.util.RequestUtils();
	var num = Ext.app.record.data["ASS_REF_LONG"];
	
	var res = Ext.decode(util.sendRequest('pmv/replaceWireTypeAction/calculate.do',{
		versionId : versionId,
		case_guid : Ext.app.record.data["GUID"],
	    ass_ref_project : task_name,
	    //工程费用
		costBuilding : Ext.app.costBuilding*num,
		costEquipment : Ext.app.costEquipment*num,
		costInstall : Ext.app.costInstall*num,
		costOthers : Ext.app.costOthers*num,
		costStatic : ((Ext.app.costBuilding-0)+(Ext.app.costEquipment-0)+(Ext.app.costInstall-0)+(Ext.app.costOthers-0))*num,
		costDynamic : Ext.app.costDynamic*num,
		//节电量
		ass_model : Ext.app.record.data["ASS_MODEL"],
		ass_ref_model : Ext.app.record.data["ASS_REF_MODEL"],
		ass_ref_long : num
	}));
	
	if (res != undefined && res.success) {
		Ext.app.tabPanel.setActiveTab(3);//工程费用
	}else{
		Ext.app.tabPanel.setActiveTab(0);
	}
};
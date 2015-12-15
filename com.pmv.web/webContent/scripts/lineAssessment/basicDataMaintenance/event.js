Ext.ns('Ext.app')

Ext.app.volt_store = new Ext.data.JsonStore({
	url : 'pmv/basicDataAction/getDisVolCode.do',
	fields : ['value', 'text'],
	autoLoad : true
});

Ext.app.model_store = new Ext.data.JsonStore({
	url : 'pmv/basicDataAction/getModelComoBox.do',
	fields : ['value', 'text'],
	autoLoad : true
});
Ext.app.area_store = new Ext.data.JsonStore({
	url : 'pmv/nxbgkAction/areaType.do',
	fields : ['value', 'text'],
	autoLoad : true
});

Ext.app.date_store = new Ext.data.JsonStore({
	url : 'pmv/basicDataAction/getDateComoBox.do',
	fields : ['value', 'text'],
	autoLoad : true
});

/**
 * 查询
 */
Ext.app.search = function() {
	
	Ext.getCmp('mainGrid').store.load();
	isCanModify = 0;
}

/**
 * 增加行记录
 * */
Ext.app.create = function (){
	
	if(versionId == '' || Ext.app.node.getDepth() == 1){
		Ext.Msg.alert('系统提示','请先选择工程任务！');
		return;
	}
	var row = Ext.app.grid.store.getModifiedRecords();
	
	var count = Ext.app.grid.store.getCount();//获得行记录数
	
	if(row.length > 0){
		Ext.getCmp('add').setDisabled(true);
		Ext.Msg.alert('系统提示','只能单条记录增加！');
		return;
	}
		
	var record = new Ext.data.Record.create([  
		{name:'GUID',type:'String'},  
		{name:'NAME',type:'String'},  
		{name:'SUBSTAION_ID',type:'String'},  //所属厂站 
		{name:'VOLTAGELEVEL',type:'String'}, //电压等级
		{name:'MODEL',type:'String'}, // 线路型号
		{name:'POWER_SUPPLY_AREA',type:'String'}, // 供电分区
		{name:'POWER_SUPPLY_RADIUS',type:'double'},// 供电半径
		{name:'DATE',type:'String'}, // 典型日
		{name:'RUN_UNIT',type:'String'} // 运行单位
	]); 
	
	var p = new record({  
		GUID : '',  
		NAME : '',  
		SUBSTAION_ID : '',
		VOLTAGELEVEL : '0200210',
		MODEL : '',
		POWER_SUPPLY_AREA : '',
		POWER_SUPPLY_RADIUS : '',
		DATE : Ext.app.defaultDxr,
		RUN_UNIT : dept_name // 运行单位此处设置 名称 后台保存时插入编码
	});  
	isCanModify = 1;
	Ext.app.grid.stopEditing();  
	Ext.app.grid.store.insert(count,p);  
	Ext.app.grid.startEditing(0,0); 	
}

/**
 * 删除
 */
Ext.app.deleteData = function() {
	
	var record = Ext.app.grid.getSelectionModel().getSelections();
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
				url : 'pmv/basicDataAction/deleteData.do',
				params : {
					guid : guid.join(",")
				},
				async : false,//非异步请求
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						//删除成功后重新加载数据
						grid.getStore().reload();
						// 清空运行数据明细store 
						Ext.getCmp('viceGrid').store.removeAll();
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
 * */
Ext.app.saveData = function (){
	//获取参数值
	var editorRecord = Ext.app.grid.store.getModifiedRecords();
	if (editorRecord.length>1) {
		Ext.Msg.alert('系统提示','只能单条记录修改!');
		return;
	}
	//装载参数
	var saveEditor = []; 
	Ext.each(editorRecord,function(record){
			saveEditor.push(record.data); 
	}); 
	
	if(saveEditor == ''){
		Ext.Msg.alert('系统提示','没有要保存的数据!');
		return;
	}	
	if(!isNotNull(editorRecord[0])){
		Ext.Msg.alert('系统提示', '有未填项，所有项均必填!');
		return;
	}
	Ext.Ajax.request({
    	url : 'pmv/basicDataAction/saveData.do',
		method : 'post',
		params : {
			'saveEditor' : Ext.encode(saveEditor),
			'versionId' : versionId
		},
		success : function(response,options){
			var res = Ext.util.JSON.decode(response.responseText);
			if(res.success == 'exist'){
				Ext.Msg.alert('系统提示','数据已存在,请重新输入!');
				return;
			}else if(res.success){
				Ext.Msg.alert('系统提示','保存成功!');
				editorRecord.clear();
				Ext.getCmp('add').setDisabled(false);
				Ext.app.grid.getStore().load();	
				isCanModify = 0;
			}else{
				Ext.Msg.alert('系统提示','保存失败!');
				Ext.app.grid.getStore().load();	
			}
		},
		failure : function(form, action){
			Ext.Msg.alert('系统提示','数据保存失败!');
		}
	});
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

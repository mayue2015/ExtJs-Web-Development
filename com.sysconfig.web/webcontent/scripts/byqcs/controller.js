/**
 * 设置默认值
 */
Ext.app.setDefaultValue = function() {
	dataGrid.setDefaultValues({
		'DEPT_CODE' : deptguid,
		'SYS_DEPT_CODE' : deptguid,
		'H_TABDELTA' : '2.5',
		'M_TABDELTA' : '2.5',
		'H_TABPOSITION' : '1' // 高压侧抽头位置
	});
};

/**
 * 重复值判断
 */
Ext.app.checkData = function(data) {

	var _data = dataGrid.getStore().getModifiedRecords();;
	var m = new Array();
	var guid = new Array();
	// 修改或添加数据组 中是否存在重复值
	if(data.adddata.length != 0 
			|| data.edtdata.length != 0) {
		for(var i = 1; i<_data.length; i++){
			var model = _data[0].get('MODEL');
			if(model == _data[i].get('MODEL')){
				Ext.Msg.alert('系统提示', '所添加型号已存在!');
				return false;
			}
		}
	}
	if(data.adddata.length != 0 // 既修改又添加
			&& data.edtdata.length != 0) {
		getValue(_data);
	}else if(data.adddata.length != 0) {// 添加
		getValue(_data);
	} else if (data.edtdata.length != 0) {// 修改
		getValue(_data);
	}
	
	function getValue(_data){
		Ext.each(_data, function(row) {
			m.push(row.get('MODEL'));
		});
		Ext.each(_data, function(row) {
			guid.push(row.get('GUID'));
		});
	}
	var url = "sysconfig/byq/checkData.do";
	var util = new Bp.util.RequestUtils();
	var result = util.sendRequest(url, {
		model : m,
		guid : guid
		
	});
	var flag = Ext.decode(result);
	if (flag.success) {
		Ext.Msg.alert("系统提示", flag.info);
		return false;
	}
};


/**
 * 导出数据
 */
Ext.app.exportExl = function() {
//	dataGrid
	
};

/**
 * 导入数据
 */
Ext.app.implExl = function() {

	var form1 = new Ext.form.FormPanel({
		baseCls : 'x-plain',
		labelWidth : 150,
		fileUpload : true,
		defaultType : 'textfield',
		items : [{
			xtype : 'textfield',
			fieldLabel : '请选择要导入的文件',
			name : 'userfile',
			id : 'userfile',
			inputType : 'file',
			blankText : 'File can\'t not empty.',
			anchor : '100%'
		}]
	});
	var win = new Ext.Window({
		title : '导入',
		width : 400,
		height : 100,
		minWidth : 300,
		minHeight : 100,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : form1,
		buttons : [{
			text : '确定',
			handler : function() {
				if (form1.form.isValid()) {
					if(Ext.getCmp('userfile').getValue() == ''){
					     Ext.Msg.alert('系统提示', '请选择你要导入的文件');
					     return;
					}
					form1.getForm().submit({
						url:'planning/excelAction/excelImport.do',
						method : 'post',
						params : {
							type : 'BYQCS'
						},
						success:function(form, action){
							win.close();
							var res = action.result;
							if(res == undefined){
								Ext.Msg.alert("系统提示", "导入失败，请检查原因!");
								return;
							}
							var fh = res.info;
							if(fh == "tips"){
								Ext.Msg.alert("系统提示", res.gridInfo);
								return;
							}else if(fh == "fileTips" || fh == 'sysExist'){
								var jspWeb = '';
								var data = res.gridInfo;
								var param = {};
								if(fh == "fileTips"){
									param = {data: data};
									jspWeb = 'tzwhImportError.jsp';
								}else if(fh == 'sysExist'){
									var path = res.path;
									var cfId = res.cfId;
									var templateId = res.templateId;
									var temVersion = res.versionId;
									param = {data: data, path : path, cfId : cfId, versionId : temVersion, templateId : templateId};
									jspWeb = 'tzwhImportUpdate.jsp';
								}
								var windowParam = "dialogWidth:650px;dialogHeight:400px;toolbar=no;" +
										"menubar=no;scrollbars=no;resizable=no;location=no;status=no";
						    	var paraObj = window.showModalDialog(basePath+"/equipment/webViews/tzwh/"+jspWeb, param ,windowParam);
							}else if (fh=='success') {
								Ext.Msg.alert("系统提示", "导入数据成功！");
								dataGrid.store.reload();
								return;
							}else{
								Ext.Msg.alert("系统提示", "导入数据失败！");
								return;
							}
						},
						failure : function(form, action){
							Ext.Msg.alert('系统提示', '导入数据失败!');
							win.close();
						}
					});
				}else{
				    Ext.Msg.alert("系统提示", "请选择文件后再上传！");
				}
			}
	     }, {
			text : '关闭',
			handler : function() {
				win.close();
			}
	     }]
	});
	win.show();
	
};

/**
 * 提取基准参数
 */
Ext.app.getBaseData = function() {
	Ext.Msg.confirm("请确认", "是否提取变压器基准参数?", function(button, text) {
		if (button == 'yes') {
			Ext.Ajax.request({
				url : 'sysconfig/dxcswhAction/getBaseData_byq.do',
				params : {
					user_dept : deptguid,
					type : 'first'
				},
				async : false,
				success : function(response, options) {
					var res = Ext.util.JSON.decode(response.responseText);
					if (res.success) {
						dataGrid.store.reload();
						Ext.Msg.alert('系统提示', '提取成功！');
					} else {
						Ext.Msg.confirm("请确认", "已提取基准参数,确认再次提前?", function(button, text) {
							if (button == 'yes') {
								Ext.Ajax.request({
									url : 'sysconfig/dxcswhAction/getBaseData_byq.do',
									params : {
										user_dept : deptguid,
										type : 'two'
									},
									async : false,
									success : function(response, options) {
										var res = Ext.util.JSON.decode(response.responseText);
										if (res.success) {
											dataGrid.store.reload();
											Ext.Msg.alert('系统提示', '提取成功！');
										} else {
											Ext.Msg.alert('系统提示', '提取失败！');
										}
									}
								});
							}
						});
					}
				}
			});
		}
	});
};
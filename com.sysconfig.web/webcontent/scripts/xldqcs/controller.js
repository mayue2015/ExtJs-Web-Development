/**
 * 设置默认值
 */
Ext.app.setDefaultValue = function() {
	dataGrid.setDefaultValues({
		'DEPT_CODE' : deptguid,
		'SYS_DEPT_CODE' : deptguid
	});
};

/**
 * 提取基准参数
 */
Ext.app.getBaseData = function() {
	Ext.Msg.confirm("请确认", "是否提取线路电气基准参数?", function(button, text) {
		if (button == 'yes') {
			Ext.Ajax.request({
				url : 'sysconfig/dxcswhAction/getBaseData_xl.do',
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
						Ext.Msg.confirm("请确认", "已提取基准参数，确认再次提取?", function(button, text) {
							if (button == 'yes') {
								Ext.Ajax.request({
									url : 'sysconfig/dxcswhAction/getBaseData_xl.do',
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

/**
 * 获取同一导线型号下的几何均距
 * */
Ext.app.dataJson = function() {
	Ext.Ajax.request({
		url : 'sysconfig/dxcswhAction/getAverageDistance.do',
		params : {
			conductor_type : Ext.app.conductorType,
			deptguid : deptguid
		},
		method : 'post',
		success : function(response, options) {
			var value = decodeURIComponent(response.responseText);
			Ext.app.data = eval('(' + value + ')');
		}
	});
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
							type : 'XLCS'
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

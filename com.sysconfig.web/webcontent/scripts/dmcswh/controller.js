/**
 * 设置默认值
 */
Ext.app.setDefaultValue = function() {
	
};

/**
 *选择线路 - 打开页面时的查询
 */
Ext.app.selectLineSearchForOpen = function() {
	var objectExch;
	var volt;
	var selconcostore = Ext.getCmp('selcon_co').getStore();
	selconcostore.on('load', function(){if(selconcostore.getTotalCount()>0){objectExch = selconcostore.getAt(0).data.code;Ext.getCmp('selcon_co').setValue(objectExch)}});
	var selconvoltstore = Ext.getCmp('selcon_volt').getStore();
	selconvoltstore.on('load', function(){if(selconvoltstore.getTotalCount()>0){volt = selconvoltstore.getAt(0).data.code;Ext.getCmp('selcon_volt').setValue(volt)}});
	Ext.getCmp('selcon_co').getStore().load();
	Ext.getCmp('selcon_volt').getStore().load();
	Ext.getCmp('selcon_lineName').setValue('');
	Ext.app.selectLineSearch(objectExch,volt,'');
}

/**
 *选择线路 - 点击查询按钮时的查询
 */
Ext.app.selectLineSearchForButton = function() {
	var objectExch = Ext.getCmp('selcon_co').getValue();
	var volt = Ext.getCmp('selcon_volt').getValue();
	var linename = Ext.getCmp('selcon_lineName').value;
	Ext.app.selectLineSearch(objectExch,volt,linename);
}
/**
 *选择线路 - 通用查询
 */
Ext.app.selectLineSearch = function(objectExch,volt,linename) {
	var constr = '';
	if (objectExch!='') {
		if(constr!=''){
			constr = constr+" AND "
		}
		constr=" ((FIRST_PROVINCE= '"+ areaCode +"' and STOP_PROVINCE='"+objectExch+"') "
							+ "or (FIRST_PROVINCE = '"+ objectExch +"' and STOP_PROVINCE='"+areaCode+"')) ";
	}
	if (volt!='') {
		if(constr!=''){
			constr = constr+" AND "
		}
		constr=constr+" VOLTAGELEVEL = '"+volt+"' ";
	}
	if (linename!='') {
		if(constr!=''){
			constr = constr+" AND "
		}
		constr=constr+" NAME LIKE '%"+linename+"%' ";
	}
	selConGrid.loadData(Ext.app.selConLineAppID, Ext.app.selConLineClsID,null,null,constr);
};

/**
 *选择线路 - 确定
 */
Ext.app.selectLineComit = function() {
	var objectExch = Ext.getCmp('selcon_co').getValue();
	var volt = Ext.getCmp('selcon_volt').getValue();
	var records = selConGrid.getSelectionModel().getSelections(); 
	var ids = '';
	var names = '';
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		ids=ids+','+record.get('GUID');
		names=names+','+record.get('NAME');
	}
	if(ids!=''){
		ids = ids.substring(1);
		names = names.substring(1);
	}
	if(dataGrid.getSelectionModel()){
		var precord = dataGrid.getSelectionModel().getSelected(); 
		precord.set('OBJECT_EXCH',Ext.getCmp('selcon_co').getValue());
		precord.set('OBJECT_EXCH_DSPVALUE',Ext.getCmp('selcon_co').lastSelectionText);
		precord.set('VOLTAGELEVEL',Ext.getCmp('selcon_volt').getValue());
		precord.set('VOLTAGELEVEL_DSPVALUE',Ext.getCmp('selcon_volt').lastSelectionText);
		precord.set('LINEID',ids);
		precord.set('LINENAME',names);
	}
}

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
							type : 'DMCS'
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
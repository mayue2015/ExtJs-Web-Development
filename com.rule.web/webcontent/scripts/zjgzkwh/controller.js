
var text;
/**
 * 在数据表格添加导出按钮
 * 
 * @param {Ext.ux.BDGrid}
 */
Ext.app.addExportBtn = function(grid) {
	var addExportBtn = new Ext.Button({
		text : "导出",
		iconCls : 'excel',
		listeners : {
			click : function() {			
				var tempLateName = '';//ZJGZKWH
				var baseArray = new Array();
				baseArray[0] = 'FLBM';
				baseArray[1] = 'FLBM_DSPVALUE';
				var filePath = 'F:\\';				
				var date = new Date();
				var time=date.format('YmdHms')
				var fileName = 'book'+time;			
				Ext.ux.Grid2Excel.Save2Excel( Ext.app.dataGrid, '',baseArray,'','');			
			}
		}
	});
	var addImportBtn = new Ext.Button({
		text : "导入",
		iconCls : 'excel',
		listeners : {
			click : function() {
				btn_bjimport_function();
			}
		}
	});
	grid.getTopToolbar().add(addExportBtn,'-',addImportBtn,'-');
	
//	grid.getTopToolbar().add("-");
};





function btn_bjimport_function(){	 			
	 var form = new Ext.form.FormPanel({
		 baseCls : 'x-plain',
		 labelWidth : 150,
		 fileUpload : true,
		 defaultType : 'textfield',
		 items : [{
			 xtype : 'textfield',
			 fieldLabel : '请选择要导入的Excel文件',
			 name : 'userfile',
			 id : 'userfile',
			 inputType : 'file',
			 blankText : 'File can\'t not empty.',
			 anchor : '100%' // anchor width by percentage
		 }]
	 });
	 var win = new Ext.Window({ 
		 title : 'Excel导入',
		 width : 400,
		 height : 150,
		 minWidth : 300,
		 minHeight : 100,
		 layout : 'fit',
		 plain : true,
		 bodyStyle : 'padding:5px;',
		 buttonAlign : 'center',
		 items : form,
		 buttons : [{
			 text : '确定',
            handler : function() {
           	 if (form.form.isValid()) {
           		 if(Ext.getCmp('userfile').getValue() == ''){
           			 Ext.Msg.alert('错误','请选择你要导入的文件');
           			 return;
           		 }	
           		 form.getForm().submit({
           			 url:'rule/zjgzkAction/excelImport.do?clsId='+Ext.app.clsID,
           			 method : 'post',
           			 success:function(form, action){
           				 win.close();
           				 var res = action.result;
           				 if(res == undefined){
           					 alert("导入失败，请检查原因!");
           					 return;
           				 }
           				 var fh = res.info;
           				 if(fh == "tips"){
           					 alert(res.gridInfo);
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
           					 var paraObj = window.showModalDialog(basePath+"/dwgh/view/tzwh/"+jspWeb, param ,windowParam);
           					 if(paraObj){
//           						 kgFormEditOne(sub_guid,versionId);
           					 }else{
//           						 kgFormEditOne(sub_guid,versionId);
           					 }
           				 }else if (fh=='success') {
           					 Ext.Msg.alert("系统提示", "导入数据成功！");
//           					 kgFormEditOne(sub_guid,versionId);
           					 return;
           				 }else if(fh == 'failure'){
           					 alert("导入失败，请检查原因!");
//           					 kgFormEditOne(sub_guid,versionId);
           					 return;
           				 }
           			 },
           			 failure : function(form, action){
           				 Ext.Msg.alert('系统提示','导入数据失败!');
//           				 kgFormEditOne(sub_guid,versionId);
           				 win.close();
           			 }
           		 });
           	 }else{
           		 Ext.Msg.alert("系统提示","请选择文件后再上传！");
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
}


/**
 * 移除平台按钮
 * 
 * @param {Ext.ux.BDGrid}
 */
Ext.app.addRemoveToolbar = function(grid) {
	var items = grid.getTopToolbar().items.items;
	Ext.each(items, function(item, index) {
		if (index == 8 || index == 9 || index == 10 || index == 11) {
			item.hide();
		}
	})
};

/**
 * 设置默认值
 */
Ext.app.zjgzkSetValue=function(){
	
	dataGrid.setDefaultValues({
		'FLBM' : Ext.app.node.attributes.attr.code,
		'FLBM_DSPVALUE' : Ext.app.node.text
	});
};

/**
 * 左侧导航树
 */
Ext.app.leftTree = function(node) {
	Ext.app.node = node;
	if (node.getDepth() == 1) {// 第一层
		// 根节点隐藏Toolbar
		dataGrid.getTopToolbar().disable();
	} else if (node.getDepth() == 2) {// 第二层
		dataGrid.getStore().on("load", function() {
			dataGrid.getTopToolbar().enable();
		});
		Ext.app.zjgzkSetValue();
		dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', "FLBM='"
				+ node.attributes.attr.code + "'");
		//调用默认值设置
		
	}
}

/**
 * 校验数据重复
 */
Ext.app.validateData = function(grid) {

	var sfmc = "";
	// 获得当前页数据仓库值
	var data = grid.getStore().data.items;
	// 获得新添加的数据值
	var rows = grid.getStore().getModifiedRecords();
	// 获得分类编码
	var flbm = rows[0].get("FLBM");
	// 调用后台进行判断
	var url = "rule/zjgzkAction/validateData.do";
	// 创建同步请求对象
	var util = new Bp.util.RequestUtils();
	// 请求返回参数
	var result = "";
	// 输入值GUID
	var guid = "";
	// 标识
	var flag = "";
	// 封装 获取的GUID
	for (var i = 0; i < rows.length; i++) {
		guid += "'";
		guid += rows[i].get('GUID');
		guid += "'";
		guid += ",";
	}
	guid = guid.substring(0, guid.length - 1);

	// 封装 获取的名称值
	for (var i = 0; i < rows.length; i++) {
		sfmc += "'";
		sfmc += rows[i].get('SFMC');
		sfmc += "'";
		sfmc += ",";
	}
	sfmc = sfmc.substring(0, sfmc.length - 1);

	result = util.sendRequest(url, {
		guid : guid,
		flbm : flbm,
		sfmc : sfmc
	});
	flag = Ext.decode(result).success;
	if (flag == 'success') {
		// 调用增加去重校验
		var v = Ext.app.addValidate(data, util, url, sfmc, flbm);
		if (v == false) {
			return false;
		}
	} else {// 表示修改
		var v = Ext.app.xgValidate(rows, util, sfmc, flbm, guid);
		if (v == false) {
			return false;
		}
	}
}

/**
 * 新增时进行 去重校验
 */

Ext.app.addValidate = function(data, util, url, sfmc, flbm) {

	var result = "";
	// 判断所增加的数据中是否存在重名
	for (var j = 1; j < data.length; j++) {
		var first = data[0].get('SFMC');
		if (first == data[j].get('SFMC')) {
			Ext.Msg.alert('系统提示', '输入名称存在重复值,请重新输入！');
			return false;
		}
	}
	// 调用请求方法
	result = util.sendRequest(url, {// 已经判断出为新增，则判断 名称是否存在
		sfmc : sfmc,
		flbm : flbm,
		type : 'new'
	});
	// 获取返回值
	var flag = Ext.decode(result).success;
	if (flag != 'success') {
		Ext.Msg.alert('系统提示', '输入的算法名称已存在请重新输入！');
		return false;
	}
}

/**
 * 修改时进行去重校验
 */
Ext.app.xgValidate = function(rows, util, sfmc, flbm, guid) {

	var xgUrl = "rule/zjgzkAction/validateDateForXg.do"
	// 调用请求方法
	// 已经判断出为新增，则判断 名称是否存在(包括对同时修改多行 序号 进行校验)
	var result = util.sendRequest(xgUrl, {
		sfmc : sfmc,
		flbm : flbm,
		guid : guid
	});
	// 获取返回值
	var flag = Ext.decode(result).success;
	var type = Ext.decode(result).type;
	if (flag != 'success') {// 修改算法名称
		Ext.Msg.alert('系统提示', '输入的算法名称已存在请重新输入！');
		return false;
	} else {
		if (type == 'true') {
			for (var j = 1; j < rows.length; j++) {
				var first = rows[0].get('SFMC');
				if (first == rows[j].get('SFMC')) {
					Ext.Msg.alert('系统提示', '输入名称存在重复值,请重新输入！');
					return false;
				}
			}
		}
	}

}

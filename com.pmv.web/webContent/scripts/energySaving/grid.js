	var nodeId = '';	
	var sm = new Ext.grid.CheckboxSelectionModel();// 设置表格可以有复选框操作
	var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), sm, {
		header : '系统编码',
		dataIndex : 'id',
		width : 150,
		hidden : true
	}, {
		header : '项目名称',
		dataIndex : 'projectName',
		width : 100
	},{
		header : '节能量属性',
		dataIndex : 'savingType',
		width : 100
	},{
		header : '所属单位',
		dataIndex : 'unitName',
		width : 100
	}, {
		header : '项目类型',
		dataIndex : 'projectType',
		width : 100
	}, {
		header : '节能单位名称',
		dataIndex : 'sUnitName',
		width : 100
	}, {
		header : '所属地区',
		dataIndex : 'araName',
		width : 100
	}, {
		header : '行业类别',
		dataIndex : 'tradeType',
		width : 100
	}, {
		header : '是否合同能源管理',
		dataIndex : 'ifAgree',
		width : 100
	}, {
		header : '预评估时间',
		dataIndex : 'preDate',
		width : 100
	}, {
		header : '后评估时间',
		dataIndex : 'afterDate',
		width : 100
	}, {
		header : '节能类型',
		dataIndex : 'bigName',
		width : 100,
		hidden : true
	}, {
		header : '节能类型编码',
		dataIndex : 'bigCode',
		width : 100,
		hidden : true
	}, {
		header : '项目类型编码',
		dataIndex : 'projectCode',
		width : 100,
		hidden : true
	} ]);

	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'pmv/energySave/getGridData.do',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'grids'
		}, [ {
			name : 'id'
		}, {
			name : 'projectName'
		},{
			name : 'savingType'
		},{
			name : 'unitName'
		}, {
			name : 'projectType'
		}, {
			name : 'sUnitName'
		}, {
			name : 'araName'
		}, {
			name : 'tradeType'
		}, {
			name : 'ifAgree'
		}, {
			name : 'preDate'
		}, {
			name : 'afterDate'
		}, {
			name : 'bigName'
		}, {
			name : 'bigCode'
		}, {
			name : 'projectCode'
		} ])
	});
	
	store.on('beforeload', function() {
		this.baseParams = {
			id : nodeId,
			start : 0, 
			limit : 15
		};
	});

	var grid = new Ext.grid.GridPanel({
		id : 'grid',
		layout:'fit',
		columnWidth:1,
		store : store,
		cm : cm,
		sm : sm,
		loadMask : false,// 载入遮罩动画
		animate : true,
		height : document.documentElement.offsetHeight - 22,
		// 底部工具条
		bbar : new Ext.PagingToolbar({
			id : 'abr',
			pageSize : 15,
			store : store,
			id : nodeId,
			displayInfo : true,
			displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
			emptyMsg : "无数据。"
		}),
		tbar : [ {
			id : 'btn_add',
			text : '增加',// 公共代码信息',
			iconCls : 'add',
			handler : btn_add_function
		}, '-', {
			id : 'btn_edit',
			text : '修改',// 公共代码信息',
			iconCls : 'edit',
			handler : btn_edit_function
		}, '-', {
			id : 'btn_delete',
			text : '删除',// 公共代码信息',
			iconCls : 'remove',
			handler : btn_delete_function
		}, '-', {
			id : 'btn_import',
			text : '导入',
			tooltip : '导入设备数据',
			iconCls : 'llxs-import',
			handler : btn_import_function
		}, '-', {
			id : 'btn_export',
			text : '导出',
			tooltip : '导出设备信息',
			iconCls : 'llxs-export',
			handler : btn_export_function
		} ]
	});
	
//新增
function btn_add_function(){
	var param = {};
	
	var id = "";
	var currentNode = Ext.getCmp('treePanel').getSelectionModel().selNode;
	var nodeId = currentNode.id;
	var nodeName = currentNode.text;
	var parantId = currentNode.parentNode.id;
	var parantName = currentNode.parentNode.text;
	
	param = {name : '', id : id, bigCode : parantId, bigName : parantName, smallCode : nodeId, smallName : nodeName};
	addOrEdit(param);
}

//修改
function btn_edit_function(){
	var rows = grid.getSelectionModel().getSelections();//返回值为 Record数组
	 if(rows[0] == undefined){
		 Ext.MessageBox.alert('系统提示','请选择要修改的记录!');
		 return;
	 }else if(rows.length > 1){
		 Ext.MessageBox.alert('系统提示','只能选择一条记录修改!');
		 return;
	 }
	
	var param = {};
	var id = rows[0].data.id;
	var name = rows[0].data.projectName;
	
	var nodeId = rows[0].data.projectCode;
	var nodeName = rows[0].data.projectType;
	var parantId = rows[0].data.bigCode;
	var parantName = rows[0].data.bigName;
	
	param = {name : name, id : id, bigCode : parantId, bigName : parantName, smallCode : nodeId, smallName : nodeName};
	addOrEdit(param);
	
}

function addOrEdit(param){
	var windowParam = "dialogWidth:300px;dialogHeight:230px;toolbar=no;" +
			"menubar=no;scrollbars=no;resizable=no;location=no;status=no";
	var paraObj = window.showModalDialog(basePath+"/pmv/webViews/energySaving/energySaveAddUpdate.jsp", 
			param ,windowParam);
	if(paraObj){
		refreshTree();
	}
}

//删除
function btn_delete_function(){
	var _record = grid.getSelectionModel().getSelected();
	if (_record) {
		Ext.MessageBox.confirm('系统确认', '你确认要删除这些数据吗？', function(btn) {
			if (btn == "yes") {
				var permission_id = "";
				var nodeName = "";
				var rows = grid.getSelectionModel().getSelections();// 返回值为
				if (rows.length == 0){
					Ext.Msg.alert("系统消息", "请选择要删除的数据！");
					return;
				}else {
					var currentNode = Ext.getCmp('treePanel').getSelectionModel().selNode;
					nodeName = currentNode.text;
					for ( var i = 0; i < rows.length; i++) {
						permission_id += "'" + rows[i].id + "',";
						store.remove(rows[i]);
					}
					permission_id = permission_id.substring(0,
							permission_id.length - 1);
				}
				Ext.Ajax.request({
					 url : 'pmv/energySave/delData.do',
					 method : 'post',
					 params : {
						 guid : permission_id,
						 nodeName : nodeName
					 },
				 success : function(response,options) {
					 var res = Ext.util.JSON.decode(response.responseText);
						var fh = res.success;
						if(fh == 'success'){
							Ext.MessageBox.alert('系统提示','删除成功!');
							refreshTree();
						}
				 }
				 });
			}
		})
	} else {
		Ext.Msg.alert('系统消息', '请选择要删除的数据项！');
	}
}

function btn_import_function(){
	
}

function btn_export_function(){
	
}

//刷新树节点
function refreshTree() {
	var currentNode = Ext.getCmp('treePanel').getSelectionModel();
	if (currentNode)
		currentNode.selNode.reload();
}
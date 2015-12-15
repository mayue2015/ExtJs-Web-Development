/**
 * 电压等级维护-刷新按钮
 * @param grid
 * */
Ext.app.addRefreshBtn = function(grid) {
	var refreshButton = new Ext.Button({
		text : '刷新',
		iconCls : 'pms_grid_refresh',
		tooltip : '刷新',
		listeners : {
			click : function() {
				//加载电压编码/颜色/默认颜色数据集
				Ext.app.dataJson();
				//重新加载数据
				grid.store.reload();
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(refreshButton);
}

/**
 * 获取数据表中查询结果集合
 * 根据不同的树节点(部门单位)返回相应的电压等级信息
 */
Ext.app.dataJson = function() {
	Ext.Ajax.request({
		url : 'sysconfig/dydjAction/getData.do?nodeID='+Ext.app.nodeId,
		method : 'post',
		success : function(response, options) {
			var value = decodeURIComponent(response.responseText);
			Ext.app.data = eval('(' + value + ')');
		}
	});
};

/**
 * 电压等级维护-应用按钮
 * @param grid
 * */
Ext.app.btn_accept_function = function(grid){
	var acceptButton = new Ext.Button({
		text : '应用',
		iconCls : 'accept',
		tooltip : '应用电压等级到其他部门',
		listeners : {
			click : function() {
				var _record = grid.getSelectionModel().getSelected(); //是否被选中
				if (_record) {
					var permission_id = "";
					var rows = grid.getSelectionModel().getSelections(); //选中记录返回的信息
					if (Ext.app.nodeId == null){
						Ext.Msg.alert("系统提示", "请先选择一个部门单位！");
					    return;
					}else {
						if(rows.length == 0){
							Ext.Msg.alert("系统消息", "请先选择要应用的数据！");
							return;
						}else{
							for ( var i = 0; i < rows.length; i++) {
								permission_id += "'" + rows[i].data.ID + "',";
							}
							permission_id = permission_id.substring(0, permission_id.length - 1);
						}
					}
					
					var winParams = "dialogWidth:370px;dialogHeight:450px;toolbar=no;menubar=no;scrollbars=no;resizable=no;location=no;status=no";
					var obj = window.showModalDialog(
							basePath + "sysconfig/views/dydjwh/acceptDept.jsp",
							{
								volId : permission_id, 
								deptId : Ext.app.nodeId
							}, 
							winParams);
				}else{
					Ext.Msg.alert("系统消息", "请先选择要应用的数据！");
					return;
				}
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(acceptButton);
}

/**
 * 电压等级维护-部门单位-树节点点击事件
 * 
 * @param node 树节点
 */
Ext.app.dydjwhTreeClick = function(node){
		Ext.app.node = node; //树节点设置全局变量
		Ext.app.nodeId = node.id; //树节点ID设置全局变量
		Ext.app.parentNodeId = node.parentNode.id; //当前节点的父级节点ID设置全局变量
		//点击当前节点，子节点自动展开
		Ext.app.node.expand();
		
		if (Ext.app.node != null || Ext.app.node != undefined) {
			if(node.getDepth() >= 1){
				//点击节点时新增按钮恢复生效
				Ext.app.dataGrid.getStore().on("load", function() {
					Ext.app.dataGrid.getTopToolbar().items.items[1].enable();//新增失效
				});
				
				//每点击一次节点返回该节点下相应的电压等级信息
				Ext.app.dataJson();
				
				//加载(刷新)数据
				var sql = " SYS_DEPT_CODE = '"+ node.id +"' ";
				Ext.app.dataGrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql); 
				
				//调用设置默认值方法
				Ext.app.dydjwhGridSetDefaultValues();
			}
		}
};

/**
 * 电压等级维护-点击树节点-设置默认值
 * 
 * @param
 */
Ext.app.dydjwhGridSetDefaultValues = function() {
	if (Ext.app.nodeId != null || Ext.app.nodeId != undefined) {
		var node = Ext.app.node;
		Ext.app.dataGrid.setDefaultValues({ 
			'SYS_DEPT_CODE_DSPVALUE' : node.text,
			'SYS_DEPT_CODE' : node.id,
			'DEPT_CODE' : node.id
		});
	}
};

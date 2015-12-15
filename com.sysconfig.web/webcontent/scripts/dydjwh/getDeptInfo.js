Ext.onReady(function() {
	
	var volId = null;
	var deptId = null;
	var arg = window.dialogArguments;//获得父窗口 
	if(arg){
		deptId = arg.deptId;
		volId = arg.volId;
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var cm = new Ext.grid.ColumnModel([ 
	         new Ext.grid.RowNumberer(), 
	         sm, 
	    {
			header : '部门编码',
			dataIndex : 'deptId',
			width : 150,
			hidden : true
		}, {
			header : '部门名称',
			dataIndex : 'deptName',
			width : 190
		}
	]);
	
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'planning/volevel/getChildData.do',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'deptGrid'
			}, [{
				name : 'deptId'
			}, {
				name : 'deptName'
			}
		])
	});
	
	store.on('beforeload', function() {
		this.baseParams = {
//				start : 0,// 第0条开始
//				limit : 5,// 每次10条分页
			    deptId : deptId
		};
	});
	
	var grid = new Ext.grid.GridPanel({
		id : 'grid',
		region : 'center',
		columnWidth : 1,
		store : store,
		cm : cm, 
		sm : sm,
		loadMask : false,
		animate : true,
		bbar : new Ext.PagingToolbar({
		    id : 'bar',
//			pageSize : 10,
			store : store,
			deptId : deptId,
			displayInfo : true,
			displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
			emptyMsg : "无数据。"
		}),
		tbar : [{
			id : 'btn_save',
			text : '确定',// 公共代码信息',
			tooltip : '应用到其他部门电压等级信息',
			iconCls : 'save',
			handler : btn_save_function
		}, '-', {
			id : 'btn_cancle',
			text : '取消',// 公共代码信息',
			tooltip : '关闭窗口',
			iconCls : 'cancel',
			handler : btn_cancle_function
		}]
	});
	
	function btn_save_function(){
		var _record = grid.getSelectionModel().getSelected();
		if (_record) {
			var permission_id = "";
			var rows = grid.getSelectionModel().getSelections();// 返回值为
			if (rows.length == 0){
				Ext.Msg.alert("系统消息", "请先选择要应用的部门！");
				return;
			}else {
				for ( var i = 0; i < rows.length; i++) {
					permission_id += "'" + rows[i].data.deptId + "',";
				}
				permission_id = permission_id.substring(0, permission_id.length - 1);
			}
			Ext.Ajax.request({
				url : 'planning/volevel/volAccept.do',
				method : 'post',
				params : {
					deptids : permission_id,
					deptId : deptId,
					volId : volId
				},
				success : function(response,options) {
					window.close();
				}
			});
		}else{
			Ext.Msg.alert("系统消息", "请先选择要应用的部门！");
			return;
		}
	}
	
	store.load({
		params : {
//			start : 0,// 第0条开始
//			limit : 5,// 每次10条分页
			deptId : deptId
		}
	});	
	
	function btn_cancle_function(){
		window.close();
	}
	
	var viewPort = new Ext.Viewport({
		layout : 'border',
		items : [grid]
	});
	
});
//变压器型号选择.js
Ext.onReady(function() {
	var transSm = new Ext.grid.CheckboxSelectionModel();// 设置表格可以有复选框操作
	var transCm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), transSm, {
		header : '型号',
		dataIndex : 'model',
		width : 100
	},{
		header : '额定容量',
		dataIndex : 'mva',
		width : 100
	}, {
		header : '空载损耗',
		dataIndex : 'noLoadLoss',
		width : 100
	}, {
		header : '短路损耗',
		dataIndex : 'shortLoss',
		width : 100
	} ]);

	var transStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'pmv/energySave/getTransModelData.do',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'grids'
		}, [ {
			name : 'model'
		}, {
			name : 'mva'
		}, {
			name : 'noLoadLoss'
		}, {
			name : 'shortLoss'
		} ])
	});
	
	transStore.on('beforeload', function() {
		this.baseParams = {
			start : 0, 
			limit : 10
		};
	});

	var transGrid = new Ext.grid.GridPanel({
		id : 'grid',
		region : 'center',
		columnWidth:1,
		store : transStore,
		cm : transCm,
		sm : transSm,
		loadMask : false,// 载入遮罩动画
		animate : true,
		// 底部工具条
		bbar : new Ext.PagingToolbar({
			id : 'transBbar',
			pageSize : 10,
			store : transStore,
			displayInfo : true,
			displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
			emptyMsg : "无数据。"
		}),
		tbar : [ {
			id : 'btn_trans_save',
			text : '保存',
			iconCls : 'save',
			handler : btn_trans_save
		}, '-', {
			id : 'btn_trans_cancel',
			text : '取消',
			iconCls : 'cancel',
			handler : function(){
				window.close();
			}
		} ]
	});
	
	transStore.load({
		params : {
				start : 0, 
				limit : 10
			}
	});
	
	function btn_query_data(){
		transStore.load({
			params : {
					start : 0, 
					limit : 10
				}
		});
	}
	
	function btn_trans_save(){
		var rows = transGrid.getSelectionModel().getSelections();//返回值为 Record数组
		if(rows[0] == undefined){
			Ext.MessageBox.alert('系统提示','请选择记录!');
			return;
		}else if(rows.length > 1){
			Ext.MessageBox.alert('系统提示','只能选择一条记录!');
			return;
		}
		var model = rows[0].data.model;
		var mva = rows[0].data.mva;
		var noLoadLoss = rows[0].data.noLoadLoss;
		var shortLoss = rows[0].data.shortLoss;
		var obj = {};
		obj.model = model;
		obj.mva = mva;
		obj.noLoadLoss = noLoadLoss;
		obj.shortLoss = shortLoss;
		window.returnValue = obj;
		window.close();
	}
	
	var viewPort = new Ext.Viewport({
		layout : 'border',
		items : [transGrid]
	});
	
});
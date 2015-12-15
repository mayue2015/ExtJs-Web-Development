Ext.onReady(function(){
	
	var toolbar = new Ext.Toolbar({  
	    items:[{text: '分配',iconCls:'plugin',handler:function(){forLoadAssign();}},  
	           '-',  
	           /*{text: '编辑',iconCls:'edit',handler:function(){forEdit();}},
	           '-',*/
	           {text: '保存',iconCls:'save',handler:function(){forSave();}},  
	           '-',  
	           {text: '关闭',iconCls:'close',handler:function(){window.close();}},
	           '->',
	           '计量单位：MW'
	           ]  
	});  
	
	/**
	 * 负荷分配-数据域
	 * */
	var loadAllocationGridStore = new Ext.data.Store({
		baseParams : {caseVersionId:caseVersionId,areaId:areaId},
		proxy : new Ext.data.HttpProxy({
			url : "prediction/loadAllocationAction/getLoadAllocationGridJson.do",
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			root: 'list',   
			totalProperty: 'counts',  
			id: 'guid',   
			fields:['guid','tab_year','load_total','load_220','load_110','load_35','load_10']
		})
	});

	var loadCm = new Ext.grid.ColumnModel([ {
			header : 'guid',
			align : 'center',
			hidden : true,
			dataIndex : 'guid'
		},{
			header : '项目',
			align : 'center',
			width : 80,
			dataIndex : 'tab_year'
		}, {
			header : '总负荷',
			align : 'center',
			width : 80,
			dataIndex : 'load_total'
		}, {
			header : '220kV',
			align : 'center',
			width : 80,
			dataIndex : 'load_220',
			editor : new Ext.form.NumberField({
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false
			})
		}, {
			header : '110kV',
			align : 'center',
			width : 80,
			dataIndex : 'load_110',
			editor : new Ext.form.NumberField({
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false
			})
		}, {
			header : '35kV',
			align : 'center',
			width : 80,
			dataIndex : 'load_35',
			editor : new Ext.form.NumberField({
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false
			})
		}, {
			header : '10kV',
			align : 'center',
			width : 80,
			dataIndex : 'load_10',
			editor : new Ext.form.NumberField({
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false
			})
		} ]);
	/**
	 * 负荷分配-数据表格
	 */
	var loadAllocationGrid = new Ext.grid.EditorGridPanel({
		id : 'loadAllocationGrid',
		region : "center",
		store : loadAllocationGridStore,
		tbar:toolbar,
		stripeRows : true,
		cm : loadCm,
		listeners:{
			'afteredit':function(e){
				var record = e.record;
				if(e.field != 'load_10'){
					record.set('load_10',new Number(record.data.load_total-record.data.load_110-record.data.load_220-record.data.load_35));
				}
			},
			'beforesave':function(){
				if(loadAllocationGrid.activeEditor != null) {
					loadAllocationGrid.activeEditor.completeEdit();
	            }
			} 
		}
	});
	loadAllocationGridStore.load();
	/**
	 * 页面显示
	 * */ 
	var viewport = new Ext.Viewport({
		layout : "border",
		defaults : {
			border : false
		},
		items : [ loadAllocationGrid ]
	});
	
	function forLoadAssign(){
		Ext.Ajax.request({
			url : 'prediction/loadAllocationAction/loadAssign.do',
			params : {
				caseVersionId:caseVersionId,
				areaId:areaId
			},
			async : false,//非异步请求
			success : function(response, options) {
				var res = response.responseText;
				if (res == 'success') {
					Ext.Msg.alert('系统提示', '操作成功！');
					loadAllocationGridStore.load();
				} else {
					Ext.Msg.alert('系统提示', '操作失败！');
				}
			}
		});
	}
	
	function forEdit(){
		var num = loadAllocationGridStore.getTotalCount();
		for (var i = 1; i < num; i++) {//规划年可编辑
			loadAllocationGrid.getView().getCell(i, 3).style.backgroundColor = '#FFF199'; 
			loadAllocationGrid.getView().getCell(i, 4).style.backgroundColor = '#FFF199';
			loadAllocationGrid.getView().getCell(i, 5).style.backgroundColor = '#FFF199';
			loadAllocationGrid.getView().getCell(i, 6).style.backgroundColor = '#FFF199';
		}
	}
	
	function forSave(){
		var modified = loadAllocationGridStore.modified.slice(0);
		if(modified.length==0){
			alert('数据未改变，不需要保存！');
			return false;
		}
		var mjson = '';
		for (var i = 0; i < modified.length; i++) {
			var record = modified[i];
			mjson=mjson+','+record.data.guid+'@'+
				record.data.load_220+'@'+
				record.data.load_110+'@'+
				record.data.load_35+'@'+
				record.data.load_10;
		}
		if (mjson!='') {
			mjson=mjson.substring(1);
		}
		Ext.Ajax.request({
			url : 'prediction/loadAllocationAction/saveData.do',
			params : {
				caseVersionId:caseVersionId,
				areaId:areaId,
				jsonData : mjson
			},
			async : false,//非异步请求
			success : function(response, options) {
				var res = response.responseText;
				if (res=='success') {
					Ext.Msg.alert('系统提示', '操作成功！',function(){loadAllocationGridStore.load();});
				} else {
					Ext.Msg.alert('系统提示', '操作失败！');
				}
			}
		});
	}
});
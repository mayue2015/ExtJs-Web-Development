//导线型号选择.js
Ext.onReady(function() {
	var id = "T";
	var radioGroup = new Ext.form.RadioGroup({
		heigth: 60,
		region : 'north',
        hideLabel : true,
        items : [
           new Ext.form.Radio ({
               checked : true,
               boxLabel : "架空线",
               id : 'lineRadio',
               name : "lineFormRadio",
               listeners : {
                     check : function(checkbox, checked) {
                         if (checked) {
                        	 debugger;
                        	 id = "T";
                        	 btn_query_data();
                         }
                    }
               }
           }), 
           new Ext.form.Radio({
	           boxLabel : "电缆",
	           id : 'dlRadio',
	           name : "lineFormRadio",
	           listeners : {
	        	   check : function(checkbox, checked) {
	        		   if (checked) {
	        			   id = "F";
	        			   btn_query_data();
	        		   }
	        	   }
           		}
            })
        ]
    });
	var lineSm = new Ext.grid.CheckboxSelectionModel();// 设置表格可以有复选框操作
	var lineCm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), lineSm, {
		header : '型号',
		dataIndex : 'model',
		width : 100
	},{
		header : '最大负荷电流',
		dataIndex : 'maxCurrent',
		width : 100
	},{
		header : '正序电阻有名值',
		dataIndex : 'zxdz',
		width : 100
	}, {
		header : '零序电阻有名值',
		dataIndex : 'lxdz',
		width : 100
	}, {
		header : '电压等级等级',
		dataIndex : 'volName',
		width : 100
	}, {
		header : '额定电压',
		dataIndex : 'volValue',
		width : 100
	} ]);

	var lineStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'pmv/energySave/getLineModelData.do',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'grids'
		}, [ {
			name : 'model'
		}, {
			name : 'maxCurrent'
		}, {
			name : 'zxdz'
		}, {
			name : 'lxdz'
		}, {
			name : 'volName'
		}, {
			name : 'volValue'
		} ])
	});
	
	lineStore.on('beforeload', function() {
		this.baseParams = {
			id : id,
			start : 0, 
			limit : 10
		};
	});

	var lineGrid = new Ext.grid.GridPanel({
		id : 'grid',
		region : 'center',
		columnWidth:1,
		store : lineStore,
		cm : lineCm,
		sm : lineSm,
		loadMask : false,// 载入遮罩动画
		animate : true,
		// 底部工具条
		bbar : new Ext.PagingToolbar({
			id : 'lineBbar',
			pageSize : 10,
			store : lineStore,
			id : id,
			displayInfo : true,
			displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
			emptyMsg : "无数据。"
		}),
		tbar : [ {
			id : 'btn_line_save',
			text : '保存',
			iconCls : 'save',
			handler : btn_line_save
		}, '-', {
			id : 'btn_line_cancel',
			text : '取消',
			iconCls : 'cancel',
			handler : function(){
				window.close();
			}
		} ]
	});
	
	lineStore.load({
		params : {
				id : id,
				start : 0, 
				limit : 10
			}
	});
	
	function btn_query_data(){
		lineStore.load({
			params : {
					id : id,
					start : 0, 
					limit : 10
				}
		});
	}
	
	function btn_line_save(){
		var rows = lineGrid.getSelectionModel().getSelections();//返回值为 Record数组
		if(rows[0] == undefined){
			Ext.MessageBox.alert('系统提示','请选择记录!');
			return;
		}else if(rows.length > 1){
			Ext.MessageBox.alert('系统提示','只能选择一条记录!');
			return;
		}
		var model = rows[0].data.model;
		var maxCurrent = rows[0].data.maxCurrent;
		var zxdz = rows[0].data.zxdz;
		var volValue = rows[0].data.volValue;
		var obj = {};
		obj.model = model;
		obj.maxCurrent = maxCurrent;
		obj.zxdz = zxdz;
		obj.volValue = volValue;
		window.returnValue = obj;
		window.close();
	}
	
	var viewPort = new Ext.Viewport({
		layout : 'border',
		items : [radioGroup, lineGrid]
	});
	
});
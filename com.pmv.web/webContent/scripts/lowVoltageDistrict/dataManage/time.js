Ext.app.vGrid = function(type,typicalDayColumn,devIdColumn){
	var unitTitle = '';
	if (type=='pb') {
		unitTitle = '单位：kW、kvar、kWh、kvarh';
	}else {
		unitTitle = '单位：kV、A、kWh、kvar';
	}
	/**
	 * 附表加载数据集
	 */
	var viceStore = new Ext.data.Store({
		autoLoad : false,
		url : "pmv/basicDataAction/getRunDataDxr.do",
		method : 'post',
		reader : new Ext.data.JsonReader({
			root : 'list',
			fields : [ {
				name : "GUID",
				mapping : "0"
			}, {
				name : "MEASURETIME",
				mapping : "1"
			}, {
				name : "KV",
				mapping : "2"
			}, {
				name : "A",
				mapping : "3"
			}, {
				name : "MW",
				mapping : "4"
			}, {
				name : "MVAR",
				mapping : "5"
			}, {
				name : "FACTOR",
				mapping : "6"
			}, {
				name : "MVA",
				mapping : "7"
			}, {
				name : "MWH",
				mapping : "8"
			}, {
				name : "MVARH",
				mapping : "9"
			}, {
				name : "MAX_A",
				mapping : "10"
			}, {
				name : "MIN_A",
				mapping : "11"
			}, {
				name : "A_CURRENT",
				mapping : "12"
			}, {
				name : "B_CURRENT",
				mapping : "13"
			}, {
				name : "C_CURRENT",
				mapping : "14"
			}, {
				name : "N_CURRENT",
				mapping : "15"
			}  ]
		})
	});

	/**
	 * 附表表格模型
	 */
	var viceGrid = new Ext.grid.EditorGridPanel({
		id : 'viceGrid',
		width : viceWidth,
		height : height,
		region : 'east',
		collapsible : true,// 隐藏
		store : viceStore,
		clicksToEdit : 1, // 单击
		tbar : [ '-', {
			id : 'viceSave',
			xtype : 'button',
			text : '保存',
			iconCls : 'save',
			handler : function() {
				Ext.app.saveViceInfo();
			}
		}, '-', '->', unitTitle ],
		defaults : {
			autoScroll : true
		},
		listeners:{
			'beforeedit':function(s){
				if(s.row == s.record.store.getCount() - 1){
					if(s.column == 4 || s.column == 5 ) {
						return true;
					}else 
						return false;
				}
				if(s.column ==6 )
					return false;
			},
			'afteredit' : function(a){
				var radios = document.getElementsByName("pointNum");
				var clds = '';
				for(var i=0;i<radios.length;i++){
		            if(radios[i].checked){
		            	clds = radios[i].value;
		                break;
		            }
		        }
				var factor = 0;
				function factorFun(b){
					var mwValue = b.record.data.MW;
					var mvarValue = b.record.data.MVAR;
					if(mwValue !=0 || mvarValue !=0 ){
						factor = mwValue/Math.sqrt((mwValue * mwValue) + (mvarValue * mvarValue));
					}
					b.record.store.getAt(a.row).set('FACTOR', factor);
				};
				function lastFactorFun(grid,c,b){
					if(c !=0 || b !=0 ){
						factor = c/Math.sqrt((c * c) + (b * b));
					}
					grid.record.store.getAt(grid.record.store.getCount()-1).set('FACTOR', factor);
				}
				if(a.field == 'MW'){
					if(a.record.data.MEASURETIME != '电量'){
						var sumMw = 0;
						var store = a.record.store.data.items;
						for(var i = 0; i < store.length-1; i++){
							var mwValue = store[i].get('MW');
							sumMw += mwValue;
						}
						if(clds == 2)
							sumMw = sumMw/4;
						a.record.store.getAt(a.record.store.getCount()-1).set('MW', sumMw);
						var lastmvar = a.record.store.getAt(a.record.store.getCount()-1).get('MVAR');
						// 调用求和 后计算功率因素
						lastFactorFun(a,sumMw,lastmvar)
					}
					// 调用  改变有功和无功计算功率因素
					factorFun(a);
				}
				if(a.field == 'MVAR'){
					if(a.record.data.MEASURETIME != '电量'){
						var sumMvar=0;
						var store = a.record.store.data.items;
						for(var i = 0; i < store.length-1; i++){
							var value = store[i].get('MVAR');
							sumMvar += value;
						}
						if(clds == 2)
							sumMvar = sumMvar/4;
						a.record.store.getAt(a.record.store.getCount()-1).set('MVAR', sumMvar);
						var lastMw = a.record.store.getAt(a.record.store.getCount()-1).get('MVAR');
						lastFactorFun(a,lastMw,sumMvar);
					}
					factorFun(a);
				}
			}
		},
		cm : new Ext.grid.ColumnModel({
			columns : [ {
				header : '主键',
				dataIndex : 'GUID',
				hidden : true
			}, {
				header : '测量时刻',
				width : 90,
				dataIndex : 'MEASURETIME'
			}, {
				header : '电压',
				dataIndex : 'KV',
				width : 60,
				hidden : type=='pb'?true:false,
				editor : new Ext.form.NumberField({
					id : 'KV',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '电流',
				dataIndex : 'A',
				width : 60,
				hidden : type=='pb'?true:false,
				editor : new Ext.form.NumberField({
					id : 'A',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '有功功率',
				dataIndex : 'MW',
				width : 60,
				editor : new Ext.form.NumberField({
					id : 'MW',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '无功功率',
				dataIndex : 'MVAR',
				width : 60,
				editor : new Ext.form.NumberField({
					id : 'MVAR',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '功率因数',
				dataIndex : 'FACTOR',
				width : 60,
				hidden : (type=='dyq'||type=='pb')?false:true,
				editor : new Ext.form.NumberField({
					id : 'FACTOR',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '视在功率',
				dataIndex : 'MVA',
				width : 60,
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'MVA',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '有功电量',
				dataIndex : 'MWH',
				width : 60,
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'MWH',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '无功电量',
				dataIndex : 'MVARH',
				width : 60,
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'MVARH',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '最大电流',
				dataIndex : 'MAX_A',
				width : 60,
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'MAX_A',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : '最小电流',
				dataIndex : 'MIN_A',
				width : 60,
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'MIN_A',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : 'A相电流',
				dataIndex : 'A_CURRENT',
				width : 60,
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'A_CURRENT',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : 'B相电流',
				width : 60,
				dataIndex : 'B_CURRENT',
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'B_CURRENT',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : 'C相电流',
				width : 60,
				dataIndex : 'C_CURRENT',
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'C_CURRENT',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}, {
				header : 'N相电流',
				width : 60,
				dataIndex : 'N_CURRENT',
				hidden : type=='dyq'?false:true,
				editor : new Ext.form.NumberField({
					id : 'N_CURRENT',
					maxValue : 99999999.9999,
					decimalPrecision : 4,
					allowBlank : false
				})
			}  ]
		})
	});
	Ext.app.viceGrid = viceGrid;
	//加载数据前事件
	viceGrid.store.on('beforeload', function() {
		//页面参数
		var record = Ext.getCmp('mainGrid').getSelectionModel().getSelected();
		var radios = document.getElementsByName("pointNum");
		var clds = '';
		for(var i=0;i<radios.length;i++){
            if(radios[i].checked){
            	clds = radios[i].value;
                break;
            }
        }
		//传递参数
		 var _params = {
			"dxr" : record.get(typicalDayColumn),
			"guid" : record.get(devIdColumn),
			"versionId" : versionId,
			"type" : type,
			"clds" : clds
		}
		this.baseParams = _params;
	});
	
	Ext.app.saveViceInfo = function() {
		//获取参数值
		var editorRecord = viceGrid.store.getModifiedRecords();

		//装载参数
		var saveEditor = []; 
		Ext.each(editorRecord,function(record){
				saveEditor.push(record.data); 
		}); 
		
		if(saveEditor == ''){
			Ext.Msg.alert('系统提示','没有要保存的数据!');
			return;
		}
		var radios = document.getElementsByName("pointNum");
		var clds = '';
		for(var i=0;i<radios.length;i++){
            if(radios[i].checked){
            	clds = radios[i].value;
                break;
            }
        }
		Ext.Ajax.request({
	    	url : 'pmv/basicDataAction/saveViceInfo.do',
			method : 'post',
			params : {
				'saveEditor' : Ext.encode(saveEditor),
				'versionId' : versionId,
				'clds' : clds
			},
			success : function(response,options){
				var res = Ext.util.JSON.decode(response.responseText);
				if(res.success){
					Ext.Msg.alert('系统提示','保存成功!');
					editorRecord.clear();
					viceGrid.getStore().load();	
				}else{
					Ext.Msg.alert('系统提示','保存失败!');
					viceGrid.getStore().load();	
				}
			},
			failure : function(form, action){
				Ext.Msg.alert('系统提示','数据保存失败!');
			}
		});
	}
	return viceGrid;
}

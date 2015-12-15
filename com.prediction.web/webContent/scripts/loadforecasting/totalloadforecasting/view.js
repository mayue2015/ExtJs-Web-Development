var width = (document.documentElement.offsetWidth - 500) / 2;//总量预测&负荷预测表格模型宽度

var isSelectCaseValue = '';//是否推荐方案
nationalEconomyZB = 'gdp_current_prices';
/**
 * 查询方案
 * */
var caseInfoStore = new Ext.data.JsonStore({
	//任务版本ID versionId : 625 4 3  |  任务ID taskId : 43D4819F5753456A8968B39D44DFB77F 00007 00040
	url : 'prediction/queryForeCaseAction/queryCaseInfo.do?versionId=' + versionId + '&taskId=' + taskId,
	fields : [ 'value','text','select'],
	autoLoad : true,
	listeners : {
		'load': function(store,record,opts) {
			var value = '';
			if (caseInfoCombo.getValue()=='') {
				for (var i = 0; i < record.length; i++) {
					var r = record[i].data.select;
					if (r=='1') {
						value = record[i].data.value;
						isSelectCaseValue = value;
					}
				}
				if (value == '') {
					if (record.length>0) {
						value = record[0].data.value;
					}
				}
			}else {
				value = caseInfoCombo.getValue();
			}
			caseInfoCombo.setValue(value);
			if (value != '') {
				caseInfoCombo.fireEvent('select',caseInfoCombo);
			}
	    }
	}
});

/**
 * 查询区域
 * */
var areaInfoStore = new Ext.data.JsonStore({
	//根据任务id查询区域   任务taskId : 0  00007  00040
	url : 'prediction/queryForeCaseAction/queryCalculateArea.do?taskId=' + taskId,
	fields : [ 'value','text'],
	autoLoad : true,
	listeners : {
		'load': function(store,record,opts) {
			var firstValue  ='';
			if (record.length>0) {
				firstValue = record[0].data.value;
			}
			Ext.getCmp("areaId").setValue(firstValue);
			if (firstValue != '') {
				Ext.getCmp("areaId").fireEvent('select',Ext.getCmp("areaId"));
			}
	    }
	}
});


var caseInfoCombo = new Ext.form.ComboBox({
	id : 'caseId',
	name : 'caseId',
	store : caseInfoStore,
	displayField : 'text',
	valueField : 'value',
	triggerAction : 'all',
	editable : false,
	width:120,
	typeAhead : true,
	listeners : {
		'select' : function(){
			Ext.app.faVersionId = caseInfoCombo.getValue();
			Ext.app.areaId = areaInfoCombo.getValue();
			if (Ext.app.faVersionId == isSelectCaseValue) {
				caseInfoCombo.setRawValue(caseInfoCombo.getRawValue().replace('<font color=blue>','').replace('</font>',''));
				caseInfoCombo.el.dom.style.color = 'blue';
			}else {
				caseInfoCombo.el.dom.style.color = '';
			}
			Ext.app.refreshData();
		}
	}
});

var areaInfoCombo = new Ext.form.ComboBox({
	id :　'areaId',
    name : 'areaId',
    mode : 'local',
    store : areaInfoStore,
	displayField : 'text',
	valueField : 'value',
	triggerAction : 'all',
    editable : false,
    typeAhead : true,
    width:120,
    listeners : {
		'select' : function(){
			Ext.app.areaId = Ext.getCmp('areaId').getValue();
			Ext.app.faVersionId = Ext.getCmp('caseId').getValue();
			Ext.app.refreshData();
		}
	}
});

/**
 * 总量负荷预测-国民经济预测-加载数据集
 */
var economicStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadEconomicGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "id",
			mapping : "0"
		},{
			name : "area",
			mapping : "1"
		}, {
			name : "tab_year",
			mapping : "2"
		}, {
			name : "gdp_current_prices",
			mapping : "3"
		}, {
			name : "prim_indu_gdp_cup",
			mapping : "4"
		}, {
			name : "sec_industry_gdp_cup",
			mapping : "5"
		}, {
			name : "ter_industry_gdp_cup",
			mapping : "6"
		}, {
			name : "popu",
			mapping : "7"
		}, {
			name : "city_ye_regist_popu",
			mapping : "8"
		}, {
			name : "vill_ye_regist_popu",
			mapping : "9"
		}, {
			name : "built_up_area",
			mapping : "10"
		} ]
	}),
	listeners:{
		'load':function(){
			if (this.getTotalCount() > 0) {
				Ext.app.lineChars(this.data.items, '全社会产值', 'nationalEconomyDivs', 'gdp_current_prices');
		    }
		}
	}
});

/**
 * 总量负荷预测-国民经济预测-按钮区-显示
 */
var economicTbar = [ '国民经济预测','->','计量单位 ：亿元、万人、平方千米  ','&nbsp&nbsp&nbsp&nbsp',
             '预测方法:',{ 
	            xtype : 'textfield',
	            id : 'economicPredictionMethod',
	            name : 'economicPredictionMethod',
	            value : '',
				readOnly : true,
				disabled : true,
				editable : false,
	            width : 130
	         },{ 
	            xtype : 'textfield',
	            id : 'economicPredictionMethodValue',
	            name : 'economicPredictionMethodValue',
	            value : '',
	            hidden : true,
				readOnly : true,
				disabled : true,
				editable : false,
	            width : 1
		     },{
         		xtype : 'button',
        		text : '国民经济预测',
        		icon : 'planning/icons/chart_bar.png',
        		handler : function(){
        			Ext.app.calculate('1');
        		}
            }]

/**
 * 总量负荷预测-国民经济预测-表格模型
 */
var economicGrid = new Ext.grid.EditorGridPanel({
	id : 'economicGrid',
	region : "center",
	store : economicStore,
	tbar : economicTbar,
	cm : new Ext.grid.ColumnModel({
		columns : [{
			header : 'CALPROCESSID',
			width : 100,
			hidden:true,
			align : 'center',
			dataIndex : 'id'
		},{
			header : '区域',
			width : 100,
			align : 'center',
			dataIndex : 'area'
		}, {
			header : '年份',
			width : 100,
			align : 'center',
			dataIndex : 'tab_year'
		}, {
			header : '全社会产值',
			width : 100,
			align : 'center',
			dataIndex : 'gdp_current_prices'
		}, {
			header : '一产产值',
			width : 100,
			align : 'center',
			dataIndex : 'prim_indu_gdp_cup',
			editor :new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '二产产值',
			width : 100,
			align : 'center',
			dataIndex : 'sec_industry_gdp_cup',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '三产产值',
			width : 100,
			align : 'center',
			dataIndex : 'ter_industry_gdp_cup',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '总人口',
			width : 100,
			align : 'center',
			dataIndex : 'popu'
		}, {
			header : '非农业人口',
			width : 100,
			align : 'center',
			dataIndex : 'city_ye_regist_popu',
			editor :new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '农业人口',
			width : 100,
			align : 'center',
			dataIndex : 'vill_ye_regist_popu',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '区域面积',
			width : 100,
			align : 'center',
			dataIndex : 'built_up_area',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		} ]
	}),
	listeners:{
		'afteredit':function(e){
			var record = e.record;
			if(e.field == 'vill_ye_regist_popu'||e.field == 'city_ye_regist_popu'){
				record.set('popu',record.data.vill_ye_regist_popu+record.data.city_ye_regist_popu);
			}
			if(e.field == 'prim_indu_gdp_cup'||e.field == 'sec_industry_gdp_cup'||e.field == 'ter_industry_gdp_cup'){
				record.set('showChart',record.data.prim_indu_gdp_cup+record.data.sec_industry_gdp_cup+record.data.ter_industry_gdp_cup);
			}
		},
		'beforesave':function(){
			if(loadAllocationGrid.activeEditor != null) {
				loadAllocationGrid.activeEditor.completeEdit();
            }
		} 
	}
});
Ext.app.economicGrid = economicGrid;

/**
 * 总量负荷预测-总量预测-加载数据集
 */
var totalStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadTotalGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "id",
			mapping : "0"
		},{
			name : "area",
			mapping : "1"
		}, {
			name : "tab_year",
			mapping : "2"
		}, {
			name : "showChart",
			mapping : "3"
		} ]
	}),
	listeners:{
		'load':function(){
			if (this.getTotalCount() > 0) {
				Ext.app.lineChars(this.data.items, '总量预测', 'totalForecastDivs', 'showChart');
		    }
		}
	}
});

/**
 * 总量负荷预测-总量预测-按钮区-显示
 */
var totalTbar = [ '总量预测','->',
             '预测方法:',{ 
	            xtype : 'textfield',
	            id : 'totalPredictionMethod',
	            name : 'totalPredictionMethod',
	            value : '',
				readOnly : true,
				disabled : true,
				editable : false,
	            width : 130
	         },{ 
	            xtype : 'textfield',
	            id : 'totalPredictionMethodValue',
	            name : 'totalPredictionMethodValue',
	            value : '',
	            hidden : true,
				readOnly : true,
				disabled : true,
				editable : false,
	            width : 1
	         },{
         		xtype : 'button',
        		text : '总量预测',
        		icon : 'planning/icons/zlyc.png',
        		handler : function(){
        			Ext.app.calculate('2');
        		}
            }]

/**
 * 总量负荷预测-总量预测-表格模型
 */
var totalGrid = new Ext.grid.EditorGridPanel({
	id : 'totalGrid',
	region : "west",
	store : totalStore,
	tbar : totalTbar,
	width :'50%',
	cm : new Ext.grid.ColumnModel({
		columns : [{
			header : 'id',
			hidden : true,
			align : 'center',
			dataIndex : 'id'
		},{
			header : '区域',
			width : 100,
			align : 'center',
			dataIndex : 'area'
		}, {
			header : '年份',
			width : 80,
			align : 'center',
			dataIndex : 'tab_year'
		}, {
			header : '电量(万千瓦时)',
			width : 120,
			align : 'center',
			dataIndex : 'showChart',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		} ]
	})
});
Ext.app.totalGrid = totalGrid;

/**
 * 总量负荷预测-负荷预测-加载数据集
 */
var loadStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadForecastingGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "id",
			mapping : "0"
		},{
			name : "area",
			mapping : "1"
		}, {
			name : "tab_year",
			mapping : "2"
		}, {
			name : "showChart",
			mapping : "3"
		} ]
	}),
	listeners:{
		'load':function(){
			if (this.getTotalCount() > 0) {
				Ext.app.lineChars(this.data.items, '负荷预测', 'loadForecastingDivs', 'showChart');
		    }
		}
	}
});

/**
 * 总量负荷预测-负荷预测-按钮区-显示
 */
var loadTbar = [ '负荷预测','->',
             '预测方法:',{ 
	            xtype : 'textfield',
	            id : 'loadPredictionMethod',
	            name : 'loadPredictionMethod',
	            value : '',
				readOnly : true,
				disabled : true,
				editable : false,
	            width : 130
	         },{ 
	            xtype : 'textfield',
	            id : 'loadPredictionMethodValue',
	            name : 'loadPredictionMethodValue',
	            value : '',
	            hidden : true,
				readOnly : true,
				disabled : true,
				editable : false,
	            width : 1
	         },{
         		xtype : 'button',
        		text : '负荷预测',
        		icon : 'planning/icons/fhyc.png',
        		handler : function(){
        			Ext.app.calculate('3');
        		}
            }]

/**
 * 总量负荷预测-负荷预测-表格模型
 */
var loadGrid = new Ext.grid.EditorGridPanel({
	id : 'loadGrid',
	region : "center",
	width :'50%',
	store : loadStore,
	tbar : loadTbar,
	cm : new Ext.grid.ColumnModel({
		columns : [{
			header : 'id',
			hidden : true,
			align : 'center',
			dataIndex : 'id'
		},{
			header : '区域',
			width : 100,
			align : 'center',
			dataIndex : 'area'
		}, {
			header : '年份',
			width : 80,
			align : 'center',
			dataIndex : 'tab_year'
		}, {
			header : '负荷(兆瓦)',
			width : 120,
			align : 'center',
			dataIndex : 'showChart',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		} ]
	})
});
Ext.app.loadGrid = loadGrid;



var bottomPanel = new Ext.Panel({
	layout : 'border',
	id : 'panel',
	region : 'south',
	height : height,
	border : false,
	bodyBorder : false,
	items : [ totalGrid, loadGrid]
});

/*var bottomPanel = new Ext.Panel({
	layout : 'border',
	id : 'bottomPanel',
	region : 'center',
	border : false,
	bodyBorder : false,
	items : [ economicGrid, panel]
});*/

var allGridPanel = new Ext.Panel({
	layout : 'border',
	id : 'allGridPanel',
	region : 'center',
	border : false,
	bodyBorder : false,
	items : [ Ext.app.tabs, economicGrid ,bottomPanel]
});

var mainPanelToolbar = new Ext.Toolbar({  
	id:'mainPanelToolbar',
    items:['-',
           '方案：',caseInfoCombo,
           '-','-',
           '区域：',areaInfoCombo,
           '-'
           ]  
}); 
var mainPanelToolbar2 = new Ext.Toolbar([
                            '-',
							{text: '新建方案',iconCls:'add',handler:function(){Ext.app.createCaseFun();}},  
				            '-',  
				            {text: '修改方案名称',iconCls:'edit',handler:function(){Ext.app.updateCaseFun();}},
				            '-',  
				            {text: '删除方案',iconCls:'remove',handler:function(){Ext.app.deleteCaseFun();}},  
				            '-',  
				            {text: '设置推荐方案',iconCls:'cog',handler:function(){Ext.app.forSetResultFun();}},
				            '-',  
							{text: '选择预测方法',iconCls:'ycff',handler:function(){Ext.app.forSelectMethod();}},  
							'-',  
							{text: '一键预测',iconCls:'oneGo',handler:function(){Ext.app.calculate('4');}},
							'-',  
							{text: '负荷分配',iconCls:'fhfp',handler:function(){Ext.app.forLoadAssign();}},
							'-',  
							/*{text: '数据编辑',iconCls:'edit',handler:function(){Ext.app.forHisEdit();}},  
							'-',  */ 
							{text: '数据保存',iconCls:'save',handler:function(){Ext.app.forHisSave();}},
							'-',  
							/*{text: '数据导出',iconCls:'excel',handler:function(){}},
							'-', */ 
							{text: '方案比较',iconCls:'compare',handler:function(){Ext.app.forCaseCompare();}},
							'-',
							{text: '图形指标设置',iconCls:'setChar',handler:function(){Ext.app.forChartSet();}},
							'-'
                        ]); 
var mainPanel = new Ext.Panel({
	layout : 'border',
	id : 'allGridPanel',
	region : 'center',
	border : false,
	bodyBorder : false,
	tbar:mainPanelToolbar,
	items : [allGridPanel,Ext.app.chartPanel()],
	listeners : { 
		'render': function(){ 
			mainPanelToolbar2.render(mainPanel.tbar); 
	     } 
	} 
});
/**
 * 页面显示
 * */ 
var viewport = new Ext.Viewport({
	layout : "border",
	border : false,
	bodyBorder : false,
	items : [mainPanel]
});
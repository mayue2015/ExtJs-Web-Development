var height = document.documentElement.offsetHeight;
var width = document.documentElement.offsetWidth;
var faGroup;
var sjGroup;
var zbGroup = "GDP_CURRENT_PRICES,ALL_SOCIETY_POWER,ALL_SOCI_MAX_LOAD"

function checkBoxGroup() {
	Ext.Ajax.request({
		url : 'prediction/queryForeCaseAction/getCaseInfo.do',
		method : 'post',
		params : {
			taskId : taskId// taskId
		},
		success : function(response, options) {
			var res = response.responseText;
			var data = res.split(',');
			var faCheckBox = new Array();
			faGroup = "";
			for (var i = 0; i < data.length; i++) {
				var dataI = data[i].split('@');
				faCheckBox.push({
					boxLabel : dataI[1],
					name : dataI[0],
					checked : true
				});
				faGroup += dataI[0];
				if(i < data.length-1) {
					faGroup += ",";
				}
			}
			faCheckBoxGroup = new Ext.form.CheckboxGroup({
				id : 'faGroup',
				xtype : 'checkboxgroup',
				fieldLabel : 'Single Column',
				itemCls : 'x-check-group-alt',
				columns : 1,
				listeners : {
					change : function(cb, nv, ov) {
						faGroup = getSelectValues('faGroup');
						newGrid();
					},
					afterrender : function(s) {
						
					}
				}
			})

			faCheckBoxGroup.items = faCheckBox;
			Ext.getCmp('fa').add(faCheckBoxGroup);
			Ext.getCmp('fa').doLayout();
		}
	});

	Ext.Ajax.request({
		url : 'prediction/queryForeCaseAction/getYears.do',
		method : 'post',
		params : {
			taskId : taskId// taskId
		},
		success : function(response, options) {
			var res = response.responseText;
			var startYear = res.split(',')[0];
			var endYear = res.split(',')[1];
			var sjCheckBox = new Array();
			sjGroup = "";
			for (; startYear <= endYear; startYear++) {
				sjCheckBox.push({
					boxLabel : startYear,
					name : startYear,
					checked : true
				});
				sjGroup += startYear;
				if(startYear < endYear) {
					sjGroup += ",";
				}
			}
			sjCheckBoxGroup = new Ext.form.CheckboxGroup({
				id : 'sjGroup',
				xtype : 'checkboxgroup',
				fieldLabel : 'Single Column',
				itemCls : 'x-check-group-alt',
				columns : 2,
				listeners : {
					change : function(cb, nv, ov) {
						sjGroup = getSelectValues('sjGroup');
						newGrid();
					},
					afterrender : function(s) {
						
					}
				}
			})

			sjCheckBoxGroup.items = sjCheckBox;
			Ext.getCmp('sj').add(sjCheckBoxGroup);
			Ext.getCmp('sj').doLayout();
			
		}
	});
	waitForCreateGrid();
}
//延迟加载，等到方案和时间checkbox初始化完毕后执行加载GRID
function waitForCreateGrid(){
	if (Ext.getCmp('faGroup')&&Ext.getCmp('sjGroup')) {
		newGrid();
	}else {
		setTimeout('waitForCreateGrid()',100);
	}
}
/**
 * 手风琴PANEL
 */
var accordionPanel = new Ext.Panel({
	id : 'accordionPanel',
	region : 'west',
	layout : 'accordion',
	width : 200,
	defaults : {
		bodyStyle : 'padding:15px'
	},
	layoutConfig : {
		titleCollapse : true,
		animate : true,
		activeOnTop : false
	},
	items : [ new Ext.Panel({
		id : 'fa',
		title : '预测方案',
		autoScroll : true,
		height : height - 50
	}), new Ext.Panel({
		id : 'sj',
		title : '时间',
		autoScroll : true,
		height : height - 50
	}), {
		title : '指标',
		height : height - 50,
		items : [ new Ext.form.CheckboxGroup({
			id : 'zbGroup',
			xtype : 'checkboxgroup',
			fieldLabel : 'Single Column',
			itemCls : 'x-check-group-alt',
			columns : 1,
			items : [ {
				boxLabel : '全社会产值',
				name : 'GDP_CURRENT_PRICES',
				checked : true
			}, {
				boxLabel : '一产产值',
				name : 'PRIM_INDU_GDP_CUP'
			}, {
				boxLabel : '二产产值',
				name : 'SEC_INDUSTRY_GDP_CUP'
			}, {
				boxLabel : '三产产值',
				name : 'TER_INDUSTRY_GDP_CUP'
			}, {
				boxLabel : '总人口',
				name : 'YE_TOTAL_REGIST_POPU'
			}, {
				boxLabel : '非农业人口',
				name : 'CITY_YE_NATIVE_POPU'
			}, {
				boxLabel : '农业人口',
				name : 'VILL_YE_NATIVE_POPU'
			}, {
				boxLabel : '总量',
				name : 'ALL_SOCIETY_POWER',
				checked : true
			}, {
				boxLabel : '负荷',
				name : 'ALL_SOCI_MAX_LOAD',
				checked : true
			} ],
			listeners : {
				change : function(cb, nv, ov) {
					zbGroup = getSelectValues('zbGroup');
					newGrid();
				}
			}
		}) ]
	} ]
});

/**
 * 图形PANEL
 */
var chartPanel = new Ext.Panel({
	region : 'north',
	height : height / 2,
	bodyStyle : 'background : white;',
	items : [ new Ext.Panel({
		height : height / 2,
		id : 'chartDivs'
	}) ]
});
function newGrid() {
	try{
		var Grid = Ext.getCmp('dataGrid');
        if(Grid){
        	Ext.getCmp('girdPanel').remove(Grid);
        	Grid.destroy();
        }
	}catch(e){
		alert(e.name + " " + e.message);
	}
	
	var column = [{
		  header : '指标',
		  width : 150,
		  align : "center",
		  dataIndex : "codeName"
	}, {
		  header : '方案名称',
		  colspan : 2,
		  width : 170,
		  align : "center",
		  dataIndex : "caseName"
	}];
	    
	var dataCol;
	
	/**
	 * 动态注入数据
	 * */
	var fieldsCodes = [ {
		name : "codeName",
		mapping : "0"
	}, {
		name : "caseName",
		mapping : "1"
	} ];
	var sjArr = BubbleSort(sjGroup.split(","));
	
	for(i = 0; i < sjArr.length; i++){
		dataCol = {
				header : sjArr[i].toString(),
				width : 100,
				align : "center",
				dataIndex : sjArr[i].toString()
	 	};
		column.push(dataCol);
		fieldsCodes.push({
			name : sjArr[i].toString(),
			mapping : (i + 2).toString()
		});
	}
	
	/**
	 * 加载数据集
	 */
	var dataStore = new Ext.data.Store({
		autoLoad : false,
		url : "prediction/queryForeCaseAction/scenarioComparison.do",
		method : 'post',
		reader : new Ext.data.JsonReader({
			root : 'list',
			fields : fieldsCodes
		})
	});
	
	/**
	 * 表格模型
	 */
	var dataGrid = new Ext.grid.EditorGridPanel({
		id : 'dataGrid',
		region : "north",
		width : width - 205,
		height : height / 2 - 5,
		tbar : ['->',{
                xtype:'button',
                id :　'gridExcel',
                name: 'gridExcel',
                text : '导出',
                author : '100%',
            	iconCls : 'excel',
				handler : function() {
					grid2Excel(dataGrid, {
						title : '方案比较'
					});
				}}
    		],
		defaults : {
			autoScroll : true
		},
		store : dataStore,
		cm : new Ext.grid.ColumnModel({
			columns : column
		})
	});
	
	dataGrid.store.on('beforeload', function() {
		var _params = {
				cases : faGroup,
				zbs : zbGroup,
				dates : sjGroup
			};
		this.baseParams = _params;
	});
	dataGrid.store.on('load', function() {
		lineChars(dataGrid, sjArr);//图形展示
	});
	dataGrid.store.load();
	
	var pp = Ext.getCmp('girdPanel');
	if(pp){
		pp.add(dataGrid);
		Ext.getCmp('girdPanel').doLayout();
	}
}

/**
 * 表格PANEL
 */
var girdPanel = new Ext.Panel({
	id : 'girdPanel',
	region : 'center',
	height : height / 2 - 5,
	defaults : {
		autoScroll : true
	},
	items : [ ]
});

/**
 * 页面显示
 */
var viewport = new Ext.Viewport({
	layout : "border",
	items : [ accordionPanel, {
		region : 'center',
		layout : 'column',
		items : [ chartPanel, girdPanel ]
	} ],
	listeners  : {
		'render' : function(){
			checkBoxGroup();
		}
	}

});

function getSelectValues(id) {
	selectVal = "";
	var thisVal = Ext.getCmp(id).getValue();
	Ext.each(thisVal, function(item) {
		selectVal += item['name'] + ',';
	});
	if(selectVal.length > 0) {
		selectVal = selectVal.substring(0, selectVal.length - 1);
	} else {
		Ext.getCmp('chartDivs').hide();
	}
	return selectVal;
}

/**
 * 冒泡逆向排序
 * @param score
 * @returns
 */
function BubbleSort(score) {
	for (var i = 0; i < score.length - 1; i++) { // 最多做n-1趟排序
		for (var j = 0; j < score.length - i - 1; j++) { // 对当前无序区间score[0......length-i-1]进行排序(j的范围很关键，这个范围是在逐步缩小的)
			if (score[j] > score[j + 1]) { // 把大的值交换到后面
				var temp = score[j];
				score[j] = score[j + 1];
				score[j + 1] = temp;
			}
		}
	}
	return score;
}
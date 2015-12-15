/**
 * Tab表格面板宽度/高度值
 * */
var tab_grid_width = (document.documentElement.offsetWidth) / 3*2;
var tab_grid_height = (document.documentElement.offsetHeight - 50) / 3-27;

/**
 * 国民经济-数据域
 * */
var sseGdpGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadGdpGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "GDPVERSIONID",//sse_gdp 版本号
			mapping : "0"
		}, {
			name : "POPUVERSIONID",//sse_population 版本号
			mapping : "1"
		}, {
			name : "LANDVERSIONID",//sse_admi_divi_area 版本号
			mapping : "2"
		}, {
			name : "AREANAME",//区域名称
			mapping : "3"
		}, {
			name : "TABYEAR",//年份
			mapping : "4"
		}, {
			name : "GDPCURRENTPRICES",//全社会
			mapping : "5"
		}, {
			name : "GDPINDEX",//GDP指数
			mapping : "6"
		}, {
			name : "PRIMINDUGDPCUP",//第一产业
			mapping : "7"
		}, {
			name : "SECINDUSTRYGDPCUP",//第二产业
			mapping : "8"
		}, {
			name : "TERINDUSTRYGDPCUP",//第三产业
			mapping : "9"
		}, {
			name : "YETOTALNATIVEPOPU",//非农业
			mapping : "10"
		}, {
			name : "YETOTALREGISTPOPU",//农业
			mapping : "11"
		}, {
			name : "LANDAREA",//平方千米
			mapping : "12"
		} ]
	})
});

/**
 * Tab页-国民经济-数据表格
 */
var nationalEconomyGrid = new Ext.grid.EditorGridPanel({
	plugins : [ new Ext.ux.grid.ColumnHeaderGroup() ],
	id : 'nationalEconomyGrid',
	border : false,
	bodyBorder : false,
	width : tab_grid_width,
	height : tab_grid_height,
	region : "center",
	store : sseGdpGridStore,
	cm : new Ext.grid.ColumnModel({
		columns : [ {
			header : 'sse_gdp 版本号',
			align : 'center',
			hidden : true,
			dataIndex : 'GDPVERSIONID'
		}, {
			header : 'sse_population 版本号',
			align : 'center',
			hidden : true,
			dataIndex : 'POPUVERSIONID'
		}, {
			header : 'sse_admi_divi_area 版本号',
			align : 'center',
			hidden : true,
			dataIndex : 'LANDVERSIONID'
		}, {
			header : '区域名称',
			align : 'center',
			width:100,
			dataIndex : 'AREANAME'
		}, {
			header : '年份',
			align : 'center',
			width:60,
			dataIndex : 'TABYEAR'
		}, {
			header : '全社会',
			align : 'center',
			width:70,
			dataIndex : 'GDPCURRENTPRICES'
		}, {
			header : 'GDP指数',
			align : 'center',
			hidden : true,
			dataIndex : 'GDPINDEX'
		}, {
			header : '第一产业',
			align : 'center',
			width:70,
			dataIndex : 'PRIMINDUGDPCUP',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '第二产业',
			align : 'center',
			width:70,
			dataIndex : 'SECINDUSTRYGDPCUP',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '第三产业',
			align : 'center',
			width:70,
			dataIndex : 'TERINDUSTRYGDPCUP',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '非农业',
			align : 'center',
			width:70,
			dataIndex : 'YETOTALNATIVEPOPU',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '农业',
			align : 'center',
			width:70,
			dataIndex : 'YETOTALREGISTPOPU',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '平方千米',
			align : 'center',
			width:70,
			dataIndex : 'LANDAREA',
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
	listeners : {
		'beforerender' : function(grid) {
			grid.setGroupConfig([ [ {
				header : '',
				align : 'center',
				colspan : 5
			}, {
				header : '产值（亿元）',
				align : 'center',
				colspan : 5
			}, {
				header : '人口（万人）',
				align : 'center',
				colspan : 2
			}, {
				header : '面积',
				align : 'center',
				colspan : 1
			} ] ]);
		},
		'afteredit':function(e){
				var record = e.record;
				if(e.field == 'PRIMINDUGDPCUP'||e.field == 'SECINDUSTRYGDPCUP'||e.field == 'TERINDUSTRYGDPCUP'){
					record.set('GDPCURRENTPRICES',record.data.PRIMINDUGDPCUP+record.data.SECINDUSTRYGDPCUP+record.data.TERINDUSTRYGDPCUP);
				}
		 }
	}
});
//nationalEconomyGrid.store.load();

/**
 * 地区年度-数据域
 * */
var sseAreaGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadAreaGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "AREA",//所属地区
			mapping : "0"
		}, {
			name : "TABYEAR",//年份
			mapping : "1"
		}, {
			name : "ALLSOCIETYPOWER",//全社会
			mapping : "2"
		}, {
			name : "PRIINDUSTRYPOWER",//第一产业
			mapping : "3"
		}, {
			name : "SECINPOWER",//第二产业
			mapping : "4"
		}, {
			name : "TERINPOWER",//第三产业
			mapping : "5"
		}, {
			name : "HOUSEHOLDPOWER",//居民
			mapping : "6"
		}, {
			name : "ALLSOCIMAXLOAD",//全社会
			mapping : "7"
		}, {
			name : "PADDINGMAXLOAD",//统调
			mapping : "8"
		}, {
			name : "NETMAXLOAD",//网供
			mapping : "9"
		}, {
			name : "MAXLOADUSEHOU",//全社会利用小时
			mapping : "10"
		} ]
	})
});

/**
 * Tab页-地区年度-数据表格
 */
var annualAreaGrid = new Ext.grid.EditorGridPanel({
	plugins : [ new Ext.ux.grid.ColumnHeaderGroup() ],
	id : 'annualAreaGrid',
	width : tab_grid_width,
	height : tab_grid_height,
	border : false,
	bodyBorder : false,
	region : "center",
	store : sseAreaGridStore,
	cm : new Ext.grid.ColumnModel({
		columns : [ {
			header : '所属地区',
			align : 'center',
			width:100,
			dataIndex : 'AREA'
		}, {
			header : '年份',
			align : 'center',
			width:60,
			dataIndex : 'TABYEAR'
		}, {
			header : '全社会',
			align : 'center',
			width:70,
			dataIndex : 'ALLSOCIETYPOWER'
		}, {
			header : '第一产业',
			align : 'center',
			width:70,
			dataIndex : 'PRIINDUSTRYPOWER',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '第二产业',
			align : 'center',
			width:70,
			dataIndex : 'SECINPOWER',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '第三产业',
			align : 'center',
			width:70,
			dataIndex : 'TERINPOWER',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '居民',
			align : 'center',
			width:70,
			dataIndex : 'HOUSEHOLDPOWER',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '全社会',
			align : 'center',
			width:70,
			dataIndex : 'ALLSOCIMAXLOAD',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '统调',
			align : 'center',
			width:70,
			dataIndex : 'PADDINGMAXLOAD',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '网供',
			align : 'center',
			width : 70,
			dataIndex : 'NETMAXLOAD',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '全社会利用小时',
			align : 'center',
			dataIndex : 'MAXLOADUSEHOU',
			width:100,
			editor :new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		} ]
	}),
	listeners : {
		'beforerender' : function(grid) {
			grid.setGroupConfig([ [{
				header : '',
				align : 'center',
				colspan : 2
			}, {
				header : '用电量（万千瓦时）',
				align : 'center',
				colspan : 5
			}, {
				header : '最大负荷（兆瓦）',
				align : 'center',
				colspan : 4
			} ] ]);
		},
		'afteredit':function(e){
				var record = e.record;
				if(e.field == 'PRIINDUSTRYPOWER'||e.field == 'SECINPOWER'||e.field == 'TERINPOWER'){
					record.set('ALLSOCIETYPOWER',record.data.PRIINDUSTRYPOWER+record.data.SECINPOWER+record.data.TERINPOWER);
				}
		 }
	}
});
//annualAreaGrid.store.load();

/**
 * 行业年度-数据域
 * */
var sseBusinessGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadBusinessGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "VERSIONID",//版本号
			mapping : "0"
		}, {
			name : "AREANAME",//所属地区
			mapping : "1"
		}, {
			name : "BUSINESS",//行业名称
			mapping : "2"
		}, {
			name : "TABYEAR",//年份
			mapping : "3"
		}, {
			name : "POWER",//电量(万千瓦时)
			mapping : "4"
		}, {
			name : "LOAD",//负荷(兆瓦)
			mapping : "5"
		} ]
	})
});

/**
 * Tab页-行业年度-数据表格
 */
var industryAnnualGrid = new Ext.grid.EditorGridPanel({
	id : 'industryAnnualGrid',
	region : "center",
	width : tab_grid_width,
	height : tab_grid_height,
	border : false,
	bodyBorder : false,
	store : sseBusinessGridStore,
	cm : new Ext.grid.ColumnModel({
		columns : [ {
			header : '版本号',
			align : 'center',
			hidden : true,
			dataIndex : 'VERSIONID'
		}, {
			header : '所属地区',
			align : 'center',
			dataIndex : 'AREANAME'
			/*,editor : new Ext.form.TextField({
                allowBlank: false
            })*/
		}, {
			header : '行业名称',
			align : 'center',
			width : 140,
			dataIndex : 'BUSINESS'
			/*,editor : new Ext.form.TextField({
                allowBlank: false
            })*/
		}, {
			header : '年份',
			align : 'center',
			dataIndex : 'TABYEAR'
			/*,editor : new Ext.form.TextField({
                allowBlank: false
            })*/
		}, {
			header : '电量（万千瓦时）',
			align : 'center',
			dataIndex : 'POWER'
			/*,editor : new Ext.form.TextField({
                allowBlank: false
            })*/
		}, {
			header : '负荷（兆瓦）',
			align : 'center',
			dataIndex : 'LOAD'
			/*,editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})*/
		} ]
	})
});
//industryAnnualGrid.store.load();

/**
 * 典型日负荷-数据域
 * */
var sseDetailGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadDetailGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "INFOID",//SPS_LOAD_CURVE_INFO id
			mapping : "0"
		}, {
			name : "LOADID",//SPS_DAILY_LOAD_NET id
			mapping : "1"
		}, {
			name : "AREANAME",//所属区域
			mapping : "2"
		}, {
			name : "DATETIME",//日期
			mapping : "3"
		}, {
			name : "MEASURETIME",//时刻
			mapping : "4"
		}, {
			name : "MW",//负荷(兆瓦)
			mapping : "5"
		}, {
			name : "TIMECODE",//时刻代码
			mapping : "6"
		}, {
			name : "TABYEAR",//年份
			mapping : "7"
		}, {
			name : "TABMONTH",//月份
			mapping : "8"
		}, {
			name : "TABDAY",//天
			mapping : "9"
		} ]
	})
});

/**
 * Tab页-典型日负荷-数据表格
 */
var typicalDailyLoadGrid = new Ext.grid.EditorGridPanel({
	id : 'typicalDailyLoadGrid',
	region : "center",
	width : tab_grid_width,
	height : tab_grid_height,
	border : false,
	bodyBorder : false,
	store : sseDetailGridStore,
	cm : new Ext.grid.ColumnModel({
		columns : [ {
			header : 'SPS_LOAD_CURVE_INFO id',
			align : 'center',
			hidden : true,
			dataIndex : 'INFOID'
		}, {
			header : 'SPS_DAILY_LOAD_NET id',
			align : 'center',
			hidden : true,
			dataIndex : 'LOADID'
		}, {
			header : '所属区域',
			align : 'center',
			dataIndex : 'AREANAME'
		}, {
			header : '日期',
			align : 'center',
			dataIndex : 'DATETIME'
		}, {
			header : '时刻',
			align : 'center',
			dataIndex : 'MEASURETIME'
		}, {
			header : '负荷(兆瓦)',
			align : 'center',
			dataIndex : 'MW',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '时刻代码',
			align : 'center',
			hidden : true,
			dataIndex : 'TIMECODE'
		}, {
			header : '年份',
			align : 'center',
			hidden : true,
			dataIndex : 'TABYEAR'
		}, {
			header : '月份',
			align : 'center',
			hidden : true,
			dataIndex : 'TABMONTH'
		}, {
			header : '天',
			align : 'center',
			hidden : true,
			dataIndex : 'TABDAY'
		} ]
	})
});
//typicalDailyLoadGrid.store.load();

/**
 * 现有大用户-数据域
 * */
var sseBigUserGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadBigUserGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "VERSIONID",//版本号
			mapping : "0"
		}, {
			name : "AREANAME",//所属地区
			mapping : "1"
		}, {
			name : "USERNAME",//用户名
			mapping : "2"
		}, {
			name : "ACCESS_VOLEVEL",//电压等级
			mapping : "3"
		}, {
			name : "THE_INDU_POWER",//产业
			mapping : "4"
		}, {
			name : "TAB_YEAR",//年份
			mapping : "5"
		}, {
			name : "HOUHOLD_MAX_LOAD",//用电量(万千瓦时)
			mapping : "6"
		}, {
			name : "YEAR_OF_POWER",//正常负荷 (兆瓦)
			mapping : "7"
		} ]
	})
});

/**
 * Tab页-现有大用户-数据表格
 */
var existingLargeUsersGrid = new Ext.grid.EditorGridPanel({
	id : 'existingLargeUsersGrid',
	region : "center",
	width : tab_grid_width,
	height : tab_grid_height,
	border : false,
	bodyBorder : false,
	store : sseBigUserGridStore,
	cm : new Ext.grid.ColumnModel({
		columns : [ {
			header : '版本号',
			align : 'center',
			hidden : true,
			dataIndex : 'VERSIONID'
		}, {
			header : '所属地区',
			align : 'center',
			width:100,
			dataIndex : 'AREANAME'
		}, {
			header : '用户名',
			align : 'center',
			width : 150,
			dataIndex : 'USERNAME'
		}, {
			header : '电压等级',
			align : 'center',
			width:60,
			dataIndex : 'ACCESS_VOLEVEL'
		}, {
			header : '产业',
			align : 'center',
			width : 150,
			dataIndex : 'THE_INDU_POWER'
		}, {
			header : '年份',
			align : 'center',
			width:60,
			dataIndex : 'TAB_YEAR'
		}, {
			header : '用电量(万千瓦时)',
			align : 'center',
			width : 110,
			dataIndex : 'HOUHOLD_MAX_LOAD',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '正常负荷 (兆瓦)',
			align : 'center',
			width : 110,
			dataIndex : 'YEAR_OF_POWER',
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
//existingLargeUsersGrid.store.load();

/**
 * 报装大用户-数据域
 * */
var sseBigBagGridStore = new Ext.data.Store({
	autoLoad : false,
	url : "prediction/queryForeCaseAction/loadBigBagGrid.do",
	method : 'post',
	baseParams : {
		'areaId' : areaId, //区域ID
		'faVersionId' : faVersionId //方案版本ID
	},
	reader : new Ext.data.JsonReader({
		root : 'list',
		fields : [ {
			name : "VERSIONID",//版本号
			mapping : "0"
		}, {
			name : "AREANAME",//所属地区
			mapping : "1"
		}, {
			name : "USERNAME",//用户名
			mapping : "2"
		}, {
			name : "VOLEVEL",//电压等级
			mapping : "3"
		}, {
			name : "THEINDUPOWER",//产业
			mapping : "4"
		}, {
			name : "TABYEAR",//年份
			mapping : "5"
		}, {
			name : "EQUICAPA",//报装容量(兆伏安)
			mapping : "6"
		}, {
			name : "maxload",//预计最大负荷 (兆瓦)
			mapping : "7"
		} ]
	})
});

/**
 * Tab页-报装大用户-数据表格
 */
var reportedLoadingLargeUsersGrid = new Ext.grid.EditorGridPanel({
	id : 'reportedLoadingLargeUsersGrid',
	region : "center",
	width : tab_grid_width,
	height : tab_grid_height,
	border : false,
	bodyBorder : false,
	store : sseBigBagGridStore,
	cm : new Ext.grid.ColumnModel({
		columns : [ {
			header : '版本号',
			align : 'center',
			hidden : true,
			dataIndex : 'VERSIONID'
		}, {
			header : '所属地区',
			align : 'center',
			dataIndex : 'AREANAME'
		}, {
			header : '用户名',
			align : 'center',
			width : 150,
			dataIndex : 'USERNAME'
		}, {
			header : '电压等级',
			align : 'center',
			width:60,
			dataIndex : 'VOLEVEL'
		}, {
			header : '产业',
			align : 'center',
			width : 150,
			dataIndex : 'THEINDUPOWER'
		}, {
			header : '年份',
			align : 'center',
			width:60,
			dataIndex : 'TABYEAR'
		}, {
			header : '报装容量(兆伏安)',
			align : 'center',
			width : 120,
			dataIndex : 'EQUICAPA',
			editor : new Ext.form.NumberField({
				editable : true,
				allowBlank : true, 
				decimalPrecision:4,                 //精确到小数点后2位(执行4舍5入)
				allowDecimals:true,                //允许输入小数
				allowNegative:false,
				maxValue:99999999.9999
			})
		}, {
			header : '预计最大负荷（兆瓦）',
			align : 'center',
			width : 130,
			dataIndex : 'maxload',
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

var tabs = new Ext.TabPanel({
	id : 'tabPanel',
	border : false,
	bodyBorder : false,
	activeTab : 0,
	region : "north",
	height : height,
	hideBorders: true,
	items : [ {
		title : "国民经济",
		border : false,
		bodyBorder : false,
		items : [ nationalEconomyGrid ]
	}, {
		title : "地区年度",
		border : false,
		bodyBorder : false,
		items : [ annualAreaGrid ]
	}, {
		title : "典型日负荷",
		border : false,
		bodyBorder : false,
		items : [ typicalDailyLoadGrid ]
	}, {
		title : "现有大用户",
		border : false,
		bodyBorder : false,
		items : [ existingLargeUsersGrid ]
	}, {
		title : "报装大用户",
		border : false,
		bodyBorder : false,
		items : [ reportedLoadingLargeUsersGrid ]
	} ]
});
Ext.app.tabs = tabs;

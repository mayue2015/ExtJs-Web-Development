Ext.onReady(function() {
	/**
	 * 命名空间
	 * */
	Ext.ns("Ext.app");
	
	/**
	 * 获取父页面参数
	 * */
	var winArgs = window.dialogArguments || '';
	var areaName = winArgs.qy;
	var nodeId = winArgs.nodeId;
	var type = winArgs.type;
	var record = null;
	if(type == 'update')
		record = winArgs.record;
	
	/**
	 * 获得年份
	 * */
	var yearStore = new Ext.data.JsonStore({
		url : "planning/utilcontro/yearBox.do",
		fields : ['value', 'text']
	});
	yearStore.load(); 
	/**
	 * 获得当前年份
	 * */
	var myDate = new Date();
	var year = myDate.getFullYear(); // 获取完整的年份
	
	/**
	 * 行政区划
	 * */
	var _area = {
		width : '49%',
		items : [ {
			id : 'areaName',
			xtype : 'textfield',
			name : 'areaName',
			fieldLabel : '行政区划',
			anchor : '95%',
			value : areaName,
			readOnly : true,
			editable : false,
			allowBlank : false,
			disabled : true
		} ]
	};
	
	/**
	 * 年份
	 * */
	var _tabYear = {
		width : '49%',
		items : [ {
        	xtype : 'combo',
			id : 'tab_year',
			name : 'tab_year',
			fieldLabel : '年份',
			width : 127,
			emptyText : '请选择',
			store : yearStore,
			value : year,
			displayField : 'text',
			valueField : 'value',
			triggerAction : 'all',
			editable : false,
			allowBlank : false,
			typeAhead : true
		} ]
	};

	/**
	 * 全社会用电量
	 * */
	var _all_society_power = {
		width : '49%',
		items : [ {
			id : 'all_society_power',
			xtype : 'numberfield',
			name : 'all_society_power',
			fieldLabel : '<font color = red>*</font>全社会用电量(万千瓦时)',
			anchor : '95%',
			allowBlank : false,
			maxValue : 99999999.9999,
			decimalPrecision : 4
		} ]
	};
	
	/**
	 * 一产用电量
	 * */
	var _pri_industry_power = {
		width : '49%',
		items : [ {
			id : 'pri_industry_power',
			xtype : 'numberfield',
			name : 'pri_industry_power',
			fieldLabel : '<font color = red>*</font>一产用电量(万千瓦时)',
			anchor : '95%',
			allowBlank : false,
			maxValue : 99999999.9999,
			decimalPrecision : 4
		} ]
	};
	
	/**
	 * 二产/三产用电量
	 * */
	var _in_power = {
		layout : 'column',
		items : [ {
			layout : 'form',
			width : '49%',
			items : [ {
				id : 'seco_in_power',
				xtype : 'numberfield',
				name : 'seco_in_power',
				fieldLabel : '<font color = red>*</font>二产用电量(万千瓦时)',
				anchor : '95%',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				allowBlank : false
			} ]
		},{
			layout : 'form',
			width : '49%',
			items : [ {
				id : 'tert_in_power',
				xtype : 'numberfield',
				name : 'tert_in_power',
				fieldLabel : '<font color = red>*</font>三产用电量(万千瓦时)',
				anchor : '95%',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				allowBlank : false
			} ]
		} ]
	};
		
	/**
	 * 居民用电量
	 * */
	var _household_pow = {
		width : '49%',
		items : [ {
			id : 'household_pow',
			xtype : 'numberfield',
			name : 'household_pow',
			fieldLabel : '<font color = red>*</font>居民用电量(万千瓦时)',
			allowBlank : false,
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			anchor : '95%'
		} ]
	};

	/**
	 * 人均用电量
	 * */
	var _elec_cons_per_per = {
		width : '49%',
		items : [ {
			id : 'elec_cons_per_per',
			xtype : 'numberfield',
			name : 'elec_cons_per_per',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			fieldLabel : '<font color = red>*</font>人均用电量(千万时/人)',
			allowBlank : false,
			anchor : '95%'
		} ]
	};

	/**
	 * 统调用电量
	 * */
	var _padding_power = {
		width : '49%',
		items : [ {
			id : 'padding_power',
			xtype : 'numberfield',
			name : 'padding_power',
			maxValue : 99999999.9999,
            decimalPrecision : 4,
			fieldLabel : '<font color = red>*</font>统调用电量(万千瓦时)',
			allowBlank : false,
			anchor : '95%'
		} ]
	};
		
	/**
	 * 一产用电量增长率
	 * */
	var _pri_in_pow_rise_rate = {
		width : '49%',
		items : [ {
			id : 'pri_in_pow_rise_rate',
			xtype : 'numberfield',
			name : 'pri_in_pow_rise_rate',
			maxValue : 99999999.9999,
            decimalPrecision : 4,
			fieldLabel : '<font color = red>*</font>一产用电量增长率(%)',
			readOnly : true,
			editable : false,
			allowBlank : false,
			disabled : true,
			anchor : '95%'
		} ]
	};
	
	/**
	 * 二产用电量增长率
	 * */
	var _sec_in_pow_ri_rate = {
			width : '49%',
			items : [ {
				id : 'sec_in_pow_ri_rate',
				xtype : 'numberfield',
				name : 'sec_in_pow_ri_rate',
				maxValue : 99999999.9999,
	            decimalPrecision : 4,
				fieldLabel : '<font color = red>*</font>二产用电量增长率(%)',
				readOnly : true,
				editable : false,
				allowBlank : false,
				disabled : true,
				anchor : '95%'
			} ]
		};
	
	/**
	 * 三产用电量增长率
	 * */
	var _ter_in_pow_rise_rate = {
			width : '49%',
			items : [ {
				id : 'ter_in_pow_rise_rate',
				xtype : 'numberfield',
				name : 'ter_in_pow_rise_rate',
				maxValue : 99999999.9999,
	            decimalPrecision : 4,
				fieldLabel : '<font color = red>*</font>三产用电量增长率(%)',
				readOnly : true,
				editable : false,
				allowBlank : false,
				disabled : true,
				anchor : '95%'
			} ]
		};
	
	/**
	 * 居民用电量增长率
	 * */
	var _hous_pow_rise_rate = {
			width : '49%',
			items : [ {
				id : 'hous_pow_rise_rate',
				xtype : 'numberfield',
				name : 'hous_pow_rise_rate',
				maxValue : 99999999.9999,
	            decimalPrecision : 4,
				fieldLabel : '<font color = red>*</font>居民用电量增长率(%)',
				readOnly : true,
				editable : false,
				allowBlank : false,
				disabled : true,
				anchor : '95%'
			} ]
		};
	
	/**
	 * 表单面板
	 * */
	var topField = {
		xtype : 'panel',
		defaults : {
			xtype : 'panel',
			layout : 'column',
			labelWidth : 150
		},
		items : [ {
			defaults : {
				layout : 'form',
				labelWidth : 150
			},
			layout : 'column',
			style : 'margin-top : 10px',
			items : [ _area, _tabYear ]
		} ]
	};
	var bottomField = {
		xtype : 'panel',
		defaults : {
			xtype : 'panel',
			layout : 'column',
			autoScroll : false,
			height : 30,
			labelWidth : 150
		},
		items : [ {
			defaults : {
				layout : 'form',
				labelWidth : 150
			},
			layout : 'column',
			style : 'margin-top : 10px',
			items : [ _all_society_power, _pri_industry_power ]
		},  {
			defaults : {
				layout : 'form',
				labelWidth : 150
			},
			layout : 'anchor',
			style : 'margin-top : 10px',
			items : [ _in_power ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 150
			},
			layout : 'column',
			style : 'margin-top : 10px',
			items : [ _household_pow , _elec_cons_per_per]
		},/* {
			defaults : {
				layout : 'form',
				labelWidth : 150
			},
			layout : 'column',
			style : 'margin-top : 10px',
			items : [ _hous_pow_rise_rate,_pri_in_pow_rise_rate ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 150
			},
			layout : 'column',
			style : 'margin-top : 10px',
			items : [ _sec_in_pow_ri_rate,_ter_in_pow_rise_rate ]
		},*/ {
			defaults : {
				layout : 'form',
				labelWidth : 150
			},
			layout : 'column',
			style : 'margin-top : 10px',
			items : [ _padding_power ]
		} ]
	};

	var text = '<font color = red>*</font>为必填项!';
	for(var i = 0; i < 115; i++) {
		text += '&nbsp';
	}
	
	var button = [ text, {
		text : '保存',
        id :　'save',
        iconCls : 'save',
        handler : function(){
        	var form = Ext.app.form.getForm(); 
        	Ext.app.save(form, window,type,record);
        }
	}, {
		text : '取消',
        id :　'reset',
        icon : 'planning/icons/cancel_2.png',
        handler : function() {
        	window.close();
        }
	} ];
	
	var form = new Ext.form.FormPanel({
		id : 'form',
		frame : true,
		border : false,
		anchor : '0 68%',
		labelAlign : 'right',
		buttonAlign: 'right',
		items : [ topField, bottomField],
		buttons : button
	});
	Ext.app.form = form;

	var vp = new Ext.Viewport({
		border : true,
		layout : "fit",
		items : [ form ],
		listeners : {
			afterRender : function(){
				if(type == 'update'){
					Ext.getCmp("tab_year").setDisabled(true);
					//年份
					Ext.getCmp("tab_year").setRawValue(record[0].get("TAB_YEAR"));
					//全社会用电量
					Ext.getCmp("all_society_power").setRawValue(record[0].get("ALL_SOCIETY_POWER"));
					//一产用电量
					Ext.getCmp("pri_industry_power").setRawValue(record[0].get("PRI_INDUSTRY_POWER"));
					//二产用电量
					Ext.getCmp("seco_in_power").setRawValue(record[0].get("SECO_IN_POWER"));
					//三产用电量
					Ext.getCmp("tert_in_power").setRawValue(record[0].get("TERT_IN_POWER"));
					//居民用电量
					Ext.getCmp("household_pow").setRawValue(record[0].get("HOUSEHOLD_POW"));
					//人均用电量
					Ext.getCmp("elec_cons_per_per").setRawValue(record[0].get("ELEC_CONS_PER_PER"));
					//统调用电量
					Ext.getCmp("padding_power").setRawValue(record[0].get("PADDING_POWER"));
//					//一产用电量增长率
//					Ext.getCmp('pri_in_pow_rise_rate').setRawValue(record[0].get("PRI_IN_POW_RISE_RATE"));
//					//二产用电量增长率
//					Ext.getCmp('sec_in_pow_ri_rate').setRawValue(record[0].get("SEC_IN_POW_RI_RATE"));
//					//三产用电量增长率
//					Ext.getCmp("ter_in_pow_rise_rate").setRawValue(record[0].get("TER_IN_POW_RISE_RATE"));
//					//居民用电量增长率
//					Ext.getCmp("hous_pow_rise_rate").setRawValue(record[0].get("HOUS_POW_RISE_RATE"));
				};
			}
		}
	});
	
});

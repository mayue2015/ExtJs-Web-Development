Ext.onReady(function() {
	Ext.ns("Ext.app");
	
	/**
	 * 获取父页面参数
	 */
	var winArgs = window.dialogArguments || '';
	var qy = winArgs.qy;
	var nodeId = winArgs.nodeId;
	var type = winArgs.type;
	var record = null;
	if(type == 'update')
		record = winArgs.record;
	
	var yearStore = new Ext.data.JsonStore({
		url : "planning/utilcontro/yearBox.do",
		fields : ['value', 'text']
	});
	yearStore.load(); 
	var myDate = new Date();
	var year = myDate.getFullYear(); // 获取完整的年份
	
	var left = {
		width : '49%',
		items : [ {
			id : 'qy',
			xtype : 'textfield',
			name : 'qy',
			fieldLabel : '<font color = red>*</font>行政区划',
			anchor : '70%',
			value : qy,
			readOnly : true,
			editable : false,
			allowBlank : false,
			disabled : true
		} ]
	};
	
	var right = {
		width : '49%',
		items : [ {
			id : 'tab_year',
			xtype : 'datefield',
			name : 'tab_year',
			fieldLabel : '<font color = red>*</font>典型日',
			labelWidth : 100,
			anchor : '70%',
			format : 'Y-m-d',
			allowBlank : false
		} ]
	};
	
	/**
	 * 各日负荷--第一行
	 */
	var firstColumn = {
		labelAlign : "right",
		labelWidth: 50, 
		layout : 'column',
		items : [ {
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw1',
				name : 'mw1',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '1点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw2',
				name : 'mw2',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '2点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw3',
				name : 'mw3',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '3点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw4',
				name : 'mw4',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '4点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		} ]
	};
	
	/**
	 * 各日负荷--第二行
	 */
	var secondColumn = {
		labelAlign : "right",
		labelWidth: 50, 
		layout : 'column',
		items : [ {
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw5',
				name : 'mw5',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '5点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw6',
				name : 'mw6',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '6点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw7',
				name : 'mw7',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '7点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw8',
				name : 'mw8',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '8点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		} ]
	};
	
	/**
	 * 各日负荷--第三行
	 */
	var thirdColumn = {
		labelAlign : "right",
		labelWidth: 50, 
		layout : 'column',
		items : [ {
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw9',
				name : 'mw9',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '9点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw10',
				name : 'mw10',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '10点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw11',
				name : 'mw11',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '11点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw12',
				name : 'mw12',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '12点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		} ]
	};
	
	/**
	 * 各日负荷--第四行
	 */
	var fourColumn = {
		labelAlign : "right",
		labelWidth: 50, 
		layout : 'column',
		items : [ {
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw13',
				name : 'mw13',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '13点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw14',
				name : 'mw14',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '14点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw15',
				name : 'mw15',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '15点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw16',
				name : 'mw16',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '16点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		} ]
	};
	
	/**
	 * 各日负荷--第五行
	 */
	var fiveColumn = {
		labelAlign : "right",
		labelWidth: 50, 
		layout : 'column',
		items : [ {
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw17',
				name : 'mw17',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '17点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw18',
				name : 'mw18',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '18点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw19',
				name : 'mw19',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '19点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw20',
				name : 'mw20',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '20点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		} ]
	};
	
	/**
	 * 各日负荷--第六行
	 */
	var sixColumn = {
		labelAlign : "right",
		labelWidth: 50, 
		layout : 'column',
		items : [ {
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw21',
				name : 'mw21',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '21点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw22',
				name : 'mw22',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '22点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw23',
				name : 'mw23',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '23点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		},{
			layout : 'form',
			width : '22%',
			items : [ {
				xtype : 'numberfield',
				id : 'mw24',
				name : 'mw24',
				maxValue : 99999999.9999,
				decimalPrecision : 4,
				fieldLabel : '24点',
				allowBlank : false,
				enableKeyEvents : true,
				anchor : '70%'
			}]
		} ]
	};
	
	/**
	 * 基本信息-fieldset
	 */
	var baseField = {
		xtype : 'fieldset',
		title : '典型年负荷信息',
		defaults : {
			xtype : 'panel',
			layout : 'column',
			labelWidth : 100
		},
		items : [ {
			defaults : {
				layout : 'form',
				labelWidth : 65
			},
			items : [ left, right ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 120
			},
			items : [ {
				layout : 'form',
				items : [ {
					fieldLabel : '<font color = red>*</font>各时刻负荷(兆瓦)'
				}]
			} ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 100
			},
			items : [ firstColumn ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 100
			},
			items : [ secondColumn ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 100
			},
			items : [ thirdColumn ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 100
			},
			items : [ fourColumn ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 100
			},
			items : [ fiveColumn ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 100
			},
			items : [ sixColumn ]
		} ]
	};

	var tsText = '<font color = red>*</font>为必填项!';
	for(var i = 0; i < 110; i++) {
		tsText += '&nbsp';
	}
	
	var button = [ tsText, {
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
		items : [ baseField ],
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
					Ext.getCmp("tab_year").setValue(record[0].get("tab_year"));
					Ext.getCmp("mw1").setValue(record[0].get("mw1"));
					Ext.getCmp("mw2").setValue(record[0].get("mw2"));
					Ext.getCmp("mw3").setValue(record[0].get("mw3"));
					Ext.getCmp("mw4").setValue(record[0].get("mw4"));
					Ext.getCmp("mw5").setValue(record[0].get("mw5"));
					Ext.getCmp("mw6").setValue(record[0].get("mw6"));
					Ext.getCmp("mw7").setValue(record[0].get("mw7"));
					Ext.getCmp("mw8").setValue(record[0].get("mw8"));
					Ext.getCmp("mw9").setValue(record[0].get("mw9"));
					Ext.getCmp("mw10").setValue(record[0].get("mw10"));
					Ext.getCmp("mw11").setValue(record[0].get("mw11"));
					Ext.getCmp("mw12").setValue(record[0].get("mw12"));
					Ext.getCmp("mw13").setValue(record[0].get("mw13"));
					Ext.getCmp("mw14").setValue(record[0].get("mw14"));
					Ext.getCmp("mw15").setValue(record[0].get("mw15"));
					Ext.getCmp("mw16").setValue(record[0].get("mw16"));
					Ext.getCmp("mw17").setValue(record[0].get("mw17"));
					Ext.getCmp("mw18").setValue(record[0].get("mw18"));
					Ext.getCmp("mw19").setValue(record[0].get("mw19"));
					Ext.getCmp("mw20").setValue(record[0].get("mw20"));
					Ext.getCmp("mw21").setValue(record[0].get("mw21"));
					Ext.getCmp("mw22").setValue(record[0].get("mw22"));
					Ext.getCmp("mw23").setValue(record[0].get("mw23"));
					Ext.getCmp("mw24").setValue(record[0].get("mw24"));
				}
			}
		}
	});

});

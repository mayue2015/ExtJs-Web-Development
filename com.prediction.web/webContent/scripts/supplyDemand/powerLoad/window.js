
Ext.onReady(function() {

	Ext.ns("Ext.app");

	var winArgs = window.dialogArguments || '';
	var record = winArgs.record;
	var type = winArgs.type;
	beginYear = winArgs.beginYear;
	var returnValue = "";
	
	var dydjStore = new Ext.data.JsonStore({
		url : "planning/volevel/getVolCode.do?id="+id+"&deptId="+deptguid,
		fields : ['value', 'text']
	});
	
	var yearStore = new Ext.data.JsonStore({
		url : "planning/utilcontro/yearBox.do",
		fields : ['value', 'text'],
		autoLoad : true
	});
	
	var defaults = {
		xtype : 'panel',
		layout : 'column',
		style : 'margin-top : 15px',
		labelWidth : 210
	};
	
	var left = {
		width : '49%',
		layout : 'form',
		items : [ {
			id : 'area',
			xtype : 'textfield',
			name : 'area',
			fieldLabel : '行政区域',
			value : winArgs.nodeText,
			disabled : true,
			width : 85
		},{
			xtype : 'numberfield',
			id : 'all_soci_max_load',
			name : 'all_soci_max_load',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			fieldLabel : '<font color = red>*</font>全社会最大负荷（兆瓦）',
			allowBlank : false,
			enableKeyEvents : true,
			width : 85,
			listeners : {
				'keyup' : function(){
					Ext.app.getYear_rate_fun(winArgs.nodeId);
				}
			}
		},{
			xtype : 'textfield',
			id : 'max_load_yr_rate',
			name : 'max_load_yr_rate',
//			maxValue : 99999999.9999,
//			decimalPrecision : 4,
			fieldLabel : '全社会最大负荷年增长率（%）',
			disabled : true,
			width : 85
		},{
			xtype : 'numberfield',
			id : 'grid_max_use_hou',
			name : 'grid_max_use_hou',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			fieldLabel : '网供最大负荷利用小时数（小时）',
			width : 85
		},{
			xtype : 'numberfield',
			id : 'max_load_use_hou',
			name : 'max_load_use_hou',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			fieldLabel : '<font color = red>*</font>全社会最大负荷利用小时数（小时）',
			allowBlank : false,
			width : 85
		}  ]
	};
	
	var right = {
		width : '48.4%',
		layout : 'form',
		items : [ {
        	xtype : 'combo',
			id : 'tab_year',
			name : 'tab_year',
			fieldLabel : '年份',
			width : 85,
			mode : 'local',
			emptyText : '请选择',
			store : yearStore,
			value : beginYear,
			displayField : 'text',
			valueField : 'value',
			triggerAction : 'all',
			editable : false,
			allowBlank : false,
			typeAhead : true,
			listeners : {
				'select' : function(){
					Ext.app.getYear_rate_fun(winArgs.nodeId);
				}
			}
		}, {
			xtype : 'numberfield',
			id : 'padding_max_load',
			name : 'padding_max_load',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			fieldLabel : '统调最大负荷（兆瓦）',
			width : 85
		}, {
			xtype : 'numberfield',
			id : 'net_max_load',
			name : 'net_max_load',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			fieldLabel : '网供最大负荷（兆瓦）',
			width : 85
		}, {
			xtype : 'numberfield',
			id : 'padding_max_use_hou',
			name : 'padding_max_use_hou',
			maxValue : 99999999.9999,
			decimalPrecision : 4,
			fieldLabel : '统调最大负荷利用小时数（小时）',
			width : 85
		} ]
	};

	var baseField = {
		xtype : 'panel',
		title : '',
		defaults : defaults,
		items : [ {
			layout : 'column',
			items : [ left, right]
		} ]
	};
	
	var text = '<font color = red>*</font>为必填项!';
	for(var i = 0; i < 130; i++) {
		text += '&nbsp';
	}
	
	var button = [ text, {
		text : '保存',
        id :　'save',
        iconCls : 'save',
        handler : function(){
        	var f =form.getForm(); 
        	Ext.app.save(f, window);
        }
	},{
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
		buttons : button,
		items : [ baseField ]
	});

	var vp = new Ext.Viewport({
		border : true,
		layout : "fit",
		items : [ form ],
		listeners : {
			afterRender : function(){
				if(type == 'update'){// 循环设置默认值
					// 得到表单列字段
					var column =Ext.getCmp("form").getForm().items.keys;
					for(var i = 0; i<column.length; i ++ ){
						// 遍历设置默认值
						Ext.getCmp(column[i]).setValue(record[0].get(column[i]));
					}
				};
			}
		}
	});
});
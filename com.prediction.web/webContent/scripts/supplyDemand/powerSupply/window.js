
Ext.onReady(function() {

	Ext.ns("Ext.app");

	var winArgs = window.dialogArguments || '';
	var record = winArgs.record;
	var type = winArgs.type;
	var beginYear = winArgs.beginYear;
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
		style : 'margin-top : 10px',
		labelWidth : 150
	};
	
	var left = {
		width : '49%',
		layout : 'form',
		items : [ {
			id : 'area',
			xtype : 'textfield',
			name : 'area',
			fieldLabel : '区域',
			value : winArgs.nodeText,
			disabled : true,
			width : 85
		},{
			id : 'dydj',
			xtype : 'combo',
			name : 'dydj',
			fieldLabel : '<font color=red>*</font>电压等级',
			store : dydjStore,
			width : 85,
			editable : false,
			allowBlank : false,
			typeAhead : true,
			hiddenName : 'voltagelevel',
			displayField : 'text',
			valueField : 'value',
			triggerAction : 'all'
		},{
			id : 'grid_supp_load',
			xtype : 'textfield',
			name : 'grid_supp_load',
			fieldLabel : '<font color = red>*</font>网供最大负荷（兆瓦）',
			width : 85,
			allowBlank : false
		} ]
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
			typeAhead : true
		}, {
			id : 'grid_supp_pow',
			xtype : 'textfield',
			name : 'grid_supp_pow',
			fieldLabel : '<font color = red>*</font>网供电量（万千瓦时）',
			width : 85,
			allowBlank : false
		}, {
			id : 'ele_sales',
			xtype : 'textfield',
			name : 'ele_sales',
			fieldLabel : '<font color = red>*</font>售电量（万千瓦时）',
			width : 85,
			allowBlank : false
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
	for(var i = 0; i < 80; i++) {
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
				if(type == 'update'){
					//下拉框设置两个默认值
					Ext.getCmp("dydj").setValue(record[0].get("volt"));
					Ext.getCmp('dydj').setRawValue(record[0].get("volt_name"));
					
					Ext.getCmp('tab_year').setValue(record[0].get('tab_year'));
					
					Ext.getCmp("ele_sales").setValue(record[0].get("ele_sales"));

					Ext.getCmp("grid_supp_pow").setValue(record[0].get("grid_supp_pow"));
					
					Ext.getCmp("grid_supp_load").setValue(record[0].get("grid_supp_load"))
				};
			}
		}
	});
});
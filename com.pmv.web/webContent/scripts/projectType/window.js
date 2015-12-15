Ext.onReady(function() {
	Ext.ns("Ext.app");
	
	/**
	 * 获取父页面参数
	 */
	var winArgs = window.dialogArguments || '';
	var nodeText = winArgs.nodeText;
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
	
	var small = {
		width : '50%',
		items : [ {
			id : 's_project_name',
			xtype : 'textfield',
			name : 's_project_name',
			fieldLabel : '<font color = red>*</font>项目小类',
			anchor : '90%',
			editable : false,
			allowBlank : false
		} ]
	};
	
	var big = {
		width : '50%',
		items : [ {
			id : 'b_project_name',
			xtype : 'textfield',
			name : 'b_project_name',
			fieldLabel : '<font color = red>*</font>项目大类',
			anchor : '90%',
			value : nodeText,
			editable : false,
			allowBlank : false,
			disabled : true
		} ]
	};
	
	/**
	 * 基本信息-fieldset
	 */
	var baseField = {
		xtype : 'fieldset',
		border : false,
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
			items : [ small, big ]
		}, {
			defaults : {
				layout : 'form',
				labelWidth : 65
			},
			items : [ {
				items : [ {
					id : 'project_border',
					xtype : 'textarea',
					name : 'project_border',
					fieldLabel : '<font color = red>*</font>项目边界',
					anchor : '95%',
					editable : false,
					allowBlank : false
				} ]
			} ]
		} ]
	};

	var tsText = '<font color = red>*</font>为必填项!';
	for(var i = 0; i < 68; i++) {
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
        icon : 'pmv/icons/cancel_2.png',
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
					Ext.getCmp("s_project_name").setValue(record[0].get("s_project_name"));
					Ext.getCmp("project_border").setValue(record[0].get("project_border"));
				}
			}
		}
	});

});

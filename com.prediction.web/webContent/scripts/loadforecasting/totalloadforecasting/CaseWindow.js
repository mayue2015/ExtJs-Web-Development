Ext.onReady(function() {
	Ext.ns("Ext.app");
	
	/**
	 * 获取父页面传递参数
	 */
	var winArgs = window.dialogArguments || '';
	var type = null;
	var caseValue = null;
	var caseValueName = null;
	var versionId = null;
	var taskId = null;
	var faVersionId = null;
	if(winArgs){
		type = winArgs.type;
		caseValue = winArgs.caseValue;
		caseValueName = winArgs.vaseValueName;
		versionId = winArgs.versionId;
		taskId = winArgs.taskId;
		faVersionId = winArgs.faVersionId;
	}
	
	/**
	 * 方案名称
	 * */
	var caseNameText = {
		width : '96%',
		items : {
			id : 'caseName',
			xtype : 'textfield',
			name : 'caseName',
			fieldLabel : '方案名称',
			anchor : '90%',
			allowBlank : false
		}
	};
	
	var baseField = {
		xtype : 'panel',
		defaults : {
			xtype : 'panel',
			style : 'margin-top : 15px',
			layout : 'column',
			height : 30,
			labelWidth : 100
		},
		items : [ {
			defaults : {
				layout : 'form',
				labelWidth : 90
			},
			layout : 'column',
			items : [ caseNameText ]
		} ]
	};

	var button = [ {
		text : '确定',
        id :　'save',
        iconCls : 'save',
        width : 60,
        handler : function(){
        	var form = Ext.app.form.getForm(); 
        	Ext.app.saveCase(form,type,versionId,taskId,faVersionId);
        }
	},{
		text : '退出',
        id :　'reset',
        icon : 'evaluation/public/images/cancel_2.png',
        width : 60,
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
		buttonAlign : 'right',
		buttons : button,
		items : [ baseField]
	});
	Ext.app.form = form;

	var vp = new Ext.Viewport({
		border : true,
		layout : "fit",
		items : [ form ],
		listeners : {
			afterRender : function(){
				if(type == 'update'){
					//方案名称
//					Ext.getCmp("caseName").setValue(caseValue);
					Ext.getCmp("caseName").setRawValue(caseValueName);
				};
			}
		}
	});

});

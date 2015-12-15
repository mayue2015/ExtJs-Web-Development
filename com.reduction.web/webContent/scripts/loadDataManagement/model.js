Ext.app.EditWindow = Ext.extend(Ext.Window, {

	modal : true,
	buttonAlign : "center",

	addFormPanel : function() {
		var win = this;
		var formPanel = new Ext.form.FormPanel({
			border : false,
			frame : true,
			labelAlign : "right",
			labelWidth : 70,
			items : [{
		    	columnWidth : 1,
		    	xtype : 'panel',
		    	items : [ {
		            border : false,
		            layout : 'form',
		            items : [ {
		        		xtype : 'combo', 
		                id :　'year',
		                name : 'year',
		                fieldLabel : '年份',
		                mode : 'local',
		                store : Ext.app.yearStore,
						displayField : 'text',
						valueField : 'value',
						triggerAction : 'all',
		                anchor : '92%',
		                editable : false,
		                typeAhead : true
		        	}]
		    	} ]
			}],
			buttons : [{
				xtype : 'button',
				text : '确定',
				width : 70,
				iconCls : 'save',
				handler : function() {
					Ext.app.saveInfo("new");
				}
			}, {
				xtype : 'button',
				text : '取消',
				iconCls : 'undo',
				width : 70,
				handler : function() {
					win.close();
				}
			}]
		});
		this.add(formPanel);
		this.doLayout();
	},
	
	initComponent : function() {
		Ext.app.EditWindow.superclass.initComponent.call(this);
		this.addFormPanel();
	}
});
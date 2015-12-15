Ext.ns('Ext.app');

Ext.app.form = function() {
	var deptStore = new Ext.data.JsonStore({
		url : "prediction/powerBalanceAction/getTaskDept.do",
    	fields : ['value', 'text']
    });
	deptStore.load(); 
	
	var myDate = new Date();
	var year = myDate.getFullYear(); // 获取完整的年份
	
	var formPanel = new Ext.form.FormPanel({
		id : 'form',
		height : 35,
		region : 'north',
		frame : true,
    	border : false,
		labelAlign : "right",
		labelWidth: 70, 
		items : [{
        	columnWidth : 1,
	    	autoHeight : true,
	    	layout : 'column',
	    	items : [{
	    		width : 200,
	            layout : 'form',
	            border : false,
	            items : [{
	            	xtype : 'combo',
    				id : 'qy',
    				name : 'qy',
    				fieldLabel : '区域',
    				anchor : '80%',
    				mode : 'local',
    				emptyText : '请选择',
    				store : deptStore,
    				displayField : 'text',
    				valueField : 'value',
    				triggerAction : 'all',
    				editable : false,
    				typeAhead : true
	            }]
	    	},{
	    		width : 200,
	        	layout : 'form',
	        	border : false,
	        	items : [{
	        		xtype : 'combo', 
	                id :　'dydj',
	                name : 'dydj',
	                fieldLabel : '电压等级',
	                emptyText : '请选择',
	                mode : 'local',
    				store :new Ext.data.SimpleStore({
  					  fields:['text','value'],
  					  data:[
  					     ['110kV','0200206'],
  					     ['35kV','0200208']
  					  ],  
  					  autoLoad:true
  					 }),
    				value : '0200206',
    				displayField : 'text',
    				valueField : 'value',
    				triggerAction : 'all',
	                anchor : '80%',
	                editable : false,
	                typeAhead : true,
	    	        listeners:{
	    	        	select : function(t, s, i) {
	    	        		newGrid();
						}
	    	        }
	        	}]
	    	},{
	    		columnWidth : .3,
	        	layout : 'column',
	        	border : false,
	        	items : [{
	        		xtype : 'button',
	        		text : '编辑',
	                id :　'query',
	                iconCls : 'query',
	                width : 70
	        	},{
	        		xtype : 'button', 
	        		text : '保存',
	                id :　'reset',
	                iconCls : 'undo',
	                width : 70,
	                style : 'margin-left : 20px;',
	                handler : function(){
	                	Ext.getCmp('form').form.reset();
	                }
	        	}]
	    	}]
		}]
	});

	deptStore.on('load', function() {
 		if(deptStore.getTotalCount() > 0){
 			var defaultCase = deptStore.getAt(0).get('value');
 			Ext.getCmp('qy').setValue(defaultCase);//显示与value对应的text
 		}
	});
	return formPanel;
}
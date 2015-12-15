Ext.onReady(function() {
	years = '';
	Ext.ns('Ext.app');
	
	Ext.Ajax.request({
		url : 'prediction/powerBalanceAction/getTaskYears.do',
		method : 'post',
		success : function(response, options) {
			var res = Ext.util.JSON.decode(response.responseText);
			if (res.years != '') {
				years = res.years;
			}
			createGridData();
		}
	});
	
	var deptStore = new Ext.data.JsonStore({
		url : "prediction/powerBalanceAction/getTaskDept.do",
    	fields : ['value', 'text'],
    	autoLoad:true,
    	listeners : {
			load: function(store,record,opts) {
				if (record.length>0) {
					value = record[0].data.value;
					areaInfoCombo.setValue(value);
				}
		    }
		}
    });
	var areaInfoCombo = new Ext.form.ComboBox({
		xtype : 'combo',
		id : 'qy',
		name : 'qy',
		fieldLabel : '区域',
		anchor : '80%',
		mode : 'local',
		store : deptStore,
		displayField : 'text',
		valueField : 'value',
		triggerAction : 'all',
		editable : false,
		typeAhead : true,
		listeners:{
        	select : function(t, s, i) {
        		newGrid();
			}
        }
	});

	var voltInfoCombo = new Ext.form.ComboBox({
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
	});

	/**
	 * 表格PANEL
	 */
	var girdPanel = new Ext.Panel({
		id : 'girdPanel',
		region : 'center',
		border : false,
		bodyBorder : false,
		height : gridHeight,
		items : []
	});

	var mainPanelToolbar = new Ext.Toolbar({  
		id:'mainPanelToolbar',
	    items:['-',
	           '区域：',areaInfoCombo,
	           '-',
	           '电压等级：',voltInfoCombo,
	           '-','-',
	           {text: '初始化计算',iconCls:'undo',handler:function(){resetCompute();}},  
	           '-',
	           {text: '保存',iconCls:'save',handler:function(){saveData();}},  
	           '-'
	           ]  
	}); 
	var mainPanel = new Ext.Panel({
		layout : 'border',
		region : 'center',
		border : false,
		bodyBorder : false,
		tbar:mainPanelToolbar,
		items : [Ext.app.chartPanel(), girdPanel]
	});

	/**
	 * 页面显示
	 */
	var viewport = new Ext.Viewport({
		layout : "border",
		items : [ mainPanel]
	});
	
});
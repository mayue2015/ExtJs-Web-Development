Ext.onReady(function() {
	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners:{
			'beforerowselect': function( SelectionModel, rowIndex, keepExisting,record ) {
		           if(record.data.ismerged==1||record.data.ismerged=='1'){
		        	   return false;  //不能进行选择
		           }else{   
		               return true;   
		           }
			 }
		}
	}); 
	var cm = new Ext.grid.ColumnModel([ 
	         new Ext.grid.RowNumberer(), 
	         sm,
	            {	
					header : '工程ID',
					dataIndex : 'project_id',
					hidden : true
				}, {
					header : '工程名称',
					dataIndex : 'ass_all_name',
					width : 100
				},{
					header : '工程类别',
					dataIndex : 'ass_typ_project',
					width : 100
				},{
					header : '静态投资(万元)',
					dataIndex : 'cost_static',
					width : 100
				}, {
					header : '动态投资(万元)',
					dataIndex : 'cost_dynamic',
					width : 100
				}, {
					header : '节电量(万kWh)',
					dataIndex : 'y_save_kwh',
					width : 100
				}, {
					header : '收益率(%)',
					dataIndex : 'ass_cst_inrate',
					width : 100
				}, {
					header : '是否被合并过',
					dataIndex : 'ismerged',
					hidden : true
				}
	]);
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'pmv/comprehensiveAnalysisAction/queryDataForGridTableJson.do',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'root'
		}, [{
			name : 'project_id'
		}, {
			name : 'ass_all_name'
		}, {
			name : 'ass_typ_project'
		}, {
			name : 'cost_static'
		}, {
			name : 'cost_dynamic'
		}, {
			name : 'y_save_kwh'
		}, {
			name : 'ass_cst_inrate'
		}, {
			name : 'ismerged'
		}])
	});
	// 加载数据前事件
	store.on('beforeload', function() {
		// 页面参数
		var proName_con = parent.Ext.getCmp("proName_con").getValue();
		var returRate_down = parent.Ext.getCmp("returRate_down").getValue();
		var returRate_up = parent.Ext.getCmp("returRate_up").getValue();
		var pro_type = parent.Ext.getCmp("data_tab").getActiveTab().getId();
		// 传递参数
		var _params;
		_params = {
			"proName_con" : proName_con,
			"returRate_down" : returRate_down,
			"returRate_up" : returRate_up,
			"pro_type" : pro_type
		}
		this.baseParams = _params;
	});
	store.load();
	var gridPanel = new Ext.grid.EditorGridPanel({
		id : 'dataGrid',
		region : 'center',
		cm : cm,
		sm : sm,
		store : store,
		loadMask : true,
		bbar : new Ext.PagingToolbar({
			id : 'bbr_s',
			pageSize :20,
			store : store,
			displayInfo : true,
			displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
			emptyMsg : "无数据。"
		}),
		viewConfig : {
		     getRowClass : function(record,rowIndex,rowParams,store){
		          if(record.data.ismerged==1||record.data.ismerged=='1'){
		               return 'x-grid-record-gray-NEW';
		          }
	         }
		}
	});
	/**
	 * 页面显示
	 */
	var viewport = new Ext.Viewport({
		layout : "border",
		items : [ gridPanel]
	});
});
Ext.onReady(function() {
	
	// 请求设置典型日默认值
	/*var url = "pmv/basicDataAction/getDefaultDate.do";
	var util = new Bp.util.RequestUtils();
	var flag = Ext.decode(util.sendRequest(url,{}));
	if (flag.success) {
		defaultDate = flag.value;
	}*/
	
/**************************子表*********************************/
	var sm_s = new Ext.grid.CheckboxSelectionModel({
		listeners:{
			'beforerowselect': function( SelectionModel, rowIndex, keepExisting,record ) {
		           if(record.data.project_id=='red_all'){
		        	   return false;  //不能进行选择
		           }else{   
		               return true;   
		           }
			 }
		}
	}); 
	var cm_s = new Ext.grid.ColumnModel([ 
	         sm_s,
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
				}
	]);
	var data_s = [ ['red_all','','合计','0.00','0.00','0.00','0.00']];
	var store_s = new Ext.data.Store({
		proxy : new Ext.data.MemoryProxy(data_s),
		reader : new Ext.data.ArrayReader({},
				[{
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
				}])
	});
	store_s.load();
	var tb_s = new Ext.Toolbar({  
		id:'tb_s',
	    items:[ '-',
	            {
					text:'增加',
					iconCls:'add',
					handler:function(){Ext.app.insertIntoSub();}
				},'-',{
					text:'删除',
					iconCls:'remove',
					handler:function(){Ext.app.deleteSubRecords();}
				},'-','-',
				'合并工程名称：',
				{
					xtype:"textfield",
					id:"mergeProjectName",
					width : 100,
			        value : ''
			    },
				{
					text:'保存',
					iconCls:'save',
					handler:function(){Ext.app.mergeProject();}
				}
	           ]  
	}); 
	
	var gridPanel_s = new Ext.grid.EditorGridPanel({
		id : 'subGrid',
		region : 'south',
		height:200,
		cm : cm_s,
		sm : sm_s,
		store : store_s,
		loadMask : true,
		tbar:tb_s,
		viewConfig : {
		     getRowClass : function(record,rowIndex,rowParams,store){
		          if(record.data.project_id == 'red_all'){
		               return 'x-grid-record-red-NEW';
		          }
	         }
		}
	});
	/**************************子表*********************************/
	
	/**************************主表start*********************************/
	var selectModel_p = new Ext.grid.RowSelectionModel({
		checkOnly : false,
		listeners : {
			 selectionchange : function() {
			 }
		}
	});
	var record_grid_p = Ext.data.Record.create([
	                           　			{name: '_id', type: 'Object'},
                    		{name: '_parent', type: 'Object'},
                    		{name: '_is_leaf', type: 'bool'},
	                           　			{name: 'ASS_ALL_NAME', type: 'String'},
	                           　			{name: 'ASS_TYP_PROJECT', type: 'String'},
	                           　			{name: 'COST_STATIC', type: 'String'},
	                           　			{name: 'COST_DYNAMIC', type: 'String'},
	                           　			{name: 'Y_SAVE_KWH', type: 'String'},
	                           　			{name: 'ASS_CST_INRATE', type: 'String'}
	                 ]);
	var store_p = new Ext.ux.maximgb.tg.AdjacencyListStore({
	     　 　reader: new Ext.data.JsonReader({id: '_id'}, record_grid_p),
	     　 　proxy: new Ext.data.HttpProxy({
	    	  url: 'pmv/comprehensiveAnalysisAction/queryDataFormMergeGridTableJson.do'
	     　　 })
	});
	// 加载数据前事件
	store_p.on('beforeload', function() {
		// 页面参数
		var proName_con = Ext.getCmp("proName_con").getValue();
		var returRate_down = Ext.getCmp("returRate_down").getValue();
		var returRate_up = Ext.getCmp("returRate_up").getValue();
		// 传递参数
		var _params;
		_params = {
			"proName_con" : proName_con,
			"returRate_down" : returRate_down,
			"returRate_up" : returRate_up
		}
		this.baseParams = _params;
	});
	var gridPanel_p = new Ext.ux.maximgb.tg.GridPanel({
			  id  : 'mainGrid',
			  region : 'center',
		      store: store_p,
		      height:500,
		      master_column_id : 'ASS_ALL_NAME',
		      columns:[{
                			header : '工程名称',
                			dataIndex : 'ASS_ALL_NAME',
                			id : 'ASS_ALL_NAME',
                			align : 'center',
                			width : 200
                		},
                	    {
                			header : '工程类别',
                			dataIndex : 'ASS_TYP_PROJECT',
                			align : 'center',
                			width : 100
                		},
                		{
                			header : '静态投资(万元)',
                			dataIndex : 'COST_STATIC',
                			align : 'center',
                			width : 100
                		},
                		{
                			header : '动态投资(万元)',
                			dataIndex : 'COST_DYNAMIC',
                			align : 'center',
                			width : 100
                		}, {
                			header : '节电量(万kWh)',
                			dataIndex : 'Y_SAVE_KWH',
                			align : 'center',
                			width : 100
                		}, {
                			header : '收益率(%)',
                			dataIndex : 'ASS_CST_INRATE',
                			align : 'center',
                			width : 100
                		}],
		      stripeRows: true,
		      sm : selectModel_p,
		      viewConfig : {
		      		enableRowBody : true
		      }
	});
	/**************************主表end*********************************/
	
	var toolBar = new Ext.Toolbar({  
	    items:['-','工程名称：',
	            {
	    			xtype:"textfield",
					id:"proName_con",
					width : 100,
			        value : ''
			    },'-',{
			    	xtype:"numberfield",
			    	width : 60,
					id:"returRate_down"
			    },'≤收益率≤',{
			    	xtype:"numberfield",
			    	width : 60,
					id:"returRate_up"
			    },'-',{
					text:'查询',
					iconCls:'query',
					handler:function(){}
				},'-',{
					text:'重置',
					iconCls:'undo',
					handler:function(){}
				},'-'
	           ]  
	}); 
	toolBar.insert(0,"<span style = 'color:red;width:"+(document.documentElement.offsetWidth-roghtChartWidth-483)+";'>"+'工程任务：'+task_name+"</span>");
	var mainPanel = new Ext.Panel({
		layout : "border",
		region : 'center',
		border : false,
		bodyBorder : false,
		tbar : toolBar,
		items:[
				new Ext.Panel({
					layout : "border",
					region : 'center',
					items  : [new Ext.TabPanel({
									id : 'data_tab',
						            activeTab:0,
						            frame:false,
						            region : 'center',
						            items:[{
							                      title:"全部",
							                      id : "data_all",
							                      html:"<iframe id='all' frameborder=0 src='pmv/webViews/remouldAuxiliaryPolicy/comprehensiveAnalysis/singleProPage.jsp' style='width:100%;height:100%;'></iframe>"
						            	   },{
							                      title:"更换导线",
							                      id : "data_line",
							                      html:"<iframe id='line' frameborder=0 src='pmv/webViews/remouldAuxiliaryPolicy/comprehensiveAnalysis/singleProPage.jsp' style='width:100%;height:100%;'></iframe>"
							               },{
							                      title:"更换变压器",
							                      id : "data_trans",
							                      html:"<iframe id='trans' frameborder=0 src='pmv/webViews/remouldAuxiliaryPolicy/comprehensiveAnalysis/singleProPage.jsp' style='width:100%;height:100%;'></iframe>"
							               },{
							                      title:"无功补偿",
							                      id : "data_compensation",
							                      html:"<iframe id='compensation' frameborder=0 src='pmv/webViews/remouldAuxiliaryPolicy/comprehensiveAnalysis/singleProPage.jsp' style='width:100%;height:100%;'></iframe>"
							               },{
							                      title:"合并工程",
							                      id : "data_merge",
							                      items:[gridPanel_p]
							               }],
							        listeners : {
							        	'tabchange' : function(tab,actTab) {
							        		var actId = actTab.getId();
							        		if(actId=='data_all'){
							        			document.getElementById('all').src = document.getElementById('all').src;
							        		}else if(actId=='data_line'){
							        			document.getElementById('line').src = document.getElementById('line').src;
							        		}else if(actId=='data_trans'){
							        			document.getElementById('trans').src = document.getElementById('trans').src;
							        		}else if(actId=='data_compensation'){
							        			document.getElementById('compensation').src = document.getElementById('compensation').src;
							        		}else if(actId=='data_merge'){
							        			store_p.load();
							        		}
							        	}
							        }
							  }),gridPanel_s]
				}),
				new Ext.Panel({
					region : 'east',
					width  : roghtChartWidth,
					html   : '12312'
				})
		]
	});
	
	/**
	 * 页面显示
	 */
	var viewport = new Ext.Viewport({
		layout : "border",
		items : [ mainPanel]
	});
		
});
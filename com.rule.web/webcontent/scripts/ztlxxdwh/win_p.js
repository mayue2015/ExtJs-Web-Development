Ext.onReady(function(){

	var chartdata=[];
	var editorchart='';

	(function(){
		Ext.Ajax.request({
			url:'rule/ztlxqEditorAction/cmdxxdtbseries.do',
			params:{
				'xxd_guid':guid,
				'test':'test',
				'type':'tb'
			},
			callback : function(options, success, response){
				if (response.status == 200) {
					var rsdata = Ext.util.JSON.decode(response.responseText);
					var data = rsdata.list;
					if(data.length==0)
						return false;
					chartdata=data;
					for(var i=0;i<data.length;i++){
						var cs = new Ext.data.JsonStore({
							fields : data[i].fields.split(","),
							data : data[i].data
						});
						var xf = data[0].fields.split(",")[0];
						var yf = data[0].fields.split(",")[1];
						var chart = new Ext.chart.LineChart({
							url : "rule/public/charts/charts.swf",
							store : cs,
							yField : yf,
							xField : xf
						});
						viewpanel.add({
							xtype:'panel',
							id:'panel'+data[i].id,
							width:300,
							height:200,
							tbar:[{
								text : '删除',
								tooltip : '删除',
								id:data[i].id,
								iconCls : 'remove',
								handler : function() {
									var id=this.id;
									deletechar(id);
								}
							},{
								text : '修改',
								tooltip : '修改',
								id:'tb'+data[i].id,
								iconCls : 'edit',
								hidden : true,
								handler : function() {
									var chart=Ext.getCmp('chart'+this.id.substring(2));
									editorchar(chart,this.id.substring(2));
								}
							}],
							items:[chart]
						});
					}
					viewpanel.doLayout();
				}
			}
		});

	})();
	
	/**
	 * 删除图表
	 */
	var deletechar=function(charid){
		if(charid==editorchart){
			editorchart='';
			change('delete');
		}
		Ext.Ajax.request({
			url:'rule/ztlxqEditorAction/cmddeletexxdtb.do',
			params:{
				'xxd_guid':guid,
				'tbid':charid
			},
			success:function(response){
				if (response.status == 200) {
					 viewpanel.remove(Ext.getCmp('panel'+charid));
					 viewpanel.doLayout();
				}
			}
		});
	}
	

	/**
	 * 选中图形编辑
	 * 把图形的相关信息添加到表格中
	 */
	var editorchar=function(chart,id){
		change('editor');
		series.store.removeAll();
		editorchart=id;

		 for(var i = 0; i < chart.series.length; i++){
			 series.insertNewLine(0, {
				 guid:i,
				 field : chart.series[i].yField,
				 color : chart.series[i].style.color,
				 explain : chart.series[i].displayName
			});
		 }
		 series.store.commitChanges();
		 var column='';
		 for(var i = 0; i < chart.fields.length; i++){
			 column+=chart.fields[i];
			 if(i!=chart.fields.length-1)
				 column+=","
		 }
		 Ext.getCmp('column').setValue(column);
		 for(var i = 0; i < chartdata.length; i++){
			 if(chartdata[i].id==id){
				 Ext.getCmp('sql').setValue(chartdata[i].sql);
			}
		 }
		 Ext.getCmp('XField').setValue(chart.xField);
		 Ext.getCmp('YField').setValue(chart.yField);
		 Ext.getCmp('XAxis').setValue(chart.xAxis.title);
		 Ext.getCmp('YAxis').setValue(chart.yAxis.title);
	}
	
//	Ext.override(Ext.ux.WidgetBaseGrid, {
//		callRemoveAction : function() {
//			/** 定义访问变量* */
//			var field = this;
//			/** 取得选中的记录* */
//			var record = this.getSelectionModel().getSelected();
//			/** 判断是否选中过数据 * */
//			if (record) {
//				Ext.MessageBox.confirm('系统消息', '你确认要删除这条数据吗？',
//				/** 回掉方法* */
//				function(btn) {
//					/** 判断按钮状态* */
//					if (btn == 'yes') {
//						/** guid* */
//						var permissionId = '';
//						/** rows* */
//						var rows = field.getSelectionModel()
//								.getSelections();
//						/** 迭代记录集* */
//						for ( var i = 0; i < rows.length; i++) {
//								field.getStore().remove(rows[i]);
//								rows[i].commit();
//						}
//						Ext.ux.Msg.info('系统消息', '数据删除成功！');
//					} else {
//						return;
//					}
//				});
//			} else {
//				Ext.ux.Msg.info('系统消息', '请先选择要删除的数据项！');
//			}
//		}
//	});
	
	/**
	 * 图形的配置表格
	 */
	var sqlform=new Ext.FormPanel({
		region:'north',
		border:true,
		height:150,
		split : true,
		title:'配置数据',
		autoScroll:true,
		frame:true,
		items:[{
			xtype:'textarea',
			id:'sql',
			//style:'font-size:20px;',
			fieldLabel:'配置SQL',
			allowBlank:false,
			anchor : "90%",
			height:50
		},{
			xtype:'textfield',
			id:'column',
			//style:'font-size:20px;',
			allowBlank:false,
			anchor : "90%",
			fieldLabel:'配置列名'
		}],
		tbar:[{
	    	  xtype:'button',
	    	  id:'addtb',
	    	  text:'添加图形',
	    	  iconCls : 'add',
	    	  handler:function(){
	    		  change('add');
	    		  editorchart='';
	    		  series.store.removeAll();
	    	  }
		       
	      	},{
				  text : '保存图形',
				  id:'save',
				  disabled:true,
				  tooltip : '保存图形',
				  iconCls : 'save',
				  handler : function() {
					 var isnew=(editorchart==''?'yes':'no');
					 var form=itemform.getForm();
					 var _sqlfrom=sqlform.getForm();
					 if(!form.isValid()|!_sqlfrom.isValid())
						 return false;
			         var tx='[{';
					 tx+='"xField":"'+Ext.getCmp('XField').getValue()+'",';
					 tx+='"yField":"'+Ext.getCmp('YField').getValue()+'",';
			         tx+='"XAxis":"'+Ext.getCmp('XAxis').getValue()+'",';
			         tx+='"YAxis":"'+Ext.getCmp('YAxis').getValue()+'",';
			         
			         tx+='"series":[';
			          // 取得集合
					 var vRecords = series.store.data.items;
						// 循环
					 for ( var row = 0; row < vRecords.length; row++) {
							var record = vRecords[row].data;
							var temps = 'field,color,explain'.split(",");
							tx+="{";
							for ( var j = 0; j < temps.length; j++) {
								tx+='"'+temps[j]+'":"'+record[temps[j]]+'"';
								if (j!=temps.length-1) {
									tx+=","
								}
							}
							tx+="}";
							if (row!=vRecords.length-1) {
								tx+=","
							}
							
					 }
			         tx+="]}]";
					 Ext.Ajax.request({
						 url:'rule/ztlxqEditorAction/cmdupdatexxdTbDataProxy.do',
						 params:{
							 'sql':Ext.get('sql').getValue(),
							 'field':Ext.get('column').getValue(),
							 'test':'test',
							 'tb_key':editorchart,
							 'tx':tx,
							 'isnew':isnew,
							 'xxd_guid':guid
						},
						success:function(response){
							if (response.status == 200) {
								var data = Ext.util.JSON.decode(response.responseText);
								var length=chartdata.length;
								chartdata[length]=data[0];
								if(data.length==0)
									return false;
								if(isnew=='no'){
									Ext.getCmp('chart'+editorchart).data=data[0];
									 Ext.getCmp('chart'+editorchart).refreshChart();
								 }
								else
								for(var i=0;i<data.length;i++){
									var cs = new Ext.data.JsonStore({
										fields : data[i].fields,
										data : data[i].root
									});
									var xf = data[0].propertiesValue[0];
									var yf = data[0].propertiesValue[1];
									var chart = new Ext.chart.LineChart({
										url : "rule/public/charts/charts.swf",
										store : cs,
										yField : yf,
										xField : xf
									});
									viewpanel.add({
										xtype:'panel',
										id:'panel'+data[i].id,
										width:300,
										height:200,
										tbar:[{
											text : '删除',
											tooltip : '删除',
											id:data[i].id,
											iconCls : 'remove',
											handler : function() {
												var id=this.id;
												deletechar(id);
											}
										},{
											text : '修改',
											tooltip : '修改',
											id:'tb'+data[i].id,
											iconCls : 'edit',
											hidden : true,
											handler : function() {
												var chart=Ext.getCmp('chart'+this.id.substring(2));
												editorchar(chart,this.id.substring(2));
											}
										}],
										items:[chart]
									});
								}
							}
							Ext.Msg.alert('系统提示','数据已保存');
							change('save');
							editorchart='';
							viewpanel.doLayout();
						}
					});
				  }
		      },{
		    	  xtype:'button',
		    	  iconCls : 'return',
		    	  id:'cancel',
		    	  disabled:true,
		    	  text:'撤销',
		    	  handler:function(){
		    		 change('cancel');
					 series.store.removeAll();
					 editorchart='';
		    	  }
		    }]
	});
	
	/**
	 * 图形中的线段颜色
	 */
	var colorstore=new Ext.data.SimpleStore({
		fields : ['value','text' ],
		data : [ [0x1eff18,'绿色'],[0x15428B,'蓝色'],[0xff2d3e,'红色'] ]
	});
	
	var store = new Ext.data.Store({
		url : "rule/ztlxqEditorAction/cmdDataProxy.do",
		reader : new Ext.data.JsonReader({
			root : "list",
			totalProperty : "size",
			fiedls : [{
				name : "guid"
			},{
				name : "field"
			},{
				name : "color"
			},{
				name : "explain"
			}]
		})
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly : false
	});
	
	var cm = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), sm ,{
			dataIndex : "guid",
			header : "guid",
			hidden :true
		},{
			dataIndex : "field",
			header : "对应列名"
		},{
			dataIndex : "color",
			header : "颜色"
		},{
			dataIndex : "explain",
			header : "说明"
		}]
	});
	
	var series = new Ext.grid.GridPanel({
		title:'图线配置',
		border:true,
		split : true,
		autoScroll:false,
		store : store,
		sm : sm,
		cm : cm,
		height : 150,
//		action : 'xxddataproxy.action',
//		command : 'cmdDataProxy',
//		properties : 'guid,field,color,explain',
//		propertiesName : 'guid,对应列名,颜色,说明',
		tbar:[{
	    	  xtype:'button',
	    	  id:'seriesadd',
	    	  iconCls : 'add',
	    	  text:'添加',
	    	  disabled:true,
	    	  handler:function(){/*
	    		  series.insertNewLine(0, {
	    			  guid:'new'
	    		  });
	    	  */}
	    },{
	    	  xtype:'button',
	    	  id:'seriesdelete',
	    	  iconCls : 'remove',
	    	  text:'删除',
	    	  disabled:true,
	    	  handler:function(){/*
	    		  series.callRemoveAction();
	    	  */}
	    },{
	    	  xtype:'button',
	    	  id:'seriessave',
	    	  iconCls : 'save',
	    	  disabled:true,
	    	  text:'保存',
	    	  disabled:true,
	    	  handler:function(){/*
	    		  series.store.commitChanges();
	    	  */}
	    }],
	    listeners : {
			'cellclick' : {
				fn : function(grid, rowIndex, columnIndex, e) {
					var _editCombo;
					var record = grid.getSelectionModel().getSelected();
					if(columnIndex==1){
						_editCombo = new Ext.grid.GridEditor(
							new Ext.form.TextField({
										value : record.get('field'),
										minHeight : 150,
										maxLength : 200
							}));
						setEditable(series,columnIndex, _editCombo);
					}else if(columnIndex==2){
						_editCombo = new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									width : 100,
									mode : 'local',
									store :colorstore,
									value:record.get('color'),
									displayField : 'text',
									triggerAction : 'all',
									valueField : 'value',
									editable : false
								}));
							setEditable(series,columnIndex, _editCombo);
					}else if(columnIndex==3){
						_editCombo = new Ext.grid.GridEditor(
								new Ext.form.TextField({
											value : record.get('explain'),
											minHeight : 150,
											maxLength : 200
								}));
							setEditable(series,columnIndex, _editCombo);
					}
				}
			}
	    }
	});
	
	var setEditable = function(grid,columnIndex, _editCombo) {
		grid.getColumnModel().setEditor(columnIndex, _editCombo);
		grid.getColumnModel().setRenderer(columnIndex,
	    		  function(value){
			         if( columnIndex==2){
			        	 var store_process=Ext.getCmp(''+_editCombo.field.id).getStore();
			        	 if(Ext.isEmpty(store_process))
			        		 store_process.reload();
			        	 var index = store_process.find(Ext.getCmp(''+_editCombo.field.id).valueField, value);
			             var record = store_process.getAt(index);
			             if(Ext.isEmpty(record))
			            	 return value;
			             else
	    		    	     return record.data.text;
			         }
			         return value;
	     });
	};
	
//	series.hideColumn(0);
	
	var itemform=new Ext.FormPanel({
		region:'center',
		title:'图形配置',
		border:true,
		autoScroll:false,
		layout:'accordion',
		height : 160,
		frame:true,
		items:[{
			xtype:'panel',
			split : true,
			autoScroll:true,
			title:'基本配置',
			layout:'column',
			defaults : {
				border : false,
				columnWidth : 0.5,
				layout : "form"
			},
			items:[{
				items : [{
					xtype:'textfield',
					id:'XField',
					fieldLabel:'x轴对应的列名',
					allowBlank:false
				},{
					xtype:'textfield',
					id:'YField',
					fieldLabel:'y轴对应的列名',
					allowBlank:false
				}]
			},{
				items : [{
					xtype:'textfield',
					id:'XAxis',
					fieldLabel:'x轴的说明'
				},{
					xtype:'textfield',
					id:'YAxis',
					fieldLabel:'y轴的说明'
				}]
			}]
		}]//,series
	});
	
	var properties=new Ext.Panel({//配置图行
		region:'center',
		autoScroll : true,
		items:[itemform]
	});

	var viewpanel = new Ext.Panel({
          id:'main-panel',
          region:'south',
          height : 200,
          autoScroll:true,
          split : true,
          baseCls:'x-plain',
          layout:'table',
          layoutConfig: {columns:2},
         defaults: {frame:true, width:200, height: 180}
    });
	
	/**
	 * 图形界面的功能变化函数
	 */
	var change=function(type){
		
		var form=itemform.getForm();
		var _sqlfrom=sqlform.getForm();
		if('add'==type){
		  form.reset();
		  _sqlfrom.reset();
		  Ext.getCmp('addtb').setDisabled(true);
  		  Ext.getCmp('save').setDisabled(false);
  		  Ext.getCmp('seriesadd').setDisabled(false);
		  Ext.getCmp('seriesdelete').setDisabled(false);
		  Ext.getCmp('seriessave').setDisabled(false);
  		  Ext.getCmp('cancel').setDisabled(false);
		}else if('save'==type||'cancel'==type||'delete'==type){
			  form.reset();
			  _sqlfrom.reset();
			  Ext.getCmp('addtb').setDisabled(false);
	  		  Ext.getCmp('save').setDisabled(true);
	  		  Ext.getCmp('seriesadd').setDisabled(true);
			  Ext.getCmp('seriesdelete').setDisabled(true);
			  Ext.getCmp('seriessave').setDisabled(true);
	  		  Ext.getCmp('cancel').setDisabled(true);
		}else if('editor'==type){
			  form.reset();
			  _sqlfrom.reset();
			  Ext.getCmp('addtb').setDisabled(true);
	  		  Ext.getCmp('save').setDisabled(false);
	  		  Ext.getCmp('seriesadd').setDisabled(false);
			  Ext.getCmp('seriesdelete').setDisabled(false);
	  		  Ext.getCmp('seriessave').setDisabled(false);
	  		  Ext.getCmp('cancel').setDisabled(false);
		}
	}
	
	series.getColumnModel().setRenderer(2,function(value){
		        var store_process=colorstore;
		        if(Ext.isEmpty(store_process))
		        		 store_process.reload();
		        var index = store_process.find('value', value);
		        var record = store_process.getAt(index);
		        if(Ext.isEmpty(record))
		           	 return value;
		        else
  		    	     return record.data.text;
   });
	
	new Ext.Viewport({
		layout : "fit",
		items:[{
			xtype:'panel',
			split : true,
			layout:'border',
			region:'center',
			autoScroll: true,
			items:[sqlform,properties,viewpanel]
		}]
	});
	
});
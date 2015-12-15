$import("pmv/scripts/systemSettings/energyEBenchmark/nxbgkQueryForm.js");
Ext.onReady(function() {
	var areaType = null;// 区域类型
	var queryGrid_sys_dept_code = null;// 单位单位
	var volt = null;// 电压等级
	
	var queryCm = new Ext.grid.ColumnModel([ {
		header : '单位编码',
		dataIndex : 'sys_dept_code',
		width : 85,
		hidden : true
	},{
		header : '单位名称',
		dataIndex : 'deptName',
		width : 85,
		hidden : true
	},{
		header : '指标库ID',
		dataIndex : 'datebase_id',
		width : 85,
		hidden : true
	},{
		header : '指标库名称',
		dataIndex : 'datebase_name',
		width : 85,
		hidden : true
	},{
		header : '指标类型',
		dataIndex : 'target_type',
		width : 85,
		hidden : true
	}, {
		header : '区域编码',
		dataIndex : 'area_type',
		width : 100,
		hidden : true
	}, {
		header : '区域类型',
		dataIndex : 'area_type_name',
		width : 80
	},{
		header : '电压等级CODE',
		dataIndex : 'vol_code',
		width : 85,
		hidden : true
	}, {
		header : '电压等级',
		dataIndex : 'vol_name',
		width : 80
	},{
		header : '线损最大值标示',
		dataIndex : 'tg_xs_max',
		width : 80,
		hidden : true
	}, {
		header : '线损率最大值',
		dataIndex : 'xs_max',
		width : 95,
		editor : new Ext.form.NumberField( {
			  editable : true,
			  decimalPrecision : 4,
			  maxValue : 9999.9999
	      })
	},{
		header : '线损最小值标示',
		dataIndex : 'tg_xs_min',
		width : 85,
		hidden : true
	}, {
		header : '线损率最小值',
		dataIndex : 'xs_min',
		width : 100,
  	  	editor : new Ext.form.NumberField( {
			  editable : true,
			  decimalPrecision : 4,
			  maxValue : 9999.9999
	      })
	},{
		header : '变压器最大值标示',
		dataIndex : 'tg_byq_max',
		width : 85,
		hidden : true
	},{
		header : '变压器损耗率最大值',
		dataIndex : 'byq_max',
		width : 125,
  	  	editor : new Ext.form.NumberField( {
			  editable : true,
			  decimalPrecision : 4,
			  maxValue : 9999.9999
	      })
	},{
		header : '变压器最小值标示',
		dataIndex : 'tg_byq_min',
		width : 85,
		hidden : true
	}, {
		header : '变压器损耗率最小值',
		dataIndex : 'byq_min',
		width : 130,
		editor : new Ext.form.NumberField( {
			  editable : true,
			  decimalPrecision : 4,
			  maxValue : 9999.9999
	      })
	},{
		header : '总损耗最小值标示',
		dataIndex : 'tg_sum_max',
		width : 85,
		hidden : true
	}, {
		header : '总损耗率最大值',
		dataIndex : 'sum_max',
		width : 100,
		editor : new Ext.form.NumberField( {
			  editable : true,
			  decimalPrecision : 4,
			  maxValue : 9999.9999
	      })
	},{
		header : '总损耗最小值标示',
		dataIndex : 'tg_sum_min',
		width : 80,
		hidden : true
	}, {
		header : '总损耗率最小值',
		dataIndex : 'sum_min',
		width : 100,
		editor : new Ext.form.NumberField( {
			  editable : true,
			  decimalPrecision : 4,
			  maxValue : 9999.9999,
			  value : 0
	      })
	} ]);
	
	var store = new Ext.data.Store({
		autoLoad : true,
		proxy : new Ext.data.HttpProxy({
			url : 'pmv/nxbgkAction/nxbgkMainNetGrid.do',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'grids'
		}, [{
			name : 'sys_dept_code'
		}, {
			name : 'deptName'
		}, {
			name : 'datebase_id'
		}, {
			name : 'datebase_name'
		}, {
			name : 'target_type'
		}, {
			name : 'area_type'
		}, {
			name : 'area_type_name'
		}, {
			name : 'vol_code'
		}, {
			name : 'vol_name'
		}, {
			name : 'tg_xs_max'
		}, {
			name : 'xs_max'
		}, {
			name : 'tg_xs_min'
		},, {
			name : 'xs_min'
		}, {
			name : 'tg_byq_max'
		}, {
			name : 'byq_max'
		}, {
			name : 'tg_byq_min'
		}, {
			name : 'byq_min'
		}, {
			name : 'tg_sum_max'
		}, {
			name : 'sum_max'
		}, {
			name : 'tg_sum_min'
		}, {
			name : 'sum_min'
		} ])
	});
	
	
	
	var queryGrid = new Ext.grid.EditorGridPanel({
		id : 'queryGrid',
		region:'center',
		store : store,
		collapsible : true,
		collapseMode : 'mini',
		cm : queryCm,
		clickToEdit : 1,
		height : 580,// 必须在JSP引入W3C文件，否则得出的高度为0
		tbar : [{
			id : 'queryGrid_query',
			text : '查询',
			tooltip : '查询设备信息',
			iconCls : 'query',
			handler : function(){
				areaType = Ext.getCmp('area_type').getValue();// 区域类型
				queryGrid_sys_dept_code = Ext.getCmp('queryGrid_sys_dept_code').getValue();// 单位标示
				volt = Ext.getCmp('volt').getValue();// 指标类型
				if(queryGrid_sys_dept_code == '' || queryGrid_sys_dept_code == null){
					Ext.MessageBox.alert('系统提示','请选择要查询的指标单位!');
					return;
				}
				if(queryTop.form.isValid()){
					store.load({
						params : {
							dept_id	 : 	queryGrid_sys_dept_code == ''?deptguid : queryGrid_sys_dept_code,
							areaType	 : 	areaType,							
							volt : volt							
						},
						callback : function(r,o,s){
							if(store.getCount() !=0){
								Ext.getCmp('btn_export').setDisabled(false);
							}
						}
					});
				} else {
					Ext.Msg.alert('系统信息', '请填写完成再查询!');
				}
				
			}
		},'-', {
			id : 'btn_',
			text : '标杆计算',
			tooltip : '标杆计算',
			iconCls : 'edit',
			handler : {
				
			}
		},'-', {
			id : 'btn_save',
			text : '保存',// 公共代码信息',
			tooltip : '保存设备信息',
			iconCls : 'save',
			handler : btn_save_function
		} , '-', {
			id : 'btn_import',
			text : '导入',
			tooltip : '导入设备数据',
			iconCls : 'llxs-import',
			handler : btn_import_function
		}, '-', {
			id : 'btn_export',
			text : '导出',
			tooltip : '导出设备信息',
			iconCls : 'llxs-export',
			handler : btn_export_function
		}, '-', {
			id : 'btn_apply',
			text : '应用',
			tooltip : '',
			iconCls : 'llxs-export',
			handler : {
				
			}
		},'->','单位：%' ],
		listeners: {
		}
	});
	 
	// 保存记录
	function btn_save_function() {
		var recs = store.getModifiedRecords();// 这条记录会保持到store至下次load之前
		var paraStr="";
		var len = recs.length;
		if(len > 0){
			for(var i = 0; i < len; i++){					
					paraStr += recs[i].data.sys_dept_code+","+
					recs[i].data.datebase_id+","+
					recs[i].data.target_type+","+
					recs[i].data.area_type+","+
					recs[i].data.vol_code+","+	
					recs[i].data.xs_max+","+
					recs[i].data.tg_xs_max+","+
					recs[i].data.xs_min+","+
					recs[i].data.tg_xs_min+","+
					recs[i].data.byq_max+","+
					recs[i].data.tg_byq_max+","+
					recs[i].data.byq_min+","+
					recs[i].data.tg_byq_min+","+
					recs[i].data.sum_max+","+
					recs[i].data.tg_sum_max+","+
					recs[i].data.sum_min+","+
					recs[i].data.tg_sum_min+","+"@"							
				}
			
			paraStr = paraStr.substring(0,paraStr.length - 1);				
			Ext.Ajax.request({
				 url : 'pmv/nxbgkAction/nxbgkDataSave.do',
				 method : 'post',
				 params : {
					 id : paraStr
				 },
			 success : function(response,options) {
				 var res = Ext.util.JSON.decode(response.responseText);
					var fh = res.success;
					if(fh == 'success'){
						Ext.MessageBox.alert('系统提示','保存成功!');
						queryGrid.store.reload();			
					}else{						
						Ext.Msg.alert('保存失败', '添加信息失败！');						
					}
			 }
			 });
		}else{
			alert('数据未发生改变，不需要保存!');
		}
	}

	function btn_import_function() {
	   var form1 = new Ext.form.FormPanel({
	     baseCls : 'x-plain',
	     labelWidth : 150,
	     fileUpload : true,
	     defaultType : 'textfield',
	     items : [{
	        xtype : 'textfield',
	        fieldLabel : '请选择要导入的文件',
	        name : 'userfile',
	        id : 'userfile',
	        inputType : 'file',
	        blankText : 'File can\'t not empty.',
	        anchor : '100%'
	     }]
	   });
       var win = new Ext.Window({
	         title : '导入',
	         width : 400,
	         height : 100,
	         minWidth : 300,
	         minHeight : 100,
	         layout : 'fit',
	         plain : true,
	         bodyStyle : 'padding:5px;',
	         buttonAlign : 'center',
	         items : form1,
	         buttons : [{
	                 text : '确定',
	                 handler : function() {
	                   if (form1.form.isValid()) {
	                        if(Ext.getCmp('userfile').getValue() == ''){
	                             Ext.Msg.alert('错误','请选择你要导入的文件');
	                             return;
	                          }
	                        form1.getForm().submit({
			                	url:'planning/excelAction/excelNxbgkImport.do',
			                	method : 'post',
			                	params : {},
			   					success:function(form, action){
			   					    win.close();
			   					    var res = action.result;
				   					if(res == undefined){
					   					alert("导入失败，请检查原因!");
					   					return;
				   					}
									var fh = res.info;
									if(fh == "excel"){
										alert('导入数据文件为空!');
										return;
									}else if(fh == "exist" || fh == 'vol'){
										var data = res.gridInfo;
										var param ={data: data};
										var jspWeb = '';
										if(fh == "exist"){
											jspWeb = 'nxbgkErrorImport.jsp';
										}else if(fh == 'vol'){
											jspWeb = 'nxbgkImport.jsp';
										}
										var windowParam = "dialogWidth:720px;dialogHeight:400px;toolbar=no;" +
												"menubar=no;scrollbars=no;resizable=no;location=no;status=no";
								    	var paraObj = window.showModalDialog("../../../scripts/nxbgk/"+jspWeb, param ,windowParam);
									}else if (fh=='success') {
										Ext.Msg.alert("系统提示", "导入数据成功！");
										return;
									}else if(fh == 'failure'){
										alert("导入失败，请检查原因!");
					   					 return;
									}
		   					    },
			   					failure : function(form, action){
					   				win.close();
			   						Ext.Msg.alert('系统提示','导入数据失败!');
			   					}
			   				});
	                       }else{
	                           Ext.Msg.alert("系统提示","请选择文件后再上传！");
	                       }
	                   		
	                   
	                  }
	             }, {
	                  text : '关闭',
	                  handler : function() {
	                       win.close();
	                  }
	             }]
	        });
	        win.show();
	 }
	
	function btn_export_function() {
		window.location.href = basePath+"planning/nxbgkAction/getNxbgkExport.do?dept_id="+queryGrid_sys_dept_code+
			"&datebase_name="+queryGrid_datebase_name+"&target_type="+queryGrid_target_type;
		store.load({
			params : {
				dept_id	 : 	queryGrid_sys_dept_code,
				datebase_name	 : 	queryGrid_datebase_name,							
				target_type	 : 	queryGrid_target_type							
			}
		});
	}
// var infoPanel = new Ext.Panel({
// id : 'cardPanel',
// split : true,
// border : false,
// region : 'north',
// collapseMode : 'mini',
// layout:'fit',
// autoScroll : false, //自动显示滚动条
// height : 55,
// items : [queryTop]
// });

Ext.getCmp('btn_export').setDisabled(true);　 
var viewPort = new Ext.Viewport({
	layout : 'border',
	items : [queryTop,queryGrid]
});

queryTop.doLayout();

});




/**
 * 断面选择 线路信息 查询条件 ITEM
 */
var areaCode = '';
var areaName = '';
var selConFormItems = [	
                       	{layout : "form", 
                       	 columnWidth : .3,
                         items:[{
									 fieldLabel:"<font color='red'>*</font>交换对象",
									 xtype:"combo",
									 name:"selcon_co",
								     id:"selcon_co",
								     store : new Ext.data.JsonStore({ 
									    	 	autoLoad : false,	
									    	 	url :'sysconfig/dmwhAction/queryAreaComBoxJson.do', 
									    	 	fields : ['code', 'name'],
									    	 	root : "root"
										 	}),
									 valueField : 'code',// 域的值,对应于store里的fields 
									 displayField : 'name',// 显示的域,对应于store里的fields 
									 mode : 'local', 
									 triggerAction: "all",
									 width:90
							    }]		
                       	},
					    {layout : "form",
                       	 columnWidth : .3,
                       	 items:[{	
							    	 fieldLabel:"<font color='red'>*</font>电压等级",
								     xtype:"combo",
								     name:"selcon_volt",
								     id:"selcon_volt",
								     store : new Ext.data.JsonStore({ 
										    	 autoLoad : false,	
										    	 url :'sysconfig/dmwhAction/queryDydjComBoxJson.do', 
										    	 fields : ['code', 'name'],
										    	 root : "root"
									    	 }),
									 valueField : 'code',// 域的值,对应于store里的fields 
									 displayField : 'name',// 显示的域,对应于store里的fields 
									 mode : 'local', 
									 triggerAction: "all",
									 width:90
		                       	}]	
					    },
					    {layout : "form",
	                     columnWidth : .3,	
	                     items:[{	
							    	fieldLabel:"线路名称",
							    	xtype:"textfield",
							    	name:"selcon_lineName",
							    	id:"selcon_lineName",
							    	width:90,
							    	value:''
			                    }]	
					    },
					    {layout : "form",
					     columnWidth: .1,	
					     items:[{	
							    	xtype:"button",
							    	text :"查询",
							    	iconCls : 'query',
							    	handler :Ext.app.selectLineSearchForButton,
							    	width:30
							    }]	
					    }
]


/**
 * 断面维护 线路选择GRID
 */
var selConGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			this.getTopToolbar().removeAll();
		},
		aftersave : function() {
			this.getStore().reload();
		}
	}

});

/**
 * 断面维护 线路选择条件查询框
 */
var selConForm = new Ext.form.FormPanel({
	region : 'north',
	frame : true,
	width: 600,
	height:35,
	labelAlign:'right',
	labelWidth: 65,
	border : false,
	layout : 'form',
	items:[{layout : 'column',items:selConFormItems}]
});

/**
 * 断面选择 线路信息
 */
var jhdxxzWin = new Ext.Window({
	id : 'jhdxxzWin',
	title : '交换参数维护',
	layout : 'border',
	width: 600,
	height : 335,
	closeAction : 'hide',
	plain : true,
	modal : true,
	resizable : false,
	items : [selConForm,selConGrid],
	fbar : [{
				text : '确定',
				width : 70,
				icon : 'planning/icons/accept.png',
				handler : function(){Ext.app.selectLineComit();jhdxxzWin.hide();}
			},{
				text : '取消',
				width : 70,
				icon : 'planning/icons/cancel_2.png',
				handler : function(){jhdxxzWin.hide();}
			}]
});

/**
 * 断面维护GRID
 */
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			for (var i = 9; i < 13; i++) {
				this.getTopToolbar().items.items[i].hide();
			};
			Ext.each(Ext.app.gridBtn, function(btn) {
				dataGrid.getTopToolbar().add(btn);
				dataGrid.getTopToolbar().add("-");
			});
			//设置默认值
			Ext.Ajax.request({
				url : 'sysconfig/dmwhAction/getUserProvinceArea.do',
				method : 'post',
				async : false,
				success : function(response, opts) {
					responseArray = Ext.util.JSON.decode(response.responseText)[0];
					areaCode = responseArray.code;
					areaName = responseArray.name;
					dataGrid.setDefaultValues({
						'AREA' : areaCode,
						'AREA_DSPVALUE' : areaName
					});
					//加载数据表格
					dataGrid.loadData(Ext.app.appID, Ext.app.clsID);
				},failure :function(response, opts) {
					return false;
				}
			});
		},
		aftersave : function() {
			this.getStore().reload();
		},
		cellclick : function cellclick(grid, rowIndex, columnIndex, e) {
			var colName = grid.getColumnModel().getDataIndex(columnIndex);
			if(colName=='OBJECT_EXCH'||colName=='LINEID'||colName=='LINENAME'||colName=='VOLTAGELEVEL'){
				var dmmc = grid.getStore().getAt(rowIndex).get('POWER_ON_SECTION_NAME');
				if(dmmc!=''&&dmmc!=undefined){
					//加载数据表格
					Ext.app.selectLineSearchForOpen();
					jhdxxzWin.show();
				}else {
					Ext.MessageBox.alert("系统提示","请先填写断面名称!");
					return false;
				}
			}
		}
	}

});

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [ dataGrid ]
});
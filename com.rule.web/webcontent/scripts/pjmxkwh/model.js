// 模型库维护APPID
Ext.appPjmxkwh.appID = "EA20F4FB-F74D-4700-BF01-E53477AE7EC3";
// 模型库维护CLSID
Ext.appPjmxkwh.clsID = "CF8826DD-AF19-4143-988F-08514DC0084F";
// 算法变量维护APPID
Ext.appSfblwh.appID = '7CDC0749-F40B-449D-95D5-B0EF4C9EA929';
// 算法变量维护CLSID
Ext.appSfblwh.clsID = '5634C323-E331-4CDA-BD0A-C6DE6A14A6AB';
// 算法变量维护CLSID(历史)
Ext.appSfblwh.clsID_ls = '4C084748-657C-42B5-9763-E5E11BB4CF00';
// 评价指标维护APPID
Ext.appPjzbwh.appID = "AD139883-F4AB-41F7-9C5A-D4CAC743363D";
// 评价指标维护clsID
Ext.appPjzbwh.clsID = "A230BBC1-57F1-47A5-B6EE-A05575AA971B";
// 状态量维护APPID
Ext.appZtlwh.appID = "F9DC333D-219A-4695-BB94-AEE069EE07FD";
// 状态量维护clsID
Ext.appZtlwh.clsID = "F04BD364-63A6-434C-A24C-26652E599B08";
// 评价对象维护APPID
Ext.appPjdxwh.appID = "27F30AE8-D1C7-4AE2-8A2B-430073139F3F";
// 评价对象维护clsID
Ext.appPjdxwh.clsID = "EAABE6D8-93FB-4C9F-9838-8B54E480658D";

// 当前选中模型树节点
Ext.appPjmxkwh.currentNode = null;

Ext.appPjmxkwh.dataSource = null;

// 模型表格按钮
Ext.appPjmxkwh.gridBtn = [ {
	text : "删除",
	iconCls : "remove",
	handler : function() {
		Ext.appPjmxkwh.mxwhRemoveClick();
	}
} ];

// 算法变量表格按钮
Ext.appSfblwh.gridBtn = [ {
	text : "删除",
	iconCls : "remove",
	handler : function() {
		Ext.appSfblwh.delClick();
	}
}, {
	text : "历史变量值",
	iconCls : 'doc_list',
	handler : function() {
		Ext.appSfblwh.viewHistory();
	}
} ];

/**
 * 算法定义 窗体面板：算法定义
 */
Ext.appPjdxwh.sfdyFormItems = [ {
	xtype : 'fieldset',
	title : '算法定义',
	layout : 'form',
	items : [ {
		layout : 'column',
		border : false,
		items : [ {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				text : '+',
				width : 20,
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '-',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '*',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '/',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .06,
			border : false,
			items : [ {
				xtype : 'button',
				width : 24,
				text : '&& ',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '||',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '!',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '>',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '< ',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '>=',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '<=',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '==',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '!=',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .075,
			border : false,
			items : [ {
				xtype : 'button',
				width : 30,
				text : 'ifels',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(Ext.appPjdxwh.sfdyInit());
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '()',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '[]',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '{}',
				handler : function() {
					Ext.appPjdxwh.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .13,
			border : false,
			items : [ {
				xtype : 'button',
				width : 40,
				text : '添加参数',
				handler : function() {
					var x = Ext.getCmp('sfdyWin').x + Ext.getCmp('sfdyWin').width;
					var y = Ext.getCmp('sfdyWin').y;
					Ext.getCmp('sfdyAddParamWin').setPosition(x,y)
					Ext.getCmp('sfdyAddParamWin').show();
				}
			} ]
		} ]
	}, {
		layout : 'column',
		border : false,
		items : [ {
			xtype : 'textarea',
			id : 'sfdy_sfdyArea',
			width : 450,
			height : 140
		} ]
	} ]
} ]

/**
 * 算法定义 窗体面板：算法描述
 */
Ext.appPjdxwh.sfdySfmsItems = [ {
	xtype : 'fieldset',
	title : '算法描述',
	items : [ {
		layout : 'column',
		border : false,
		items : [ {
			xtype : 'textarea',
			id : 'sfdy_sfms',
			width : 450,
			height : 80
		} ]
	} ]
} ]

/**
 * 算法定义 窗体面板：验证/确定/取消/初始化/清除 按钮
 */
Ext.appPjdxwh.sfdyButtons = [
		{
			text : '验证',
			width : 70,
			icon : 'rule/public/images/key_go.png',
			handler : function() {
				// 待处理
			}
		},
		{
			text : '确定',
			width : 70,
			icon : 'rule/public/images/save.gif',
			handler : function() {
				Ext.appPjdxwh.sfdyConfirm();
			}
		}, {
			text : '取消',
			width : 70,
			icon : 'rule/public/images/cancel_2.png',
			handler : function() {
				Ext.getCmp('sfdyWin').hide();
			}
		}, {
			text : '初始化',
			width : 70,
			icon : 'rule/public/images/wand.png',
			handler : function() {
				Ext.getCmp('sfdy_sfdyArea').setValue(Ext.appPjdxwh.sfdyInit());
				Ext.getCmp('sfdy_sfms').setValue('本算法是逻辑判断。测试！');
			}
		}, {
			text : '清除',
			width : 70,
			icon : 'rule/public/images/eraser.png',
			handler : function() {
				Ext.getCmp('sfdy_sfdyArea').setValue('');
				Ext.getCmp('sfdy_sfms').setValue('');
				Ext.appPjdxwh.DXSF = "";
				Ext.appPjdxwh.DXSFMS = "";
				Ext.appPjdxwh.ZTSF = "";
				Ext.appPjdxwh.ZTSFMS = "";
			}
		} 
]

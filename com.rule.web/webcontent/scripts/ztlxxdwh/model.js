// 状态量信息点维护：应用ID
Ext.app.appID = "1F1AFD21-1DCF-4FD3-89B6-AA9D404EFF54";
// 状态量信息点维护：类型ID
Ext.app.clsID = "3F5D967F-E65F-4C3D-A4E6-2D54E87C568C";

// 声明全局变量并初始化值为空
Ext.app.sfdyText = '';

/**
 * 算法定义 窗体面板：算法定义
 */
Ext.app.sfdyFormItems = [ {
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
					if(Ext.app.sfdyText == undefined ){
						Ext.app.sfdyText = '';
						Ext.app.sfdyText += this.text;
//						Ext.getCmp('sfdy_sfdyArea').setValue(Ext.app.sfdyText);
						Ext.app.sfdyInsert(this.text);
					}else{
						Ext.app.sfdyInsert(this.text);
					}
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .06,
			border : false,
			items : [ {
				xtype : 'button',
				width : 24,
				text : '&&&',
				handler : function() {
					Ext.app.sfdyInsert(this.text.substring(0, 2));
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
				}
			} ]
		}, {
			columnWidth : .05,
			border : false,
			items : [ {
				xtype : 'button',
				width : 20,
				text : '<<',
				handler : function() {
					Ext.app.sfdyInsert(this.text.substring(0, 1));
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(Ext.app.sfdyInit());
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
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
					Ext.app.sfdyInsert(this.text);
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
Ext.app.sfdySfmsItems = [ {
	xtype : 'fieldset',
	title : '算法描述',
	items : [ {
		layout : 'column',
		border : false,
		items : [ {
			xtype : 'textarea',
			id : 'sfdy_sfmsArea',
			width : 450,
			height : 80
		} ]
	} ]
} ]

/**
 * 算法定义 窗体面板：验证/确定/取消/初始化/清除 按钮
 */
Ext.app.sfdyButtons = [
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
				Ext.app.sfdyConfirm();
			}
		}, {
			text : '取消',
			width : 70,
			icon : 'rule/public/images/cancel_2.png',
			handler : function() {
				Ext.getCmp('sfdy_sfdyArea').reset();
				Ext.getCmp('sfdy_sfmsArea').reset();
				Ext.getCmp('sfdyWin').hide();
			}
		}, {
			text : '初始化',
			width : 70,
			icon : 'rule/public/images/wand.png',
			handler : function() {
				Ext.getCmp('sfdy_sfdyArea').setValue(Ext.app.sfdyInit());
				Ext.getCmp('sfdy_sfmsArea').setValue('本算法是逻辑判断。测试！');
			}
		}, {
			text : '清除',
			width : 70,
			icon : 'rule/public/images/eraser.png',
			handler : function() {
				Ext.getCmp('sfdy_sfdyArea').reset();
				Ext.getCmp('sfdy_sfmsArea').reset();
				Ext.app.clsf = "";
				Ext.app.sfms = "";
			}
		} 
]

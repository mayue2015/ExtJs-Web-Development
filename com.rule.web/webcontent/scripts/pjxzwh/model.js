Ext.app.mxkAppID = "9EFD0390-5059-4848-8C2D-2BCC59E202A6";//模型库
Ext.app.mxkClsID = "CF8826DD-AF19-4143-988F-08514DC0084F";
Ext.app.pjxzAppID = "0929DEAE-619F-412F-A67A-37C3E3B369CB";//评价细则
Ext.app.pjxzClsID = "D01245FB-2DE5-41D5-B76A-4939E9EB23C9";
Ext.app.pjfwAppID = "77C33759-BFB8-46F6-B882-D4ED19EF3F93";//评价范围
Ext.app.pjfwClsID = "A5A2360E-E3CF-4C6E-A579-FF18D2B3C755";
Ext.app.pjxzzbAppID = "EBE891CF-1A16-465E-830A-E8C5CF182B0C";//评价细则指标
Ext.app.pjxzzbClsID = "10045415-92BB-41AC-B500-840B6519BD49";
Ext.app.zbkAppID = "653E6B38-BFBB-4C03-812A-134D5D908D58";//指标库
Ext.app.zbkClsID = "A230BBC1-57F1-47A5-B6EE-A05575AA971B";
Ext.app.pjxzztlAppID = "D99A1947-E9AB-446D-A92B-AA0E2AD3107B";//评价细则状态量
Ext.app.pjxzztlClsID = "F9344360-07E4-4306-9105-078D8A681E63";
Ext.app.jcjygzAppID = "423F8568-51A7-48CB-B689-8BCDB8562164";//决策建议规则
Ext.app.jcjygzClsID = "F12D4EA0-3795-4A97-B9E0-4AC07E482CAC";
Ext.app.ztlkAppID = "08C2C39C-1721-471E-A7E3-9A68309B0B95";//状态量库
Ext.app.ztlkClsID = "F04BD364-63A6-434C-A24C-26652E599B08";
Ext.app.pfgzAppID = "89F04A4F-35DB-460D-815B-DFBF0199589F";//评分规则
Ext.app.pfgzClsID = "DC67FFB9-B0F2-4A7D-8BE3-70D1E14D2566";
Ext.app.sfdyText = '';
Ext.app.sfdyTitleText = '';
/**
 * 算法定义、算法描述表单
 */
Ext.app.sfdyFormItems = [ {
	xtype : 'fieldset',
	title : '算法定义',
	layout : 'form',
	items : [{
		layout : 'column',
		border : false,
		items : [{
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				text : '+',
				width : 20,
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '-',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '*',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '/',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .06,
			border : false,
			items : [{
				xtype : 'button',
				width : 24,
				text  : '&&&',
				handler : function() {
					Ext.app.sfdyInsert(this.text.substring(0, 2));
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '||',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '!',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '>',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '<<',
				handler : function() {
					Ext.app.sfdyInsert(this.text.substring(0, 1));
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '>=',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '<=',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '==',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '!=',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .075,
			border : false,
			items : [{
				xtype : 'button',
				width : 30,
				text  : 'ifels',
				handler : function() {
					Ext.app.sfdyInsert(Ext.app.sfdyInit());
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '()',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '[]',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .05,
			border : false,
			items : [{
				xtype : 'button',
				width : 20,
				text  : '{}',
				handler : function() {
					Ext.app.sfdyInsert(this.text);
				}
			}]
		}, {
			columnWidth : .13,
			border : false,
			items : [{
				xtype : 'button',
				width : 40,
				text  : '添加参数',
				handler : function() {
					var x = Ext.getCmp('sfdyWin').x + Ext.getCmp('sfdyWin').width;
					var y = Ext.getCmp('sfdyWin').y;
					Ext.getCmp('sfdyAddParamWin').setPosition(x,y)
					Ext.getCmp('sfdyAddParamWin').show();
				}
			}]
		}]
	},{
		layout : 'column',
		border : false,
		items : [{
			xtype : 'textarea',
			id : 'sfdy_sfdyArea',
			width : 450,
			height : 140
		}]
	}]
} ]

Ext.app.sfdySfmsItems = [ {
	xtype : 'fieldset',
	title : '算法描述',
	items : [ {
		layout : 'column',
		border : false,
		items : [{
			xtype : 'textarea',
			id : 'sfdy_sfms',
			width : 450,
			height : 80
		}]
	} ]
} ]

Ext.app.sfdyButtons = [ {
	text : '验证',
	width : 70,
	icon : 'rule/public/images/key_go.png',
	handler : function(){
		
	}
},{
	text : '确定',
	width : 70,
	icon : 'rule/public/images/save.gif',
	handler : function(){
		Ext.app.sfdyOk();
	}
},{
	text : '取消',
	width : 70,
	icon : 'rule/public/images/cancel_2.png',
	handler : function(){
		Ext.getCmp('sfdyWin').hide();
	}
},{
	text : '初始化',
	width : 70,
	icon : 'rule/public/images/wand.png',
	handler : function(){
		Ext.getCmp('sfdy_sfdyArea').setValue(Ext.app.sfdyInit());
		Ext.getCmp('sfdy_sfms').setValue('本算法是逻辑判断。测试！');
	}
},{
	text : '清除',
	width : 70,
	icon : 'rule/public/images/eraser.png',
	handler : function(){
		Ext.getCmp('sfdy_sfdyArea').setValue('');
		Ext.getCmp('sfdy_sfms').setValue('');
	}
}]

/**
 * 增加评价规则表单和工具条
 */
Ext.app.zjpjgzItems = [ {
	layout : 'form',
	labelWidth : 110,
	style : 'margin-top : 5px;',
	items : [ {
		layout : 'column',
		style : 'margin-top : 5px;',
		border : false,
		items : [ {
			columnWidth : .7,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textfield',
				id : 'zjpjgzForm_guid',
				hidden : true
			}, {
				xtype : 'textfield',
				id : 'zjpjgzForm_name',
				fieldLabel : '<span style="color:red"></span>规则名称',
				width : 340
			} ]
		}, {
			columnWidth : .3,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'checkbox',
				id : 'zjpjgzForm_draw',
				fieldLabel : '绘制图形',
				listeners : {
					'check' : function(){
						if(this.checked){
							Ext.getCmp('txzbdy').setDisabled(false);
							Ext.getCmp('gzqxdy').setDisabled(false);
						}else{
							Ext.getCmp('txzbdy').setDisabled(true);
							Ext.getCmp('gzqxdy').setDisabled(true);
						}
					}
				}
			} ]
		} ]
	}, {
		xtype : 'textarea',
		id : 'zjpjgzForm_discrb',
		fieldLabel : '<span style="color:red"></span>规则描述',
		width : 620,
		height : 50
	}, {
		xtype : 'textfield',
		id : 'zjpjgzForm_Fm',
		fieldLabel : '<span style="color:red"></span>规则公式',
		width : 620
	} ]
}, {
	xtype : 'fieldset',
	layout : 'form',
	title : '图形坐标定义',
	id: 'txzbdy',
	disabled : true,
	margins : '2 0 5 1',
	items : [ {
		layout : 'column',
		border : false,
		items : [ {
			columnWidth : .5,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textfield',
				id : 'zjpjgzForm_xCdtMax',
				fieldLabel : '<span style="color:red"></span>X坐标最大值',
				width : 250
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textfield',
				id : 'zjpjgzForm_xCdtMin',
				fieldLabel : '<span style="color:red"></span>X坐标最小值',
				width : 240
			} ]
		} ]
	}, {
		xtype : 'textfield',
		id : 'zjpjgzForm_xCdtFm',
		fieldLabel : '<span style="color:red"></span>X坐标公式',
		width : 620
	}, {
		xtype : 'textarea',
		id : 'zjpjgzForm_xCdtFmIns',
		fieldLabel : 'X坐标公式说明',
		width : 620,
		height : 50
	}, {
		xtype : 'textfield',
		id : 'zjpjgzForm_xCdtMark',
		fieldLabel : 'X坐标公式标注',
		width : 620
	}, {
		layout : 'column',
		border : false,
		items : [ {
			columnWidth : .5,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textfield',
				id : 'zjpjgzForm_yCdtMax',
				fieldLabel : '<span style="color:red"></span>Y坐标最大值',
				width : 250
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textfield',
				id : 'zjpjgzForm_yCdtMin',
				fieldLabel : '<span style="color:red"></span>Y坐标最小值',
				width : 240
			} ]
		} ]
	}, {
		xtype : 'textfield',
		id : 'zjpjgzForm_yCdtFm',
		fieldLabel : '<span style="color:red"></span>Y坐标公式',
		width : 620
	}, {
		xtype : 'textarea',
		id : 'zjpjgzForm_yCdtFmIns',
		fieldLabel : 'Y坐标公式说明',
		width : 620,
		height : 50
	}, {
		xtype : 'textfield',
		id : 'zjpjgzForm_yCdtMark',
		fieldLabel : 'Y坐标公式标注',
		width : 620
	} ]
}, {
	xtype : 'fieldset',
	layout : 'form',
	title : '规则曲线定义',
	id : 'gzqxdy',
	disabled : true,
	items : [ {
		xtype : 'textfield',
		id : 'zjpjgzForm_curName',
		fieldLabel : '<span style="color:red"></span>曲线名称',
		width : 620
	}, {
		xtype : 'textarea',
		id : 'zjpjgzForm_curIns',
		fieldLabel : '<span style="color:red"></span>曲线描述',
		width : 620,
		height : 50
	}, {
		layout : 'column',
		border : false,
		items : [ {
			columnWidth : .33,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'combo',
				id : 'zjpjgzForm_curType',
				fieldLabel : '<span style="color:red"></span>曲线类型',
				store : new Ext.data.ArrayStore({
					fields : ["value", "display"],
					data : [ ["", "直线"], ["", "矩形"], ["", "曲线"] ]
				}),
				editable : false,
				anchor : '90%',
				triggerAction: "all",
				displayField : "display",
				valueField : "value",
				mode : "local"
			}, {
				xtype : 'combo',
				id : 'zjpjgzForm_startCPX',
				fieldLabel : '开始坐标参量X',
				store : new Ext.data.ArrayStore({
					fields : ["value", "display"],
					data : []
				}),
				editable : false,
				anchor : '90%',
				triggerAction: "all",
				displayField : "display",
				valueField : "value",
				mode : "local"
			}, {
				xtype : 'combo',
				id : 'zjpjgzForm_startCPY',
				fieldLabel : '开始坐标参量Y',
				store : new Ext.data.ArrayStore({
					fields : ["value", "display"],
					data : []
				}),
				editable : false,
				anchor : '90%',
				triggerAction: "all",
				displayField : "display",
				valueField : "value",
				mode : "local"
			}, {
				xtype : 'combo',
				id : 'zjpjgzForm_endCPX',
				fieldLabel : '结束坐标参量X',
				store : new Ext.data.ArrayStore({
					fields : ["value", "display"],
					data : []
				}),
				editable : false,
				anchor : '90%',
				triggerAction: "all",
				displayField : "display",
				valueField : "value",
				mode : "local"
			}, {
				xtype : 'combo',
				id : 'zjpjgzForm_endCPY',
				fieldLabel : '结束坐标参量Y',
				store : new Ext.data.ArrayStore({
					fields : ["value", "display"],
					data : []
				}),
				editable : false,
				anchor : '90%',
				triggerAction: "all",
				displayField : "display",
				valueField : "value",
				mode : "local"
			} ]
		}, {
			columnWidth : .33,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'combo',
				id : 'zjpjgzForm_curLineType',
				fieldLabel : '<span style="color:red"></span>曲线线型',
				store : new Ext.data.ArrayStore({
					fields : ["value", "display"],
					data : [ ["", "实线"], ["", "虚线"] ]
				}),
				anchor : '90%',
				triggerAction: "all",
				displayField : "display",
				valueField : "value",
				mode : "local"
			}, {
				xtype : 'textfield',
				id : 'zjpjgzForm_startCX',
				fieldLabel : '<span style="color:red"></span>开始坐标X',
				anchor : '90%'
			}, {
				xtype : 'textfield',
				id : 'zjpjgzForm_startCY',
				fieldLabel : '<span style="color:red"></span>开始坐标Y',
				anchor : '90%'
			}, {
				xtype : 'textfield',
				id : 'zjpjgzForm_endCX',
				fieldLabel : '<span style="color:red"></span>开始坐标X',
				anchor : '90%'
			}, {
				xtype : 'textfield',
				id : 'zjpjgzForm_endCY',
				fieldLabel : '<span style="color:red"></span>开始坐标Y',
				anchor : '90%'
			} ]
		}, {
			columnWidth : .33,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textfield',
				id : 'zjpjgzForm_hide1',
				width : 0
			}, {
				xtype : 'checkbox',
				id : 'zjpjgzForm_ctStart',
				fieldLabel : '包含起点'
			}, {
				xtype : 'textfield',
				id : 'zjpjgzForm_hide2',
				width : 0
			}, {
				xtype : 'checkbox',
				id : 'zjpjgzForm_ctEnd',
				fieldLabel : '包含终点'
			}, {
				xtype : 'textfield',
				id : 'zjpjgzForm_hide3',
				width : 0
			} ]
		} ]
	}, {
		xtype : 'textfield',
		id : 'zjpjgzForm_curCdtIns',
		fieldLabel : '<span style="color:red"></span>曲线公式',
		width : 620
	} ]
} ]

Ext.app.zjpjgzTbar = [ {
	text : '保存',
	iconCls : 'save',
	handler : function() {
		Ext.app.zjpjgzSave();
		
	}
}, {
	text : '重置',
	icon : 'rule/public/images/eraser.png',
	handler : function() {
		Ext.getCmp('zjpjgzForm').form.reset();
	}
}, {
	text : '生成图形',
	iconCls : 'flow_graphic',
	handler : function() {
		var guid = Ext.getCmp('zjpjgzForm_guid').getValue();
		if(guid == undefined || guid == null || guid == ''){
			Ext.MessageBox.alert('系统提示','没有数据源，请刷新数据列表！');
			return;
		}
		var url = basePath + "rule/pjxzwhAction/cmdGenerateGraph.do?guid="+guid;
		var windowParam = "title:'生成图形';dialogwidth:550px;dialogHeight:320px;resizable:no";
		var paraObj = window.showModalDialog(
			url, '', windowParam);
	}
}]

//增加评价规则Json
 Ext.app.jsonBusReader = new Ext.data.JsonReader({
	successProperty:'success',
	root:'data'
	},[
		{name:'zjpjgzForm_guid',mapping:'zjpjgzForm_guid',type:'string'},
		{name:'zjpjgzForm_name',mapping:'zjpjgzForm_name',type:'string'},
		{name:'zjpjgzForm_draw',mapping:'zjpjgzForm_draw',type:'string'},
		{name:'zjpjgzForm_discrb',mapping:'zjpjgzForm_discrb',type:'string'},
		{name:'zjpjgzForm_Fm',mapping:'zjpjgzForm_Fm',type:'string'},
		{name:'zjpjgzForm_xCdtMax',mapping:'zjpjgzForm_xCdtMax',type:'string'},
		{name:'zjpjgzForm_xCdtMin',mapping:'zjpjgzForm_xCdtMin',type:'string'},
		{name:'zjpjgzForm_xCdtFm',mapping:'zjpjgzForm_xCdtFm',type:'string'},
		{name:'zjpjgzForm_xCdtFmIns',mapping:'zjpjgzForm_xCdtFmIns',type:'string'},
		{name:'zjpjgzForm_xCdtMark',mapping:'zjpjgzForm_xCdtMark',type:'string'},
												
		{name:'zjpjgzForm_yCdtMax',mapping:'zjpjgzForm_yCdtMax',type:'string'},
		{name:'zjpjgzForm_yCdtMin',mapping:'zjpjgzForm_yCdtMin',type:'string'},
		{name:'zjpjgzForm_yCdtFm',mapping:'zjpjgzForm_yCdtFm',type:'string'},
		{name:'zjpjgzForm_yCdtFmIns',mapping:'zjpjgzForm_yCdtFmIns',type:'string'},
		{name:'zjpjgzForm_yCdtMark',mapping:'zjpjgzForm_yCdtMark',type:'string'},
												
		{name:'zjpjgzForm_curName',mapping:'zjpjgzForm_curName',type:'string'},
		{name:'zjpjgzForm_curIns',mapping:'zjpjgzForm_curIns',type:'string'},
		{name:'zjpjgzForm_curType',mapping:'zjpjgzForm_curType',type:'string'},
		{name:'zjpjgzForm_startCPX',mapping:'zjpjgzForm_startCPX',type:'string'},
		{name:'zjpjgzForm_startCPY',mapping:'zjpjgzForm_startCPY',type:'string'},
		{name:'zjpjgzForm_endCPX',mapping:'zjpjgzForm_endCPX',type:'string'},
		{name:'zjpjgzForm_endCPY',mapping:'zjpjgzForm_endCPY',type:'string'},
		{name:'zjpjgzForm_curLineType',mapping:'zjpjgzForm_curLineType',type:'string'},
		{name:'zjpjgzForm_startCX',mapping:'zjpjgzForm_startCX',type:'string'},
		{name:'zjpjgzForm_startCY',mapping:'zjpjgzForm_startCY',type:'string'},
		{name:'zjpjgzForm_endCX',mapping:'zjpjgzForm_endCX',type:'string'},
		{name:'zjpjgzForm_endCY',mapping:'zjpjgzForm_endCY',type:'string'},
												
		{name:'zjpjgzForm_hide1',mapping:'zjpjgzForm_hide1',type:'string'},
		{name:'zjpjgzForm_hide2',mapping:'zjpjgzForm_hide2',type:'string'},
		{name:'zjpjgzForm_hide3',mapping:'zjpjgzForm_hide3',type:'string'},
		{name:'zjpjgzForm_ctStart',mapping:'zjpjgzForm_ctStart',type:'string'},
		{name:'zjpjgzForm_ctEnd',mapping:'zjpjgzForm_ctEnd',type:'string'},
		{name:'zjpjgzForm_curCdtIns',mapping:'zjpjgzForm_curCdtIns',type:'string'}

	]
);

//按模板新增表单
Ext.app.ambxzItems = [ {
	layout : 'column',
	style : 'margin-top:1px;margin-left:1px',
	items : [ {
		columnWidth : 1,
		layout : 'form',
		border : false,
		items : [{
			xtype : 'textfield',
			id : 'ambxz_name',
			fieldLabel : '细则名称',
			anthor : '99%'
		}]
	}],
	buttonAlign : 'center',
	buttons : [{
		text : '确定',
		width : 80,
		iconCls : 'save',
		handler : function(){
			Ext.app.ambxzOk();
		}
	}, {
		text : '取消',
		width : 80,
		icon : 'rule/public/images/cancel_2.png',
		handler : function(){
			Ext.getCmp('ambxzWin').hide();
		}
	}]
} ]


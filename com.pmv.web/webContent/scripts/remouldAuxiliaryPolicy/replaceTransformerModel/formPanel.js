/**
 * 更换配变型号-计算页面表单
 * */
Ext.app.formPanel = new Ext.form.FormPanel({
		id : 'formPanel',
		region : 'center',
		frame : true,
		height : document.documentElement.offsetHeight/3-400,
		labelAlign : 'right',
		border : false,
		items : [ {
			layout : 'column',
			defaults : {
				labelWidth : 90
			},
			items :[{
				html : '<font size=2 color=red>单位造价:</font>',
				columnWidth : .33,
				layout : 'column',
				items : [{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'h_ratedmva',
						anchor : '95%',
						name : 'h_ratedmva',
						disabled : true,
						fieldLabel : '额定容量'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
					    id : 'cost_building',
						anchor : '95%',
						name : 'cost_building',
						disabled : true,
						fieldLabel : '建筑工程费'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'cost_equipment',
						anchor : '95%',
						name : 'cost_equipment',
						disabled : true,
						fieldLabel : '设备购置费'
					} ]
				}]
			},{
				html : '&nbsp',
				columnWidth : .33,
				layout : 'column',
				items : [{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'cost_install',
						anchor : '95%',
						name : 'cost_install',
						disabled : true,
						fieldLabel : '安装工程费'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'cost_others',
						anchor : '95%',
						name : 'cost_others',
						disabled : true,
						fieldLabel : '其它费用'
					} ]
				}]
			},{
				html : '<div align="right"><font size=2>单位：kVA,万元/台</font></div>',
				columnWidth : .34,
				layout : 'column',
				items : [{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'cost_static',
						anchor : '95%',
						name : 'cost_static',
						disabled : true,
						fieldLabel : '静态投资'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'cost_dynamic',
						anchor : '95%',
						name : 'cost_dynamic',
						disabled : true,
						fieldLabel : '动态投资'
					} ]
				}]
			}]
		}]
	});
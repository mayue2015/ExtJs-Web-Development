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
						id : 'ratedkva',
						anchor : '95%',
						name : 'ratedkva',
						disabled : true,
						fieldLabel : '额定容量'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'costBuilding',
						anchor : '95%',
						name : 'costBuilding',
						disabled : true,
						fieldLabel : '建筑工程费'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'costEquipment',
						anchor : '95%',
						name : 'costEquipment',
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
						id : 'costInstall',
						anchor : '95%',
						name : 'costInstall',
						disabled : true,
						fieldLabel : '安装工程费'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'costOthers',
						anchor : '95%',
						name : 'costOthers',
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
						id : 'costStatic',
						anchor : '95%',
						name : 'costStatic',
						disabled : true,
						fieldLabel : '静态投资'
					} ]
				},{
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						id : 'costDynamic',
						anchor : '95%',
						name : 'costDynamic',
						disabled : true,
						fieldLabel : '动态投资'
					} ]
				}]
			}]
		}]
		          
	
	});
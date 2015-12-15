Ext.onReady(function(){

	var zbGroup = new Ext.form.CheckboxGroup({
		style : 'background-color : white',
		region:'center',
		id : 'zbGroup',
		xtype : 'checkboxgroup',
		fieldLabel : 'Single Column',
		itemCls : 'x-check-group-alt',
		columns : 2,
		items : [ {
			boxLabel : '全社会产值',
			name : 'gdp_current_prices'
		}, {
			boxLabel : '一产产值',
			name : 'prim_indu_gdp_cup'
		}, {
			boxLabel : '二产产值',
			name : 'sec_industry_gdp_cup'
		}, {
			boxLabel : '三产产值',
			name : 'ter_industry_gdp_cup'
		}, {
			boxLabel : '总人口',
			name : 'ye_total_regist_popu'
		}, {
			boxLabel : '非农业人口',
			name : 'city_ye_native_popu'
		}, {
			boxLabel : '农业人口',
			name : 'vill_ye_native_popu'
		} ],
		listeners : {
			afterrender : function(s) {
				s.setValue(nationalEconomyZB);
			}
		}
	})

	var toolbar = new Ext.Toolbar({
		autoWidth : true,
		autoShow : true,
		region : 'south',
		items : [ '->', {
			text : '取消',
			handler : function() {
				window.close();
			}
		}, '->', {
			text : '确定',
			handler : function() {
				forClose();
			}
		} ]
	});  

	/**
	 * 页面显示
	 * */
	var viewport = new Ext.Viewport({
		layout : "border",
		defaults : {
			border : false
		},
		items : [ zbGroup, toolbar ]
	});
	
	/**
	 * 关闭窗口
	 */
	function forClose() {
		var value = zbGroup.getValue();
		var name = zbGroup.getName();
		window.returnValue = {
			value : value,
			name : name
		};
		window.close();
	}
});

Ext.override(Ext.form.CheckboxGroup,{
    //设置选中value1,value2
    setValue : function(value) {
    	var i = 0;
		this.items.each(function(f) {
			if (value.indexOf(f.name) != -1) {
				f.setValue(true);
			} else {
				f.setValue(false);
			}
		});
	},   
    // 以value1,value2的形式拼接值
    getValue : function() {
		var re = '';
		this.items.each(function(f) {
			if (f.getValue() == true) {
				re += f.name + ",";
			} 
		});
		return re.substr(0,re.length - 1);
	},   
    // 以value1,value2的形式拼接名字
    getName : function() {
		var re = new Array();
		this.items.each(function(f) {
			if (f.getValue() == true) {
				re += f.boxLabel + ",";
			}
		});
		return re.substr(0,re.length - 1);
	}
});
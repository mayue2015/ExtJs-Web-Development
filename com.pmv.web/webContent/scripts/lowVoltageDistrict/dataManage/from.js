Ext.ns("Ext.app");

/**
 * FROM
 */
// 默认典型日变量
Ext.app.defaultDxr = "";
Ext.app.fromTbar = function(name) {

	// 请求设置典型日默认值
	var url = "pmv/basicDataAction/getDefaultDate.do";
	var util = new Bp.util.RequestUtils();
	var flag = Ext.decode(util.sendRequest(url,{}));
	if (flag.success) {
		Ext.app.defaultDxr = flag.value;
	}
	/**
	 * 典型日ComboBox
	 */
	var dxrInfoCombo = new Ext.form.ComboBox({
		xtype : 'combo',
		id : 'dxr',
		name : 'dxr',
		fieldLabel : '典型日',
		mode : 'local',
		store : new Ext.data.JsonStore({
			url : 'pmv/basicDataAction/getDateComoBox.do',
			fields : [ 'value', 'text' ],
			autoLoad : true
		}),
		displayField : 'text',
		valueField : 'value',
		value : Ext.app.defaultDxr,
		triggerAction : 'all',
		width : 100,
		editable : false,
		typeAhead : true
	});

	/**
	 * 设备名称TextField
	 */
	var sbmcInfoCombo = new Ext.form.TextField({
		xtype : 'textfield',
		id : 'sbmc',
		width : 100,
		name : 'sbmc',
		fieldLabel : '设备名称'
	});

	/**
	 * 上级设备TextField
	 */
	var sjsbInfoCombo = new Ext.form.TextField({
		xtype : 'textfield',
		id : 'sjsb',
		width : 100,
		name : 'sjsb'
	});

	/**
	 * 测量点数RadioGroup
	 */
	var cldsInfoCombo = new Ext.form.RadioGroup({
		id : 'clds',
		name : 'clds',
		items : [ {
			boxLabel : '24点',
			inputValue : '1',
			checked : true,
			name : 'vClds'
		}, {
			boxLabel : '96点',
			name : 'vClds',
			inputValue : '2'
		} ]
	});

	var toolbar = new Ext.Toolbar({
		id : 'mainPanelToolbar',
		items : [ 
		          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;典型日：',dxrInfoCombo,
		          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设备名称：',sbmcInfoCombo,
		          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+name+'',sjsbInfoCombo,
		          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;测量点数：']
	});
	toolbar.add("<div style = 'height:25px;'><input type='radio' name='pointNum' value='1' checked='checked' />24点 <input type='radio' name='pointNum' value='2' />96点 </div>");
	return toolbar;
}

/**
 * 主gird按钮
 */
Ext.app.mainGridTbar = function() {

	var toolbar = [{
		id : 'add',
		xtype : 'button',
		text : '增加',
		iconCls : 'add',
		handler : function() {
			Ext.app.create();
		}
	},'-',{
		text:'修改',
		iconCls:'edit',
		handler:function(){isCanModify=1;}
	},'-', {
		id : 'remove',
		xtype : 'button',
		text : '删除',
		iconCls : 'remove',
		handler : function() {
			Ext.app.deleteData();
		}
	}, '-', {
		id : 'mainSave',
		xtype : 'button',
		text : '保存',
		iconCls : 'save',
		handler : function() {
			Ext.app.saveData();
		}
	}, '-', {
		id : 'query',
		xtype : 'button',
		text : '查询',
		iconCls : 'query',
		handler : function() {
			Ext.app.search();
			Ext.app.viceGrid.store.removeAll();
		}
	}, '-', {
		id : 'reset',
		xtype : 'button',
		text : '撤销',
		iconCls : 'undo',
		handler : function() {
			Ext.getCmp('dxr').setValue(Ext.app.defaultDxr);//.reset();
			Ext.getCmp('sbmc').reset();
			Ext.getCmp('sjsb').reset();
			Ext.getCmp('clds').reset();
			Ext.app.search(); // 重置查询条件后，自动加载默认条件数据
		}
	}, '-' ]
	
	return toolbar;
}

Ext.apply(Ext.grid.EditorGridPanel.prototype, {
	// 增加EditorGridPanel的通用校验方法
	isVa : function(records) {
		var cm = this.cm || this.colModel;
		var f = true;
		var column = {};
		for (var i = 0; i < cm.columns.length; i++) {
			var dataIndex = cm.getDataIndex(i);
			column[dataIndex] = i;
		}
		for (var i = 0; i < records.length; i++) {
			var o = records[i].data;
			var rowindex = i;// 行id
			for ( var n in o) {
				var colindex = column[n];
				if (!!colindex && !!cm.columns[colindex].editor) {
					var flag = cm.columns[colindex].editor.validate();// 设值后校验
					f = f && flag;
					if (!flag) {
						Ext.get(this.getView().getCell(rowindex, colindex))
								.addClass('x-form-invalid');// 给不通过校验的具体空格增加错误css样式（Ext中form的样式）
					}
				} else {
					continue;
				}
			}
		}
		return f;
	}
})
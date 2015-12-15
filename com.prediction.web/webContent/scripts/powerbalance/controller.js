function createGridData() {
	if (Ext.getCmp('dydj')&&Ext.getCmp('qy')&&years!='') {
		newGrid();
	}else {
		setTimeout('createGridData()',100);
	}
}


/**
 * 创建GRID
 */
function newGrid() {
	var voltName = Ext.getCmp('dydj').getRawValue();
	var volt = Ext.getCmp('dydj').getValue();
	var qy = Ext.getCmp('qy').getValue();
	try {
		var Grid = Ext.getCmp('dataGrid');
		if (Grid) {
			Ext.getCmp('girdPanel').remove(Grid);
			Grid.destroy();
		}
	} catch (e) {
		alert(e.name + " " + e.message);
	}

	var column = [ {
		header : '项目',
		width : 170,
		align : "center",
		dataIndex : "caseName"
	} ];

	var dataCol;

	/**
	 * 动态注入数据
	 */
	var fieldsCodes = [ {
		name : "caseName",
		mapping : "0"
	} ];
	var sjArr = years.split(",");

	for (i = 0; i < sjArr.length; i++) {
		dataCol = {
			header : sjArr[i] + '年',
			width : 100,
			align : "center",
			dataIndex : sjArr[i].toString(),
			editor :new Ext.form.TextField({
				maxLength:18,
				masLengthText : '已超出最大值！'
			})
		};
		column.push(dataCol);
		fieldsCodes.push({
			name : sjArr[i].toString(),
			mapping : (i + 1).toString()
		});
	}

	/**
	 * 加载数据集
	 */
	var dataStore = new Ext.data.Store({
		autoLoad : false,
		url : "prediction/powerBalanceAction/loadGrid.do",
		method : 'post',
		reader : new Ext.data.JsonReader({
			root : 'list',
			fields : fieldsCodes
		})
	});

	/**
	 * 表格模型
	 */
	var dataGrid = new Ext.grid.EditorGridPanel({
		id : 'dataGrid',
		region : "center",
		width : width,
		height : dataGridHeight,
		border : false,
		bodyBorder : false,
		tbar : [ voltName + '电力平衡表', '->', '计量单位：MW、MVA' ],
		defaults : {
			autoScroll : true
		},
		sm : new Ext.grid.CheckboxSelectionModel(),
		store : dataStore,
		cm : new Ext.grid.ColumnModel({
			columns : column
		}),
		listeners : {
			'beforeedit' : function(e){
				var rowIndex = e.row;
				if ((rowIndex==1||rowIndex==2||rowIndex==3||rowIndex==4||rowIndex==5||rowIndex==7)&&e.column!=0&&e.column!=1) {
					return true;
				}else {
					return false;
				}
			},
			'afteredit' : function(e){
				var oldValue = e.originalValue;//原始值
				var newValue = e.value;//新值值
				var col = e.column;
				var row = e.row;
				if (newValue=='') {
					return true;
				}
				var ispass = validatorValue(newValue,row);
				if (!ispass) {
					e.record.set(e.field,oldValue);
				}else {
					if (row==1||row==2||row==3||row==4||row==5) {
						var v0 = parseFloat(dataStore.getAt(0).get(e.field)==null?0:dataStore.getAt(0).get(e.field))*10000;
						var v1 = parseFloat(dataStore.getAt(1).get(e.field)==null?0:dataStore.getAt(1).get(e.field))*10000;
						var v2 = parseFloat(dataStore.getAt(2).get(e.field)==null?0:dataStore.getAt(2).get(e.field))*10000;
						var v3 = parseFloat(dataStore.getAt(3).get(e.field)==null?0:dataStore.getAt(3).get(e.field))*10000;
						var v4 = parseFloat(dataStore.getAt(4).get(e.field)==null?0:dataStore.getAt(4).get(e.field))*10000;
						var v5 = parseFloat(dataStore.getAt(5).get(e.field)==null?0:dataStore.getAt(5).get(e.field))*10000;
						dataStore.getAt(6).set(e.field,(v0-v1-v2-v3-v4+v5)/10000);
					}
					if (row==7) {
						var vl = newValue.split('~');
						var max = parseFloat(vl[0]==null?0:vl[0])*10000;
						var min = parseFloat(vl[1]==null?0:vl[1])*10000;
						var load = parseFloat(dataStore.getAt(6).get(e.field)==null?0:dataStore.getAt(6).get(e.field))*10000;
						var loadMax = Math.round(load*max/10000);
						var loadMin = Math.round(load*min/10000);
						var nowMar = parseFloat(dataStore.getAt(10).get(e.field)==null?0:dataStore.getAt(10).get(e.field))*10000;
						dataStore.getAt(8).set(e.field,loadMax/10000);
						dataStore.getAt(9).set(e.field,loadMin/10000);
						dataStore.getAt(11).set(e.field,(loadMax-nowMar)/10000);
						dataStore.getAt(12).set(e.field,(loadMin-nowMar)/10000);
					}
				}
			}
		}
	});

	dataGrid.store.on('beforeload', function() {
		var _params = {
			years : years,
			volt : volt,
			qy : qy
		};
		this.baseParams = _params;
	});

	dataGrid.store.on('load', function() {
		waitForCreateGrid(dataGrid, years);
	});
	dataGrid.store.load();

	var pp = Ext.getCmp('girdPanel');
	if (pp) {
		pp.add(dataGrid);
		pp.doLayout();
	}
}

function waitForCreateGrid(dataGrid, years) {
	if (dataGrid && dataGrid.getStore()) {
		lineChars(dataGrid, years);// 图形展示
	} else {
		setTimeout('waitForCreateGrid()', 100);
	}
}

/**
 * 验证是否符合输入
 * @param value
 * @param rowIndex
 * @returns {Boolean}
 */
function validatorValue(value,rowIndex){
	if (rowIndex=='7') {
		var tipMsg = "参考容载比只能 上下限用~隔开(例：0.1~0.2)！";
		if (value.indexOf('~')==-1) {
			Ext.Msg.alert("提示信息",tipMsg);
			return false;
		}else {
			var valueList = value.split('~');
			if (valueList.length!=2) {
				Ext.Msg.alert("提示信息",tipMsg);
				return false;
			}else {
				var max = valueList[0];
				var min = valueList[1];
				validatorNumber(max,"最大值只能输入四位小数");
				validatorNumber(min,"最小值只能输入四位小数");
				if (max>min) {
					Ext.Msg.alert("提示信息","上限应该比下限小");
					return false;
				}
			}
		}
	}else {
		return validatorNumber(value,"只能输入四位小数");
	}
	return true;
}

function validatorNumber(value,tipmas){
	var reg = /^-?\d+(\.\d{1,4})?$/;
	if (!reg.test(value)) {
		Ext.Msg.alert("提示信息",tipmas);
		return false;
	}
	return true;
}

/**
 * 保存
 */
function saveData(){
	var cols = years.split(',').length;
	var row = 12;
	var store_save = Ext.getCmp('dataGrid').getStore();
	if (store_save.modified.slice(0).length==0) {
		Ext.Msg.alert("提示信息","数据未改动，不需要保存！",function(){});
		return false;
	}
	var saveStr = '';
	for (var i = 1; i < cols; i++) {
		var gridValue='';
		for (var j = 1; j < 13; j++) {
			var key = store_save.getAt(j).fields.keys[i+1];
			gridValue = gridValue+'@'+store_save.getAt(j).data[key];
		}
		saveStr = saveStr+','+gridValue.substring(1);
	}
	Ext.Ajax.request({
		url : 'prediction/powerBalanceAction/saveData.do',
		method : 'post',
		params : {gridValue:saveStr.substring(1),areaId:Ext.getCmp('qy').getValue(),volt:Ext.getCmp('dydj').getValue(),years:years},
		success : function(response, options) {
			var res = Ext.util.JSON.decode(response.responseText);
			if (res.success) {
				Ext.Msg.alert("提示信息","保存成功！",function(){store_save.load()});
				return false;
			}else {
				Ext.Msg.alert("提示信息","保存失败！");
				return false;
			}
		}
	});
}

/**
 * 初始化计算
 */
function resetCompute(){
	var store_save = Ext.getCmp('dataGrid').getStore();
	Ext.Ajax.request({
		url : 'prediction/powerBalanceAction/totalData.do',
		method : 'post',
		params : {areaId:Ext.getCmp('qy').getValue(),volt:Ext.getCmp('dydj').getValue(),years:years},
		success : function(response, options) {
			var res = Ext.util.JSON.decode(response.responseText);
			if (res.success == 'noCase') {
				Ext.Msg.alert("提示信息","请先设置推荐方案再进行初始化！");
				return false;
			}else if(res.success == true) {
				Ext.Msg.alert("提示信息","操作成功！",function(){store_save.load()});
				return false;
			}else {
				Ext.Msg.alert("提示信息","操作失败！");
				return false;
			}
		}
	});
}
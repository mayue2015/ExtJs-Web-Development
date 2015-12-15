/**
 * 移除平台按钮
 * 
 * @param {Ext.ux.BDGrid}
 */
Ext.app.addRemoveToolbar = function(grid) {
	var items = grid.getTopToolbar().items.items;
	for (var i = 8; i < 12; i++) {
		items[i].hide();
	}
};

/**
 * 设置默认值
 */
Ext.app.setDefaultValue = function() {
	dataGrid.setDefaultValues({
		'FSBLX' : Ext.app.id,
		'SBFL' : Ext.app.node.text,
		'SBLX_DSPVALUE' : Ext.app.id
	});
};

/**
 * 校验数据
 */
Ext.app.vialidate = function(data) {
	// 获取增加集合
	var addRecode = data.adddata;
	// 获取修改集合
	var editRecode = data.edtdata;
	var reg = new RegExp("^[0-9]*$");
	if (addRecode.length != 0) {
		return validate(addRecode, reg, 'add'); // 调用增加去重
	} else if (editRecode.length != 0) {
		return validate(editRecode, reg, 'edit');// 调用修改去重
	}
};

/**
 * 去重校验
 * 
 * @param value
 * @param reg
 * @returns
 */
validate = function(value, reg, type) {
	for (var i = 0; i < value.length; i++) {
		if (value[i].SBLXBM != undefined) {
			if (!reg.test(value[i].SBLXBM)) {
				Ext.Msg.alert('系统提示', '编码只能由数字组成！');
				return false;
			}
			if (value[i].SBLXBM == Ext.app.id) {
				Ext.Msg.alert('系统提示', '编码不能和父节点编码相同！');
				return false;
			}
		}
		// 检查输入项 中是否存在重复值
		for (var n = i + 1; n < value.length; n++) {
			var bm = validateBm(value[i].SBLXBM, value[n].SBLXBM);
			// 调用校验编码
			if (bm == false) {
				return bm;
			}
		}

		for (var n = i + 1; n < value.length; n++) {
			// 调用校验名称
			var mc = validateMc(value[i].SBLXMC, value[n].SBLXMC);
			if (mc == false) {
				return mc;
			}
		}
		// 检查缓存数据中是否有重复
		// 编码校验
		for (var j = 0; j < Ext.app.data.length; j++) {
			var fsblx = Ext.app.data[j].fsblx; // 父设备类型
			var sblxbm = Ext.app.data[j].sblxbm; // 设备类型编码
			var guid = Ext.app.data[j].guid;
			if (fsblx == Ext.app.id) {
				// 调用修改判断修改当前值为原值

				if (type == 'edit') {
					if (guid == value[i].GUID) {
						if (sblxmc == value[i].SBLXMC
								|| sblxbm == value[i].SBLXBM)
							return true;
					}
				}

				// 调用校验编码
				var bm = validateBm(value[i].SBLXBM, sblxbm);
				if (bm == false) {
					return bm;
				}
			}
		}
		// 名称校验
		for (var j = 0; j < Ext.app.data.length; j++) {
			var sblxmc = Ext.app.data[j].sblxmc; // 设备类型名称
			var fsblx = Ext.app.data[j].fsblx; // 父设备类型
			var guid = Ext.app.data[j].guid;
			if (fsblx == Ext.app.id) {

				// 调用修改判断修改当前值为原值
				if (type == 'edit') {
					if (guid == value[i].GUID) {
						if (sblxmc == value[i].SBLXMC
								|| sblxbm == value[i].SBLXBM)
							return true;
					}
				}
				// 调用校验名称
				var mc = validateMc(value[i].SBLXMC, sblxmc);
				if (mc == false) {
					return mc;
				}
			}
		}
	}
};

/**
 * 校验编码
 * 
 * @param a
 * @param b
 * @returns {Boolean}
 */
validateBm = function(a, b) {

	// 若两者 均为undefined 表示没有修改名称
	if (a == undefined && b == undefined) {
		return;
	}
	if (a == b) {
		Ext.Msg.alert('系统提示', '输入编码存在重复值请重新输入！');
		return false;
	}
}

/**
 * 校验名称
 * 
 * @param a
 * @param b
 * @returns {Boolean}
 */
validateMc = function(a, b) {
	if (a == undefined && b == undefined) {
		return;
	}
	if (a == b) {
		Ext.Msg.alert('系统提示', '输入名称存在重复值请重新输入！');
		return false;
	}
}

/**
 * 获取数据集合
 */
Ext.app.dataJson = function() {

	Ext.Ajax.request({
		url : 'sysconfig/sblxAction/getData.do',
		method : 'post',
		success : function(response, options) {
			var value = decodeURIComponent(response.responseText);
			Ext.app.data = eval('(' + value + ')');
		}
	});
};

Ext.app.addDataToCoach = function(data) {
	// 获取增加集合
	var addRecode = data.adddata;
	// 获取修改集合
	var editRecode = data.edtdata;
	if (addRecode.length != 0) {// 向缓存中添加数据
		for (var i = 0; i < addRecode.length; i++) {
			addDataJson(addRecode[i].GUID, addRecode[i].FSBLX,
					addRecode[i].SBLXBM, addRecode[i].SBLXMC);
		}
	} else if (editRecode.length != 0) {// 更改缓存中的对应数据
		for (var i = 0; i < editRecode.length; i++) {
			updateDataJson(editRecode[i].GUID, editRecode[i].SBLXBM,
					editRecode[i].SBLXMC);
		}
	}
};

// 添加缓存中对应数据
addDataJson = function(guid, fsblx, sblxbm, sblxmc) {

	var oneElement = {
		"guid" : guid,
		"fsblx" : fsblx,
		"sblxbm" : sblxbm,
		"sblxmc" : sblxmc
	};
	Ext.app.data.push(oneElement);
};

/**
 * 更改缓存中对应数据
 */
updateDataJson = function(guid, sblxbm, sblxmc) {
	// 赋值
	for (var i = 0; i < Ext.app.data.length; i++) {
		var guidId = Ext.app.data[i].guid;
		if (guidId == guid) {
			if (sblxbm != undefined) {
				Ext.app.data[i].sblxbm = sblxbm;
			} else if (sblxmc != undefined) {
				Ext.app.data[i].sblxmc = sblxmc;
			}
			break;
		}
	}
};

/**
 * 删除缓存中对应数据
 */
Ext.app.deleteDataJson = function(guid) {
	for (var i = 0; i < Ext.app.data.length; i++) {
		var guidId = Ext.app.data[i].guid;
		if (guidId == guid) {
			Ext.app.data.remove(Ext.app.data[i]);
			break;
		}
	}
};

/**
 * 刷新左侧树,自动展开到最后选择节点处
 */
Ext.app.refshTree = function(leftTree) {
	// 获得选中节点
	var node = leftTree.getSelectionModel().getSelectedNode();
	if (node == null) {
		leftTree.getRootNode().reload();
	} else {
		var id = node.id;
		var path = node.getPath("id");// 得到当前选中节点Path
		leftTree.getLoader().load(leftTree.getRootNode(), function() {
			leftTree.expandPath(path, "id", function(b, lastNode) {
				leftTree.getSelectionModel().select(lastNode);
			});
		}, this);
	}
};

/**
 * 左侧导航树
 */
Ext.app.leftTree = function(node) {

	Ext.app.node = node;
	// 设备类型编码
	Ext.app.id = node.attributes.attr.sblxbm;
	if (node.getDepth() < 3) {
		// 非三次以后点击树节点按钮有效
		Ext.app.dataGrid.getStore().on('load', function() {
			Ext.app.dataGrid.getTopToolbar().enable();
		});
	} else {
		// 三次后按钮失效
		Ext.app.dataGrid.getStore().on('load', function() {
			Ext.app.dataGrid.getTopToolbar().disable();
		});
	}
	var id = "'" + node.attributes.attr.sblxbm + "'";
	// 节点自动展开
	node.expand();
	// 默认值
	Ext.app.setDefaultValue();

	var sql = " FSBLX IN(" + id + ")";
	dataGrid.loadData(Ext.app.appID, Ext.app.clsID, '', '', sql);

};

Ext.app.serachInfo = function(grid) {
	var sblxbm = new Array();
	var util = new Bp.util.RequestUtils();
	var url = "sysconfig/sblxAction/searchInfo.do";
	var recode = grid.getSelectionModel().getSelections();
	Ext.each(recode, function(row) {
		sblxbm.push("'" + row.get('SBLXBM') + "'");
	});
	var result = util.sendRequest(url, {
		bm : sblxbm.join(',')
	});
	flag = Ext.decode(result).success;
	if (flag == true) {
		Ext.Msg.alert('系统提示', '所选删除数据存在下级节点，不能删除！');
		return false;
	}

};
/**
 * 新建
 */
Ext.app.create = function(grid) {
	if(Ext.app.nodeId == null || Ext.app.nodeId == undefined){
		Ext.Msg.alert('系统提示','请选择节电量项目类型！');
		return;
	}
	var url = basePath + "pmv/webViews/projecttype/window.jsp";
	
	var args = {
		nodeText :　Ext.app.nodeText,
		nodeId : Ext.app.nodeId,
		type : 'insert'
	};
	var width = 450;
	var height = 150;
	window.showModalDialog(url, args, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	// 重新加载表格数据
	grid.store.reload();
};

/**
 * 修改
 */
Ext.app.update = function(grid) {
	
	var record = grid.getSelectionModel().getSelections();
	if(record.length !=1){
		Ext.Msg.alert('系统提示','请选择一项记录进行修改！');
		return;
	};
	
	var url = basePath + "pmv/webViews/projecttype/window.jsp";
	var obj = {
		nodeText :　Ext.app.nodeText,
		nodeId : Ext.app.nodeId,
		record : record,
		type : 'update'
	};
	var width = 450;
	var height = 150;
	window.showModalDialog(url, obj, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	// 重新加载表格数据
	grid.store.reload();
};

/**
 * 删除
 */
Ext.app.deleteData = function(grid) {
	var record = grid.getSelectionModel().getSelections();
	
	if (record.length == 0) {
		Ext.Msg.alert('系统提示', '请至少选择一行数据!');
		return;
	};
	
	Ext.Msg.confirm("确认信息", "确定要删除所选内容？", function(button, text) {
		if (button == 'yes') {
			var guid = new Array();
			Ext.each(record, function(record) {
				guid.push("'" + record.get("guid") + "'");
			});
			
			Ext.Ajax.request({
				url : 'pmv/projectTypeAction/deleteData.do',
				params : {
					guid : guid.join(",")
				},
				async : false,// 非异步请求
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						// 删除成功后重新加载数据
						grid.getStore().reload();
						Ext.Msg.alert('系统提示', '删除成功！');
					} else {
						Ext.Msg.alert('系统提示', '操作失败！');
					}
				}
			});
		}
	});
};

/**
 * 保存
 */
Ext.app.save = function(form, window,type,record) {
	var winArgs = window.dialogArguments || '';
	// 不可编辑且置灰项需手动设置值
	if (!form.isValid()){
		Ext.Msg.alert('系统提示', '请完成必填项信息！');
		return;
	}
	var value =  getFieldValues(form);
	if(type == 'insert'){
		Ext.Ajax.request({
			url : 'pmv/projectTypeAction/saveData.do',
			method : 'post',
			params : {
				formValue : '[' + Ext.util.JSON.encode(value) + ']',
				nodeId : winArgs.nodeId
			},
			success : function(response, options) {
				var res = Ext.decode(response.responseText);
				if (res.success == 'exist') {
					Ext.Msg.alert('系统提示', '此项目类型名称已存在！');
				} else if(res.success) {
					Ext.Msg.alert('系统提示', '保存成功！', function() {
						window.close();
					});
				} else {
					Ext.Msg.alert('系统提示', '操作失败！');
				}
			}
		});
	}else{
		Ext.Ajax.request({
			url : 'pmv/projectTypeAction/updateData.do',
			method : 'post',
			params : {
				formValue : '[' + Ext.util.JSON.encode(value) + ']',
				guid : record[0].get("guid")
			},
			success : function(response, options) {
				var res = Ext.decode(response.responseText);
				if (res.success == 'exist') {
					Ext.Msg.alert('系统提示', '此项目类型名称已存在！');
				} else if(res.success) {
					Ext.Msg.alert('系统提示', '保存成功！', function() {
						window.close();
					});
				} else {
					Ext.Msg.alert('系统提示', '操作失败！');
				}
			}
		});
	}
};

function getFieldValues(form) {
    var o = {}, n, key, val;
    form.items.each(function(f) {
      n = f.getName();
      key = o[n];
      if (Ext.isDefined(f.hiddenField)) {
    	  val = f.hiddenField.value;
      } else {
          val = f.getValue();
      }
      if (Ext.isDefined(key)) {
        if (Ext.isArray(key)) {
          o[n].push(val);
        } else {
          o[n] = [key, val];
        }
      } else {
        o[n] = val;
      }
    });
	return o;
};

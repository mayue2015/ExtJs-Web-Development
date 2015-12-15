/**
 * 在表格工具条上添加增加按钮
 * 
 * @param {Ext.ux.BDGrid}
 *            表格对象
 */
Ext.app.addZjBtn = function(grid) {
	var addButton = new Ext.Button({
		text : "增加",
		iconCls : "add",
		tooltip : '增加',
		listeners : {
			click : function() {
				if(leftTree){
					var selNode = leftTree.getSelectionModel().selNode;
					if(selNode){
						new Ext.app.EditWindow({
							title : "电缆通道维护",
							width : 600,
							height : 300,
							winArgs : {
								appID : grid.appID,
								clsID : grid.clsID,
								type : "new",
								grid : grid
							}
						}).show();
						return false;
					}else {
						Ext.MessageBox.alert("系统提示", "请先选择左侧单位树!");
					}
				}
			}
		}
	});
	grid.getTopToolbar().add("-");
	grid.getTopToolbar().add(addButton);
	grid.getTopToolbar().add("-");
}

/**
 * 在表格工具条上添加修改按钮
 * 
 * @param {Ext.ux.BDGrid}
 *            表格对象
 */
Ext.app.addXgBtn = function(grid) {
	var modifyButton = new Ext.Button({
		text : '修改',
		iconCls : 'edit',
		tooltip : '修改',
		listeners : {
			click : function() {
				var row = grid.getSelectionModel().getSelections();
				if (row.length == 0) {
					Ext.MessageBox.alert("系统提示", "请选择一条数据!");
					return;
				} else if (row.length > 1) {
					Ext.MessageBox.alert("系统提示", "只能选择一条数据进行修改!");
					return;
				}
				new Ext.app.EditWindow({
					title : "电缆通道维护",
					width : 600,
					height : 300,
					winArgs : {
						appID : grid.appID,
						clsID : grid.clsID,
						objID : row[0].get("GUID"),
						type : "update",
						grid : grid
					}
				}).show();
				return false;
			}
		}
	});
	grid.getTopToolbar().add(modifyButton);
	grid.getTopToolbar().add('-');
}

/**
 * 在表格工具条上添加删除按钮
 * 
 * @param {Ext.ux.BDGrid}
 *            表格对象
 */
Ext.app.addRemoveBtn = function(grid) {
	var deleteButton = new Ext.Button({
		iconCls : 'remove',
		text : '删除',
		tooltip : '删除',
		listeners : {
			click : function() {
				var record = grid.getSelectionModel().getSelections();
				Ext.app.record = record;
				if (record.length == 0) {
					Ext.Msg.alert("系统提示", "请至少选择一条数据!");
					return;
				}
				Ext.Msg.confirm("系统确认", "确实要删除所选的 " + record.length + " 条数据吗？", function(button, text) {
					if (button == 'yes') {
						var guid = "";
						var objRowId = [];
						// 清空数组
						grid.businessDTO.remove = [];
						for (var i = 0; i < record.length; i++) {
							grid.businessDTO.remove.push(record[i].data);
							guid += "'";
							guid += record[i].get('GUID');
							guid += "'";
							guid += ",";
							objRowId.push(record[i].id);
						}
						guid = guid.substring(0, guid.length - 1);
						
						// 删除前事件
						var args = {
							count : record.length,
							objids : guid
						};
						
						if (grid.fireEvent("beforedelete", grid, args) !== false) {
							// 保存、更新结果集
							Ext.Ajax.request({
								url : 'rule/dltdwhAction/dltdwhDel.do',
								params : {
									guid : guid
								},
								async : false,
								success : function(response,options) {
									// 删除执行之后解决页码报错问题:
									// 此处需要处理分页的逻辑，如果本页的所有数据都删除了且不是第一页的
									// 话需要将页码设置到上一页,如果后续调用了表格加载操作也不会导致错误
									if (grid.store.lastOptions.params) {
										var start = grid.store.lastOptions.params.start; //起始行数
										var limit = grid.store.lastOptions.params.limit; //每页行数
										if (limit != 0) {
											var rowCount = grid.store.getCount(); //当前数据条数
											// 删除数据条数与当前数据条数一致，处理条数
											if (Ext.app.record.length == rowCount && start != 0) {
												grid.store.lastOptions.params.start = start - limit;
												grid.store.baseParams.start = start - limit;
												grid.store.baseParams.pageNo = grid.store.baseParams.pageNo - 1;
												grid.store.lastOptions.params.pageNo = grid.store.lastOptions.params.pageNo - 1;
											}
										}
									}
									
									// 先清理一遍内存的数据
									var md = grid.store.getModifiedRecords();
									for (var i = 0; i < objRowId.length; i++) {
										var record = grid.store.getById(objRowId[i]);
										if (md.contains(record)) {
											md.removeAt(md.indexOf(record));
										}
										grid.store.remove(record);
									}
									
									// 弹出提示对话框
									Ext.Msg.alert("系统消息", "删除记录成功!", function(btn) {
										if(btn == 'yes'){
											// 强制执行afterdelete事件
											grid.fireEvent('afterdelete',grid, args);
										}
										// 删除后重新加载表格数据
										grid.store.reload();
									});
								},
								failure : function(form, action) {
									// 弹出错误对话框
									Ext.Msg.alert(form.statusText + " " + form.status,"系统出现未知错误，请与管理员联系!",function() {
										// 强制执行afterdelete事件
										grid.fireEvent('afterdelete',grid, args);
									});
									// 删除后重新加载表格数据
									grid.store.reload();
								}
							});	
						}
					}
				});
			}
		}
	});
	grid.getTopToolbar().add(deleteButton);
	grid.getTopToolbar().add('-');
}

/**
 * 导航树节点点击事件
 * 
 * @param node
 *            树节点
 */
Ext.app.dltdwhTreeClick = function(node){
	if(node.id){
		Ext.app.nodeId = node.id;
		Ext.app.node = node;
		//单击节点 子节点自动展开
		Ext.app.node.expand();
		
		if (node.getDepth() == 1) {
			dataGrid.getTopToolbar().items.items[0].disable();
			dataGrid.getTopToolbar().items.items[2].disable();
			dataGrid.loadData(Ext.app.appID,  Ext.app.clsID); 
		}else {
			dataGrid.getTopToolbar().items.items[0].enable();
			dataGrid.getTopToolbar().items.items[2].enable();
			dataGrid.loadData(Ext.app.appID,  Ext.app.clsID,'','',"GXDW IN (SELECT DEPT_ID FROM US_SYS.TB_SYS_DEPARTMENT START WITH DEPT_ID = '"+ node.id +"' CONNECT BY PRIOR DEPT_ID = SUPER_DEPT)"); 
		}
	}
};

Ext.app.saveDetail = Ext.emptyFn
Ext.app.returnMain = Ext.emptyFn

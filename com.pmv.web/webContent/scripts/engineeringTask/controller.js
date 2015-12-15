/**
 * 在表格工具条上添加查询条件和查询按钮
 * 
 * @param {Ext.ux.BDGrid}
 *            表格对象
 */
Ext.app.addSearchBtn = function(grid) {
	var addButton = new Ext.Button({
		text : "查询",
		iconCls : "search",
		tooltip : '查询',
		listeners : {
			click : function() {
				Ext.app.searchGrid();
			}
		}
	});
	grid.getTopToolbar().add('任务名称：');
	grid.getTopToolbar().add({xtype:'textfield',width:100,id:'taskName',name:"taskName"});
	grid.getTopToolbar().add(addButton);
	grid.getTopToolbar().add("-");
}

/**
 * 在表格工具条上添加增加按钮
 * 
 * @param {Ext.ux.BDGrid}
 *            表格对象
 */
Ext.app.addAddBtn = function(grid) {
	var addButton = new Ext.Button({
		text : "增加",
		iconCls : "add",
		tooltip : '增加',
		listeners : {
			click : function() {
				new Ext.app.EditWindow({
					title : "新增任务",
					width : 400,
					height : 245,
					winArgs : {
						appID : grid.appID,
						clsID : grid.clsID,
						type : "new",
						grid : grid
					}
				}).show();
			}
		}
	});
	grid.getTopToolbar().add(addButton);
	grid.getTopToolbar().add("-");
}

/**
 * 在表格工具条上添加修改按钮
 * 
 * @param {Ext.ux.BDGrid}
 *            表格对象
 */
Ext.app.addModifyBtn = function(grid) {
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
					title : "修改任务",
					width : 400,
					height : 245,
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
Ext.app.addDelBtn = function(grid) {
	var delButton = new Ext.Button({
		text : "删除",
		iconCls : "remove",
		tooltip : '删除',
	    disabled : true,//开发暂时屏蔽删除功能！！
		listeners : {
			click : function (){
				var row = grid.getSelectionModel().getSelections();
				if(row.length > 0){
					var guids = '';
					var versionIds = '';
					for(var i = 0;i < row.length; i++){
						if(taskId == row[i].get('GUID')){
							Ext.Msg.alert('系统提示','不能删除当前已打开任务，请关闭所有当前任务的页面并切换任务再进行删除！')
							return;
						}
						guids += row[i].get('GUID') + ",";
						versionIds += row[i].get('VERSIONID') + ",";
					}
					
					Ext.MessageBox.confirm('确认信息','该操作将删除任务中所有业务数据且无法恢复，确定删除吗？',function(btn,text){
						if(btn == 'yes'){
							Ext.Ajax.request({
								url:'pmv/engineeringTaskAction/delTask.do',
								params:{
									guids : guids.substring(0,guids.length-1),
									versionIds : versionIds.substring(0,versionIds.length-1)
								},
								async : false,
								success : function(response){
									var data = Ext.util.JSON.decode(response.responseText);
									if(data.seccess){
										Ext.Msg.alert('系统提示','删除成功！')
									} else {
										Ext.Msg.alert('系统提示','删除失败！')
									}
									grid.store.reload();
								},
								failure : function(){
									Ext.Msg.alert('系统提示','请求失败！')
								}
							});
						}
					});
				} else {
					Ext.Msg.alert('系统提示','请选择要删除的任务！');
				}
			}
		}
	});
	grid.getTopToolbar().add(delButton);
}

/**
 * 查询-加载数据
 * 
 * @param {Ext.ux.BDGrid}
 *            表格对象
 */
Ext.app.searchGrid = function(){
	var taskName = '';
	if(Ext.getCmp('taskName')){
		taskName = Ext.getCmp('taskName').getValue();
	}
	var sql = '';
	if(taskName != '' && taskName != undefined){
		sql = " TASK_NAME LIKE '%"+taskName+"%'";
	}
	dataGrid.loadData(Ext.app.appID, Ext.app.clsID,null,null,sql);
}

Ext.app.saveDetail = Ext.emptyFn;
Ext.app.returnMain = Ext.emptyFn;
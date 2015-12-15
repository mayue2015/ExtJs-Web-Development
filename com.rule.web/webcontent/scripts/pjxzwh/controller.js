/**
 * 增加指标
 */ 
Ext.app.addPjModBtn = function(grid) {
	var addPjModButton = new Ext.Button({
		id : 'addPjModButton',
		text : '增加指标',
		iconCls : 'add',
		listeners : {
			click : function() {
				var length = pjmxGrid.getStore().data.length;
				var ids = '';
				for(var i=0; i<length; i++){
					ids += "'" + pjmxGrid.getStore().getAt(i).get('ZB_ID') + "',";
				}
				if(ids != ''){
					ids = ids.substring(0, ids.length-1);
				}else {
					ids = "'zb'";
				}
				zjzbGrid.loadData(Ext.app.zbkAppID, Ext.app.zbkClsID,'','',
					" SSPJMX_ID = '"+ Ext.app.node.parentNode.id+"' AND GUID NOT IN ("+ ids+")" +
					" AND ZBMC IS NOT NULL  ");
				Ext.getCmp('zjzbWin').show();
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(addPjModButton);
}

/**
 *  确定
 */
Ext.app.okPjModBtn = function(grid) {
	var okPjModButton = new Ext.Button({
		text : '确定',
		iconCls : 'save',
		listeners : {
			click : function() {
				var record = grid.getSelectionModel().getSelections();
				if (record.length == 0) {
					Ext.Msg.alert("系统提示", "您还未选择数据!");
					return;
				}
				var guid = "";
				for (var i = 0; i < record.length; i++) {
					guid += "'";
					guid += record[i].get('GUID');
					guid += "'";
					guid += ",";
				}
				guid = guid.substring(0, guid.length - 1);
				var action = 'zjzb';//评价指标
				var ssxzId = Ext.app.node.id;//所属细则id
				var clsId = Ext.app.pjxzzbClsID;//类id
				var sszbId = '';//所属指标id
				var ssfzId = '';//所属分组id
				if(Ext.app.node.getDepth() == 4){
					action = 'zjztl';//评价细则状态量
					clsId = Ext.app.pjxzztlClsID;
					ssxzId = Ext.app.node.id.split('@')[1];
					sszbId = Ext.app.node.id.split('@')[2];
				} else if(Ext.app.node.getDepth() >= 5){
					action = 'zjztl';//评价细则状态量
					clsId = Ext.app.pjxzztlClsID;
					ssxzId = Ext.app.node.id.split('@')[1];
					sszbId = Ext.app.node.id.split('@')[0];
					ssfzId = Ext.app.node.id.split('@')[2];
				}
				Ext.Ajax.request({
					url : 'rule/pjxzwhAction/'+action+'Method.do',
					params : {
						guids : guid,
						ssxzId : ssxzId,
						clsId : clsId,
						sszbId : sszbId,
						ssfzId : ssfzId
					},
					success : function() {
						//增加完刷新树和表格
						Ext.app.node.reload();
						if(Ext.app.node.getDepth() == 3){
							Ext.getCmp('zjzbWin').hide();
							pjmxGrid.loadData(Ext.app.pjxzzbAppID, Ext.app.pjxzzbClsID,'','',
									" SSXZ_ID = '"+ Ext.app.node.id+"'");
						} else if(Ext.app.node.getDepth() == 4){
							Ext.getCmp('zjztlWin').hide();
							pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,'','',
									" SSZB_ID = '"+ Ext.app.node.id.split('@')[2]+"' AND SSXZ_ID = '"+ 
									Ext.app.node.id.split('@')[1] + "' AND SSFZ_ID is null");
						} else if(Ext.app.node.getDepth() >= 5){
							Ext.getCmp('zjztlWin').hide();
							if(Ext.app.node.getDepth() >= 6){
								if(Ext.app.node.id.split('@')[3] != '1601002') {
									pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,
											'',''," GUID = ''");
									return;
								}
							}
							pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,'','',
								" SSFZ_ID = '"+ Ext.app.node.id.split('@')[2]+
								"' AND SSZB_ID = '"+ Ext.app.node.id.split('@')[0] + "' AND SSXZ_ID = '"+
								Ext.app.node.id.split('@')[1] + "'");
						}
					}
				});
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(okPjModButton);
}

/**
 * 增加指标 弹窗 取消按钮
 */
Ext.app.cancelPjModBtn = function(grid) {
	var cancelPjModButton = new Ext.Button({
		text : '取消',
		icon : 'rule/public/images/cancel_2.png',
		listeners : {
			click : function() {
				Ext.getCmp('zjzbWin').hide();
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(cancelPjModButton);
	grid.getTopToolbar().add('-');
}

/**
 * 增加状态量 状态量列表弹窗 取消按钮
 */
Ext.app.cancelZtlListBtn = function(grid) {
	var cancelZtlListButton = new Ext.Button({
		text : '取消',
		icon : 'rule/public/images/cancel_2.png',
		listeners : {
			click : function() {
				Ext.getCmp('zjztlWin').hide();
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(cancelZtlListButton);
	grid.getTopToolbar().add('-');
}

/**
 *  删除
 */
Ext.app.deleteBtn = function(grid) {
	var savePjModButton = new Ext.Button({
		text : '删除',
		iconCls : 'remove',
		listeners : {
			click : function() {
				var rows = pjmxGrid.getSelectionModel().getSelections();
				if (rows.length < 1) {
					Ext.Msg.alert('系统提示', '请选择要删除的数据！');
					return;
				};
				Ext.MessageBox.confirm('系统确认', '您确认要删除这些数据吗？', function(btn) {
					if (btn == "yes") {
						var guid = "";
						var ss_guid = "";
						var row_id = "";
						var depth = Ext.app.node.getDepth();
						var ssxzId = Ext.app.node.id;//所属细则id
						var sszbId = '';//所属指标id
						var ssfzId = "''";//所属分组id
						if(depth == '2'){
							row_id = 'GUID';
						} else if(depth == '3'){
							ssxzId = Ext.app.node.id;
							row_id = 'ZB_ID';
						} else if(depth == '4'){
							ssxzId = Ext.app.node.id.split('@')[1];
							sszbId = Ext.app.node.id.split('@')[0];
							row_id = 'ZTL_ID';
						}
						for (var i = 0; i < rows.length; i++) {
							guid += "'";
							guid += rows[i].get('GUID');
							guid += "'";
							guid += ",";
						}
						guid = guid.substring(0, guid.length - 1);
						for (var i = 0; i < rows.length; i++) {
							ss_guid += "'";
							ss_guid += rows[i].get(row_id);
							ss_guid += "'";
							ss_guid += ",";
						}
						ss_guid = ss_guid.substring(0, ss_guid.length - 1);
						
						Ext.Ajax.request({
							url : 'rule/pjxzwhAction/deleteMethod.do',
							params : {
								guid : guid,
								ss_guid : ss_guid,
								depth : Ext.app.node.getDepth(),
								ssxzId : ssxzId,
								sszbId : sszbId,
								ssfzId : ssfzId
							},
							success : function(response,options) {
								var res = Ext.util.JSON.decode(response.responseText);
								var flag = res.success;
								if(flag == 'success'){
									Ext.Msg.alert('系统提示','删除成功!');
									Ext.app.refreshTreeData();
								} else {
									Ext.Msg.alert('系统提示','该数据有下级节点，不能删除!');
								}
							}
						})
					}
				});
				
			}
		}
	});
	grid.getTopToolbar().add(savePjModButton);
}

/**
 * 导出
 */
Ext.app.exportBtn = function(grid,type) {
	var exportButton = new Ext.Button({
		text : '导出',
		iconCls : 'excel',
		listeners : {
			click : function() {
				var cursor = pjmxGrid.getBottomToolbar().cursor;
				var pageSize = pjmxGrid.getBottomToolbar().pageSize;
				var activePage = Math.ceil((cursor + pageSize) / pageSize);

				window.location.href = basePath
						+ "rule/pjxzwhAction/pjxzwhExpt.do?nodeId="
						+ Ext.app.node.id + "&activePage=" + activePage
						+ "&pageSize=" + pageSize + "&depth="
						+ Ext.app.node.getDepth()+"&type="
						+ type+"&pjfwGuid="
						+ Ext.app.pjfwGuid+"&jcjyGuid="
						+ Ext.app.jcjygzObjID
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(exportButton);
}

/**
 * 设置应用范围
 */
Ext.app.appRangeBtn = function(grid) {
	var appRangeButton = new Ext.Button({
		id : 'appRangeButton',
		text : '设置应用范围',
		iconCls : 'edit',
		listeners : {
			click : function() {
				var rows = grid.getSelectionModel().getSelections();
				if (rows.length != 1) {
					Ext.Msg.alert('系统提示', '请选择一条数据！');
					return;
				}
				Ext.getCmp('editAppRangeWin').show();
				Ext.getCmp('editAppGrid').setDefaultValues({
					"SSXZ_ID" : rows[0].get('GUID'),
					"SSXZ_ID_DSPVALUE" : rows[0].get('XZMC')
				});
				//将选择的记录guid设置为全局变量
				Ext.app.pjfwGuid=rows[0].get('GUID');
				Ext.getCmp('editAppGrid').loadData(Ext.app.pjfwAppID, Ext.app.pjfwClsID,
						'',''," SSXZ_ID = '"+ rows[0].get('GUID')+"'");
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(appRangeButton);
}

/**
 * 决策建议规则维护
 */
Ext.app.decisionBtn = function(grid) {
	var decisionButton = new Ext.Button({
		id : 'decisionButton',
		text : '决策建议规则维护',
		iconCls : 'edit',
		listeners : {
			click : function() {
				var rows = grid.getSelectionModel().getSelections();
				if (rows.length != 1) {
					Ext.Msg.alert('系统提示', '请选择一条数据！');
					return;
				}
				new Ext.util.GridColumnLinkRenderer({
					grid : jcjygzGrid,
					dataIndex : "JHJXSJGZ",
					displayRenderer : function(v, m, r, ri, ci, s) {
						var d = '';
						if (Ext.util.isNull(v)) {
							d = "算法定义";
						} else {
							d = "查看算法";
						}
						return d;
					},
					onClick : function(record) {
						Ext.app.clsf = 'JHJXSJGZ';
						Ext.getCmp('sfdyWin').on('show',function(t){
					    	 Ext.getCmp('sfdyCenterPanel').setTitle('计算对象： ' + '计划检修时间'); //计算对象标题 模型-细则名称
					    });
						var rows = jcjygzGrid.getSelectionModel().getSelections();
						Ext.getCmp('sfdy_sfdyArea').setValue(rows[0].get('JHJXSJGZ'));
						Ext.app.sfdyText = rows[0].get('JHJXSJGZ');
						Ext.getCmp('sfdyWin').show();
					}
				}).render();
				Ext.app.jcjygzObjID = rows[0].get('GUID');
				Ext.getCmp('jcjygzWin').show();
				Ext.getCmp('jcjygzGrid').setDefaultValues({
					"PJXZID" : rows[0].get('GUID'),
					"PJXZID_DSPVALUE" : rows[0].get('XZMC')
				});
				Ext.getCmp('jcjygzGrid').loadData(Ext.app.jcjygzAppID, Ext.app.jcjygzClsID,
						'',''," PJXZID = '"+ Ext.app.jcjygzObjID+"'");
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(decisionButton);
}

/**
 * 按模板新建
 */
Ext.app.addByModBtn = function(grid) {
	var addByModButton = new Ext.Button({
		id : 'addByModButton',
		text : '按模板新建',
		iconCls : 'add',
		listeners : {
			click : function() {
				var rows = grid.getSelectionModel().getSelections();
				if (rows.length != 1) {
					Ext.Msg.alert('系统提示', '请选择一条数据！');
					return;
				}
				Ext.getCmp('ambxzForm').form.reset();
				Ext.getCmp('ambxzWin').show();
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(addByModButton);
}

/**
 * 增加评价规则
 */
Ext.app.evaluateRuleBtn = function(grid) {
	var evaluateRuleButton = new Ext.Button({
		id : 'evaluateRuleButton',
		text : '增加评价规则',
		iconCls : 'add',
		listeners : {
			click : function() {
				var rows = grid.getSelectionModel().getSelections();
				if (rows.length != 1) {
					Ext.Msg.alert('系统提示', '请选择一条数据！');
					return;
				}
				Ext.getCmp('zjpjgzForm').form.reset();
				Ext.getCmp('zjpjgzForm').form.load({
					url : 'rule/pjxzwhAction/zjpjgzInit.do?ztlId='+
						rows[0].get('ZTL_ID')+'&ssxzId='+
						Ext.app.node.id.split('@')[1],
					method:'post',
					failure : function(form, action) {//失败回掉方法
						
					},
					success : function(form, action) {//成功回掉方法
						var res = action.result;
						var flag = res.data.zjpjgzForm_draw.trim() == "T";
						Ext.getCmp('zjpjgzForm_draw').setValue(flag);
					}
				});
				
				Ext.getCmp('addEvRuleWin').show();
				Ext.getCmp('txzbdy').setDisabled(true);
				Ext.getCmp('gzqxdy').setDisabled(true);
				
				var root = zjpjgzTree.root;
				root.setId(Ext.app.node.id);
				root.setText(Ext.app.node.text);
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(evaluateRuleButton);
	grid.getTopToolbar().add('-');
}

/**
 * 增加状态量
 */ 
Ext.app.addZtlBtn = function(grid) {
	var addZtlButton = new Ext.Button({
		id : 'addZtlButton',
		text : '增加状态量',
		iconCls : 'add',
		listeners : {
			click : function() {
				var length = pjmxGrid.getStore().data.length;
				var ids = '';
				for(var i=0; i<length; i++){
					ids += "'" + pjmxGrid.getStore().getAt(i).get('ZTL_ID') + "',";
				}
				if(ids != ''){
					ids = ids.substring(0, ids.length-1);
				}else {
					ids = "'ztl'";
				}
				zjztlGrid.loadData(Ext.app.ztlkAppID, Ext.app.ztlkClsID,'','',
					" SSPJMX_ID = '"+ Ext.app.node.attributes.attr.SSPJMX_ID +
					"' AND GUID NOT IN ("+ ids+")");
				Ext.getCmp('zjztlWin').show();
			}
		}
	});
	grid.getTopToolbar().add('-');
	grid.getTopToolbar().add(addZtlButton);
}

/**
 * 隐藏发送,流程图按钮
 */
Ext.app.hideSdFlBtn = function(grid) {
	for ( var i = 8; i <= 11; i++) {
		grid.getTopToolbar().items.items[i].hide();
	}
}

/**
 * 根据树深度 隐藏/显示相应按钮
 */
Ext.app.hideSecTreeBtn = function(depth,grid) {
	grid.getTopToolbar().items.items[0].hide();
	grid.getTopToolbar().items.items[1].hide();
	grid.getTopToolbar().items.items[4].hide();
	grid.getTopToolbar().items.items[5].hide();
	grid.getTopToolbar().items.items[6].hide();
	grid.getTopToolbar().items.items[7].hide();
	Ext.getCmp('appRangeButton').hide();//设置应用范围
	Ext.getCmp('decisionButton').hide();////决策建议规则维护
	Ext.getCmp('addByModButton').hide();//按模型增加
	Ext.getCmp('addZtlButton').hide();//增加状态量
	Ext.getCmp('addPjModButton').hide();//增加指标
	Ext.getCmp('evaluateRuleButton').hide();//增加评价规则

	//隐藏工具条添加 所添加的  | 分隔符
	grid.getTopToolbar().items.items[16].hide();
	grid.getTopToolbar().items.items[18].hide();
	grid.getTopToolbar().items.items[20].hide();
	grid.getTopToolbar().items.items[22].hide();
	grid.getTopToolbar().items.items[24].hide();
	grid.getTopToolbar().items.items[26].hide();
	
	if(depth == 2){
		grid.getTopToolbar().items.items[0].show();
		grid.getTopToolbar().items.items[1].show();
		grid.getTopToolbar().items.items[6].show();
		grid.getTopToolbar().items.items[7].show();
		grid.getTopToolbar().items.items[16].show();
		grid.getTopToolbar().items.items[18].show();
		grid.getTopToolbar().items.items[20].show();
	
		Ext.getCmp('appRangeButton').show();
		Ext.getCmp('decisionButton').show();
		Ext.getCmp('addByModButton').show();
	} else if(depth == 3){
		
		grid.getTopToolbar().items.items[22].show();
		Ext.getCmp('addPjModButton').show();
	} else if(depth == 4){
		
		grid.getTopToolbar().items.items[24].show();
		Ext.getCmp('addZtlButton').show();
	} else if(depth >= 5){
		
		grid.getTopToolbar().items.items[24].show();
		grid.getTopToolbar().items.items[26].show();
		Ext.getCmp('addZtlButton').show();
		Ext.getCmp('evaluateRuleButton').show();
	}
}

/**
 * 模型树点击
 */
Ext.app.pjxzTreeClick = function(node) {
	Ext.app.node = node;
	Ext.app.sfdyTitleText = node.text;
	Ext.app.hideSdFlBtn(pjmxGrid);
	Ext.app.hideSecTreeBtn(node.getDepth(),pjmxGrid);
	Ext.app.node.expand();
	var nodeListAttr = node.attributes.attr;//node节点所带属性值
	if(node.getDepth() == 2){
		new Ext.util.GridColumnLinkRenderer({
			grid : pjmxGrid,
			dataIndex : "CLSF",
			displayRenderer : function(v, m, r, ri, ci, s) {
				var d = '';
				if (Ext.util.isNull(v)) {
					d = "算法定义";
				} else {
					d = "查看算法";
				}
				return d;
			},
			onClick : function(record) {
				Ext.app.clsf = 'CLSF';
				
			    var clsf_xzmc = record.get("XZMC"); //评价模型-算法定义/查看算法-计算的对象Title
			    Ext.getCmp('sfdyWin').on('show',function(t){
			    	 Ext.getCmp('sfdyCenterPanel').setTitle('计算对象： ' + clsf_xzmc); //计算对象标题 细则-处理算法-细则名称
			    });
			    	
				var rows = pjmxGrid.getSelectionModel().getSelections();
				Ext.getCmp('sfdy_sfdyArea').setValue(rows[0].get('CLSF'));
				Ext.app.sfdyText = rows[0].get('CLSF');
				Ext.getCmp('sfdyWin').show();
			}
		}).render();
		new Ext.util.GridColumnLinkRenderer({
			grid : pjmxGrid,
			dataIndex : "DXSF",
			displayRenderer : function(v, m, r, ri, ci, s) {
				var d = '';
				if (Ext.util.isNull(v)) {
					d = "算法定义";
				} else {
					d = "查看算法";
				}
				return d;
			},
			onClick : function(record) {
				Ext.app.clsf = 'DXSF';
				
				var dxsf_xzmc = record.get("XZMC");
				Ext.getCmp('sfdyWin').on('show',function(t){
			    	 Ext.getCmp('sfdyCenterPanel').setTitle('计算对象： ' + dxsf_xzmc); //计算对象标题 细则-状态算法-细则名称
			    });
				
				var rows = pjmxGrid.getSelectionModel().getSelections();
				Ext.getCmp('sfdy_sfdyArea').setValue(rows[0].get('DXSF'));
				Ext.app.sfdyText = rows[0].get('DXSF');
				Ext.getCmp('sfdyWin').show();
			}
		}).render();
	} else if(node.getDepth() == 3){
		new Ext.util.GridColumnLinkRenderer({
			grid : pjmxGrid,
			dataIndex : "CLSF",
			displayRenderer : function(v, m, r, ri, ci, s) {
				var d = '';
				if (Ext.util.isNull(v)) {
					d = "算法定义";
				} else {
					d = "查看算法";
				}
				return d;
			},
			onClick : function(record) {
				Ext.app.clsf = 'CLSF';
				
				var clsf_zbmc = record.get("ZB_ID_DSPVALUE");
				Ext.getCmp('sfdyWin').on('show',function(t){
					Ext.getCmp('sfdyCenterPanel').setTitle('计算对象： ' + clsf_zbmc); //计算对象标题  指标-处理算法-指标名称
			    });
				
				var rows = pjmxGrid.getSelectionModel().getSelections();
				Ext.getCmp('sfdy_sfdyArea').setValue(rows[0].get('CLSF'));
				Ext.app.sfdyText = rows[0].get('CLSF');
				
				Ext.getCmp('sfdyWin').show();
				Ext.getCmp('sfdyWin').fireEvent("show", Ext.getCmp('sfdyWin'));
			}
		}).render();
		new Ext.util.GridColumnLinkRenderer({
			grid : pjmxGrid,
			dataIndex : "ZTSF",
			displayRenderer : function(v, m, r, ri, ci, s) {
				var d = '';
				if (Ext.util.isNull(v)) {
					d = "算法定义";
				} else {
					d = "查看算法";
				}
				return d;
			},
			onClick : function(record) {
				Ext.app.clsf = 'ZTSF';
				
				var ztsf_zbmc = record.get("ZB_ID_DSPVALUE");
				Ext.getCmp('sfdyWin').on('show',function(t){
			    	Ext.getCmp('sfdyCenterPanel').setTitle('计算对象： ' + ztsf_zbmc); //计算对象标题 指标-状态算法-指标名称
			    });
				
				var rows = pjmxGrid.getSelectionModel().getSelections();
				Ext.getCmp('sfdy_sfdyArea').setValue(rows[0].get('ZTSF'));
				Ext.app.sfdyText = rows[0].get('ZTSF');
				
				Ext.getCmp('sfdyWin').show();
			}
		}).render();
	} else if((node.getDepth() == 4) || (node.getDepth() == 5)){
		new Ext.util.GridColumnLinkRenderer({
			grid : pjmxGrid,
			dataIndex : "CLSF",
			displayRenderer : function(v, m, r, ri, ci, s) {
				var d = '';
				if (Ext.util.isNull(v)) {
					d = "算法定义";
				} else {
					d = "查看算法";
				}
				return d;
			},
			onClick : function(record) {
				// 获得当前选中行的状态量名称：ZTL_ID_DSPVALUE
				var clsf_ztlmc = record.get("ZTL_ID_DSPVALUE");
				Ext.getCmp('sfdyWin').on('show',function(t){
			    	Ext.getCmp('sfdyCenterPanel').setTitle('计算对象： ' + clsf_ztlmc); //计算对象标题  状态量-处理算法-状态量名称
			    });
				
				Ext.app.clsf = 'CLSF';
				var rows = pjmxGrid.getSelectionModel().getSelections();
				Ext.getCmp('sfdy_sfdyArea').setValue(rows[0].get('CLSF'));
				Ext.app.sfdyText = rows[0].get('CLSF');
				
				Ext.getCmp('sfdyWin').show();
				Ext.getCmp('sfdyWin').fireEvent("show", Ext.getCmp('sfdyWin'));
			}
		}).render();
	}
	if (node.getDepth() == 1) {
		pjmxGrid.getTopToolbar().hide();
		pjmxGrid.getTopToolbar().enable();
		pjmxGrid.loadData(Ext.app.mxkAppID, Ext.app.mxkClsID); //加载Grid数据
	} else if(node.getDepth() == 2){
		pjmxGrid.getTopToolbar().show();
		pjmxGrid.setDefaultValues({ //设置默认值
			'SSPJMX_ID' : node.id,
			'SSPJMX_ID_DSPVALUE' : node.text,
			'SFYX' : 'F',
			'SFYX_DSPVALUE' : '否',
			'SJ' : new Date(),
			'DXSF' : '',
			'CLSF' : ''
		});
		pjmxGrid.loadData(Ext.app.pjxzAppID, Ext.app.pjxzClsID,'','',
				" SSPJMX_ID = '"+ node.id+"'"); //加载Grid数据
	} else if(node.getDepth() == 3){
		pjmxGrid.getTopToolbar().show();
		pjmxGrid.getTopToolbar().enable();
		pjmxGrid.loadData(Ext.app.pjxzzbAppID, Ext.app.pjxzzbClsID,'','',
				" SSXZ_ID = '"+ node.id+"'");
	} else if(node.getDepth() == 4){
		pjmxGrid.getTopToolbar().show();
		pjmxGrid.getTopToolbar().enable();
		pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,'','',
				" SSZB_ID = '"+ nodeListAttr.SSZB_ID +"' AND SSXZ_ID = '"+ 
				nodeListAttr.SSXZ_ID + "' AND SSFZ_ID is null");
	} else if(node.getDepth() >= 5){
		if(node.getDepth() >= 6){
			if(node.id.split('@')[3] != '1501002') {
				pjmxGrid.getTopToolbar().disable();
				pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,
						'',''," GUID = ''");
				return;
			}
		}
		pjmxGrid.getTopToolbar().show();
		pjmxGrid.getTopToolbar().enable();
		pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,'','',
				" SSFZ_ID = '"+ nodeListAttr.SSFZ_ID+"' AND SSZB_ID = '"+ 
				nodeListAttr.SSZB_ID + "' AND SSXZ_ID = '"+nodeListAttr.SSXZ_ID + "'");
		
	}
}

/**
 * 算法定义左侧树点击事件
 */
Ext.app.sfdyLeftTree = function(node) {
	if(!node.hasChildNodes()){
		Ext.app.sfdyInsert(node.attributes.attr.SFNR);
	}
}

/**
 * if(){}else{}默认模型 
 */
Ext.app.sfdyInit = function() {
	var sfdyText = 'if (){\n';
	sfdyText += '	return 1;\n';
	sfdyText += '} else{\n';
	sfdyText += '	return 0;\n';
	sfdyText += '}';
	return sfdyText;
}

/**
 * 添加参数 树点击事件
 */
Ext.app.sfdyAddParamTree = function(node){
	if(node.getDepth() == 3 && !node.hasChildNodes()){
		Ext.app.sfdyInsert(node.attributes.attr.DQBLZ);
	}
	if(node.getDepth() > 4){ //node.id.split("@").length > 3
		Ext.app.sfdyInsert(node.attributes.attr.BM);
	}
}

/**
 * 向光标处插入字符串
 */
Ext.app.sfdyInsert = function(insertStr) {
	if(!Ext.util.isNull(insertStr)){
		var obj = Ext.getCmp("sfdy_sfdyArea").el.dom;
		if (Ext.isIE) {// 如果是IE
			Ext.getCmp('sfdy_sfdyArea').el.focus();
			var sel = document.selection.createRange();  
			sel.text = insertStr;  
			sel.moveEnd('character',insertStr.length);  
			sel.moveStart('character',insertStr.length);
		} else {
			var startPos = obj.selectionStart;
			var endPos = obj.selectionEnd;
			obj.value = obj.value.substring(0, startPos) + insertStr
					+ obj.value.substring(endPos, obj.value.length);
			Ext.getCmp("sfdy_sfdyArea").el.focus();
			obj.setSelectionRange(endPos + insertStr.length, endPos + insertStr.length);
		}
	}
}

/**
 * 创建DataSource
 */
Ext.app.createDataSource = function() {
	Ext.app.pfgzDataSource = new Ext.ux.BDDataSource({
		appID : Ext.app.pfgzAppID,
		clsID : Ext.app.pfgzClsID,
		readOnly : false
	});
}

/**
 * 刷新树和表格
 */
Ext.app.refreshTreeData = function() {
	Ext.app.node.reload();
	if(Ext.app.node.getDepth() == 2){
		pjmxGrid.loadData(Ext.app.pjxzAppID, Ext.app.pjxzClsID,'','',
				" SSPJMX_ID = '" + Ext.app.node.id + "'"); //加载Grid数据
	} else if(Ext.app.node.getDepth() == 3){
		pjmxGrid.loadData(Ext.app.pjxzzbAppID, Ext.app.pjxzzbClsID,'','',
				" SSXZ_ID = '" + Ext.app.node.id +"'");
	} else if(Ext.app.node.getDepth() == 4){
		pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,'','',
				" SSZB_ID = '" + Ext.app.node.id.split('@')[0] +
				"' AND SSXZ_ID = '" + Ext.app.node.id.split('@')[1] + 
				"' AND SSFZ_ID is null");
	} else if(Ext.app.node.getDepth() >= 5){
		if(Ext.app.node.getDepth() >= 6){
			if(Ext.app.node.id.split('@')[3] != '1501002') {
				pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,
						'',''," GUID = ''");
				return;
			}
		}
		pjmxGrid.loadData(Ext.app.pjxzztlAppID, Ext.app.pjxzztlClsID,'','',
				" SSFZ_ID = '" + Ext.app.node.id.split('@')[2] + 
				"' AND SSZB_ID = '" + Ext.app.node.id.split('@')[0] + 
				"' AND SSXZ_ID = '" + Ext.app.node.id.split('@')[1] + "'");
	}
}

/**
 * 增加评价规则保存
 */
Ext.app.zjpjgzSave = function() {
	var rows = pjmxGrid.getSelectionModel().getSelections();
	Ext.getCmp('zjpjgzForm').form.submit({
		url:"rule/pjxzwhAction/zjpjgzSave.do?zjpjgzForm_draw='" + 
			Ext.getCmp('zjpjgzForm_draw').getValue() + "'&ztlId="+
			rows[0].get('ZTL_ID')+"&ssxzId="+Ext.app.node.id.split('@')[1],
		success : function(form, action){
/*获得后台值				var res=action.result;
			Ext.getCmp('mx_guid').setValue(res.id);*/
			Ext.Msg.alert('系统提示','保存成功');
			Ext.getCmp('addEvRuleWin').hide();
		},
		failure : function(form, action){
			Ext.Msg.alert('系统提示','保存失败');
		}
	})
}

//按模板新增确定
Ext.app.ambxzOk = function() {
	if (Ext.getCmp('ambxz_name').getValue() == '') {
		Ext.Msg.alert('系统提示', '请输入名称！');
		return;
	}
	var rows = pjmxGrid.getSelectionModel().getSelections();
	Ext.Ajax.request({
		url : 'rule/pjxzwhAction/ambxzMethod.do',
		params : {
			guid : rows[0].get('GUID'),
			xzmc : Ext.getCmp('ambxz_name').getValue()
		},
		success : function() {
			Ext.app.node.reload();
			pjmxGrid.loadData(Ext.app.pjxzAppID, Ext.app.pjxzClsID,'','',
					" SSPJMX_ID = '"+ Ext.app.node.id+"'");
		}
	})
	Ext.getCmp('ambxzWin').hide();
}

//算法定义确定
Ext.app.sfdyOk = function() {
	var row = null;
	if("JHJXSJGZ" == Ext.app.clsf){
		row = jcjygzGrid.getSelectionModel().getSelected();
	} else {
		row = pjmxGrid.getSelectionModel().getSelected();
	}
	Ext.Ajax.request({
		url : 'rule/pjxzwhAction/sfdyMethod.do',
		params : {
			guid : row.get('GUID'),
			depth : Ext.app.node.getDepth(),
			clsf : Ext.app.clsf,
			sfdyText : Ext.getCmp('sfdy_sfdyArea').getValue()
		},
		success : function() {
			if(true){
				Ext.Msg.alert("提示信息","保存成功！");
				Ext.getCmp('sfdyWin').hide();
				Ext.app.refreshTreeData();
				if("JHJXSJGZ" == Ext.app.clsf){
					var sql = " PJXZID = '"+ Ext.app.jcjygzObjID+"' ";
					jcjygzGrid.loadData(Ext.app.jcjygzAppID, Ext.app.jcjygzClsID,'','',sql);
				}
			}
			if(false){
				Ext.Msg.alert("提示信息","保存失败！");
				return false;
			}
		}
	});
}

/**
 * 
 * 数据校验去重
 */
Ext.app.vlidateDate = function(grid) {
	var depth = Ext.app.node.getDepth();
	if (depth == 2) {
		// 数据仓库值
		var rows = grid.getStore().data.items;
		// 修改集合
		var r = grid.getStore().getModifiedRecords();
		var url = "rule/pjxzwhAction/vlidateDate.do";
		var util = new Bp.util.RequestUtils();

		var guid = "";
		for (var i = 0; i < r.length; i++) {
			guid += "'";
			guid += r[i].get('GUID');
			guid += "'";
			guid += ","
		}
		guid = guid.substring(0, guid.length - 1);

		var xzmc = "";
		for (var j = 0; j < r.length; j++) {
			xzmc += "'";
			xzmc += r[j].get('XZMC');
			xzmc += "'";
			xzmc += ","
		}
		xzmc = xzmc.substring(0, xzmc.length - 1);

		var data = util.sendRequest(url, {
			xzmc : "",
			treeId : Ext.app.node.id,
			guid : guid
		});
		var result = Ext.decode(data).success;
		if (result == 'success') {// 如果为新增
			var v = Ext.app.addValidate(rows, xzmc, guid);
			if (v == false) {
				return false;
			}
		} else {//修改
			var v = Ext.app.xgValidate(r, xzmc, guid);
			if (v == false) {
				return false;
			}
		}
	}
}

/**
 * 新增进行名称去重校验
 */
Ext.app.addValidate = function(rows, xzmc, guid) {
	var url = "rule/pjxzwhAction/vlidateDate.do";
	var util = new Bp.util.RequestUtils();

	for (var i = 1; i < rows.length; i++) {
		var first = rows[0].get('XZMC');
		if (first == rows[i].get('XZMC')) {
			Ext.Msg.alert('系统提示', '输入名称存在重复名称');
			return false;
		}
	}
	var data = util.sendRequest(url, {
		xzmc : xzmc,
		type : "new",
		guid : guid,
		treeId : Ext.app.node.id
	});
	var obj = Ext.decode(data);
	var flag = obj.success;
	if (flag != 'success') {
		Ext.Msg.alert('系统提示', '输入的名称已存在请重新输入！');
		return false;
	}
}

/**
 * 修改名称校验
 */

Ext.app.xgValidate = function(r, xzmc, guid) {
	var xgUrl = "rule/pjxzwhAction/xgValidateDate.do";
	var util = new Bp.util.RequestUtils();

	var result = util.sendRequest(xgUrl, {
		guid : guid,
		xzmc : xzmc,
		treeId : Ext.app.node.id
	});

	var flag = Ext.decode(result).success;
	var type = Ext.decode(result).type;
	if (flag != 'success') {
		Ext.Msg.alert('系统提示', '输入值已存在,请重新输入!');
		return false;
	} else {
		if (type == 'true') {
			for (var i = 1; i < r.length; i++) {
				var first = r[0].get('XZMC');
				if (first == r[i].get('XZMC')) {
					Ext.Msg.alert('系统提示', '输入名称存在重复名称');
					return false;
				}
			}
		}
	}
}

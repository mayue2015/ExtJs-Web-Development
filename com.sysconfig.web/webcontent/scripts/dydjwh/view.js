Ext.app.data = [];

/**
 * 电压等级维护-部门单位导航树
 * @author mayue
 * */
//var leftTree = new Ext.tree.TreePanel({
//	collapsible : true,
//	split : true,
//	region : 'west',
//	autoHeight : false,
//	autoScroll : true,
//	animate : true,
//	width : "15%",
//	height : "100%",
//	title : '部门单位',
//	service : 'csdwwh_nav_tree_service',
//	filterStr : '',
//	root : new Ext.tree.AsyncTreeNode({
//		text : '部门单位',
//		expanded : true,
//		id : 'treeroot',
//		iconCls : 'treeroot'
//	}),
//	loader : new Ext.tree.TreeLoader({
//		id : 'treeLoader',
//		dataUrl : ''
//	}),
//	plugins : [ new Bp.plugin.TreePanel() ]
//});
//leftTree.on('click', Ext.app.dydjwhTreeClick);

/***************************************************************/
var selDeptId = '';

//导航树根节点
var root = new Ext.tree.AsyncTreeNode({
	text : '部门树',
	expanded : true,
	id : 'deptRoot'
});

//导航树
var deptTreePanel = new Ext.tree.TreePanel({
	id : 'deptTreeNode',
	title : '部门单位',
	collapsible : true,
	autoHeight : false,
	autoScroll : true,
	animate : true,
	border : false,
	region : 'west',
	split : true,
	rootVisible : false,//隐藏根节点
	defaults : {
		autoScroll : true
	},
	width : "15%",
	height : "100%",
	loader : new Ext.tree.TreeLoader({dataUrl : 'planning/volevel/volevelRootTree.do'}),
	root : root,
	listeners : {
//		click : function(node){
//			changeNode(node);//树节点点击事件
//		}
	}
});
deptTreePanel.on('click', Ext.app.dydjwhTreeClick);

deptTreePanel.on('beforeload', function(node){
	if(node.getDepth() == 0){
		deptTreePanel.loader.dataUrl = 'planning/volevel/volevelRootTree.do?deptId=';
	}else{
		deptTreePanel.loader.dataUrl = 'planning/volevel/volevelNodeTree.do?id='+node.id;
	}
});

////导航树点击事件
//function changeNode(node){
//	selDeptId = node.id;
//	store.load({
//		params : {
//			start : 0,
//			limit : 15,
//			deptId : selDeptId
//		}
//	});
//}

deptTreePanel.on('load', function(node){	
    if(deptTreePanel.getRootNode()==node){
	   var firstNode = node.firstChild;
	   if(firstNode != null){
		   var getPath = firstNode.getPath();
		   deptTreePanel.selectPath(getPath,null,function(bSuccess,bNode){
               bNode.fireEvent("click",bNode);
         });
	   }
   }
});
/*********************************************************/

/**
 * 电压等级维护-数据表格
 * @author mayue
 * */
var DataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		render : function() { //渲染-颜色/默认颜色-调色板面板
			var grid = this;
			this.getStore().on("load", function() {
				var cm = grid.getColumnModel();
				var c = cm.getColumnCount();
				cm.setRenderer(cm.findColumnIndex("COLOR"), function(v, m, r, ri, ci, s) {
					return "<span style=\"display:display:inline-block;width:100%;height:100%;background-color:" + v + ";\"></span>";
				});
				cm.getColumnById(cm.getColumnId(cm.findColumnIndex("COLOR"))).on("click", function(c, g, ri, e) {
					if (grid.colorWindowRendered) {
						return;
					}
					var w = new Ext.Window({
						x : e.getPageX(),
						y : e.getPageY(),
						items : [ new Ext.ColorPalette({
							listeners : {
								select : function(cmp, color) {
									g.getStore().getAt(ri).set("COLOR", "#" + color);
									w.close();
								}
							}
						}) ],
						width : 160,
						height : 122,
						listeners : {
							show : function() {
								grid.colorWindowRendered = true;
							},
							close : function() {
								grid.colorWindowRendered = false;
							}
						}
					}).show();
				});
				cm.setRenderer(cm.findColumnIndex("DEFAULTCOLOR"), function(v, m, r, ri, ci, s) {
					return "<span style=\"display:display:inline-block;width:100%;height:100%;background-color:" + v + ";\"></span>";
				});
				cm.getColumnById(cm.getColumnId(cm.findColumnIndex("DEFAULTCOLOR"))).on("click", function(c, g, ri, e) {
					if (grid.colorWindowRendered) {
						return;
					}
					var w = new Ext.Window({
						x : e.getPageX(),
						y : e.getPageY(),
						items : [ new Ext.ColorPalette({
							listeners : {
								select : function(cmp, color) {
									g.getStore().getAt(ri).set("DEFAULTCOLOR", "#" + color);
									w.close();
								}
							}
						}) ],
						width : 160,
						height : 122,
						listeners : {
							show : function() {
								grid.colorWindowRendered = true;
							},
							close : function() {
								grid.colorWindowRendered = false;
							}
						}
					}).show();
				});
				grid.reconfigure(grid.getStore(), cm);
			});
			Ext.app.dydjwhGridSetDefaultValues();
		},
		afterrender : function(grid) { //渲染主界面表格
			//加载电压等级代码/颜色/默认颜色数据集
//			Ext.app.dataJson();
			//隐藏平台按钮
			for(var i=8; i < 13; i+=2){
				this.getTopToolbar().items.items[i].hide();
			}
			this.getTopToolbar().items.items[9].hide();
			this.getTopToolbar().items.items[11].hide();
			Ext.app.addRefreshBtn(this);
			Ext.app.btn_accept_function(this);
			
			//默认主页面新增按钮失效
			var grid = this;
			this.getStore().on("load", function() {
				grid.getTopToolbar().items.items[1].disable();//新增
			});
			
			//渲染表格设置默认值
			this.setDefaultValues({
				'VOLTAGELEVEL_NAME' : "kV",
				'COLOR' : "#FFFFFF",
				'DEFAULTCOLOR' : "#FFFFFF"
			});
			//加载数据表格
			this.loadData(Ext.app.appID, Ext.app.clsID);
		},
		beforeedit : function(arg) {
			var vol = arg.field;
			if(vol == "ID"){
				var deptId = arg.record.get('DEPT_CODE');
				arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptId + "'");
				arg.fieldEditor.on('select',function(combo,record){
					var name = record.data.text;
					Ext.app.name = name;
				});
			}
			if(vol == "VOLTAGELEVEL_NAME"){
				var voltagelevel_name = arg.record.get('VOLTAGELEVEL_NAME');
				voltagelevel_name = Ext.app.name;
				arg.fieldEditor.setValue(voltagelevel_name);
			}
		},
		beforesave : function(a,b) { //数据保存前校验值
			if(b.adddata.length != 0){ //新增数据时：
				for(var j = 0; j < b.adddata.length; j++){
					var dydjCode = b.adddata[j].ID;
					var dydjName = b.adddata[j].VOLTAGELEVEL_NAME;
					var ys = b.adddata[j].COLOR;
					var mrys = b.adddata[j].DEFAULTCOLOR;
					var regNum = new RegExp("^[0-9]*$");
					var regNumAndLetter = new RegExp("^[0-9a-zA-Z]*$");
					//正则校验
//					if(!regNum.test(dydjCode)) {
//						Ext.Msg.alert('系统提示', '电压编码只能由数字组成！');
//						return false;
//					}
					if(!regNumAndLetter.test(dydjName)){
						Ext.Msg.alert('系统提示', '电压等级名称只能由数字和字母组成！');
						return false;
					}
					
					//检查新增页面数据中是否有重复
					for(var n = j+1; n < b.adddata.length; n++){
						if(dydjCode == b.adddata[n].ID ){
							 Ext.MessageBox.alert('系统提示','电压编码输入的值重复，请您重新输入!');
							 return false;
						}
						if(ys == b.adddata[n].COLOR){
							Ext.MessageBox.alert('系统提示','颜色选择重复，请您重新选择!');
							return false;
						}
						if(mrys == b.adddata[n].DEFAULTCOLOR){
							Ext.MessageBox.alert('系统提示','默认颜色选择重复，请您重新选择!');
							return false;
						}
					}
					
					//新增：检查数据表中是否有重复数据
					if(Ext.app.data[0] != null){
						for(var i = 0; i < Ext.app.data.length; i++){
							  var dydjdm = Ext.app.data[i].ID;	
							  var ysdata = Ext.app.data[i].COLOR;
							  var mrysdata = Ext.app.data[i].DEFAULTCOLOR;
							  if(dydjCode == dydjdm){
								  Ext.MessageBox.alert('系统提示','电压编码输入的值已存在，请您重新输入!');
								  return false;
							  }
							  if(ys == ysdata){
								  Ext.MessageBox.alert('系统提示','颜色选择项已存在，请您重新选择!');
								  return false;
							  }
							  if(mrys == mrysdata){
								  Ext.MessageBox.alert('系统提示','默认颜色选择项已存在，请您重新选择!');
								  return false;
							  }
						}
					}
				}				
			}
			if(b.edtdata.length != 0){ //修改数据时：
				for(var j = 0; j < b.edtdata.length; j++){
					var dydjCode = b.edtdata[j].ID;
					var dydjName = b.edtdata[j].VOLTAGELEVEL_NAME;
					var ys = b.edtdata[j].COLOR;
					var mrys = b.edtdata[j].DEFAULTCOLOR;
					var regNum = new RegExp("^[0-9]*$");
					var regNumAndLetter = new RegExp("^[0-9a-zA-Z]*$");
					//正则校验
//					if(dydjCode != undefined){
//						if(!regNum.test(dydjCode)) {
//							Ext.Msg.alert('系统提示', '电压编码只能由数字组成,请重新修改！');
//							return false;
//						}
//					}
					if(dydjName != undefined){
						if(!regNumAndLetter.test(dydjName)){
							Ext.Msg.alert('系统提示', '电压等级名称只能由数字和字母组成,请重新修改！');
							return false;
						}
					}
					
					//检查修改页面数据中是否有重复
					for(var n = j+1; n < b.edtdata.length; n++){
						if(dydjCode != undefined && b.edtdata[n].ID != undefined){
							if(dydjCode == b.edtdata[n].ID ){
								 Ext.MessageBox.alert('系统提示','电压编码修改的值重复或已存在，请重新修改!');
								 return false;
							}
						}
						if(ys != undefined && b.edtdata[n].COLOR != undefined){
							if(ys == b.edtdata[n].COLOR){
								Ext.MessageBox.alert('系统提示','颜色选择重复或已存在，请您重新选择修改!');
								return false;
							}
						}
						if(mrys != undefined && b.edtdata[n].DEFAULTCOLOR != undefined){
							if(mrys == b.edtdata[n].DEFAULTCOLOR){
								Ext.MessageBox.alert('系统提示','默认颜色选择重复或已存在，请您重新选择修改!');
								return false;
							}
						}
					}
					
					//修改：检查数据表中是否有重复数据	
					if(Ext.app.data[0] != null){
						for(var i = 0; i < Ext.app.data.length; i++){
							var dydjdm = Ext.app.data[i].ID;	
							var ysdata = Ext.app.data[i].COLOR;
							var mrysdata = Ext.app.data[i].DEFAULTCOLOR;
							if(dydjCode == dydjdm){
								  Ext.MessageBox.alert('系统提示','电压编码修改的值已存在，请您重新输入!');
								  return false;
							  }
							  if(ys == ysdata){
								  Ext.MessageBox.alert('系统提示','修改的颜色已存在，请您重新选择!');
								  return false;
							  }
							  if(mrys == mrysdata){
								  Ext.MessageBox.alert('系统提示','修改的默认颜色已存在，请您重新选择!');
								  return false;
							  }
						}
					}
				}				
			}	
		},
		aftersave : function() {
			DataGrid.store.reload();
			//加载电压等级代码/颜色/默认颜色数据集
			Ext.app.dataJson();
		},
		afterdelete : function() {
			//加载数据表格
			DataGrid.store.reload();
			Ext.app.dataJson();
		}
	}
});
Ext.app.dataGrid = DataGrid;

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [ deptTreePanel,DataGrid ]
});
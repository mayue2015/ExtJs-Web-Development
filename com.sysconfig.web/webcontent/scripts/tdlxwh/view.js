Ext.app.code=[];
/**
 * 数据表格
 */
var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {		
			//加载code数据集,去重使用
			Ext.app.codeJson();
			//移除多余按钮
			Ext.app.addRemoveToolbar(this);
			//页面刷新 按钮失效
			this.getTopToolbar().disable();
			//是否点击新增按钮事件
			this.getStore().on('add', function(o, f) {
				if(!Ext.app.node || Ext.app.node.getDepth() == 1){//如果没有选择树节点
					Ext.Msg.alert('系统提示','请选择相应节点！');
				}
			});
		},
		afteredit : function(a) {//编辑完成
			if(a.field=='CODE'){	
				var editCode = a.value;
				var row = a.record;  
				if(editCode){
					if(editCode.substr(0,5) != Ext.app.node.id){
						Ext.MessageBox.alert('系统提示','代码前五位不可改变!');
						row.set('CODE', a.originalValue);  
						return false;
					}
					if(editCode.length!=7){
						Ext.MessageBox.alert('系统提示','代码长度只能为七位!');
						row.set('CODE', a.originalValue);  
						return false;
					}
					row.set('CODE_ALIAS', editCode.substring(5));					
				}
			}
		},
		beforesave : function(a,b) {// 保存前校验值
			if(b.adddata.length != 0){
				for(var j = 0 ;j < b.adddata.length; j++){
					var editCode = b.adddata[j].CODE;//
					//检查添加数据中是否有重复
					for(var n = j+1; n < b.adddata.length; n ++){
						if(editCode == b.adddata[n].CODE ){
							 Ext.MessageBox.alert('系统提示','代码输入的值已存在，请重新输入!');
							  return false;
						}
					}
					//检查缓存数据中是否有重复
					for(var i=0;i<Ext.app.code.length;i++){
						  var code = Ext.app.code[i].code;						 
						  if(editCode == code){
							  Ext.MessageBox.alert('系统提示','代码输入的值已存在，请重新输入!');
							  return false;
						  }
					}
				}				
			}
			if(b.edtdata.length != 0){
				for(var j = 0 ;j < b.edtdata.length; j++){
					var editCode = b.edtdata[j].CODE;//
					//检查更改数据中是否有重复
					for(var n = j+1; n < b.edtdata.length; n ++){
						if(editCode == b.edtdata[n].CODE ){
							 Ext.MessageBox.alert('系统提示','代码输入的值已存在，请重新输入!');
							  return false;
						}
					}
					//检查缓存数据中是否有重复					
					for(var i=0;i<Ext.app.code.length;i++){
						if(b.edtdata[j].GUID ==  Ext.app.code[i].guid){//如果是原数据则跳过
							continue;
						}
						var code = Ext.app.code[i].code;						 
						if(editCode == code){
							Ext.MessageBox.alert('系统提示','代码输入的值已存在，请重新输入!');
							return false;
						}
					}
				}				
			}	
		},
		aftersave : function(a,b){//保存后刷新表格
			if(b.adddata.length != 0){//向缓存中添加数据
				for(var i = 0; i < b.adddata.length; i ++){
					Ext.app.addCodeJson( b.adddata[i].GUID,b.adddata[i].CODE);
				}				
			}
			if(b.edtdata.length != 0){//更改缓存中的对应数据
				for(var i = 0; i < b.edtdata.length; i ++){
					Ext.app.updateCodeJson( b.edtdata[i].GUID,b.edtdata[i].CODE);
				}	
			}
			dataGrid.getStore().reload();
		},
		afterdelete : function(a,b){
			//删除缓存中的对应数据
			if(b.count > 0){
				var s = b.objids.split(',');
				for(var i = 0;i < s.length-1 ; i++){
					Ext.app.deleteCodeJson(s[i]);
				}
				dataGrid.getStore().load();
			}
		}
	}
});
Ext.app.dataGrid = dataGrid;

/**
 * 导航树
 */
var leftTree = new Ext.tree.TreePanel({
	collapsible : true,
	split : true,
	region : 'west',
	width : "15%",
	service : 'tdlx_tree_service',	
	loader : new Ext.tree.TreeLoader(),
	root : {
		id :'root',
		text :'通道类型',
		expanded : true
		
	},
	//rootVisible : false,
	plugins : [ new Bp.plugin.TreePanel() ]

});
leftTree.on('click', Ext.app.leftTree);

var p = new Ext.Viewport({
	layout : "border",
	region : "center",
	defaults : {
		border : false
	},
	items : [leftTree,  dataGrid ]
});

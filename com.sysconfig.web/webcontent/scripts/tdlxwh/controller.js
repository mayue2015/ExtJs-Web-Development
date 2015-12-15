/**
 * 移除平台按钮
 * 
 * @param {Ext.ux.BDGrid}
 */
Ext.app.addRemoveToolbar = function(grid) {
	var items = grid.getTopToolbar().items.items;
	for(var i = 9; i < 13; i++){
		items[i].hide();
	}
};

Ext.app.id = undefined;
/**
 * 设置默认值
 */
Ext.app.setDefaultValue = function(node){

	if(Ext.app.node.getDepth()!=1){
		var code = Ext.app.node.id;
		dataGrid.setDefaultValues({
			 'CATEGORY_CODE' : '05',
			 'LABEL_CODE' : code,
			 'CODE' : code
		});
	}
};

/**
 * 左侧导航树
 */
Ext.app.leftTree = function(node) {
	Ext.app.node = node;
	var id = "'"+node.id +"'";
	node.expand();
	Ext.app.setDefaultValue();	
	var sql;
	if(node.getDepth() == 1){
		sql = " 1=2" ;
		//点击树节点按钮失效
		Ext.app.dataGrid.getTopToolbar().disable();
	}else{
		sql = " LABEL_CODE IN("+id +") AND CATEGORY_CODE = '"+node.parentNode.id+"' ";
		//点击树节点按钮有效
		Ext.app.dataGrid.getTopToolbar().enable();
	}	
	dataGrid.loadData(Ext.app.appID, Ext.app.clsID,'','',sql);	
	Ext.app.id = undefined;	
}

/**
 * 加载code数据集，去重
*/
Ext.app.codeJson = function (){
	  Ext.Ajax.request({
			url : 'sysconfig/tdlxwhAction/getCode.do',
			method : 'post',
			success : function(response) {
				var decodeData = decodeURIComponent(response.responseText);
				Ext.app.code =  eval('(' + decodeData + ')');				
			}
		});
}
//添加缓存中对应数据
Ext.app.addCodeJson = function (guid,code){
	  var oneElement = {"guid":guid,"code":code};
	  Ext.app.code.push(oneElement);
}
//更改缓存中对应数据
Ext.app.updateCodeJson = function (guid, code){
	//如果不用F1平台更改则执行下面代码，因为F1平台可以筛选出编辑的数据
	 /* for(var i=0;i<Ext.app.code.length;i++){
		  var guidId = Ext.app.code[i].guid;
		  if(guidId==guid){
			  Ext.app.code.remove(Ext.app.code[i]);
			  break;
		  }
	  }
	  var oneElement = {"guid":guid,"code":code};
	  Ext.app.code.push(oneElement);*/
	//直接赋值
		for(var i=0;i<Ext.app.code.length;i++){
			var guidId = Ext.app.code[i].guid;
			if(guidId==guid){
				Ext.app.code[i].code = code;
				break;
			}
		}
}
//删除缓存中对应数据
Ext.app.deleteCodeJson = function (guid){
	for(var i=0;i<Ext.app.code.length;i++){
		var guidId = Ext.app.code[i].guid;
		if(guidId==guid){
			Ext.app.code.remove(Ext.app.code[i]);
			break;
		}
	}
}
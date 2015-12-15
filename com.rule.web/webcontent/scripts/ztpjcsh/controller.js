
/**
 * 点击添加按钮激发事件
 */
Ext.app.clickAddFun=function(){
	
		if(Ext.app.leftNode==undefined && Ext.app.rightNode==undefined){
			Ext.Msg.alert('系统提示', '请选择模型或细则节点');
			return
		}else if(Ext.app.rightNode!=undefined && Ext.app.rightNode.getDepth()==1
				&& Ext.app.leftNode==undefined){
			Ext.Msg.alert('系统提示', '请选择模型或细则节点');
			return
		}else if(Ext.app.leftNode!=undefined && Ext.app.rightNode==undefined){
			Ext.Msg.alert('系统提示', '请选择右侧导航树中的模型或细则节点');
			return
		}else if (Ext.app.leftNode!=undefined&&Ext.app.isSelect==true){
			Ext.Msg.alert('系统提示', '请选择右侧导航树中的模型或细则节点');
			return
		}else if(Ext.app.leftNode!=undefined && Ext.app.rightNode.getDepth()==1){
			Ext.Msg.alert('系统提示', '请选择模型或细则节点');
			return
		}else{
			Ext.Ajax.request({
				url : 'rule/ztpjcshAction/addInfoToLeftTree.do',
				params : {
					guid : Ext.app.rightNode.id,
					depth : Ext.app.rightNode.getDepth()
				},
				async : false,
				success : function() {
					// 添加成功后刷新左侧树
					Ext.app.lefttree.getRootNode().reload();
			
					var id=Ext.app.rightNode.id;
					// 在根节点加载完成后进行值选中
					Ext.app.lefttree.getRootNode().on("expand",function(){ 
						Ext.app.lefttree.getNodeById(id).select();
					});
				
				}
			});
		}
};

/**
 * 点击移出按钮激发事件
 */
Ext.app.clickRemoveFun=function(){
	if (Ext.util.isNull(Ext.app.leftNode)|| Ext.app.leftNode.getDepth() == 1) {
		Ext.Msg.alert('系统提示', '请选择启用的模型或细则节点');
		return
	} else if(!Ext.util.isNull(Ext.app.leftNode) && Ext.app.isSelect == false ){
		Ext.Msg.alert('系统提示', '请选择启用的模型或细则节点');
		return
	}else {
		Ext.Ajax.request({
			url : 'rule/ztpjcshAction/deltInfoFromLeftTree.do',
			params : {
				guid : Ext.app.leftNode.id
			},
			async : false,
			success : function() {
				// 移出成功后刷新左侧树
				Ext.app.lefttree.getRootNode().reload();
				// 刷新右侧树 移出自动选中移出行
				Ext.app.righttree.getRootNode().reload();
				var id=Ext.app.leftNode.id;
				// 在根节点加载完成后进行值选中
				Ext.app.righttree.getRootNode().on("expand",function(){ 
					Ext.app.righttree.getNodeById(id).select();
				});
				
			}
		});
	}
};

/**
 * 点击初始化按钮激发事件
 */
Ext.app.clickInitFun=function(){
	if (Ext.app.leftNode == null || Ext.app.leftNode.getDepth() == 1) {
		Ext.Msg.alert('系统提示', '请选择启用的模型或细则节点');
		return
	}else{
		Ext.Ajax.request({
			url : 'rule/ztpjcshAction/csh.do',
			params : {
				level : Ext.app.leftNode.getDepth(),
				parentId : Ext.app.leftNode.parentNode.id,
				currentId : Ext.app.leftNode.id
			},
			success : function(response, o) {
				var data = Ext.decode(response.responseText);
				if (data.success == true) {
					Ext.Msg.alert('系统提示', '初始化成功!');
				} else {
					//若失败 展示初始化校验界面
					initWindow.show();
				}
			}
		});
	var initWindow = new Ext.app.InitWindow({
			title:"初始化校验",
			width:450,
			height:450
		});
		return false;
	}
};


/**
 * 左侧导航树
 */
Ext.app.clickLeftTree = function(leftNode) {
	Ext.app.leftNode = leftNode;
	//判断是否为手选择行
	Ext.app.isSelect=true;
}

/**
 * 右侧导航树
 */
Ext.app.clickRightTree = function(rightNode) {
	Ext.app.rightNode = rightNode;
	//判断是否为手选择行
	Ext.app.isSelect=false;
}
Ext.onReady(function(){
	/**
	 * 
	 */
	// 构造一个树面板对象
	var gdpNavTree=new Ext.tree.TreePanel({
		id : 'gdpNavTree',
		border:false,
		region:'center',
		split:true,
		rootVisible: false,
		defaults : {
			autoScroll : true
		},
		autoScroll:true,
		margins : '2 0 2 2',  
		width: '200',
		loader : new Ext.tree.TreeLoader({
			dataUrl:'prediction/selectForeCaseMethodAction/getMethodTreeRoot.do'
		}),
		root: new Ext.tree.AsyncTreeNode({
	    	//进入时是否展开
	    	expanded:true,
	    	text:'根节点'
	    }),
	    listeners: {   
	    	'afterrender':function(node){
	    		gdpNavTree.expandAll();
	    	},
	    	'checkchange':function(node){
	    		var nodep = node.parentNode;
	    		var childs = nodep.childNodes;
	    		for (var i = 0; i < childs.length; i++) {
					var node_n = childs[i];
					node_n.attributes.checked=false;
					node_n.getUI().checkbox.checked = false;   
				}
	    		node.attributes.checked=true;
	    		node.getUI().checkbox.checked = true;   
	    	},
	    	'load':function(node){
	    		var node_childs = node.childNodes;
	    		for (var j = 0; j < node_childs.length; j++) {
	    			var leafNode = node_childs[j];
	    			var leafId = leafNode.attributes.id;
	    			if (leafId==epmv||leafId==tpmv||leafId==lpmv) {
	    				leafNode.attributes.checked=true;
	    			}
	    		}
	    	}
		}
	});
	
	gdpNavTree.on('beforeload', 
			function(node){
				if(node.getDepth() =="0") {
					gdpNavTree.loader.dataUrl='prediction/selectForeCaseMethodAction/getMethodTreeRoot.do';// 定义子节点的Loader
				}else{
					type = node.attributes.type;
					gdpNavTree.loader.dataUrl='prediction/selectForeCaseMethodAction/getMethodTreeChild.do?type='+type;// 定义子节点的Loader
				}
			});
	
	var toolbar = new Ext.Toolbar({  
        autoWidth:true,  
        autoShow:true,  
        region:'south',
	    items:['->',{text: '取消',handler:function(){window.close();}},  
	           '->',
	           {text: '确定',handler:function(){forSelectMethodCommit();}}]  
	});  

	/**
	 * 页面显示
	 * */ 
	var viewport = new Ext.Viewport({
		layout : "border",
		defaults : {
			border : false
		},
		items : [ gdpNavTree,toolbar ]
	});
	
	//选择预测方法
	function forSelectMethodCommit(){
		var checkNodes = gdpNavTree.getChecked(); 
		if(checkNodes==""||checkNodes==undefined){
		   alert("请选择预测算法!");
		   return;
		}else{
		   var len = checkNodes.length;
		   if(len > 3){
			   alert("每个预测只能选择一种算法!");
			   return;
		   }else if(len < 3){
			   alert("每种预测都要选择一种算法！");
			   return;
		   }else{
			   var selectArr = [];
			   var selectTextArr = [];
			   for (var i = 0; i < checkNodes.length; i++) {
				   var nodeS = checkNodes[i];
				   var nt = nodeS.parentNode.attributes.type;
				   if(nt == 'ALG_20121207_00001'){
					   selectArr[0] = nodeS.attributes.id;
					   selectTextArr[0] = nodeS.attributes.text;
				   }
				   if(nt == 'ALG_20121207_00010'){
					   selectArr[1] = nodeS.attributes.id;
					   selectTextArr[1] = nodeS.attributes.text;	   
				   }
				   if(nt == 'ALG_20121207_00020'){
					   selectArr[2] = nodeS.attributes.id;
					   selectTextArr[2] = nodeS.attributes.text;
				   }
			   }
			   Ext.Ajax.request({
						type: "POST",
						url:"prediction/selectForeCaseMethodAction/saveMethod.do",
						params:{
							gmId : selectArr[0],
							poId : selectArr[1],
							loId : selectArr[2],
							faVersionId : faVersionId,
							faAreaId : faAreaId
						},
						async: false,
						success: function(response, opts) {
							var json = response.responseText;
							if(json=="success"){
				    			alert("保存成功!");
				    			window.returnValue = {epm:selectTextArr[0],epmv:selectArr[0],tpm:selectTextArr[1],tpmv:selectArr[1],lpm:selectTextArr[2],lpmv:selectArr[2]};
				    			window.close();
				    		}else if(json=="fail"){
				    			alert("保存失败!");
							}else if(json=="tip"){
								alert("每个预测只能选择一种算法!");
							}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							alert("操作异常!");
						}
				});
		   }
		   
		}
	}
});
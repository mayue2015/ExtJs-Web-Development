$import("pmv/scripts/energySaving/grid.js")
Ext.onReady(function() {
	var nodeId = '';
	var type = '';
	var pageWidth = document.documentElement.offsetWidth - 200;
	var pageHeight = document.documentElement.offsetHeight - 100;
	//构造【节电量项目评估树】根节点
	var root = new Ext.tree.AsyncTreeNode({
		text:'节电量项目评估树',
		expanded:true,
		id:'treeroot'
	});
	
	// 构造一个树面板对象
	var treePanel = new Ext.tree.TreePanel({
		id : 'treePanel',
		border:false,
		region:'west',
		split:true,
		rootVisible: false,
		defaults : {
			autoScroll : true
		},
		autoScroll:true,
		margins : '2 0 2 2',  
		width: '200',
		loader:new Ext.tree.TreeLoader({dataUrl:'pmv/energySave/getEnergyRootTree.do'}),
		root:root,
		listeners: {
			beforeclick : function(node){
//				if(!clickAddBtn){
//					sfAdd();
//					return false;
//				}
			},
			beforeexpandnode : function(node){
//				if(!clickAddBtn){
//					sfAdd();
//					return false;
//				}
			},
			click: function(node) {
//				if(!clickAddBtn){
//					sfAdd();
//					return false;
//				}
				treeNodeChangeData(node);
			}
		}
	});
	
	treePanel.on('expandnode', 
			function(node){
		var leafNode = Ext.getCmp('treePanel').getNodeById(node.id);
		Ext.getCmp('treePanel').getSelectionModel().select(leafNode);
	});

	treePanel.on('collapsenode', 
			function(node){
		var leafNode = Ext.getCmp('treePanel').getNodeById(node.id);
		Ext.getCmp('treePanel').getSelectionModel().select(leafNode);
	});
	
	treePanel.on('load', function(node){//默认选中第一个节点
        if(treePanel.getRootNode()==node){
    	   var firstNode = node.firstChild;
    	   if(firstNode != null){
    		   var getPath = firstNode.getPath();
    		   treePanel.selectPath(getPath,null,function(bSuccess,bNode){
                   bNode.fireEvent("click",bNode);
    		   });
    	   }
       }
	});
	
	treePanel.on('beforeload', 
			function(node){
		        // 树节点加载事件
				if(node.getDepth() =="0") {
					treePanel.loader.dataUrl='pmv/energySave/getEnergyRootTree.do';// 定义子节点的Loader
					toolBarDisabled(true);
				}else{
					type = node.attributes.type;
					treePanel.loader.dataUrl='pmv/energySave/getEnergyNodeTree.do?id='+node.id+'&type='+type;// 定义子节点的Loader
				}
				treeNodeChangeData(node);
   			});
	
	function treeNodeChangeData(node){
		type = node.attributes.type;
		nodeId = node.id;
		grid.hide();
		reportFrame.hide();
		if(type == 'ONE'){
			toolBarDisabled(false);
		}else{
			toolBarDisabled(true);
		}
		if(type == 'TWO'){
			reportFrame.show();
			var nodeText = node.parentNode.text;
			if(nodeText == '无功电压优化调节' || nodeText == '变压器经济运行' 
				|| nodeText == '节能金具应用项目' || nodeText == '电能质量治理项目(谐波治理项目)'
				|| nodeText == '电能质量治理项目(不平衡负荷调节项目)'){
				nodeText += "后评估";
				Ext.getCmp('btn_before_port').setDisabled(true);
			}else{
				nodeText += "预评估";
				Ext.getCmp('btn_before_port').setDisabled(false);
			}
			// 转码
			nodeText = encodeURIComponent(encodeURIComponent(nodeText));
			var urlForm = basePath + 'runqian/reportJsp/gdlgz/gdlgz.jsp?fileName='+nodeText+'&guid='+nodeId+'&swidth='+pageWidth+'&sheight='+pageHeight;
			document.getElementById('report_iframe').src = urlForm;
		}else{
			grid.show();
			store.load({
				params : {
					id : nodeId,
					start : 0, 
					limit : 15
				}
			});
		}
		centerPanel.doLayout();
	}
	
	function toolBarDisabled(disFlag){
		Ext.getCmp('btn_add').setDisabled(disFlag);
		Ext.getCmp('btn_edit').setDisabled(disFlag);
		Ext.getCmp('btn_delete').setDisabled(disFlag);
		Ext.getCmp('btn_import').setDisabled(disFlag);
		Ext.getCmp('btn_export').setDisabled(disFlag);
	}
	
	var reportFrame = new Ext.Panel({
		id : 'reportFrame',
		split : true,
		border : false,
		region : 'center',
		layout:'fit',
	    height : document.documentElement.offsetHeight - 22,
	    defaults:{
	    	columnWidth:1
	    },
		autoScroll : true,tbar : [{
			id : 'btn_del_port',
			text : '删除',
			tooltip : '删除报表信息',
			iconCls : 'remove',
			handler : btn_del_port
		}, {
			id : 'btn_save_port',
			text : '保存',
			tooltip : '保存报表信息',
			iconCls : 'save',
			handler : btn_save_port
		}, {
			id : 'btn_import_port',
			text : '导入',
			tooltip : '导入报表信息',
			iconCls : 'llxs-import',
			handler : btn_import_port
		}, {
			id : 'btn_export_port',
			text : '导出',
			tooltip : '导出报表信息',
			iconCls : 'llxs-export',
			handler : btn_export_port
		}, {
			id : 'btn_before_port',
			text : '预评估',
			tooltip : '预评估报表信息',
			iconCls : 'accept',
			handler : btn_before_port
		}, {
			id : 'btn_after_port',
			text : '后评估',
			tooltip : '后评估报表信息',
			iconCls : 'accept',
			handler : btn_after_port
		}],
		html : '<iframe id="report_iframe" frameborder=0 scrollbars=yes height="100%" width="100%" src=""></iframe>'
	  });
	
	var centerPanel = new Ext.Panel({
		id : 'centerPanel',
		split : true,
		border : false,
		frame : true,
		region : 'center',
		collapseMode : 'mini',
	    layout:'column',
	    autoScroll : true, // 自动显示滚动条
	    defaults:{
	    	columnWidth:1
	    },
	    margins : '2 0 2 1',
	    activeItem : 0,
	    items: [grid, reportFrame]
	});
	
	//删除报表信息
	function btn_del_port(){
		var currentNode = treePanel.getSelectionModel().selNode;
		var parentNode = currentNode.parentNode;
		parentNode.removeChild(currentNode);
		Ext.MessageBox.confirm('系统确认', '你确认要删除这些数据吗？', function(btn) {
			var nodeId = "";
			var parantName = "";
			if (btn == "yes") {
				nodeId = "'" + currentNode.id + "'";
				parantName = parentNode.text;
			}
			Ext.Ajax.request({
				 url : 'pmv/energySave/delData.do',
				 method : 'post',
				 params : {
					 guid : nodeId,
					 nodeName : parantName
				 },
				 success : function(response,options) {
					 var res = Ext.util.JSON.decode(response.responseText);
					 var fh = res.success;
					 if(fh == 'success'){
					 	 Ext.MessageBox.alert('系统提示','删除成功!');
					 	 var getPath = parentNode.getPath();
			    		 treePanel.selectPath(getPath,null,function(bSuccess,bNode){
			                 bNode.fireEvent("click",bNode);
			    		 });
					 }
				 }
			 });
		});
	}
	//保存报表信息
	function btn_save_port(){
		savePort();
	}
	//导入报表信息
	function btn_import_port(){
		
	}
	//导出报表信息
	function btn_export_port(){
		
	}
	//预评估报表信息
	function btn_before_port(){
		pgPort('预评估');
	}
	//后评估报表信息
	function btn_after_port(){
		pgPort('后评估');
	}
	
	function pgPort(btnName){
		var currentNode = Ext.getCmp('treePanel').getSelectionModel().selNode;
		var nodeText = currentNode.parentNode.text;
		nodeText += btnName;
		// 转码
		nodeText = encodeURIComponent(encodeURIComponent(nodeText));
		var urlForm = basePath + 'runqian/reportJsp/gdlgz/gdlgz.jsp?fileName='+nodeText+'&guid='+nodeId+'&swidth='+pageWidth+'&sheight='+pageHeight;
		document.getElementById('report_iframe').src = urlForm;
	}
	
	var viewPort = new Ext.Viewport({
		layout : 'border',
		items : [treePanel, centerPanel]
	});
});
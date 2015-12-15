/**
 * 工程任务-页面表格
 * */
var dataGrid = new Ext.ux.BDGrid({
	id : 'dataGrid',
	region : "center",
	detailView : false,
	listeners : {
		render : function() {
			for (var i = 0; i < 13; i++) {
				this.getTopToolbar().items.items[i].hide();
			};
			
			//定制按钮
			Ext.app.addSearchBtn(dataGrid);
			Ext.app.addAddBtn(dataGrid);
			Ext.app.addModifyBtn(dataGrid);
			Ext.app.addDelBtn(dataGrid);
			Ext.app.searchGrid();
		},
		beforeedit : function(jq,index) {
			return false;
		},
		aftersave : function(){
			dataGrid.store.reload();
		},
		afterdelete : function(){
			dataGrid.store.reload();
		}
	}
});

/**
 * 页面显示
 * */ 
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [ dataGrid ]
});

var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			for (var i = 9; i < 13; i++) {
				this.getTopToolbar().items.items[i].hide();
			};
			Ext.each(Ext.app.gridBtn, function(btn) {
				dataGrid.getTopToolbar().add(btn);
				dataGrid.getTopToolbar().add("-");
			});
			//设置默认值
			Ext.app.setDefaultValue();
			//加载数据表格
			var sql = "DEPT_CODE='"+deptguid+"'";
			this.loadData(Ext.app.appID, Ext.app.clsID,"","",sql);
		},
		afteredit : function(arg) {
			var vol = arg.field;
			//获得输入的导线型号值
			if(vol == "CONDUCTOR_TYPE"){
				var conductor_type = arg.record.data.CONDUCTOR_TYPE;
				Ext.app.conductorType = conductor_type;
				//调用请求后台方法
				Ext.app.dataJson();
			}
		},
		beforesave : function(a,b) {
			//新增
			if(b.adddata.length != 0){
				for(var j = 0; j < b.adddata.length; j++){
					//获得输入的几何均距
					var averagedistance = b.adddata[j].AVERAGEDISTANCE;
					//检查新增多条页面数据中同一导线型号下是否有重复几何均距数据
					for(var n = j+1; n < b.adddata.length; n++){
						if(averagedistance == b.adddata[n].AVERAGEDISTANCE){
							 Ext.MessageBox.alert('系统提示','几何均距输入的值重复，请您重新输入!');
							 return false;
						}
					}
					//检查数据表中同一导线型号下是否有重复几何均距数据
					if(Ext.app.data[0] != null && Ext.app.data[0] != undefined){
						for(var i = 0; i < Ext.app.data.length; i++){
							//获得数据表中返回的几何均距数据
							var averagedistance_db = Ext.app.data[i].AVERAGEDISTANCE;	
							if(averagedistance == averagedistance_db){
								Ext.MessageBox.alert('系统提示','该导线型号下几何均距输入的值已存在，请您重新输入!');
								return false;
							}
						}
					}
				}				
			}
			//修改
			if(b.edtdata.length != 0){
				for(var j = 0; j < b.edtdata.length; j++){
					/*//获得修改后的导线型号值
					var conductor_type = b.edtdata[j].CONDUCTOR_TYPE;
					Ext.app.conductorType = conductor_type;
					Ext.app.dataJson();*/
					
					//获得修改后的几何均距
					var averagedistance = b.edtdata[j].AVERAGEDISTANCE;
					
					//检查修改页面数据中是否有重复
					for(var n = j+1; n < b.edtdata.length; n++){
						if(averagedistance != undefined && b.edtdata[n].AVERAGEDISTANCE != undefined){
							if(averagedistance == b.edtdata[n].AVERAGEDISTANCE ){
								 Ext.MessageBox.alert('系统提示','几何均距修改的值重复或已存在，请重新修改!');
								 return false;
							}
						}
					}
					//检查修改时数据表中是否有重复数据	
					if(Ext.app.data[0] != null && Ext.app.data[0] != undefined){
						for(var i = 0; i < Ext.app.data.length; i++){
							var averagedistance_db = Ext.app.data[i].AVERAGEDISTANCE;	
							if(averagedistance == averagedistance_db){
								Ext.MessageBox.alert('系统提示','该导线型号下几何均距修改的值已存在，请您重新输入!');
								return false;
							}
						}
					}
				}				
			}	
		},
		aftersave : function() {
			this.getStore().reload();
		},
		afterdelete : function() {
			this.getStore().reload();
		}
	}
});

// 页面显示
var viewport = new Ext.Viewport({
	layout : "border",
	border : "center",
	items : [ dataGrid ]
});
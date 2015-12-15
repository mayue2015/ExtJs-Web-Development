var dataGrid = new Ext.ux.BDGrid({
	region : "center",
	detailView : false,
	listeners : {
		afterrender : function() {
			for (var i = 9; i < 13; i++) {
				this.getTopToolbar().items.items[i].hide();
			}
			Ext.each(Ext.app.gridBtn, function(btn) {
				dataGrid.getTopToolbar().add(btn);
				dataGrid.getTopToolbar().add("-");
			});
			
			// 设置默认值
			Ext.app.setDefaultValue();
			 
			// 加载数据表格
			var sql = "DEPT_CODE='"+deptguid+"'";
			this.loadData(Ext.app.appID, Ext.app.clsID,"","",sql);
		},
		beforeedit : function(arg) {
			var vol = arg.field;
			//获得选中的电压等级(编码)
			if(vol == "VOLTAGELEVEL"){
				//根据登录部门获取该部门维护的电压等级
				arg.fieldEditor.setFilter(" DEPT_CODE = '" + deptguid  + "'");
				//选中事件
				arg.fieldEditor.on('select',function(combo,record){
					var voltagelevel = record.data.value;
					Ext.app.voltagelevel = voltagelevel;
					Ext.app.dataJson();
				});
			}
		},
		beforesave : function(a,b) {
			//新增
			if(b.adddata.length != 0){
				for(var j = 0; j < b.adddata.length; j++){
					//获得当前输入的导线型号数据
					var conductor_type = b.adddata[j].CONDUCTOR_TYPE;
					//检查新增多条页面数据中同一电压等级下是否有重复数据
					for(var n = j+1; n < b.adddata.length; n++){
						if(conductor_type == b.adddata[n].CONDUCTOR_TYPE){
							 Ext.MessageBox.alert('系统提示','导线型号输入的值重复，请您重新输入!');
							 return false;
						}
					}
					//检查数据表中同一电压等级下是否有重复导线型号数据
					if(Ext.app.data[0] != null){
						for(var i = 0; i < Ext.app.data.length; i++){
							//获得数据表中返回的导线型号数据
							var conductor_type_db = Ext.app.data[i].CONDUCTOR_TYPE;	
							if(conductor_type == conductor_type_db){
								Ext.MessageBox.alert('系统提示','该电压等级下导线型号输入的值已存在，请您重新输入!');
								return false;
							}
						}
					}
				}				
			}
			//修改
			if(b.edtdata.length != 0){
				for(var j = 0; j < b.edtdata.length; j++){
					var record = this.getStore().getModifiedRecords();
					var conductor_type = record[j].get('CONDUCTOR_TYPE');//b.edtdata[j].CONDUCTOR_TYPE;
					//检查修改页面数据中是否有重复
					for(var n = j+1; n < b.edtdata.length; n++){
						if(conductor_type != undefined && b.edtdata[n].CONDUCTOR_TYPE != undefined){
							if(conductor_type == b.edtdata[n].CONDUCTOR_TYPE ){
								 Ext.MessageBox.alert('系统提示','导线型号修改的值重复或已存在，请重新修改!');
								 return false;
							}
						}
					}
					//检查修改时数据表中是否有重复数据	
					if(Ext.app.data[0] != null){
						for(var i = 0; i < Ext.app.data.length; i++){
							var conductor_type_db = Ext.app.data[i].CONDUCTOR_TYPE;	
							if(conductor_type == conductor_type_db){
								Ext.MessageBox.alert('系统提示','该电压等级下导线型号修改的值已存在，请您重新输入!');
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
		afterdelete : function(a,b){
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
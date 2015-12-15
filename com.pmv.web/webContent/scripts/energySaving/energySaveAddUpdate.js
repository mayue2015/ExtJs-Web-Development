$import("planning/scripts/common/validForm.js")
Ext.onReady(function() {
	var form = new Ext.form.FormPanel({
		id : 'form',
		labelAlign : 'right',// 文本文字 的对齐方式
		region : 'center',
	    labelWidth: 75, 
	    frame: true,
	    border: true,
	    margins : '2 0 2 1',
	    items : [{
	    	layout:'column',
	    	items :　[{
	    		columnWidth:1,
		    	layout:'column',
		        items: [{
		        	columnWidth:1,
			        layout: 'form',
			        border: false,
			        items:[{
		                xtype:'textfield',
		                id :　'name',
		                name: 'name',
		                fieldLabel: '<span style="color:red">*</span>项目名称',
		                value : name,
		                allowBlank : false,
		                anchor : '95%',
		                enableKeyEvents : true,
		                listeners:{
							'keyup':function(thisText, e){
								var thisValue = thisText.getValue();
								if(!validFormLength(thisValue, true, 50, '名称')){
									thisText.setValue('');
								}
							}
						}
		            },{
						xtype : 'datefield',
						id : 'date',
						name : 'date',
						fieldLabel : '<span style="color:red">*</span>创建时间',
						allowBlank : false,
						editable : false,
						value :new Date(),
						format : 'Y-m-d',
						anchor : '95%'
					},{
		                xtype:'textfield',
		                id :　'bigCode',
		                name: 'bigCode',
		                fieldLabel: '<span style="color:red">*</span>项目大类',
		                allowBlank : false,
		                disabled : true,
		                value : bigName,
		                anchor : '95%'
		            },{
		                xtype:'textfield',
		                id :　'smallCode',
		                name: 'smallCode',
		                fieldLabel: '<span style="color:red">*</span>项目小类',
		                allowBlank : false,
		                disabled : true,
		                value : smallName,
		                anchor : '95%'
		            }]
		        }]
	    	}],
	        buttons  : [{
	        	style : 'margin-bottom : 10px;',
	    		text : '保存',
	        	id : 'formSave',
	    		handler : formSave
	    	},{
	    		style : 'margin :0px,10px,10px,0px;',
	    		text : '取消',
	        	id : 'formCancel',
	    		handler : function() {
	    			window.close();
	    		}
	    	}]
	    }]
	});
	
	function formSave(){
		if(form.form.isValid()){
			Ext.Ajax.request({
				url:'pmv/energySave/formSaveData.do',
				method:'post',
				params:{
					id : id, 
					name : Ext.getCmp('name').getValue(),
					date : Ext.util.Format.date(Ext.getCmp('date').getValue(), 'Y-m-d'),
					bigCode : bigCode,
					smallCode : smallCode,
					smallName : smallName
				},
				success:function(response,options){
					var res = Ext.util.JSON.decode(response.responseText);
					var fh = res.success;
					if(fh == 'success'){
						var obj = new Object();
						obj.type = 'success';
						window.returnValue = obj;
						window.close();
					}else{
						Ext.MessageBox.alert('系统提示','数据保存时出错！');
					}
				}
    	   })
		}
	}
	
	var viewPort = new Ext.Viewport({
		layout : 'border',
		items : [form]
	});
});
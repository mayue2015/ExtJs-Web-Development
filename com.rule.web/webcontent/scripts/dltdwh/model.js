// 应用ID
Ext.app.appID = "F402E690-76E3-4309-81D3-3E831F2AD0DA";
// 类型ID
Ext.app.clsID = "C2356B84-3843-4292-AB98-E9DBC7C9F899";

/**
 * 电缆通道维护编辑窗口,新增、修改时根据type参数区分
 * 
 * @class Ext.app.EditWindow
 * @extend Ext.Window
 */
Ext.app.EditWindow = Ext.extend(Ext.Window, {
	border : false,
	modal : true,
//	padding : 10,
	/**
	 * 对象私有数据仓库,函数内部调用
	 * 
	 * @private
	 * @type {Ext.ux.BDDataSource}
	 */
	dataSource : undefined,
	/**
	 * 向窗口添加按钮
	 */
	addButtons : function() {
		var win = this;
		var saveBtn = new Ext.Button({
			text : "保存",
			iconCls : "save",
			handler : function() {
				var gxdwmc = '';
				if(type == 'new'){
					gxdwmc = Ext.getCmp('gxdw').getValue();
				}else if(type == 'update'){
					gxdwmc = win.dataSource.data.GXDW_DSPVALUE;
				}
				
				if(leftTree && leftTree.getSelectionModel().selNode){
					var selNode = leftTree.getSelectionModel().selNode;
					var nodeId = selNode.id;
					win.dataSource.setValue("GXDW", nodeId);
				}
				var dltdcd = Ext.getCmp('dltdcd').editor.activeError;
				var dltdks = Ext.getCmp('dltdks').editor.activeError;
				if(dltdcd != undefined&&dltdcd != ''){
					Ext.MessageBox.alert("提示信息","电缆通道长度不是有效数值");
					return;
				}
				if(dltdks != undefined&&dltdks != ''){
					Ext.MessageBox.alert("提示信息","电缆通道孔数不是有效数值");
					return;
				}
				
				win.dataSource.on("aftersave", function() {
					win.close();
					win.winArgs.grid.store.reload();
				});
				if(!validateDltdName(win.dataSource.data,gxdwmc,type)){
					return;
				}				
				win.dataSource.save();
			}
		});
		var returnBtn = new Ext.Button({
			text : "取消",
			icon : 'rule/public/images/cancel_2.png',
			handler : function() {
				win.close();
			}
		});
		this.buttonAlign = "center";
		this.buttons = [ saveBtn, returnBtn ];
	},

	/**
	 * 向窗口添加表单组件
	 */
	addFormPanel : function(nodeId) {
		var dataSource = this.dataSource;
		var hidden = this.winArgs.type == "update" ? true : false;
		
		var DLTDMC = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "DLTDMC",
			id:'dltdmc',
			fieldLabel : "<font color=red>*</font>电缆通道名称"
		});
		
		var GXDW = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "GXDW",			
			fieldLabel : "<font color=red>*</font>管辖单位"
		});
		if(nodeId){
			GXDW = new Ext.ux.BDField({
				dataSource : dataSource,
				columnName : "GXDW",
				id:'gxdw',
				fieldLabel : "<font color=red>*</font>管辖单位",
				value : nodeId
			});
		}
		
		var SSQY = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "SSQY",
			id:'ssqy',
			fieldLabel : "<font color=red>*</font>所属区域",
			afterRender : function(arg1,arg2,arg3,arg4){
				//afterRender:BDField组件渲染后事件
				//Combo下拉选添加过滤条件
				//where : USER_FILTER
				SSQY.editor.on('beforequery',function(editor,boundEl, value){
					editor.combo.userDefFilter = " C.GLDW = '"+Ext.app.nodeId+"' ";
				})
			}
		});
		
		var TDLX = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "TDLX",
			fieldLabel : "<font color=red>*</font>通道类型"
		});
		
		var DLTDCD = new Ext.ux.BDField({
			dataSource : dataSource,
					id : "dltdcd",
			columnName : "DLTDCD",
			fieldLabel : "电缆通道长度"
		});
		
		var DLTDKS = new Ext.ux.BDField({
			dataSource : dataSource,
				    id : "dltdks",
			columnName : "DLTDKS",
			fieldLabel : "电缆通道孔数"
		});
		
		var VOL_GRADE = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "VOL_GRADE",
			fieldLabel : "电压等级"
		});
		
		var FSRQ = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "FSRQ",
			fieldLabel : "敷设日期"
		});
		
		var BZ = new Ext.ux.BDField({
			dataSource : dataSource,
			columnName : "BZ",
			fieldLabel : "备注"
		});
		
		var formPanel = new Ext.ux.BDForm({
			border : false,
			frame : true,
//			autoHeight : true,
			height : 250,
			dataSource : dataSource,
			defaults : {
				border : false,
				layout : "column",
				defaults : {
					border : false,
					layout : "form"
				}
			},
			labelAlign : "right",
			labelWidth : 90,
			items : [{
				height : 12
				
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ DLTDMC ]
				}, {
					columnWidth : 0.5,
					items : [ GXDW ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ SSQY ]
				}, {
					columnWidth : 0.5,
					items : [ TDLX ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ DLTDCD ]
				}, {
					columnWidth : 0.5,
					items : [ DLTDKS ]
				} ]
			}, {
				items : [ {
					columnWidth : 0.5,
					items : [ VOL_GRADE ]
				}, {
					columnWidth : 0.5,
					items : [ FSRQ ]
				} ]
			}, {
				items : [ {
					columnWidth : 1,
					items : [ BZ ]
				} ]
			} ]
		});
		
		this.add(formPanel);
		this.doLayout();
	},

	/**
	 * 组件初始化
	 */
	initComponent : function() {
		var win = this;
		var winArgs = this.winArgs;
		type = winArgs.type;
		appID = winArgs.appID;
		clsID = winArgs.clsID;
		objID = winArgs.objID;
		var dataSource = new Ext.ux.BDDataSource({
			appID : appID,
			clsID : clsID
		});
		this.dataSource = dataSource;
		
		// 增加
		if (type == "new") {
			dataSource.create();
			dataSource.on("aftercreate", function(g, p) {
				var selNode = leftTree.getSelectionModel().selNode;
				var nodeId = selNode.text;
				// 写入数据
				win.addFormPanel(nodeId);
				
			});
		}
		// 修改
		if (type == "update") {
			dataSource.loadData(objID, clsID);
			dataSource.on("afterload", function(g, p) {
				win.addFormPanel();				
			});
		}
		this.addButtons();
		Ext.app.EditWindow.superclass.initComponent.call(this);
	}	
});

function validateDltdName(datas,gxdwmc,type){
	 if (window.ActiveXObject) {
	        obj = new ActiveXObject('Microsoft.XMLHTTP');
	    } else if (window.XMLHttpRequest) {
	        obj = new XMLHttpRequest();
	    }
	    var url = 'rule/dltdwhAction/validateName.do';
	    var data = "name="+datas.DLTDMC+"&ssqy="+datas.SSQY+
	    "&gxdw="+datas.GXDW+"&type="+type+"&guid="+datas.GUID;			
	    obj.open('post', url, false);
	    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    obj.send(data);   
	    value = obj.responseText;			
		var text = Ext.util.JSON.decode(value);
		if(type == 'new'){
			if(text.count > 0){
				Ext.MessageBox.alert('系统提示',"在管辖单位："+gxdwmc+"，所属区域："+datas.SSQY_DSPVALUE+"中,电缆通道名称："+datas.DLTDMC+"已存在!");
				return false;
			}			
		}else if(type == 'update'){
			if(text.count > 0){
				Ext.MessageBox.alert('系统提示',"在管辖单位："+gxdwmc+"，所属区域："+datas.SSQY_DSPVALUE+"中,电缆通道名称："+datas.DLTDMC+"已存在!");
				return false;
			}	
		}
		return true;
}

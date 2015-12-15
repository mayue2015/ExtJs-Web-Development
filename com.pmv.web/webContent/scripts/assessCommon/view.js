var gridHeight = document.documentElement.offsetHeight-30;
var store = new Ext.ux.maximgb.tg.AdjacencyListStore({
          　 　reader: new Ext.data.JsonReader({id: '_id'}, record),
          　 　proxy: new Ext.data.HttpProxy({
        	  url: dataUrl
          　　 })
});
// 加载数据前事件
store.on('beforeload', function() {
	// 页面参数
	var con_value = document.getElementById("conValue").value;
	var radios = document.getElementsByName("con");
	var con_type = '';
	for(var i=0;i<radios.length;i++){
        if(radios[i].checked){
        	con_type = radios[i].value;
            break;
        }
    }
	// 传递参数
	var _params;
	_params = {
		"versionId" : versionId,
		"con_type" : con_type,
		"con_value" : con_value
	}
	this.baseParams = _params;
});

var selectModel = new Ext.grid.RowSelectionModel({
	checkOnly : false,
	listeners : {
		 selectionchange : function() {
			 refreshRightPage();
		 }
	}
});

/**
 * 刷新右方页面
 * @returns
 */
function refreshRightPage(){
	if(assessType != 'disTra') {
		var grid = Ext.getCmp('mainGrid');
		var record = grid.getSelectionModel().getSelected();
		if(record == undefined){
			return;
		}else {
			var _parent = record.get('_parent');
			if(_parent != null)
				return;
		}
	}
	
	Ext.getCmp('radarDivs').show();
	Ext.app.radarChars(chartList);
	document.getElementById("line").src = linePath;
	waitForload();
}

/**
 * 刷新整个页面
 * @returns
 */
function refreshMainPage(){
	Ext.getCmp('mainGrid').getStore().removeAll();
	Ext.getCmp('mainGrid').getStore().load();
	Ext.getCmp('radarDivs').hide();
	document.getElementById("line").src ='';
}

//延迟加载，等到子页面加载后 赋值
function waitForload(){
	if (document.getElementById("line").readyState=='complete'&&document.getElementById("line").src!='') {
		var grid = Ext.getCmp('mainGrid');
		var record = grid.getSelectionModel().getSelected();
		var power_supply = record.get('power_supply');
		var devId = record.get('_id');
		var childWindow = document.getElementById("line").contentWindow;
		childWindow.document.getElementById("dev_name").innerHTML = record.get('dev_name');
		var cols = rightTableStr.split(",");
		var colstr = '';
		var code_value = '';
		for (var i = 0; i < cols.length; i++) {
			var key = cols[i].split("@")[1];
			var value  = record.get(key);
			if (value.indexOf('@')!=-1) {
				colstr = colstr+','+key+'@'+value.split('@')[0];
			}
		}
		if (colstr!='') {
			colstr=colstr.substring(1);
		}
		Ext.Ajax.request({
			method : "POST",
			params : {devId:devId,assessType:assessType,versionId:versionId,power_supply:power_supply,colstr:colstr},
			url : "pmv/disTraAssessARAction/queryDataForRightDownTable.do",
			async : false,
			success : function(response) {
				var res = Ext.util.JSON.decode(response.responseText);
				var total = res;
				if (res!=undefined&&res!='') {
					for (var i = 0; i < res.length; i++) {
						var list = res[i];
						var key = list.COLNAME;
						childWindow.document.getElementById(key+'@zbz').innerHTML = list.COLVALUE;
						childWindow.document.getElementById(key+'@ckz').innerHTML = list.ASS_STA_VALUE;
						childWindow.document.getElementById(key+'@jg').innerHTML = list.ASS_RESULT;
						childWindow.document.getElementById(key+'@jygzcs').innerHTML = list.ASS_REFORM;
						if (list.ASS_REFORM) {
							childWindow.document.getElementById(key+'@gjcs').style.hidden = true;
						}
					}
				}
			},
			failure : function() {
				Ext.MessageBox.alert("提示", "更改失败！");
				return false;
			}
		});
	}else {
		setTimeout('waitForload()',100);
	}
}

var linePath = basePath+'pmv/webViews/assessCommon/assessDetail.jsp?rightTableStr='+encodeURIComponent(encodeURIComponent(rightTableStr));
var grid = new Ext.ux.maximgb.tg.GridPanel({
			  id  : 'mainGrid',
			  region : 'center',
			  height:gridHeight,
		      store: store,
		      master_column_id : 'dev_name',
		      columns: cm,
		      stripeRows: true,
		      sm : selectModel,
		      viewConfig : {
		      		enableRowBody : true
		      }
});

/**
 * 评估
 * @returns
 */
function energyAssessment(){
	if (versionId==''||versionId==undefined) {
		Ext.MessageBox.alert("提示", "请先选择工程再进行评估！");
		return false;
	}
	Ext.Ajax.request({
		method : "POST",
		params : {assessType:assessType,versionId:versionId},
		url : "pmv/disTraAssessARAction/energyAssessmentPublic.do",
		success : function(response) {
			var res = response.responseText;
			if (res.success = 'success') {
				Ext.MessageBox.alert("提示", "操作成功！",function(){
					store.load();
				});
				return false;
			}else if (res.success = 'lack') {
				Ext.MessageBox.alert("提示", "请先进行配变评估！");
				return false;
			}else {
				Ext.MessageBox.alert("提示", "操作失败！");
				return false;
			}
		},
		failure : function() {
			Ext.MessageBox.alert("提示", "更改失败！");
			return false;
		}
	});
}

var mainPanelToolbar = new Ext.Toolbar({  
	id:'mainPanelToolbar',
    items:[{
				text:'能效评估',
				iconCls:'edit',
				handler:function(){energyAssessment();}
			}]  
}); 
var searchBar = new Ext.Button({
								   text:'查询',
								   iconCls:'search',
								   handler:function(){refreshMainPage();}
							   });
mainPanelToolbar.add("->");
mainPanelToolbar.add("<div style = 'height:25px;'><input type='radio' name='con' value='1' checked='checked' />"+condisionList[0]+"<input type='radio' name='con' value='2' />"+condisionList[1]+"</div>");
mainPanelToolbar.add("<input id = 'conValue' value = '' style='width:100'/>");
mainPanelToolbar.add(searchBar);
mainPanelToolbar.add("<div style = 'padding-left:200;'>"+unitStr+"</div>");

var line = '<iframe id="line" frameborder=0 src="" style="width:100%;height:'+(gridHeight/2-5)+'"></iframe>';


var mainPanel = new Ext.Panel({
	layout : "border",
	region : 'center',
	tbar:mainPanelToolbar,
	border : false,
	bodyBorder : false,
	items:[grid, new Ext.Panel({
						layout : "border",
						region : 'east',
						width  : 300,
						bodyStyle : 'background : white;',
				        items:[new Ext.Panel({
				        				id : 'radarDivs',
				        				region : 'north',
				        				border : false,
										height : gridHeight/2
							   }),
							   new Ext.Panel({
								   		region : 'center',
										html   : line
							   })]
				 })
	]
});

// 工程导航树
var projectNavTree = new Ext.tree.TreePanel({
	region : "west",
	width : "150",
	split : true,
	service : "project_Nav_Tree_Service",
	plugins : [ new Bp.plugin.TreePanel() ],
	listeners : {
		click : function(node) {
			if (node.attributes.attr) {
				versionId = node.id;
				refreshMainPage();
			}
		}
	}
});
/**
 * 页面显示
 */
var viewport = new Ext.Viewport({
	layout : "border",
	items : [ projectNavTree,mainPanel]
});
	

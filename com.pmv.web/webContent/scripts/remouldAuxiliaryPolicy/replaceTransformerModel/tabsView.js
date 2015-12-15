/**
 * 工程费用
 * */
var projectCostPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceTransformerModel/projectCost.jsp';
var projectCost = '<iframe id="projectCost" frameborder=0 src='+projectCostPath+' style="width:100%;height:250;"></iframe>';

/**
 * 节电量
 * */
var saveElectricityPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceTransformerModel/saveElectricity.jsp';
var saveElectricity = '<iframe id="saveElectricity" frameborder=0 src='+saveElectricityPath+' style="width:100%;height:260;"></iframe>';

/**
 * 总投资收益
 * */
var roitPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceTransformerModel/roi.jsp';
var roi = '<iframe id="roi" frameborder=0 src='+roitPath+' style="width:100%;height:260;"></iframe>';

Ext.app.projectCost = new Ext.Panel({
	html : projectCost
});

Ext.app.saveElectricity = new Ext.Panel({
	html : saveElectricity
});

Ext.app.roi = new Ext.Panel({
	html : roi
});

/**
 * 更换配变型号-Tab页展示
 * */
var tabPanel = new Ext.TabPanel({
	id : 'tabPanel',
	border : false,
	bodyBorder : false,
//	activeTab : 1,
	region : "south",
	height : document.documentElement.offsetHeight/3+100,
	hideBorders: true,
	autoScroll : true,
	listeners:{
		tabchange : function(tabPanel, tab){
			var record = Ext.app.caseDataGrid.getSelectionModel().getSelections();
			if (record.length == 0) {
				Ext.Msg.alert('系统提示', '请选择一行数据!');
				Ext.app.tabPanel.setActiveTab(0);
				return;
			};
			if(tab.title == '<div><font color=red>计算</font><div>'){
				Ext.app.calculate();
			}else if(tab.title == "工程费用") {
				var record = Ext.app.caseDataGrid.getSelectionModel().getSelected();
				Ext.app.record = record;
				var util =new Bp.util.RequestUtils();
				var res = Ext.decode(util.sendRequest('pmv/reTransformerModelAction/getCostData.do',{
					assSvcId : record.data["GUID"]
				}));
				if (res != undefined && res.success) {
					var ass_model = Ext.app.getComboText(caseDataGrid,'ASS_MODEL');
					var ass_ref_model = Ext.app.getComboText(caseDataGrid,'ASS_REF_MODEL');
					var title = record.data["ASS_REF_NAME"]+'('+record.data["ASS_KVA"]+'kVA),型号由'+ass_model+'改造为'+ass_ref_model+'。';
					title = encodeURIComponent(encodeURIComponent(title));
					Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceTransformerModel/projectCost.jsp';
					Ext.app.projectCostsrc += '?title='+title+'&costBuilding='+res.data.costBuilding+'&costInstall='+res.data.costInstall+'&costEquipment='+res.data.costEquipment
					  				+'&costOthers='+res.data.costOthers+'&costStatic='+res.data.costStatic+'&costDynamic='+res.data.costDynamic;
					if(document.getElementById('projectCost') != null){
						document.getElementById('projectCost').src=Ext.app.projectCostsrc;
					}
				}else{
					if(document.getElementById('projectCost') != null){
						document.getElementById('projectCost').src='';
					}
				}
			}else if(tab.title == "节电量") {
				var record = Ext.app.caseDataGrid.getSelectionModel().getSelected();
				Ext.app.record = record;
				var util =new Bp.util.RequestUtils();
				var num = Ext.app.record.data["ASS_SVC_NUM"];
				var res = Ext.decode(util.sendRequest('pmv/reTransformerModelAction/getSaveElectricity.do',{
					assSvcId : Ext.app.record.data["GUID"]
				}));
//				var model = record.data["ASS_MODEL"];
//				var _model = Ext.app.setComboValue(model,Ext.app.SVCModel);
//				if(_model!=undefined){
//					model = _model
//				}
				var ass_model = Ext.app.getComboText(caseDataGrid,'ASS_MODEL');
				var ass_ref_model = Ext.app.getComboText(caseDataGrid,'ASS_REF_MODEL');
				var title = record.data["ASS_REF_NAME"]+'('+record.data["ASS_KVA"]+'kVA),型号由'+ass_model+'改造为'+ass_ref_model+'。';
				title = encodeURIComponent(encodeURIComponent(title));
				if (res != undefined && res.success) {
					Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceTransformerModel/saveElectricity.jsp';
					Ext.app.saveElectricitysrc += '?title='+title+'&guid='+res.data.guid+'&base_model='+res.data.base_model+'&base_capacity='+res.data.base_capacity
						+'&base_unload_lost='+res.data.base_unload_lost+'&rep_model='+res.data.rep_model+'&rep_capacity='+res.data.rep_capacity+'&rep_unload_lost='
						+res.data.rep_unload_lost+'&rep_load_lost='+res.data.rep_load_lost+'&ave_load_rate='+res.data.ave_load_rate+'&y_save_kwh='+res.data.y_save_kwh
						+'&base_load_lost='+res.data.base_load_lost+'&assSvcId='+Ext.app.record.data["GUID"];
					if(document.getElementById('saveElectricity') != null){
						document.getElementById('saveElectricity').src=Ext.app.saveElectricitysrc;
					}
				}else{
					if(document.getElementById('saveElectricity') != null){
						document.getElementById('saveElectricity').src='';
					}
				}
			}else if(tab.title == "<font color=red>总投资收益率</font>") {
				var record = Ext.app.caseDataGrid.getSelectionModel().getSelected();
				Ext.app.record = record;
				var util =new Bp.util.RequestUtils();
				var res = Ext.decode(util.sendRequest('pmv/reTransformerModelAction/getRoiData.do',{
					assSvcId : Ext.app.record.data["GUID"]
				}));
				if (res != undefined && res.success) {
					Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceTransformerModel/roi.jsp';
					Ext.app.roisrc += '?assSvcId='+res.data.assSvcId+'&assElePrice='+res.data.assElePrice
						+'&assBldPeriod='+res.data.assBldPeriod+'&assConPeriod='+res.data.assConPeriod+'&assShrRatio='+res.data.assShrRatio
						+'&assCstService='+res.data.assCstService+'&assCstSvc='+res.data.assCstSvc+'&costStatic='+res.data.costStatic
						+'&costDynamic='+res.data.costDynamic+'&ySaveKwh='+res.data.ySaveKwh+'&ySaveIncome='+res.data.ySaveIncome
						+'&assCstOper='+res.data.assCstOper+'&assBldInterest='+res.data.assBldInterest+'&assExpense='+res.data.assExpense
						+'&assYIncome='+res.data.assYIncome+'&assCstManege='+res.data.assCstManege+'&assCstCom='+res.data.assCstCom
						+'&assCstMaintnc='+res.data.assCstMaintnc+'&assBenefit='+res.data.assBenefit+'&assCstInrate='+res.data.assCstInrate
						+'&versionId='+versionId;
					if(document.getElementById('roi') != null){
						document.getElementById('roi').src=Ext.app.roisrc;
					}
				}else{
					if(document.getElementById('roi') != null){
						document.getElementById('roi').src='';
					}
				}
			}
		},
		afterrender : function (){
			tabPanel.hideTabStripItem(0);
		}
	},
	items : [ {
		title : '',
		border : false,
		bodyBorder : false,
		items : []
	}, {
		title : '<div><font color=red>计算</font><div>',
		border : false,
		bodyBorder : false,
		items : [  ]
	}, {
		title : "展示图",
		border : false,
		bodyBorder : false,
		items : [  ]
	}, {
		title : "工程费用",
		border : false,
		bodyBorder : false,
		autoScroll : true,
		items : [ Ext.app.projectCost ]
	}, {
		title : "节电量",
		border : false,
		bodyBorder : false,
		autoScroll : true,
		items : [ Ext.app.saveElectricity ]
	}, {
		title : '<font color=red>总投资收益率</font>',
		border : false,
		bodyBorder : false,
		autoScroll : true,
		items : [ Ext.app.roi ]
	}, {
		title : '<font color=#FFA500>【多工程分析】</font>',
		border : false,
		bodyBorder : false,
		items : [  ]
	} 
	]
});
Ext.app.tabPanel = tabPanel;
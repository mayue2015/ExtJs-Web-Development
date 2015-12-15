Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
//工程费用
var projectCostPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/projectCost.jsp';
var projectCost = '<iframe id="projectCost" frameborder=0 src='+Ext.app.projectCostsrc+' style="width:100%;height:250;"></iframe>';

Ext.app.projectCost = new Ext.Panel({
	html : projectCost
});

//节电量
var saveElectricityPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/saveElectricity.jsp';
var saveElectricity = '<iframe id="saveElectricity" frameborder=0 src='+Ext.app.saveElectricitysrc+' style="width:100%;height:250;"></iframe>';

Ext.app.saveElectricity = new Ext.Panel({
	html : saveElectricity
});

//总投资收益
var roitPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/roi.jsp';
var roi = '<iframe id="roi" frameborder=0 scrolling="no" src='+Ext.app.roisrc+' style="width:100%;height:260;"></iframe>';

Ext.app.roi = new Ext.Panel({
	html : roi
});

var tabPanel = new Ext.TabPanel({
	id : 'tabPanel',
	border : false,
	bodyBorder : false,
//	activeTab : 0,
	region : "south",
	height : document.documentElement.offsetHeight/3+100,
//	height : 200,
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
			if(tab.title == "<div><font color=red>计算</font><div>"){
				Ext.app.calculate();
			}else if(tab.title == "工程费用") {
				var util =new Bp.util.RequestUtils();
				var num = Ext.app.record.data["ASS_SVC_NUM"];
				var res = Ext.decode(util.sendRequest('pmv/reactivePowerOptimizationController/getCostData.do',{
					assSvcId : Ext.app.record.data["GUID"]

				}));
				if (res != undefined && res.success) {
					var record = Ext.app.caseDataGrid.getSelectionModel().getSelected();
					Ext.app.record = record;
					var model = record.data["ASS_MODEL"];
					var _model = Ext.app.setComboValue(model,Ext.app.SVCModel);
					if(_model!=undefined){
						model = _model
					}
					var title = record.data["ASS_SVC_NAME"]+',功率因数有'+record.data["ASS_COS"]+'提高至'+record.data["ASS_REF_COS"]+'采用型号'+model+'无功补偿装置.'
					title = encodeURIComponent(encodeURIComponent(title));
						var num = record.data["ASS_SVC_NUM"];
						Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/projectCost.jsp';
						Ext.app.projectCostsrc += '?title='+title+'&costBuilding='+res.data.costBuilding+'&costInstall='+res.data.costInstall+'&costEquipment='+res.data.costEquipment
						+'&costOthers='+res.data.costOthers+'&costStatic='+res.data.costStatic+'&costDynamic='+res.data.costDynamic;
						if(document.getElementById('projectCost') != null){
							document.getElementById('projectCost').src=Ext.app.projectCostsrc;
						}
				}else{
					if(document.getElementById('projectCost') != null){
						document.getElementById('projectCost').src=basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/blank.jsp';
					}
				}
			}else if(tab.title == "节电量") {
				var util =new Bp.util.RequestUtils();
				var num = Ext.app.record.data["ASS_SVC_NUM"];
				var res = Ext.decode(util.sendRequest('pmv/reactivePowerOptimizationController/getSaveElectricity.do',{
					assSvcId : Ext.app.record.data["GUID"]
				}));
				var record = Ext.app.caseDataGrid.getSelectionModel().getSelected();
				Ext.app.record = record;
				var model = record.data["ASS_MODEL"];
				var _model = Ext.app.setComboValue(model,Ext.app.SVCModel);
				if(_model!=undefined){
					model = _model
				}
				var title = record.data["ASS_SVC_NAME"]+',功率因数有'+record.data["ASS_COS"]+'提高至'+record.data["ASS_REF_COS"]+'采用型号'+model+'无功补偿装置.'
				title = encodeURIComponent(encodeURIComponent(title));
				if (res != undefined && res.success) {
					var num = record.data["ASS_SVC_NUM"];
					Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/saveElectricity.jsp';
					Ext.app.saveElectricitysrc += '?title='+title+'&assSvcKva='+res.data.assSvcKva+'&assSvcTan='+res.data.assSvcTan+'&assSvcReq='+res.data.assSvcReq
							+'&assEquTime='+res.data.assEquTime+'&ySaveKwh='+res.data.ySaveKwh+'&versionId='+versionId+'&assSvcId='+Ext.app.record.data["GUID"]
							+'&assSvcProject='+Ext.app.record.data["ASS_SVC_PROJECT"];
					if(document.getElementById('saveElectricity') != null){
						document.getElementById('saveElectricity').src=Ext.app.saveElectricitysrc;
					}
				}else{
//					Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/saveElectricity.jsp';
//					Ext.app.saveElectricitysrc += '?title='+title+'&assSvcKva='+Ext.app.record.data["ASS_ALL_KVA"]+'&versionId='+versionId+'&assSvcId='+Ext.app.record.data["GUID"]
//						+'&assSvcProject='+Ext.app.record.data["ASS_SVC_PROJECT"];
					if(document.getElementById('saveElectricity') != null){
						document.getElementById('saveElectricity').src='';
					}
				}
			}else if(tab.title == "<font color=red>总投资收益率</font>") {
				var util =new Bp.util.RequestUtils();
				var res = Ext.decode(util.sendRequest('pmv/reactivePowerOptimizationController/getRoiData.do',{
					assSvcId : Ext.app.record.data["GUID"]
				}));
				if (res != undefined && res.success) {
					Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/reactivePowerOptimization/roi.jsp';
					Ext.app.roisrc += '?assSvcId='+res.data.assSvcId+'&assSvcProject='+res.data.assSvcProject+'&assElePrice='+res.data.assElePrice
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
	items : [ 
	          {
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
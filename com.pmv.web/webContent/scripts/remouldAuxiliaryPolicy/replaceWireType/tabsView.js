/**
 * 初始化空白JSP页面
 * */
Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';
Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';
Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';

/**
 * 工程费用-HTML
 * */
var projectCostPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/projectCost.jsp';
var projectCost = '<iframe id="projectCost" frameborder=0 src='+projectCostPath+' style="width:100%;height:275;"></iframe>';

/**
 * 节电量-HTML
 * */
var saveElectricityPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/saveElectricity.jsp';
var saveElectricity = '<iframe id="saveElectricity" frameborder=0 src='+saveElectricityPath+' style="width:100%;height:275;"></iframe>';

/**
 * 总投资收益-HTML
 * */
var roitPath = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/roi.jsp';
var roi = '<iframe id="roi" frameborder=0 src='+roitPath+' style="width:100%;height:275;"></iframe>';

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
 * 更换导线型号-计算Tab页
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
	items : [ {
		title : '',
		border : false,
		bodyBorder : false,
		items : []
	}, {
		title : '<font color=red>计算</font>',
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
	} ],
	listeners : {
		tabchange : function(tabPanel, tab){
			if(tab.title == "<font color=red>计算</font>"){
				Ext.app.calculate();
			}else if(tab.title == "工程费用") {
				var record = Ext.app.caseDataGrid.getSelectionModel().getSelections();
				if (record.length == 0) {
					Ext.Msg.alert('系统提示', '请选择一行数据!');
					Ext.app.tabPanel.setActiveTab(0);
					return;
				};
				
				var util = new Bp.util.RequestUtils();
				var res = Ext.decode(util.sendRequest('pmv/replaceWireTypeAction/getCostData.do',{
					assSvcId : Ext.app.record.data["GUID"]
				}));
				
				if (res != undefined && res.success) {
					var recordArr = caseDataGrid.getSelectionModel().getSelections();
					var record = recordArr[0];
					  
					var ass_model = Ext.app.getComboText(caseDataGrid,'ASS_MODEL');//改造前型号
					var ass_ref_model = Ext.app.getComboText(caseDataGrid,'ASS_REF_MODEL');//改造后型号
					  
					var title = record.data["LINE_NAME"]+'-'+record.data["ASS_REF_NAME"]+'('+record.data["ASS_REF_LONG"]+'km)，型号由'+ass_model+'改造为'+ass_ref_model+'。';
					title = encodeURIComponent(encodeURIComponent(title));
					  
					Ext.app.projectCostsrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/projectCost.jsp';
					
					Ext.app.projectCostsrc += '?title='+title+'&costBuilding='+res.data.costBuilding+'&costInstall='+res.data.costInstall+'&costEquipment='+res.data.costEquipment
					+'&costOthers='+res.data.costOthers+'&costStatic='+res.data.costStatic+'&costDynamic='+res.data.costDynamic;
					
					if(document.getElementById('projectCost') != null){
						document.getElementById('projectCost').src=Ext.app.projectCostsrc;
					}
				}else{
					if(document.getElementById('projectCost') != null){
						Ext.Msg.alert('系统提示', '请先进行计算!');
						Ext.app.tabPanel.setActiveTab(0);
						document.getElementById('projectCost').src=basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/blank.jsp';
					}
				}
			}else if(tab.title == "节电量") {
				var record = Ext.app.caseDataGrid.getSelectionModel().getSelections();
				if (record.length == 0) {
					Ext.Msg.alert('系统提示', '请选择一行数据!');
					Ext.app.tabPanel.setActiveTab(0);
					return;
				};
				
				var util =new Bp.util.RequestUtils();
				var res = Ext.decode(util.sendRequest('pmv/replaceWireTypeAction/getSaveElectricity.do',{
					assSvcId : Ext.app.record.data["GUID"]
				}));
				
				var recordArr = caseDataGrid.getSelectionModel().getSelections();
				var record = recordArr[0];
				var ass_model = Ext.app.getComboText(caseDataGrid,'ASS_MODEL');//改造前型号
				var ass_ref_model = Ext.app.getComboText(caseDataGrid,'ASS_REF_MODEL');//改造后型号
				  
				var title = record.data["LINE_NAME"]+'-'+record.data["ASS_REF_NAME"]+'('+record.data["ASS_REF_LONG"]+'km)，型号由'+ass_model+'改造为'+ass_ref_model+'。';
				title = encodeURIComponent(encodeURIComponent(title));
				
				if (res != undefined && res.success) {
					Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/saveElectricity.jsp';
					
					var ass_ref_project = Ext.app.record.data["ASS_REF_PROJECT"];
					ass_ref_project = encodeURIComponent(encodeURIComponent(ass_ref_project));
					Ext.app.saveElectricitysrc += '?title='+title+'&base_model='+ass_model+'&base_length='+res.data.base_length+'&base_r_cal='+res.data.base_r_cal
							+'&rep_model='+ass_ref_model+'&rep_r_cal='+res.data.rep_r_cal+'&run_time='+res.data.run_time+'&max_a='+res.data.max_a
							+'&ave_a='+res.data.ave_a+'&k='+res.data.k+'&y_save_kwh='+res.data.y_save_kwh+'&assSvcId='
							+Ext.app.record.data["GUID"]+'&assSvcProject='+ass_ref_project;
					
					if(document.getElementById('saveElectricity') != null){
						document.getElementById('saveElectricity').src=Ext.app.saveElectricitysrc;
					}
				}else{
					Ext.app.saveElectricitysrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/saveElectricity.jsp';
					
					Ext.app.saveElectricitysrc += '?title='+title+'&assSvcKva='+Ext.app.record.data["ASS_ALL_KVA"]+'&versionId='+versionId+'&assSvcId='+Ext.app.record.data["GUID"]
						+'&assSvcProject='+Ext.app.record.data["ASS_SVC_PROJECT"];
					
					if(document.getElementById('saveElectricity') != null){
						Ext.Msg.alert('系统提示', '请先进行计算!');
						Ext.app.tabPanel.setActiveTab(0);
						document.getElementById('saveElectricity').src = '';//Ext.app.saveElectricitysrc
					}
				}
			}else if(tab.title == "<font color=red>总投资收益率</font>") {
				var record = Ext.app.caseDataGrid.getSelectionModel().getSelections();
				if (record.length == 0) {
					Ext.Msg.alert('系统提示', '请选择一行数据!');
					Ext.app.tabPanel.setActiveTab(0);
					return;
				};
				
				var util =new Bp.util.RequestUtils();
				var res = Ext.decode(util.sendRequest('pmv/replaceWireTypeAction/getRoiData.do',{
					assSvcId : Ext.app.record.data["GUID"]
				}));
				if (res != undefined && res.success) {
					Ext.app.roisrc = basePath+'pmv/webViews/remouldAuxiliaryPolicy/replaceWireType/roi.jsp';
					
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
						Ext.Msg.alert('系统提示', '请先进行计算!');
						Ext.app.tabPanel.setActiveTab(0);
						document.getElementById('roi').src='';
					}
				}
			}
		},
		afterrender : function (){
			tabPanel.hideTabStripItem(0);
		}
	}
});
Ext.app.tabPanel = tabPanel;
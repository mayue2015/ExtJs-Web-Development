/**
 * 新建方案
 */
Ext.app.createCaseFun = function() {
	var url = basePath + "prediction/webViews/loadforecasting/totalloadforecasting/CaseWindow.jsp";
	var args = {
		type : 'create',
		versionId : versionId,//任务版本ID
		taskId : taskId//任务ID
	};
	var width = 310;
	var height = 100;
	var success = window.showModalDialog(url, args, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	if(success != undefined){
		Ext.getCmp('caseId').store.reload();
		Ext.getCmp('caseId').setValue(success);
	}
};

/**
 * 修改方案
 */
Ext.app.updateCaseFun = function() {
	var versionId = Ext.getCmp('caseId').getValue();
	var caseNameText = Ext.getCmp('caseId').getRawValue();
	var areaId = Ext.getCmp('areaId').getValue();
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择要修改的方案！");
		return;
	}
	
	var url = basePath + "prediction/webViews/loadforecasting/totalloadforecasting/CaseWindow.jsp";
	var args = {
		vaseValueName : caseNameText,
		faVersionId : versionId,
		taskId : taskId,//任务ID
		type : 'update'
	};
	var width = 310;
	var height = 100;
	var success = window.showModalDialog(url, args, "dialogWidth=" + width+ "px;dialogHeight=" + height + "px");
	if(success != undefined){
		Ext.getCmp('caseId').store.reload();
		Ext.getCmp('caseId').setValue(success);
	}
};

/**
 * 删除方案
 */
Ext.app.deleteCaseFun = function() {
	var versionId = Ext.getCmp('caseId').getValue();
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择要删除的方案！");
		return;
	}
	//删前确认信息
	Ext.Msg.confirm("确认信息", "您确定要删除所选择的方案吗？", function(button, text) {
		if (button == 'yes') {
			Ext.Ajax.request({
				url : 'prediction/queryForeCaseAction/deleteCase.do',
				params : {
					versionId : versionId//方案版本ID
				},
				async : false,//非异步请求
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						Ext.Msg.alert('系统提示', '删除成功！',function(){
							Ext.getCmp('caseId').setValue(res.versionId);
							Ext.getCmp('caseId').store.load({callback:function(){
								if (res.versionId=='') {
									Ext.getCmp('caseId').setRawValue(res.versionId);
									Ext.app.clearGridData();
								}
							}});
							
						});
					} else {
						Ext.Msg.alert('系统提示', '操作失败！');
					}
				}
			});
		}
	});
};

/**
 * 判断方案名称长度
 * */
function getLength() {
	var str = Ext.getCmp('caseName').value;
	
	var len = str.length;
	var reLen = 0; 
	for(var i = 0; i < len; i++) {        
		if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) { 
		//全角       
			reLen += 2;         
		} else { 
			 reLen++; 
		}
	} 
	if(reLen > 50){
	 	Ext.Msg.alert('系统提示','方案名称输入内容过长!');
	 	Ext.getCmp('caseName').value = '';
	 	return false;
	}
	return true;
}

/**
 * 新建/修改方案-保存
 */
Ext.app.saveCase = function(form,type,versionId,taskId,faVersionId) {
	if (!form.isValid()){
		Ext.Msg.alert('系统提示', '请填写方案名称信息！');
		return;
	}
	
	var str = Ext.getCmp('caseName').getValue();
	var len = str.length;
	var reLen = 0; 
	for(var i = 0; i < len; i++) {        
		if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) { 
		    //全角       
			reLen += 2;         
		} else { 
			reLen++; 
		}
	} 
	
	if(reLen > 50){
	 	Ext.Msg.alert('系统提示','方案名称输入内容过长!');
	 	Ext.getCmp('caseName').setValue('');
	 	return false;
	}else{
		var value = form.getValues();
		if(type == 'create'){
			Ext.Ajax.request({
				url : 'prediction/queryForeCaseAction/saveCaseName.do',
				method : 'post',
				params : {
					formValue : '[' + Ext.util.JSON.encode(value) + ']',
					userName :　 userguid,
					versionId : versionId, //任务versionId
					taskId : taskId //taskId
				},
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						Ext.Msg.alert('系统提示', '保存成功！', function() {
							window.returnValue = res.versionId;
							window.close();
						});
					} else {
						Ext.Msg.alert('系统提示', '保存失败！');
					}
				}
			});
		}else{
			Ext.Ajax.request({
				url : 'prediction/queryForeCaseAction/updateCaseName.do',
				method : 'post',
				params : {
					formValue : '[' + Ext.util.JSON.encode(value) + ']',
					faVersionId : faVersionId,//方案versionId
					taskId : taskId
				},
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					if (res.success) {
						Ext.Msg.alert('系统提示', '修改成功！', function() {
							window.returnValue = res.versionId;
							window.close();
						});
					} else {
						Ext.Msg.alert('系统提示', '操作失败！');
					}
				}
			});
		}
	}
};

/**
 * 设置推荐方案
 * */
Ext.app.forSetResultFun = function(){
	var versionId = Ext.getCmp('caseId').getValue();
	var areaId = Ext.getCmp('areaId').getValue();
	var success = false;
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择要设置推荐的方案！");
		return;
	}
	//请求后台处理
	Ext.Ajax.request({
		url : 'prediction/queryForeCaseAction/setSelectCase.do',
		method : 'post',
		params : {
			faVersionId : versionId//方案版本ID
		},
		async : false,
		success : function(response, options) {
			var res = Ext.decode(response.responseText);
			if (res.success) {
				Ext.Msg.alert('系统提示', '设置成功!',function(){
					Ext.getCmp('caseId').store.reload();
					Ext.getCmp('caseId').setValue(faVersionId);
				});
			} else {
				Ext.Msg.alert('系统提示', '设置失败!');
			}
		}
	});
}
//保存
Ext.app.forHisSave = function(){
	var success = false;
	var grid1Value = null;
	var grid3Value = null;
	var grid5Value = null;
	var grid6Value = null;
	var grid7Value = null;
	var grid8Value = null;
	var sseGmjjFore = null;
	var ssePowerFore = null;
	var sseLoadFore = null;
	
	var gridnum1 = nationalEconomyGrid.getStore().modified.slice(0).length;
	var gridnum5 = typicalDailyLoadGrid.getStore().modified.slice(0).length;
	var gridnum6 = annualAreaGrid.getStore().modified.slice(0).length;
	var gridnum7 = existingLargeUsersGrid.getStore().modified.slice(0).length;
	var gridnum8 = reportedLoadingLargeUsersGrid.getStore().modified.slice(0).length; 
	var gridnumGmjj = economicGrid.getStore().modified.slice(0).length;
	var gridnumZl = totalGrid.getStore().modified.slice(0).length;
	var gridnumFh = loadGrid.getStore().modified.slice(0).length;
	   
	if(  gridnum1==0
	   &&gridnum5 == 0 
	   &&gridnum6 == 0 
	   &&gridnum7 == 0 
	   &&gridnum8 == 0 
	   &&gridnumGmjj == 0 
	   &&gridnumZl == 0 
	   &&gridnumFh == 0 ){
		alert('数据没有变化,不需要保存!');
		return;
	}
	if(gridnum1> 0){
		grid1Value = montageData(nationalEconomyGrid,13);
	}
	if(gridnum5> 0){
		grid5Value = montageData(typicalDailyLoadGrid,10);
	}
	if(gridnum6> 0){
		grid6Value = montageData(annualAreaGrid,11);
	}
	if(gridnum7> 0){
		grid7Value = montageData(existingLargeUsersGrid,8);
	}
	if(gridnum8> 0){
		grid8Value = montageData(reportedLoadingLargeUsersGrid,8);
	}
	if(gridnumGmjj> 0){
		sseGmjjFore = montageData(economicGrid,11);
	}
	if(gridnumZl> 0){
		ssePowerFore = montageData(totalGrid,4);
	}
	if(gridnumFh> 0){
		sseLoadFore = montageData(loadGrid,4);
	}

	Ext.Ajax.request({
		type: "POST",
		url:"prediction/selectForeCaseMethodAction/infoForeSave.do",
		params:{
	        grid1Value : encodeURI(grid1Value),
	        grid3Value : encodeURI(grid3Value),
	        grid5Value : encodeURI(grid5Value),
	        grid6Value : encodeURI(grid6Value),
	        grid7Value : encodeURI(grid7Value),
	        grid8Value : encodeURI(grid8Value),
	        sseGmjjFore : encodeURI(sseGmjjFore),
	        ssePowerFore : encodeURI(ssePowerFore),
	        sseLoadFore : encodeURI(sseLoadFore),
	        faVersionId : Ext.getCmp('caseId').getValue(),
	        faAreaId : Ext.getCmp('areaId').getValue(),
	 		flag : "save"
		},
		async: false,
		success: function(response, opts) {
			var json = response.responseText;
			if(json =="success"){
    			alert("保存成功!");
    			Ext.app.refreshData();
    		}else{
			    alert("保存失败!");
		    }
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}

/**
 * 选择预测方法
 */
Ext.app.forSelectMethod = function(){
	var versionId = Ext.getCmp('caseId').getValue();
	var areaId = Ext.getCmp('areaId').getValue();
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择方案！");
		return;
	}
	var winParams = "dialogWidth:200px;dialogHeight:400px;toolbar=no;menubar=no;scrollbars=yes;resizable=no;location=no;status=no";
	var returnValue = window.showModalDialog(basePath+"prediction/webViews/loadforecasting/totalloadforecasting/selectMethod.jsp",
			{epmv:Ext.getCmp('economicPredictionMethodValue').getValue(),
			 tpmv:Ext.getCmp('totalPredictionMethodValue').getValue(),
			 lpmv:Ext.getCmp('loadPredictionMethodValue').getValue(),
			 faVersionId:Ext.getCmp('caseId').getValue(),
			 faAreaId:Ext.getCmp('areaId').getValue()}, 
			winParams);
	if (returnValue!=undefined) {
		Ext.getCmp('economicPredictionMethod').setValue(returnValue.epm);
		Ext.getCmp('economicPredictionMethodValue').setValue(returnValue.epmv);
		Ext.getCmp('totalPredictionMethod').setValue(returnValue.tpm);
		Ext.getCmp('totalPredictionMethodValue').setValue(returnValue.tpmv);
		Ext.getCmp('loadPredictionMethod').setValue(returnValue.lpm);
		Ext.getCmp('loadPredictionMethodValue').setValue(returnValue.lpmv);
	}
}

/**
 * 进行预测
 * @param type 1 国民经济预测 2 总量预测 3 负荷预测 4 一键预测
 * @returns
 */
Ext.app.calculate = function calculate(type){
	var versionId = Ext.getCmp('caseId').getValue();
	var areaId = Ext.getCmp('areaId').getValue();
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择方案！");
		return;
	}
	var needSave = false;
	var gridnum1 = nationalEconomyGrid.getStore().modified.slice(0).length;
	var gridnum3 = industryAnnualGrid.getStore().modified.slice(0).length;
	var gridnum5 = typicalDailyLoadGrid.getStore().modified.slice(0).length ;
	var gridnum6 = annualAreaGrid.getStore().modified.slice(0).length ;
	var gridnum7 = existingLargeUsersGrid.getStore().modified.slice(0).length; 
	var gridnum8 = reportedLoadingLargeUsersGrid.getStore().modified.slice(0).length ; 
	var gridnumGmjj = economicGrid.getStore().modified.slice(0).length ;
	var gridnumZl = totalGrid.getStore().modified.slice(0).length ;
	var gridnumFh = loadGrid.getStore().modified.slice(0).length ;
	   
	if(  !(gridnum1==0
	   &&gridnum3 == 0 
	   &&gridnum5 == 0 
	   &&gridnum6 == 0 
	   &&gridnum7 == 0 
	   &&gridnum8 == 0 
	   &&gridnumGmjj == 0 
	   &&gridnumZl == 0 
	   &&gridnumFh == 0) ){
		needSave = true;
	}

	var grid1Value = montageData(nationalEconomyGrid,13);
	var grid3Value = montageData(industryAnnualGrid,6);
	var grid5Value = montageData(typicalDailyLoadGrid,10);
	var grid6Value = montageData(annualAreaGrid,11);
	var grid7Value = montageData(existingLargeUsersGrid,8);
	var grid8Value = montageData(reportedLoadingLargeUsersGrid,8);
	var sseGmjjFore = montageData(economicGrid,11);
	var ssePowerFore = montageData(totalGrid,4);
	var sseLoadFore = montageData(loadGrid,4);
	
	Ext.Ajax.request({
		type: "POST",
		url:"prediction/selectForeCaseMethodAction/infoForeSave.do",
		params:{
	        grid1Value : encodeURI(grid1Value),
	        grid3Value : encodeURI(grid3Value),
	        grid5Value : encodeURI(grid5Value),
	        grid6Value : encodeURI(grid6Value),
	        grid7Value : encodeURI(grid7Value),
	        grid8Value : encodeURI(grid8Value),
	        sseGmjjFore : encodeURI(sseGmjjFore),
	        ssePowerFore : encodeURI(ssePowerFore),
	        sseLoadFore : encodeURI(sseLoadFore),
	        flag : '4',
	        dataStatus : needSave,
	        faVersionId : versionId,
	        faAreaId : areaId
		},
		async: false,
		success: function(response, opts) {
			var json = response.responseText;
			if(json =="success"){
    			alert("计算成功!");
    			Ext.app.refreshData();
    		}else if(json =="notFull"){
	    		alert("任务起始年到基准年数据不全,无法预测,请检查!");
		    }else if(json =="fail"){
	    		alert("计算失败!");
		    }else if(json =="methodNull"){
			    alert("请先设置相关预测算法!");
		    }
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}


//拼接数据 PS:grid名字,列数
Ext.app.montageData = function montageData(grid,col){
	var rows = grid.getStore().getTotalCount();
	var gridValue = "";
	if(rows != 0){
		for(i=0;i<rows;i++){
			for(j=0;j<col;j++){
				//if(!(grid.getId()=='economicGrid'&&j==2)){
					var key = grid.getStore().getAt(i).fields.keys[j]
					gridValue += grid.getStore().getAt(i).data[key]+",";
				//}
			}
		}
	}
	return gridValue;
}
/**
 * 刷新表格
 */
Ext.app.refreshData = function(){
		Ext.app.faVersionId = Ext.getCmp('caseId').getValue();
		Ext.app.areaId = Ext.getCmp('areaId').getValue();
		if (Ext.app.faVersionId==''||Ext.app.areaId=='') {
			return  ;
		}
	/**
		 * 加载Tab页数据
		 * */
		var nationalEconomyGrid = Ext.getCmp('nationalEconomyGrid');
		Ext.app.loadTabData(nationalEconomyGrid);
		
		var annualAreaGrid = Ext.getCmp('annualAreaGrid');
		Ext.app.loadTabData(annualAreaGrid);
		
		var industryAnnualGrid = Ext.getCmp('industryAnnualGrid');
		Ext.app.loadTabData(industryAnnualGrid);
		
		var typicalDailyLoadGrid = Ext.getCmp('typicalDailyLoadGrid');
		Ext.app.loadTabData(typicalDailyLoadGrid);
		
		var existingLargeUsersGrid = Ext.getCmp('existingLargeUsersGrid');
		Ext.app.loadTabData(existingLargeUsersGrid);
		
		var reportedLoadingLargeUsersGrid = Ext.getCmp('reportedLoadingLargeUsersGrid');
		Ext.app.loadTabData(reportedLoadingLargeUsersGrid);
		
		var economicGrid1 = Ext.getCmp('economicGrid');
		Ext.app.loadTabData(economicGrid1);
		var totalGrid1 = Ext.getCmp('totalGrid');
		Ext.app.loadTabData(totalGrid1);
		var loadGrid1 = Ext.getCmp('loadGrid');
		Ext.app.loadTabData(loadGrid1);
		
		/**
		 * 请求获得方案预测方法
		 * */
		Ext.Ajax.request({
			url : 'prediction/queryForeCaseAction/calculateMethod.do',
			method : 'post',
			params : {
				faVersionId : Ext.app.faVersionId//方案版本ID
			},
			async : false,
			success : function(response, options) {
				var res = Ext.decode(response.responseText);
				if (res != ''&&res != undefined) {
					Ext.getCmp('economicPredictionMethod').setValue(res.economyName);
					Ext.getCmp('totalPredictionMethod').setValue(res.electricityName);
					Ext.getCmp('loadPredictionMethod').setValue(res.loadName);
					Ext.getCmp('economicPredictionMethodValue').setValue(res.economyId);
					Ext.getCmp('totalPredictionMethodValue').setValue(res.electricityId);
					Ext.getCmp('loadPredictionMethodValue').setValue(res.loadId);
				}
			}
		});
}
/**
 * 加载表格数据
 */
Ext.app.loadTabData = function(grid) {
	grid.store.on('beforeload', function() {
			var _params = {
					'versionId' : versionId, //任务版本ID
					'taskId' : taskId, //任务GUID
					'areaId' : Ext.app.areaId, //区域ID
					'beginYear' : beginYear, //起始年
					'baseYear' : baseYear, //基准年
					'faVersionId' : Ext.app.faVersionId //方案版本ID
				};
			this.baseParams = _params;
		});
	grid.store.load();
}

/**
 * 删除方案时，如果不存在方案，清除遗留数据
 */
Ext.app.clearGridData = function(){
	Ext.getCmp('nationalEconomyGrid').getStore().removeAll();
	Ext.getCmp('annualAreaGrid').getStore().removeAll();
	Ext.getCmp('industryAnnualGrid').getStore().removeAll();
	Ext.getCmp('typicalDailyLoadGrid').getStore().removeAll();
	Ext.getCmp('existingLargeUsersGrid').getStore().removeAll();
	Ext.getCmp('economicGrid').getStore().removeAll();
	Ext.getCmp('totalGrid').getStore().removeAll();
	Ext.getCmp('loadGrid').getStore().removeAll();
	Ext.getCmp('economicPredictionMethod').setValue('');
	Ext.getCmp('totalPredictionMethod').setValue('');
	Ext.getCmp('loadPredictionMethod').setValue('');
	Ext.getCmp('economicPredictionMethodValue').setValue('');
	Ext.getCmp('totalPredictionMethodValue').setValue('');
	Ext.getCmp('loadPredictionMethodValue').setValue('');
}

/**
 * 负荷分配
 */
Ext.app.forLoadAssign = function(){
	var versionId = Ext.getCmp('caseId').getValue();
	var areaId = Ext.getCmp('areaId').getValue();
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择方案！");
		return;
	}
	var winParams = "dialogWidth:500px;dialogHeight:280px;toolbar=no;menubar=no;scrollbars=yes;resizable=no;location=no;status=no";
	window.showModalDialog(basePath+"prediction/webViews/loadforecasting/totalloadforecasting/loadAssign.jsp",
			   					{caseVersionId:versionId,areaId:areaId}, winParams);
}

/**
 * 方案比较
 */
Ext.app.forCaseCompare = function(){
	var versionId = Ext.getCmp('caseId').getValue();
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择方案！");
		return;
	}
	var dialogWidth = document.documentElement.offsetWidth;
	var dialogHeight = document.documentElement.offsetHeight;
	var winParams = "dialogWidth:"+dialogWidth+";dialogHeight:"+dialogHeight+";toolbar=no;menubar=no;scrollbars=yes;resizable=no;location=no;status=no";
	window.showModalDialog(basePath+"prediction/webViews/loadforecasting/totalloadforecasting/sComparison.jsp",{}, winParams);
}

/**
 * 图形指标设置
 */
Ext.app.forChartSet = function(){
	var versionId = Ext.getCmp('caseId').getValue();
	if(versionId == "" || versionId == null){
		Ext.Msg.alert("系统提示","请选择方案！");
		return;
	}
	var winParams = "dialogWidth:150px;dialogHeight:120px;toolbar=no;menubar=no;scrollbars=yes;resizable=no;location=no;status=no";
	var reVal = window.showModalDialog(basePath+"prediction/webViews/loadforecasting/totalloadforecasting/forChartSet.jsp",
			   					{nationalEconomyZB:nationalEconomyZB}, winParams);
	if(reVal) {
		nationalEconomyZB = reVal.value;
		Ext.app.lineChars(Ext.getCmp('economicGrid').getStore().data.items, reVal.name, 'nationalEconomyDivs', reVal.value);
	}
}
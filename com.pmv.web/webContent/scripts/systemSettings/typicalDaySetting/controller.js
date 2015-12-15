//设置默认典型日
Ext.app.setDefaultDay = function(){
	var url = "pmv/typicalDaySettingController/setDefaultDay.do";
	var util = new Bp.util.RequestUtils();
	var result = util.sendRequest(url,{
		deptId : deptguid
	});
}
//删除默认典型日
Ext.app.delDefaultDay = function (){
	var url = "pmv/typicalDaySettingController/delDefaultDay.do";
	var util = new Bp.util.RequestUtils();
	var result = util.sendRequest(url,{
		deptId : deptguid
	});
}
//检查数据是否重复
Ext.app.checkData = function (data){
	if(data.adddata.length != 0 || data.edtdata.length != 0){
		var _data = datagrid.getStore().getModifiedRecords();
		var guid = new Array();
		var tDay = new Array();
		
		Ext.each(_data, function(row) {
			guid.push(row.get('GUID'));
		});
		Ext.each(_data, function(row) {
			tDay.push(row.get('D_TYP_DATE'));
		});
		var url = "pmv/typicalDaySettingController/checkData.do";
		var util = new Bp.util.RequestUtils();
		var result = util.sendRequest(url, {
			guid : Ext.encode(guid),
	    	tDay : Ext.encode(tDay),
	    	deptId : deptguid
		});
		var flag = Ext.decode(result);
		if (flag.success) {
			Ext.Msg.alert("系统提示", flag.tip);
			return false;
		}
		return true;
	}
}
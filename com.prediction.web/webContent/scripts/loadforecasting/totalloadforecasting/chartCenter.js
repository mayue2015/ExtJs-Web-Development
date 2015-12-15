/**
 * 引入命名空间
 */
Ext.ns('Ext.app');

Ext.app.chartPanel = function() {

	var height = (document.documentElement.offsetHeight - 50) / 3;
	var width = (document.documentElement.offsetWidth) / 3;
	var nationalEconomyPanel = new Ext.Panel({
		tbar : ['<span style="height:19px;line-height:19px;">国民经济预测曲线</span>'],
		height : height,
		bodyStyle : 'background : white;',
		items : [ new Ext.Panel({
			height : height,
			id : 'nationalEconomyDivs'
		}) ]
	});
	
	//总量预测-Panel面板
	var totalForecastPanel = new Ext.Panel({
		tbar : ['<span style="height:21px;line-height:21px;">总量预测曲线</span>'],
		height : height,
		border : false,
		bodyStyle : 'background : white;',
		items : [ new Ext.Panel({
			height : height,
			id : 'totalForecastDivs'
		}) ]
	});
	
	//负荷预测-Panel面板
	var loadForecastingPanel = new Ext.Panel({
		tbar : ['<span style="height:20px;line-height:20px;">负荷预测曲线</span>'],
		height : height,
		border : false,
		bodyStyle : 'background : white;',
		items : [ new Ext.Panel({
			height : height,
			id : 'loadForecastingDivs'
		}) ]
	});
	
	//整合线状图和饼状图-Panel面板
	var panelPic = new Ext.Panel({
		width : width,
		layout : 'column',
		bodyBorder : false,
		region : 'east',
		items : [ nationalEconomyPanel, totalForecastPanel, loadForecastingPanel ]
	});
	
	return panelPic;
}
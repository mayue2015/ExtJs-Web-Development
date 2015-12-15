radarChar = new AnyChart('pmv/lib/anyChart/AnyChart.swf');
Ext.app.radarChars = function(dataIndexList) { 
	var grid = Ext.getCmp('mainGrid');
	var record = grid.getSelectionModel().getSelected();
	var cm = grid.getColumnModel();
	if (!record) {
		return ;
	}
	var str = '<series name="Spendings">';
	for(var z = 0; z < dataIndexList.length; z++) {
		var dataIndex = dataIndexList[z];
		var name = cm.getColumnHeader(cm.findColumnIndex(dataIndex));
		var value = record.get(dataIndex);
		if (value.indexOf('@')!=-1) {
			value = value.split('@')[1];
		}
		str += "<point name='"+name+"("+value+"%)' y='"+value+"' font-size=\"6\" />";
	}
	str += "</series>";
	var charText = getDataRadarCharts(str);
	showRadarChart(charText);
}

function showRadarChart(charText) {
	radarChar.clear();
	radarChar.width = "100%"; 
	radarChar.height = document.documentElement.offsetHeight/2;
	radarChar.setData(charText);
	radarChar.write('radarDivs');
}

function getDataRadarCharts(charts){
	var htmlText = 
		"<anychart> "+
		"<margin all='0' />"+ 
		"<settings> "+
		"<animation enabled='True' /> "+
		"</settings> "+
		"<charts> "+
		"<chart plot_type='Radar'> "+
		"<chart_settings> "+
		"<chart_background enabled='false' /> "+
		"<title> "+
		"<text></text> "+
		"<background enabled='false' /> "+
		"</title> "+
		"<axes> "+
		"<y_axis> "+
		"<labels enabled=\"false\" /> "+
		"<major_tickmark enabled=\"false\" /> "+
		"</y_axis>  "+
		"<x_axis>"+
		"<labels enabled=\"true\" width=\"50\" rotation=\"90\" display_mode=\"rotated\" align=\"Inside\">"+
		"<format><![CDATA[{%Value}]]></format>"+
		"<font family=\"Verdana\" color=\"Black\" size=\"9\" bold=\"False\" italic=\"False\" underline=\"False\" render_as_html=\"False\" />"+
		"</labels>"+
		"</x_axis>"+
		"</axes> "+
		"</chart_settings> "+
		"<data_plot_settings default_series_type='Spline'> "+
		"<line_series> "+
		"<tooltip_settings enabled='True' /> "+
		"</line_series> "+
		"</data_plot_settings> "+
		"<data> ";
		htmlText += charts;
		htmlText += "</data>"+ 
		"</chart></charts></anychart>";
	
	return htmlText;
}
fabjChart = new AnyChart('planning/scripts/lib/anychart/swf/AnyChart.swf');
function lineChars(gridData, years) {
	var data = gridData.getStore().data.items;
	if(data.length <= 0) {
		Ext.getCmp('chartDivs').hide();
		return;
	} else {
		Ext.getCmp('chartDivs').show();
	}
	var str = "";
	for (var d = 0; d < data.length; d++) {
		var lData = data[d].data;
		str += "<series name='"+ lData['codeName'] +"-"+ lData['caseName'] +"'> ";
		for(var y = 0; y < years.length; y++) {
			var thisYear = years[y];
			var thisCol = lData[thisYear];
			if(thisCol == null || thisCol == "") {
				thisCol = 0;
			}
			str += "<point name='" + thisYear + "' y='" + thisCol + "' />";
		}
		str += "</series> ";
	}
	var charText = getDataLineCharts(str);
	showLineChart(charText);
}

function showLineChart(charText) {
	fabjChart.clear();
	fabjChart.width = "100%";
	fabjChart.height = document.documentElement.offsetHeight / 2;
	fabjChart.setData(charText);
	fabjChart.write('chartDivs');
}

//生成折线图
function getDataLineCharts(charts){
	var htmlText = 
		"<anychart> "+
		"<margin all='0' />"+ 
		"<settings> "+
		"<animation enabled='True' /> "+
		"</settings> "+
		"<charts> "+
		"<chart plot_type='CategorizedVertical'> "+
		"<chart_settings> "+
		"<chart_background enabled='false' /> "+
		"<legend enabled='TRUE'>"+
		"<title enabled='false'/>" + "</legend>"+
		"<axes> "+
		"<x_axis> "+
		"<title> "+
		"<text></text> "+
		"</title> "+
		"</x_axis> "+
		"<y_axis> "+
		"<title align='Near'> "+
		"<text></text> "+
		"</title> "+
		"</y_axis> "+
		"</axes> "+
		"<title> "+
		"<text></text> "+
		"<background enabled='false' /> "+
		"</title> "+
		"</chart_settings> "+
		"<data_plot_settings default_series_type='Spline'> "+
		"<line_series> "+
		"<marker_settings> "+
		"<marker size='8' /> "+
		"<states> "+
		"<hover> "+
		"<marker size='12' /> "+
		"</hover> "+
		"</states> "+
		"</marker_settings> "+
		"<tooltip_settings enabled='True' /> "+
		"</line_series> "+
		"</data_plot_settings> "+
		"<data> ";
		htmlText += charts;
		htmlText += "</data>"+ 
		"</chart></charts></anychart>";
	
	return htmlText;
}
/**
 * 引入命名空间
 */
Ext.ns('Ext.app');

Ext.app.lineChars = function(data, title, id, zb) {
//	var data = gridData.getStore().data.items;
	var str = '';
	title = title.split(',');
	zb = zb.split(',');
	for(var z = 0; z < zb.length; z++) {
		str += "<series name='"+title[z]+"'> ";
		for(var d = 0; d < data.length; d++) {
			var tabYear = data[d].data['tab_year'];
			var dataCol = data[d].data[zb[z]];
			if(dataCol == '' || dataCol == undefined) {
				dataCol = 0;
			}
			str += "<point name='"+tabYear+"' y='"+dataCol+"' />";
		}
		str += "</series>";
	}
	var charText = getDataLineCharts(str);
	showLineChart(charText, id);
}

function showLineChart(charText, id) {
	var char = new AnyChart('planning/scripts/lib/anychart/swf/AnyChart.swf');
	char.width = "100%"; 
	char.height = document.documentElement.offsetHeight / 3 - 30;
	char.setData(charText);
	char.write(id);
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
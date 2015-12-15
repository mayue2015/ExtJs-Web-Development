<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>

<%@ page import="com.runqian.report4.usermodel.Context"%>
<%@ taglib uri="http://www.joinbright.com/runqianReport4" prefix="report" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<bp:base />
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>综合报告</title>
    <script type="text/javascript">
// 	$import(basePath+"reporting/scripts/reportScipts/show/runqian1.js");
// 	$import(basePath+"reporting/scripts/reportScipts/show/runqian2.js");
// 	$import(basePath+"reporting/scripts/reportScipts/show/runqian3.js");
</script>
  </head>
  <body>
  <%
  	String file = "123.raq";
    
  	String printImage = "<img src='planning/icons/excel.gif' border=no>";
        		
  %>
  	
        <report:html name="report1" 
			srcType="file"
			reportFileName="<%=file %>" 
			generateParamForm="no" 
			width = "500"
			height = "200"
			needPageMark="no"
			displayNoLinkPageMark="yes"
		    needSaveAsExcel = "yes" 	
			excelLabel="<%=printImage %>"
			excelPageStyle = '0'
		/>
  </body>
</html>

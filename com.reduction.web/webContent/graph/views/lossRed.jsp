<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="bp" uri="http://www.joinbright.com/tags-framework"%>
<%@ page import="javax.servlet.http.HttpSession"%>
<%@ page import="com.jb.util.platform.Platform"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<bp:base />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>主网图</title>
<link rel="stylesheet" type="text/css" href="planning/css/core.css" />
<link rel="stylesheet" type="text/css" href="graphic/graph/css/graph.css" />
<%
	String context = request.getContextPath();
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	String appSettingPath = basePath + "graph/ini/AppSetting.ini";
	String connectionPath = basePath + "graph/ini/ServerConnection.ini";
	String lastestGraphVersion = Platform.getPlatform().getConfigById("lastestGraphVersion");
	
	String model = request.getParameter("model");// 模块名称(多个模块调用此页面,因此做区分)
	model = model == null ? "" : model;
	//session取值
	HttpSession sessionHHH = request.getSession();
	
    String taskName = sessionHHH.getAttribute("taskName") + "";
    String baseYear = sessionHHH.getAttribute("baseYear") + "";
    String taskVerId = sessionHHH.getAttribute("versionId") + "";
    String taskGuid = sessionHHH.getAttribute("taskId") + "";
    
    if(taskName == null || "".equals(taskName) || "null".equals(taskName)){
   		taskName = "";
    }
    
    if(baseYear == null || "".equals(baseYear) || "null".equals(baseYear)){
   		baseYear = "";
    }
    
    if(taskVerId == null || "".equals(taskVerId) || "null".equals(taskVerId)){
   		taskVerId = "";
    }
    
    if(taskGuid == null || "".equals(taskGuid) || "null".equals(taskGuid)){
    	taskGuid = "";
    }
    
    String type = request.getParameter("type");
    String graphType = request.getParameter("graph");
%>
<script type="text/javascript">
	var appSettingPath = '<%= appSettingPath%>';
	var connectionPath = '<%= connectionPath%>';
	var ppath = '<%= basePath %>';
	var lastestGraphVersion = '<%= lastestGraphVersion%>';
	var appId = 1;//主网图
	var caseType = '0900109';//降损图方案
	var lossRed = 'J';//降损方案标识
	var lossDataIdJson = [];//重损分布 代表日期
	var lossCalprocessId = '';//重损分布 计算工程ID
	var scenceBusinessArray =[];
	var graphDeptGuid = deptguid;//获取登录人员所属部门
	var graphDeptName = dept_name;//获取登陆人员所属部门名称
	var tzwhType = 'G';
	var model = "<%= model%>";
	//模块名称,如有修改请追加!!!(首页:index;现状分析:xzfx;图形建模:txjm;)
	
	var taskName = "<%=taskName %>";
	 	var taskBaseYear = "<%=baseYear %>";
	 	var taskVersionId = "<%=taskVerId %>";
	 	var taskGuid = "<%=taskGuid %>";
		var tzwhType = "<%=type%>";
		var graphType = "<%=graphType%>";
		if(taskName == ''){
			var winParams = "dialogWidth:600px;dialogHeight:200px;toolbar=no;menubar=no;scrollbars=no;resizable=no;location=no;status=no";
			var obj = window.showModalDialog(basePath+"planning/webViews/task/taskInfo.jsp",{}, winParams);
			
			if(obj){
		 		taskName = obj.taskName;
			 	taskBaseYear = obj.baseYear;
			 	taskVersionId = obj.versionId;
			 	taskGuid = obj.taskId;
			 	$import("graphic/graph/scripts/graph.js");
			}
		}else{
			$import("graphic/graph/scripts/graph.js");
		}
// 	$import("scripts/src/dwgh/tzwh/commonStore.js");
</script>
</head>
<body>

</body>
</html>
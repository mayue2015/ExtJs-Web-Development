Ext.onReady(function() {

	// 声明应用命名空间,一般使用Ext.app即可,该命名空间用于存储应用所使用的模型,组件,方法等(仅当前页面有效)
	Ext.ns("Ext.app");

	// 引用框架组件
	$import("extjs/scripts/src/BDControls/BDQueryPanel.js");
	$import("extjs/scripts/src/BDControls/BDGrid.js");
	$import("extjs/scripts/src/BDControls/BDDataSource.js");
	$import("extjs/scripts/src/BDControls/BDForm.js");
	$import("extjs/scripts/src/BDControls/BDField.js");
	$import("extjs/scripts/src/bpWidget/ext/plugins/tree/Bp.plugin.TreePanel.js");

	// 引用mvc模块应用js
	// 其中,model.js一般用来存储实体对象,在F1框架中,实体与数据库对应,
	// 并进行封装,实体几乎用不到,我们可在该js中定义,表格的ColumnModel、
	// 表单的items、变量或新定义组件等与模型有关的对象或组件
	$import("rule/scripts/pjbzwh/model.js");
	// controller.js用来存储动作、请求等函数
	$import("rule/scripts/pjbzwh/controller.js");
	// view.js用来编写用于显示页面组件对象
	$import("rule/scripts/pjbzwh/view.js");

	// 特别注意：$import函数如果引用了内容为空的js文件,在IE下会报错
	// 引用资源文件注意文件引用先后顺序
});

var dataUrl = 'pmv/lowAssessmentAction/loadGrid.do';

var chartList = ['t_loss','ass_load_fact','ass_cos_fact','ass_v_fact','ass_imb_fact_3'];

var rightTableStr = "线损率@t_loss,负载率@ass_load_fact,功率因数@ass_cos_fact,低电压合格率@ass_v_fact,三相不平衡率@ass_imb_fact_3";

var condisionList = ['台区名称','所属设备'];

var unitStr = "计量单位：km,%,V";

var record = Ext.data.Record.create([ {
	name : '_id',
	type : 'Object'
}, {
	name : '_parent',
	type : 'Object'
}, {
	name : '_is_leaf',
	type : 'bool'
}, {
	name : 'dev_name',
	type : 'String'
}, {
	name : 'l_t_name',
	type : 'String'
}, {
	name : 't_loss',
	type : 'String'
}, {
	name : 'ass_load_fact',
	type : 'String'
}, {
	name : 'ass_cos_fact',
	type : 'String'
}, {
	name : 'ass_v_fact',
	type : 'String'
}, {
	name : 'ass_imb_fact_3',
	type : 'String'
}, {
	name : 'power_supply',
	type : 'String'
} ]);

var cm = [ {
	id : 'dev_name',
	header : "台区/用户名称",
	sortable : true,
	width : 200,
	dataIndex : 'dev_name'
}, {
	header : "所属配线/台区",
	sortable : true,
	width : 120,
	dataIndex : 'l_t_name'
}, {
	header : "线损率",
	sortable : true,
	dataIndex : 't_loss',
	width : 80,
	renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
		if (value.indexOf('@')!=-1) {
    		var vl = value.split('@');
    		var rv = '';
    		if (vl[2]==0||vl[2]=='0') {
    			rv = '<font color = "red">'+vl[1]+'</font>';
			}else {
				rv = vl[1];
			}
			return rv;
		}else {
			return value;
		}
    }
}, {
	header : "负载率",
	sortable : true,
	width : 80,
	dataIndex : 'ass_load_fact',
	renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
		if (value.indexOf('@')!=-1) {
    		var vl = value.split('@');
    		var rv = '';
    		if (vl[2]==0||vl[2]=='0') {
    			rv = '<font color = "red">'+vl[1]+'</font>';
			}else {
				rv = vl[1];
			}
			return rv;
		}else {
			return value;
		}
    }
}, {
	header : "功率因数合格率",
	sortable : true,
	width : 100,
	dataIndex : 'ass_cos_fact',
	renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
		if (value.indexOf('@')!=-1) {
    		var vl = value.split('@');
    		var rv = '';
    		if (vl[2]==0||vl[2]=='0') {
    			rv = '<font color = "red">'+vl[1]+'</font>';
			}else {
				rv = vl[1];
			}
			return rv;
		}else {
			return value;
		}
    }
}, {
	header : "低电压合格率",
	sortable : true,
	width : 100,
	dataIndex : 'ass_v_fact',
	renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
		if (value.indexOf('@')!=-1) {
    		var vl = value.split('@');
    		var rv = '';
    		if (vl[2]==0||vl[2]=='0') {
    			rv = '<font color = "red">'+vl[1]+'</font>';
			}else {
				rv = vl[1];
			}
			return rv;
		}else {
			return value;
		}
    }
}, {
	header : "三相不平衡率",
	sortable : true,
	width : 100,
	dataIndex : 'ass_imb_fact_3',
	renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
		if (value.indexOf('@')!=-1) {
    		var vl = value.split('@');
    		var rv = '';
    		if (vl[2]==0||vl[2]=='0') {
    			rv = '<font color = "red">'+vl[1]+'</font>';
			}else {
				rv = vl[1];
			}
			return rv;
		}else {
			return value;
		}
    }
}, {
	header : "供电区域类型",
	sortable : true,
	hidden : true,
	dataIndex : 'power_supply'
} ];
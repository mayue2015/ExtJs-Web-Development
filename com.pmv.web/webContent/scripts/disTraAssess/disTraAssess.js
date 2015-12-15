
var dataUrl = 'pmv/disTraAssessARAction/queryDataForGridTableJson.do';
	
var chartList = ['loss','ass_load_fact','ass_cos'];

var condisionList = ['配变名称','所属配线'];

var unitStr = "计量单位：km,%,kV";

var rightTableStr = "线损率@loss,负载率@ass_load_fact,功率因数@ass_cos";

var record = Ext.data.Record.create([
          　			{name: '_id', type: 'String'},
           		{name: '_parent', type: 'String'},
           		{name: '_is_leaf', type: 'bool'},
          　			{name: 'dev_name', type: 'String'},
          　			{name: 'line_name', type: 'String'},
          　			{name: 'loss', type: 'String'},
          　			{name: 'ass_load_fact', type: 'String'},
          　			{name: 'ass_cos', type: 'String'},
          　			{name: 'ass_cos_fact', type: 'String'},
          　			{name: 'power_supply', type: 'String'}
]);

var cm = [{		
				id : 'dev_name',
			    header: "配变名称", 
			    sortable: true, 
			    width : 120,
			    dataIndex: 'dev_name'
		  },{
				header: "所属配线", 
				sortable: true, 
				width : 120,
				dataIndex: 'line_name'
		  },{
				header: "变损率", 
				sortable: true, 
				width : 80,
				dataIndex: 'loss',
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
		  },{
				header: "负载率", 
				sortable: true, 
				width : 80,
				dataIndex: 'ass_load_fact',
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
		  },{
				header: "功率因数", 
				sortable: true, 
				width : 80,
				dataIndex: 'ass_cos',
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
		  },{
				header: "低电压", 
				sortable: true, 
				width : 80,
				dataIndex: 'ass_cos_fact',
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
		  },{
				header: "供电分区", 
				sortable: true, 
				hidden : true,
				dataIndex: 'power_supply'
		  }];
                             	    
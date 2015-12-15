var dataUrl = 'pmv/lineAction/queryData.do';

var chartList = ['l_loss','ass_load_fact','ass_cos_fact','ass_v_fact','ass_kh_kp'];

var condisionList = ['线路名称','区域类型'];

var rightTableStr = "线损率@l_loss,负载率@ass_load_fact,功率因数@ass_cos_fact,低电压合格率@ass_v_fact,三相不平衡率@ass_kh_kp";

var unitStr = "单位：km,%,kV,A/mm2";

var record = Ext.data.Record.create([
          　			{name: '_id', type: 'String'},
           		{name: '_parent', type: 'Object'},
           		{name: '_is_leaf', type: 'bool'},
          　			{name: 'dev_name', type: 'String'},
          　			{name: 'l_tpy_area', type: 'String'},
          　			{name: 'l_radius', type: 'String'},
          　			{name: 'l_loss', type: 'String'},
          　			{name: 'ass_load_fact', type: 'String'},
          　			{name: 'ass_eco_currt', type: 'String'},
          　			{name: 'ass_cos_fact', type: 'String'},
          　			{name: 'ass_v_fact', type: 'String'},
          　			{name: 'ass_kh_kp', type: 'String'},
          　			{name: 'power_supply', type: 'String'}
]);

var cm = [{		
				id : 'dev_name',
			    header: "线路名称", 
			    sortable: true, 
			    width : 200,
			    dataIndex: 'dev_name'
		  },{
				header: "区域类型", 
				sortable: true, 
				dataIndex: 'l_tpy_area',
				width : 80
		  },{
				header: "供电半径", 
				sortable: true, 
				dataIndex: 'l_radius',
				width : 80,
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
			    	if (value.indexOf('@')!=-1) {
						return value.split('@')[1];
					}else {
						return value;
					}
			    }
		  },{
				header: "线损率", 
				sortable: true, 
				dataIndex: 'l_loss',
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
				header: "经济电流密度", 
				sortable: true, 
				width : 100,
				dataIndex: 'ass_eco_currt',
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
				header: "功率因数合格率", 
				sortable: true, 
				width : 100,
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
				header: "低电压合格率", 
				width : 100,
				sortable: true, 
				dataIndex: 'ass_v_fact',
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
				header: "不平衡及谐波影响率", 
				width : 120,
				sortable: true, 
				dataIndex: 'ass_kh_kp',
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
				header: "区域类型id", 
				sortable: true,
				hidden : true,
				dataIndex: 'power_supply'
		  } ];
                             	    
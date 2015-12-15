Ext.app.IFrame = Ext.extend(Ext.BoxComponent, {

	autoEl : {
		tag : "iframe",
		width : "100%",
		height : "100%",
		style : "width : 100%; height : 100%;",
		frameborder : "0",
		scrolling : "no"
	},

	initComponent : function() {
		Ext.app.IFrame.superclass.initComponent.call(this);
		this.on("render", function(cmp) {
			cmp.getEl().dom.src = cmp.src;
		});
	}
});

/**
 * 本次评价数据TAB页
 */
Ext.app.BcpjsjPanel = Ext.extend(Ext.Panel, {

	initComponent : function() {
		var iframe = new Ext.app.IFrame({
			src : "rule/views/ztlxxdwh/window.jsp?type=c&guid=" + this.guid
		});
		this.items = [ iframe ];
		Ext.app.BcpjsjPanel.superclass.initComponent.call(this);
		this.on("render", function(cmp) {
			cmp.setHeight(cmp.ownerCt.getHeight());
		});
	}
 });

 /**
 * 历史数据详单TAB页
 */
Ext.app.LssjxdPanel = Ext.extend(Ext.Panel, {

	initComponent : function() {
		var iframe = new Ext.app.IFrame({
			src : "rule/views/ztlxxdwh/window.jsp?type=h&guid=" + this.guid
		});
		this.items = [ iframe ];
		Ext.app.BcpjsjPanel.superclass.initComponent.call(this);
		this.on("render", function(cmp) {
			cmp.setHeight(cmp.ownerCt.getHeight());
		});
	}
 });

 /**
 * 历史数据图表TAB页
 */
Ext.app.LssjtbPanel = Ext.extend(Ext.Panel, {

	initComponent : function() {
		var iframe = new Ext.app.IFrame({
			src : "rule/views/ztlxxdwh/window.jsp?type=p&guid=" + this.guid
		});
		this.items = [ iframe ];
		Ext.app.BcpjsjPanel.superclass.initComponent.call(this);
		this.on("render", function(cmp) {
			cmp.setHeight(cmp.ownerCt.getHeight());
		});
	}
 });
/**
 * 表格列链接渲染器
 *
 * @class Ext.util.GridColumnLinkRenderer
 * @extends Ext.util.Observable
 */
Ext.util.GridColumnLinkRenderer = Ext.extend(Ext.util.Observable, {

	/**
	 * 表格对象
	 *
	 * @property
	 * @required
	 */
	grid : null,

	/**
	 * 列索引
	 *
	 * @property
	 * @required
	 */
	dataIndex : null,

	/**
	 * 点击事件函数
	 *
	 * @property
	 */
	onClick : Ext.emptyFn,

	/**
	 * 渲染列显示值, 回调函数传入参数：
	 *   v 值
	 *   m meta
	 *   r 行记录
	 *   ri 行索引
	 *   ci 列索引
	 *   s store
	 *
	 * @property
	 */
	displayRenderer : undefined,

	/**
	 * 渲染,请在表格渲染后执行
	 */
	render : function() {
		var renderer = this;
		var grid = renderer.grid;
		var dataIndex = renderer.dataIndex;
		var dispaly = renderer.dispaly;
		grid.on("cellclick", function(g, ri, ci, e) {
			var cm = grid.getColumnModel();
			var index = cm.findColumnIndex(dataIndex);
			var record = grid.getStore().getAt(ri);
			if (index == ci) {
				renderer.onClick.call(grid, record);
			}
		});
		grid.getStore().on("load", function() {
			var cm = grid.getColumnModel();
			var index = cm.findColumnIndex(dataIndex);
			if (index > -1) {
				cm.setEditor(index, null);
				cm.setRenderer(index, function(v, m, r, ri, ci, s) {
					var d = v;
					if (renderer.displayRenderer) {
						d = renderer.displayRenderer.call(renderer, v, m, r, ri, ci, s);
					}
					return "<font style=\"text-decoration: underline; cursor: pointer;\" color=\"blue\">" + d + "</font>";
				});
				grid.reconfigure(grid.getStore(), cm);
			}
		});
	},

	constructor : function(config) {
		Ext.apply(this, config);
		Ext.util.GridColumnLinkRenderer.superclass.constructor.call(this);
	}
});

/**
 * 用户信息实体类,获取当前登录用户信息,使用方法如下：
 * var user = new Ext.util.UserModel();
 *
 * @class Ext.util.UserModel
 * @extends Ext.util.Observable
 */
Ext.util.UserModel = Ext.extend(Ext.util.Observable, {

	/**
	 * 获取用户ID
	 */
	getPersId : function() {
		return this.get("persId");
	},

	/**
	 * 获取用户部门ID
	 */
	getDeptId : function() {
		return this.get("deptId");
	},

	/**
	 * 获取对象中的属性
	 *
	 * @param {String} 属性名称
	 * @return {Mixed} 返回属性值
	 */
	get : function(prop) {
		while (!this.loaded) {}
		return this._user[prop];
	},

	/**
	 * 请示是否加载完成
	 *
	 * @property
	 */
	loaded : false,

	/**
	 * 用户对象信息,请求结束后设置值
	 *
	 * @private
	 */
	_user : undefined,

	constructor : function(config) {
		Ext.util.UserModel.superclass.constructor.call(this);
		Ext.apply(this, config);
		var model = this;
		this.addEvents("beforeload", "load");
		this.fireEvent("beforeload");
		Ext.Ajax.request({
			url : "rule/common/getUserInfo.do",
			method : "post",
			success : function(res, opts) {
				model._user = Ext.decode(res.responseText);
				model.loaded = true;
				model.fireEvent("load", model, model._user);
			},
			failure : function(res, opts) {
				Ext.Msg.alert("提示信息", "获取用户信息失败!");
			}
		});
	}
});

/**
 * 检查是否为undefined, null, '', 'undefined', 'null'
 * 如果结果为以上条件,则返回true, 否则返回false
 *
 * @param {Mixed} 被校验目标对象
 * @param {Function} 校验失败回调函数
 * @returns {Boolean} 是否校验通过
 */
Ext.util.isNull = function(target, callback) {
	var rules = new Array();
	rules.push({
		exec : function(t) {
			var rs = new Object({
				success : false
			});
			if (t === undefined) {
				rs.success = true;
				rs.msg = "对象未定义";
			} else if (t === null) {
				rs.success = true;
				rs.msg = "对象为NULL";
			} else {
				if (Ext.isString(t)) {
					if (t.trim() === "") {
						rs.success = true;
						rs.msg = "对象为空字符";
					} else if (t.trim() === "undefined") {
						rs.success = true;
						rs.msg = "对象值为undefined";
					} else if (t.trim() === "null") {
						rs.success = true;
						rs.msg = "null";
					} else {}
				}
			}
			return rs;
		}
	});
	return new Ext.util.Validate({
		target : target,
		rules : rules,
		callback : callback
	}).validate();
};

/**
 * 校验规则类
 *
 * @class Ext.util.Rule
 * @extends Ext.util.Observable
 */
Ext.util.Rule = Ext.extend(Ext.util.Observable, {

	/**
	 * 校验目标
	 *
	 * @property exec
	 * @type {Function}
	 * @param {Mixed} 被校验目标对象
	 * @return {Object} 返回结果,如果没返回默认校验符合规则
	 */
	exec : Ext.emptyFn,

	constructor : function(config) {
		Ext.util.Rule.superclass.constructor.call(this);
		Ext.apply(this, config);
	}
});

/**
 * 校验类
 *
 * @class Ext.util.Validate
 * @extends Ext.util.Observable
 */
Ext.util.Validate = Ext.extend(Ext.util.Observable, {

	/**
	 * 校验目标
	 *
	 * @required
	 * @property target
	 * @type {Mixed}
	 */
	target : undefined,

	/**
	 * 校验规则
	 *
	 * @property rules
	 * @type {Array}
	 */
	rules : [],

	/**
	 * 校验失败回调函数
	 *
	 * @property callback
	 * @type {Function}
	 */
	callback : Ext.emptyFn,

	/**
	 * 根据规则执行校验
	 *
	 * @private
	 */
	validate : function() {

		var t = this.target;
		var success = true;
		var errors = new Array();

		// 按规则先后顺序,轮循校验
		Ext.each(this.rules, function(rule) {
			var rs = rule.exec(t);
			if (Ext.isObject(rs)) {
				if (rs.success === false) {
					success = false;
					errors.push(rs.msg);
				}
			}
		});
		var msg;
		// 失败时
		if (!success) {
			Ext.each(errors, function(error, i) {
				if (i === 0) {
					msg = error;
				} else {
					msg = ", " + error;
				}
			});
		}
		// 校验结束后回调函数,校验成功后msg为null
		if (Ext.isFunction(this.callback)) {
			this.callback.call(null, success, msg);
		}
		return success;
	},

	constructor : function(config) {
		Ext.util.Validate.superclass.constructor.call(this);
		Ext.apply(this, config);
	}
});

/**
 * 将时间转换成固定格式输出 new Date().toFormat('yyyy-MM-dd HH:mm:ss'); new
 * Date().toFormat('yyyy/MM/dd hh:mm:ss');
 * 只支持关键字（yyyy、MM、dd、HH、hh、mm、ss）HH：表示24小时，hh表示12小时
 */
Date.prototype.toFormatString = function(format) {
	var formatstr = format;
	if (format != null && format != "") {
		// 设置年
		if (formatstr.indexOf("yyyy") >= 0) {
			formatstr = formatstr.replace("yyyy", this.getFullYear());
		}
		// 设置月
		if (formatstr.indexOf("MM") >= 0) {
			var month = this.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("MM", month);
		}
		// 设置日
		if (formatstr.indexOf("dd") >= 0) {
			var day = this.getDay();
			if (day < 10) {
				day = "0" + day;
			}
			formatstr = formatstr.replace("dd", day);
		}
		// 设置时 - 24小时
		var hours = this.getHours();
		if (formatstr.indexOf("HH") >= 0) {
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("HH", hours);
		}
		// 设置时 - 12小时
		if (formatstr.indexOf("hh") >= 0) {
			if (hours > 12) {
				hours = hours - 12;
			}
			if (hours < 10) {
				hours = "0" + hours;
			}
			formatstr = formatstr.replace("hh", hours);
		}
		// 设置分
		if (formatstr.indexOf("mm") >= 0) {
			var minute = this.getMinutes();
			if (minute < 10) {
				minute = "0" + minute;
			}
			formatstr = formatstr.replace("mm", minute);
		}
		// 设置秒
		if (formatstr.indexOf("ss") >= 0) {
			var second = this.getSeconds();
			if (second < 10) {
				second = "0" + second;
			}
			formatstr = formatstr.replace("ss", second);
		}
	}
	return formatstr;
}

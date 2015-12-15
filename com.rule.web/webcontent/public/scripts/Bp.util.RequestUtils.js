Ext.ns('Bp.util');

Bp.util.RequestUtils = Ext.extend(Ext.util.Observable, {
			// private
			constructor : function(config) {
				// 追加属性
				Ext.apply(this, config);
				// 调用父类方法
				Bp.util.RequestUtils.superclass.constructor.call(this);
			},
			/**
			 * 创建同步请求
			 * 
			 * @return {Object}
			 */
			createXhrObject : function() {
				var http;
				var activeX = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP',
						'Microsoft.XMLHTTP'];

				try {
					http = new XMLHttpRequest();
				} catch (e) {
					for (var i = 0; i < activeX.length; ++i) {
						try {
							http = new ActiveXObject(activeX[i]);
							break;
						} catch (e) {
						}
					}
				} finally {
					return http;
				}
			},
		
			/**
			 * 同步请求数据
			 * 
			 * @param {}
			 *            url 请求地址
			 * @param {}
			 *            params 请求参数
			 * @return {Object}
			 */
			sendRequest : function(url, params) {
				var reqParams = '';
				var conn = this.createXhrObject();
				conn.open("POST", url, false);
				conn.setRequestHeader("Content-Type",
						"application/x-www-form-urlencoded;charset=UTF-8");
				// 设置参数
				if (params != null) {
					for (var i in params) {
						reqParams = reqParams + i + "=" + params[i] + "&";
					}
					reqParams = reqParams.substring(0, reqParams.length - 1);
				}
				if (reqParams == '') {
					reqParams = null;
				}
				conn.send(reqParams);
				return conn.responseText;
			}

		});

/**
 * 
 */
(function(win){
	
	var Kyee = {
		WEEKS:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		SHORTWEEKS:['周日','周一','周二','周三','周四','周五','周六'],
		//上下文路径
		CTX_PATH:win.CTX_PATH,
		//资源路径
		RESOURCE_PATH:win.RESOURCE_PATH,
		//类库路径
		LIB_PATH:win.LIB_PATH,
		
		DOCTOR_DEFAULT_MAN_IMG:"/system/portals/resource/images/default-man-doc.png",
		
		DOCTOR_DEFAULT_WOMAN_IMG:"/system/portals/resource/images/default-woman-doc.png",
		
		setDoctorImage:function(element,doctor){
			var imgPath = null,
				errorPath = null;
			if(Kyee.isEmpty(doctor)){
				imgPath = Kyee.DOCTOR_DEFAULT_MAN_IMG;
			}else{
				if(Kyee.isEmpty(doctor.doctorPhoto)){
					if(!doctor.doctorSex){doctor.doctorSex=1;}
					imgPath = doctor.doctorSex==1?Kyee.DOCTOR_DEFAULT_MAN_IMG:Kyee.DOCTOR_DEFAULT_WOMAN_IMG;
				}else{
					imgPath = "/appointment/image.next?doctorPhoto="+doctor.doctorPhoto;
					if(!doctor.doctorSex){doctor.doctorSex=1;}
					errorPath = doctor.doctorSex==1?Kyee.DOCTOR_DEFAULT_MAN_IMG:Kyee.DOCTOR_DEFAULT_WOMAN_IMG;
				}
			}
			if(element){
				element.attr("src",Kyee.CTX_PATH+imgPath);
				if(errorPath){
					element.attr("onerror","javascript:this.src='"+(Kyee.CTX_PATH+errorPath)+"'");
				}
			}
		},
		/**
		 * @description 创建命名空间的基础函数
		 * @param String namespace,支持逗号分隔的字符串，如"name.space"
		 * @return 最后一个域对象，如参数为"name.space"时，返回name.space对象
		 * @author 倪东省
		 * @date 2016-05-17
		 */
		namespace:function() {
		    var a=arguments, o=null, i, j, d;
		    for (i=0; i<a.length; i=i+1) {
		        d=a[i].split(".");
		        o=window;
		        for (j=0; j<d.length; j=j+1) {
		            o[d[j]]=o[d[j]] || {};
		            o=o[d[j]];
		        }
		    }
		    return o;
		},
		stopBubble:function(e) { 
			//如果提供了事件对象，则这是一个非IE浏览器 
			if ( e && e.stopPropagation ) 
			    //因此它支持W3C的stopPropagation()方法 
			    e.stopPropagation(); 
			else
			    //否则，我们需要使用IE的方式来取消事件冒泡 
			    window.event.cancelBubble = true; 
		},
		stopDefault:function( e ) { 
		    //阻止默认浏览器动作(W3C) 
		    if ( e && e.preventDefault ) 
		        e.preventDefault(); 
		    //IE中阻止函数器默认动作的方式 
		    else
		        window.event.returnValue = false; 
		    return false; 
		},
		//空函数
		emptyFn:function(){},
		 /**
         * Returns the given value itself if it's not empty, as described in {@link Kyee#isEmpty}; returns the default
         * value (second argument) otherwise.
         *
         * @param {Object} value The value to test.
         * @param {Object} defaultValue The value to return if the original value is empty.
         * @param {Boolean} [allowBlank=false] `true` to allow zero length strings to qualify as non-empty.
         * @return {Object} value, if non-empty, else defaultValue.
         */
        valueFrom: function(value, defaultValue, allowBlank){
            return Kyee.isEmpty(value, allowBlank) ? defaultValue : value;
        },

        /**
         * Returns true if the passed value is empty, false otherwise. The value is deemed to be empty if it is either:
         *
         * - `null`
         * - `undefined`
         * - a zero-length array
         * - a zero-length string (Unless the `allowEmptyString` parameter is set to `true`)
         *
         * @param {Object} value The value to test.
         * @param {Boolean} [allowEmptyString=false] `true` to allow empty strings.
         * @return {Boolean}
         */
        isEmpty: function(value, allowEmptyString) {
            return (value == null) || (!allowEmptyString ? value === '' : false) || (Kyee.isArray(value) && value.length === 0);
        },

        /**
         * Returns `true` if the passed value is a JavaScript Array, `false` otherwise.
         *
         * @param {Object} target The target to test.
         * @return {Boolean}
         * @method
         */
        isArray: ('isArray' in Array) ? Array.isArray : function(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },

        /**
         * Returns `true` if the passed value is a JavaScript Date object, `false` otherwise.
         * @param {Object} object The object to test.
         * @return {Boolean}
         */
        isDate: function(value) {
            return Object.prototype.toString.call(value) === '[object Date]';
        },
        /**
         * Returns `true` if the passed value is a JavaScript Object, `false` otherwise.
         * @param {Object} value The value to test.
         * @return {Boolean}
         * @method
         */
        isObject: (Object.prototype.toString.call(null) === '[object Object]') ?
        function(value) {
            // check ownerDocument here as well to exclude DOM nodes
            return value !== null && value !== undefined && Object.prototype.toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } :
        function(value) {
            return Object.prototype.toString.call(value) === '[object Object]';
        },

        /**
         * @private
         */
        isSimpleObject: function(value) {
            return value instanceof Object && value.constructor === Object;
        },

        /**
         * Returns `true` if the passed value is a JavaScript 'primitive', a string, number
         * or boolean.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isPrimitive: function(value) {
            var type = typeof value;

            return type === 'string' || type === 'number' || type === 'boolean';
        },

        /**
         * Returns `true` if the passed value is a JavaScript Function, `false` otherwise.
         * @param {Object} value The value to test.
         * @return {Boolean}
         * @method
         */
        isFunction:
        // Safari 3.x and 4.x returns 'function' for typeof <NodeList>, hence we need to fall back to using
        // Object.prototype.toString (slower)
        (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function(value) {
            return !!value && Object.prototype.toString.call(value) === '[object Function]';
        } : function(value) {
            return !!value && typeof value === 'function';
        },

        /**
         * Returns `true` if the passed value is a number. Returns `false` for non-finite numbers.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Validates that a value is numeric.
         * @param {Object} value Examples: 1, '1', '2.34'
         * @return {Boolean} True if numeric, false otherwise
         */
        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },

        /**
         * Returns `true `if the passed value is a string.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isString: function(value) {
            return typeof value === 'string';
        },

        /**
         * Returns `true` if the passed value is a boolean.
         *
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        /**
         * Returns `true` if the passed value is an HTMLElement
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isElement: function(value) {
            return value ? value.nodeType === 1 : false;
        },

        /**
         * Returns `true` if the passed value is a TextNode
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isTextNode: function(value) {
            return value ? value.nodeName === "#text" : false;
        },

        /**
         * Returns `true` if the passed value is defined.
         * @param {Object} value The value to test.
         * @return {Boolean}
         */
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },


        /**
         * Clone simple variables including array, {}-like objects, DOM nodes and Date without keeping the old reference.
         * A reference for the object itself is returned if it's not a direct descendant of Object. For model cloning,
         * see {@link Kyee.data.Model#copy Model.copy}.
         *
         * @param {Object} item The variable to clone
         * @return {Object} clone
         */
        clone: function(item) {
            if (item === null || item === undefined) {
                return item;
            }

            // DOM nodes
            // TODO proxy this to Kyee.Element.clone to handle automatic id attribute changing
            // recursively
            if (item.nodeType && item.cloneNode) {
                return item.cloneNode(true);
            }

            var type = Object.prototype.toString.call(item),
                i, j, k, clone, key;

            // Date
            if (type === '[object Date]') {
                return new Date(item.getTime());
            }

            // Array
            if (type === '[object Array]') {
                i = item.length;

                clone = [];

                while (i--) {
                    clone[i] = Kyee.clone(item[i]);
                }
            }
            // Object
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = Kyee.clone(item[key]);
                }

                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        if (item.hasOwnProperty(k)) {
                            clone[k] = item[k];
                        }
                    }
                }
            }

            return clone || item;
        },
        /**
         * @private
         */
        Logger: {
        //<feature logger>
            log: function(message, priority) {
                if (message && win.console) {
                    if (!priority || !(priority in win.console)) {
                        priority = 'log';
                    }
                    message = '[' + priority.toUpperCase() + '] ' + message;
                    win.console[priority](message);
                }
            },
            verbose: function(message) {
                this.log(message, 'verbose');
            },
            info: function(message) {
                this.log(message, 'info');
            },
            warn: function(message) {
                this.log(message, 'warn');
            },
            error: function(message) {
                throw new Error(message);
            },
            deprecate: function(message) {
                this.log(message, 'warn');
            }
        } || {
        //</feature>
            verbose: emptyFn,
            log: emptyFn,
            info: emptyFn,
            warn: emptyFn,
            error: function(message) {
                throw new Error(message);
            },
            deprecate: emptyFn
        },
        //创建cookie
        createCookie:function(name, value, expires, path, domain) {
        	var cookie = name + "=" + escape(value) + ";";

        	if (expires) {
        	  // If it's a date
        		if(expires instanceof Date) {
        			// If it isn't a valid date
        			if (isNaN(expires.getTime()))
        				expires = new Date();
        		}
        	    else
        	    	expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
        	    
        		cookie += "expires=" + expires.toGMTString() + ";";
        	}

        	if (path)
        		cookie += "path=" + path + ";";
        	if (domain)
        		cookie += "domain=" + domain + ";";

        	document.cookie = cookie;
        },
        //读取Cookie
        getCookie:function(name) {
        	var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
        	var result = regexp.exec(document.cookie);
        	return (result === null) ? null : unescape(result[1]);
        },
        //删除cookie
        deleteCookie:function(name, path, domain) {
        	  // If the cookie exists
        	if (Kyee.getCookie(name))
        		Kyee.createCookie(name, "", -1, path, domain);
        },
        
		/**
		 * 统一的请求函数
		 */
		ajax:function(config){
			if(Kyee.isEmpty(config)){
				Kyee.Logger.error("ajax请求参数不能为空。");return;
			}
			if(Kyee.isEmpty(config.url)){
				Kyee.Logger.error("ajax请求URL不能为空。");return;
			}
			config.cache = false;
			//config.contentType  = config.contentType ||"application/json";
			config.dataType   	= config.dataType  ||"json";
			config.method    	= config.method   ||"GET";
			config.timeout    	= config.timeout   ||30000;
			config.maskLayer	= config.maskLayer;
			var showFalseMessage = config.showFalseMessage===false?false:true;
			var errorCallBack = config.error;
			var successCallBack = config.success;
			config.success = function(data,textStatus,jqXHR){
				Kyee.waitingBox && Kyee.waitingBox.close();
				if(data&&!data.success&&showFalseMessage&&config.dataType=="json"){
					new Kyee.Message({message:data.message}).show();
				}
				if(successCallBack){
					successCallBack.apply(window,[data,textStatus,jqXHR]);
				}
			}
			config.error = function(jqXHR,textStatus,errorThrown){
				Kyee.waitingBox && Kyee.waitingBox.close();
				var code = jqXHR.code;
				if(jqXHR.status==500){//一般提示
					var exceptionMap = $.parseJSON(jqXHR.responseText);
					if(exceptionMap.exceptionType=="BUSINESS"){
//						Kyee.alertBox.updateMessage(exceptionMap.message).show();
						new Kyee.Message({message:exceptionMap.message}).show();
					}
					else{
//						Kyee.alertBox.updateMessage("非常抱歉，服务器出现异常，请联系管理员.").show();
						new Kyee.Message({message:"非常抱歉，服务器出现异常，请联系管理员."}).show();
						return;
					}
				}
				if(errorCallBack){
					errorCallBack.apply(window,[jqXHR,textStatus,errorThrown]);
				}
				
			}
			//发起请求
			Kyee.waitingBox && Kyee.waitingBox.show();
			$.ajax(config);
			
		},
		//页面跳转
		goTo:function(url){
			window.location.href=url;
		},
		//将身份证号转换为****
        getStarIdNo:function (idNo) {
            if (idNo == null || idNo == undefined || idNo == '') {
                return;
            }
            else {
                var len = idNo.length;
                var head = idNo.substr(0, 3);
                var idNoS = head;
                var tail = idNo.substr(len - 4, 4);//substr(len - 6, 6);
                for (var i = 3; i < idNo.length - 4; i++) {
                    idNoS = idNoS + '*';
                }
                idNoS = idNoS + tail;
                return idNoS;
            }
        },
        //将手机号转换为****
        getStarPhoneNum:function (phoneNum) {
            if (phoneNum == null || phoneNum == undefined || phoneNum == '') {
                return;
            }
            else {
                var len = phoneNum.length;
                var head = phoneNum.substr(0, 3);
                var phoneS = head;
                var tail = phoneNum.substr(len - 4, 4);
                for (var i = 3; i < phoneNum.length - 4; i++) {
                    phoneS = phoneS + '*';
                }
                phoneS = phoneS + tail;
                return phoneS;
            }
        },
        /**
         * 身份证校验
         * @param idNo
         * @returns {*}
         */
        idCardCheck: function (idNo) {
            if (idNo.length != 18) //判断身份证号是否大于18位
            {
                return false;
            }
            else if (isNaN(idNo.substring(0, 17))) //切割字符串从第0个开始，长度为17-0位,第0位到第17位,判断是否为非数值
            {
                return false;
            }
            else if (isNaN(idNo.substring(17))) //切割字符串从第0个开始，长度为17位
            {
                //判断是否最后一位为X，需要进行大小写转换，避免由于大小写问题造成的验证失败
                if (idNo.substring(17, 18).toUpperCase() != 'X') //判断最后以为是否为X
                {
                    return false;
                }
            }
            return Kyee.authIdCard(idNo); //身份证最后一位验证算法
        },
        /**
         * 身份证最后一位校验
         * @param idNo
         * @returns {boolean}
         */
        authIdCard: function (idNo) {
            //系数枚举
            var authArray = new Array();
            authArray[0] = 7;
            authArray[1] = 9;
            authArray[2] = 10;
            authArray[3] = 5;
            authArray[4] = 8;
            authArray[5] = 4;
            authArray[6] = 2;
            authArray[7] = 1;
            authArray[8] = 6;
            authArray[9] = 3;
            authArray[10] = 7;
            authArray[11] = 9;
            authArray[12] = 10;
            authArray[13] = 5;
            authArray[14] = 8;
            authArray[15] = 4;
            authArray[16] = 2;
            //对照值枚举
            var refArray = new Array();
            refArray[0] = 1;
            refArray[1] = 0;
            refArray[2] = 'X';
            refArray[3] = 9;
            refArray[4] = 8;
            refArray[5] = 7;
            refArray[6] = 6;
            refArray[7] = 5;
            refArray[8] = 4;
            refArray[9] = 3;
            refArray[10] = 2;
            //初始化总数
            var total = 0;
            idNo = $.trim(idNo);//清空字符串前后无用字符
            for (var i = 0; i < 17; i++) //计算总值
            {
                total += Number(idNo[i]) * authArray[i];
            }
            if (refArray[Number(total % 11)] == idNo[17]) //判断验证位是否符合
            {
                return true;
            }
            else {
                return false;
            }
        },
        /*错误信息提示
         * 提示信息模块需要自己写
         * <div class="hidden" id="prompt_block">
         * 		<span class="color-prompt" id="error_prompt"></span>
         * </div>
         * 将此模块添加到需要显示提示信息的地方样式自己添加，只需要保证id存在就行
         * */
        showErrorInfo: function(msg){
    		$("#error_prompt").text(msg);
    		$("#prompt_block").removeClass("hidden");
    	},
    	/*错误提示信息清除*/
    	clearErrorInfo:function(clearText){
    		$("#error_prompt").text("");
    		if(!clearText){
    			$("#prompt_block").addClass("hidden");
    		}
    	},
       /* 手机号码验证*/
        validateMobil: function (phone,clearText) {
            var patrn = /^(\+86)?1[3|5|4|7|8]\d{9}$/;
            if (Kyee.isEmpty(phone)) {
            	Kyee.showErrorInfo("*  手机号码不能为空!");
                return false;
            }
            if (!patrn.test($.trim(phone))) {
            	Kyee.showErrorInfo("*  手机号格式或长度错误!");
                return false;
            }
            Kyee.clearErrorInfo(clearText);
            return true;
        },
        /*校验身份证号*/
        validateIdCard: function (idNo) {
            //为空提示
            if (Kyee.isEmpty(idNo)) {
            	Kyee.showErrorInfo("身份证号码不能为空!");
                return false;
            }
            if (Kyee.idCardCheck($.trim(idNo)) == false) {
            	Kyee.showErrorInfo("请输入正确的身份证格式!");
                return false;
            }
            Kyee.clearErrorInfo();//清除错误提示消息
            return true;
        },
        /**
         * 校验密码
         * @param password
         * @returns {boolean}
         */
        validatePassWord: function (password,clearText) {
        	var password = $.trim(password);
            //为空提示
            if (Kyee.isEmpty(password)) {
            	Kyee.showErrorInfo("*  密码不能为空!");
                return false;
            }
            var patrn = /^[!@#$*_A-Za-z0-9]+$/;//正确密码正则匹配格式
            var ch_patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;//匹配中文正则
            if (!patrn.test(password) || ch_patrn.exec(password)) {
            	Kyee.showErrorInfo("*  密码由数字和字母和下划线组成!");
                return false;
            } 
            if (password.length > 16 || password.length < 6) {
            	Kyee.showErrorInfo("*  密码长度必须在6到16位之间！");
                return false;
            }
            Kyee.clearErrorInfo(clearText);
            return true;
        },
        /**
         * 校验验证码
         * @param checkCode
         * @returns {boolean}
         */
        validateCheckCode: function (checkCode) {
            if (Kyee.isEmpty(checkCode)) {
            	Kyee.showErrorInfo("验证码不能为空！");
                return false;
            }
            var patrn = /^[0-9]+$/;
            if (!patrn.test($.trim(checkCode))) {
            	Kyee.showErrorInfo("请输入正确验证码！");
                return false;
            }
            Kyee.clearErrorInfo();
            return true;
        },
        
        /*验证码获取按钮状态更新
         * phoneNumber 为获取验证码的手机号码
         * target 为获取验证码按钮对象
         * 
         * */
        getVcode: function(phoneNumber,target,callback){
        	if (Kyee.isEmpty(phoneNumber)) {
            	Kyee.showErrorInfo("手机号码不能为空！");
                return ;
            }
        	var second = 120;
        	target.val("剩余"+second+"秒");
        	target.attr("disabled","disabled");
        	target.removeClass("bg-theme");
        	/*target.removeClass("color-white");*/
        	var interval = setInterval(function(){
        			second--;
        			if(second == 0){
        				target.val("获取验证码");
        				target.removeAttr("disabled");
        				target.addClass("bg-theme");
        	        	target.addClass("color-white");
        				clearInterval(interval);
        			}else{
        				target.val("剩余"+second+"秒");
        				target.attr("disabled","disabled");
        			}
        		},1000);
        	var sendCode = function(phone){
        		Kyee.ajax({
	    			url:Kyee.CTX_PATH+"/user/sendMessageCode.next",
	    			method:"POST",
	    			data:{
	    				"phoneNumber":phone
	    			},
	    			success:function(result){
	    				if(Kyee.isEmpty(result))return;
	    				if(result.success){
	    					callback && callback();
	    				}else{
	    					
	    				}
	    			}
	    		});
        	};
        	sendCode(phoneNumber); //获取验证码
        },
        
        /**
		 * 注销登录公共方法
		 * @param name
		 * @returns
		 * data:{
		 * confirmFlag:true
		 * }
		 */
        goExit:function(){
        	new Kyee.Message({
    			message:'确认注销？',
    			type:'confirm',
    			confirmFn:function(){
    				Kyee.ajax({
    	    			url: Kyee.CTX_PATH+"/user/loginOut.next",
    	    			method: 'get',
    	    			dataType:'json',
    	    			success:function(result){
    	    				if(Kyee.isEmpty(result))return;
    	    				if(result.success){
    	    					Kyee.deleteCookie("autoLoginInfo");
    	    					Kyee.goTo(Kyee.CTX_PATH+"/system/portals-login.next");
    	    				}
    	    			}
    	    		});
    			}
    		}).show();
        },
        /**
		 * 获取当前时间是上午还是下午
		 * @param name
		 * @returns
		 */
        getCurTime:function(){
        	var time = new Date().toLocaleTimeString();
        	return time.substring(0,2) + "好!";
        },
        
        /**
		 * 截取时间中的日期
		 * @param name
		 * @returns
		 */
        formatDate: function(date){
        	if(date){
        		return date.substring(0,10).replace(/\//g,"-");
        	}
        	
        	return "";
        },
        /**
		 * 转换费用为小数点后两位
		 * @param name
		 * @returns
		 */
        formatFee: function(fee){
        	if(Kyee.isEmpty(fee)){
        		return 0.00;
        	}else{
        		return parseFloat(fee).toFixed(2);
        	}
        },
        
		/**
		 * 从url上获取参数
		 * @param name
		 * @returns
		 */
		getQueryString:function(name) { 
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null) 
				return unescape(r[2]); 
			return null; 
		},
		
		getWeekName:function(dat){
			if(!Kyee.isDate(dat)){
				Kyee.Logger.error("不合法的日期对象.");return;
			}
			return Kyee.WEEKS[dat.getDay()];
		},
		getShortWeekName:function(dat){
			if(!Kyee.isDate(dat)){
				Kyee.Logger.error("不合法的日期对象.");return;
			}
			return Kyee.SHORTWEEKS[dat.getDay()];
		},
		/**
		 * 添加浮动样式
		 */
		hover:function(selector,hoverCls){
			if(arguments.length<2)return;
			var elem = $(selector);
			if(elem.length==0)return;
			if(arguments.length==2){
				elem.on("mouseover mouseout",function(event){
					elem[(event.type == "mouseover")?"addClass":"removeClass"](hoverCls);
				});
			}else if(arguments.length==3){
				var subSelector = hoverCls;hoverCls = arguments[2];
				elem.on("mouseover mouseout",subSelector,function(event){
					var me = $(this);
					me[(event.type == "mouseover")?"addClass":"removeClass"](hoverCls);
				});
			}
		},
		//获取指定日期之前或之后的日期
		getDate:function(date,distance){
			return new Date(date.valueOf() + distance*24*60*60*1000);
		},
		//添加事件
		addEvent : (function(window, undefined) {        
	        var _eventCompat = function(event) {
	            var type = event.type;
	            if (type == 'DOMMouseScroll' || type == 'mousewheel') {
	                event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
	            }
	            //alert(event.delta);
	            if (event.srcElement && !event.target) {
	                event.target = event.srcElement;    
	            }
	            if (!event.preventDefault && event.returnValue !== undefined) {
	                event.preventDefault = function() {
	                    event.returnValue = false;
	                };
	            }
	            return event;
	        };
	        if (window.addEventListener) {
	            return function(el, type, fn, capture) {
	                if (type === "mousewheel" && document.mozHidden !== undefined) {
	                    type = "DOMMouseScroll";
	                }
	                el.addEventListener(type, function(event) {
	                    fn.call(this, _eventCompat(event));
	                }, capture || false);
	            };
	        } else if (window.attachEvent) {
	            return function(el, type, fn, capture) {
	                el.attachEvent("on" + type, function(event) {
	                    event = event || window.event;
	                    fn.call(el, _eventCompat(event));    
	                });
	            };
	        }
	        return function() {};
		})(window),
		
		//检测当前用户是否登录
		isLogin:function(){
			var result = false;
			Kyee.ajax({
				url:Kyee.CTX_PATH+"/user/getUserInfo.next",
				async:false,
				showFalseMessage:false,
				success:function(data){
					result = data.success;
				}
			});
			return result;
		},
		
		doUserLogOn:function(config){
			
			//用户登录
			Kyee.ajax({
				url : Kyee.CTX_PATH+"/user/login.next",
				data : config.data,
				dataType :"json",
				showFalseMessage : config.showFalseMessage,
				method : 'post',
				success : function(data){
					if(config.data.autoLogin && config.data.autoLogin == true){
						delete config.data.autoLogin;
						
						Kyee.setAutoLoginState(config);
					}
					config.success && config.success(data);
				}
			});
		},
		
		setAutoLoginState:function(config){
			//缓存自动登录信息
			Kyee.createCookie("autoLoginInfo",JSON.stringify(config.data),10);
		}
		
	}
	
	
	
	/**
	 * 创建LogWin类
	 */
	function LoginWin(){
		this.logWin = null;
		this.logWinMask = null;
		this.closeBtn = null;
		this.forgetPassLink = null;
		this.registerLink = null;
		this.logOnBtn = null;
	}
	//读取登录窗口html代码
	LoginWin.prototype.loadLogWin = function(){
		var me = this;
		Kyee.ajax({
			url:Kyee.CTX_PATH+"/system/portals/modules/common/login_win.jsp",
			dataType :"html",
			async:false,
			success:function(html){
				$(document.body).append(html);
				me.logWin = $(".login-win");
				me.logWinMask = $(".login-win-mask");
				me.initPage();
			}
		});
	}
	
	LoginWin.prototype.initPage = function(){
		var me = this;
		me.closeBtn = me.logWin.find(".close-icon");
		me.forgetPassLink = me.logWin.find(".forget-pass");
		me.registerLink = me.logWin.find(".register");
		me.logOnBtn = me.logWin.find(".logon");
		me.closeBtn.on("click",function(){
			me.close();
		});
		me.forgetPassLink.on("click",function(){
			Kyee.goTo(Kyee.CTX_PATH+"/system/portals-goback-password.next");
		});
		me.registerLink.on("click",function(){
			Kyee.goTo(Kyee.CTX_PATH+"/system/portals-register.next");
		});
		me.logOnBtn.on("click",function(){
			me.logOn();
		});
		Kyee.hover(me.closeBtn,"close-icon-hover");
		
		me.cardTypeBox = new Kyee.Combox({
			data:[{value:0,name:'手机号'},{value:1,name:'就诊卡'}],
			readOnly:true,
			width:77,
			element:me.logWin.find("div[name=cardType]"),
			value:0
		});
		//绑定选择发生变化事件
		me.cardTypeBox.on("selectionchange",function(combo,data,oldData){
			me.logWin.find("input[name=cardNumber]").val("");
			me.logWin.find("input[name=password]").val("");
		});
	}
	/**
	 * 登录
	 */
	LoginWin.prototype.logOn = function(){
		var me = this;
		var cardType = me.cardTypeBox.getSelectValue(),
			cardNumber = me.logWin.find("input[name=cardNumber]").val(),
			password = me.logWin.find("input[name=password]").val();
		if(cardType == 0){
			if(!Kyee.validateMobil(cardNumber)) { //电话号码校验
				return;
			}
		}else{
			/*if(!Kyee.validateMobil()) { //就诊卡号校验
				return;
			}*/
		}
		
		if(!Kyee.validatePassWord(password)) {
			return;
		}
		//统一的用户登录
		Kyee.doUserLogOn({
			showFalseMessage:false,
			data:{
				"cardType":cardType,
				"cardNumber":cardNumber,
				"password":password
			},
			success:function(data){
				if(data.success){
					me.close();
					if(me.logOnCallBack){
						me.logOnCallBack.apply(window,me.logOnCallBackArgs);
					}
				}else{
					Kyee.showErrorInfo(data.message);
				}
			}
		});
	}
	
	LoginWin.prototype.setLogOnCallBack = function(fn){
		var me = this;
		me.logOnCallBackArgs = [];
		if(arguments==0){
			return;
		}else if(arguments==1){
			me.logOnCallBack = fn;
		}else{
			me.logOnCallBack = fn;
			me.logOnCallBackArgs = Array.prototype.slice.call(arguments,1);
		}
	}
	
	LoginWin.prototype.show = function(){
		var me = this;
		if(me.logWin==null){
			me.loadLogWin();
		}
		me.logWin.removeClass("hidden");
		me.logWinMask.removeClass("hidden");
		me.refreshPosition();
	}
	/**
	 * 重新计算logwin的位置
	 */
	LoginWin.prototype.refreshPosition = function(){
		var me = this,
			browser = $(window),
			clientH = browser.height(),
			clientW = browser.width(),
			scrollH = $(document.body).height(),
			scrollW = $(document.body).width(),
			logBlock = me.logWin.find(".login-block");
		me.logWin.css({
			left:(clientW-me.logWin.width())/2,
			top:(clientH-me.logWin.height())/2
		});
		me.logWinMask.css({
			width:scrollW,
			height:scrollH
		});
	}
	
	LoginWin.prototype.close = function(){
		var me = this;
		me.logWin.addClass("hidden");
		me.logWinMask.addClass("hidden");
	}
	
	Kyee.logWin = new LoginWin();
	win.Kyee = Kyee;
})(window)


//读取是否登录状态
Kyee.ISLOGIN = Kyee.isLogin();

//检查是否需要自动登录
var autoLoginInfo = Kyee.getCookie("autoLoginInfo");

if(!Kyee.isEmpty(autoLoginInfo) && !Kyee.ISLOGIN){
	//统一的用户登录
	Kyee.doUserLogOn({
		showFalseMessage:false,
		data:JSON.parse(autoLoginInfo),
		success:function(data){
			var goToHomeUrl = ["portals-register","portals-login"],
				isGoToHome = false;
			
			//检测登录后是否前往主页
			for(var i=0;i<goToHomeUrl.length;i++){
				if(location.href.indexOf(goToHomeUrl[i])>=0){
					isGoToHome = true;
					break;
				}
			}
			
			if(isGoToHome){
				Kyee.goTo(Kyee.CTX_PATH+"/system/portals-home.next");
			}else{
				location.reload();
			}
			
		}
	});
}
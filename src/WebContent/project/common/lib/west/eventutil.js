/**
 * 事件工具函数
 */

(function(win){
	
	var EventUtil = {
		/**
		 * @description 事件存储器，存储所有事件数据
		 * 		数据结构：{
		 * 			'event1':[{
		 * 					scope:scope//js对象,
		 * 					fn:fn//js函数,
		 * 					eventId:eventId//自动生成的唯一性id
		 * 					param:params//js对象，需要传递的参数
		 * 				},{
		 * 					scope:scope1//js对象,
		 * 					fn:fn1//js函数,
		 * 					eventId:eventId1//自动生成的唯一性id
		 * 					param:params1//js对象，需要传递的参数
		 * 			}],
		 * 			'event2':[{
		 * 					scope:scope3//js对象,
		 * 					fn:fn3//js函数,
		 * 					eventId:eventId3//自动生成的唯一性id
		 * 					param:params3//js对象，需要传递的参数
		 * 				},{
		 * 					scope:scope4//js对象,
		 * 					fn:fn4//js函数,
		 * 					eventId:eventId4//自动生成的唯一性id
		 * 					param:params4//js对象，需要传递的参数
		 * 			}]
		 * 		}
		 * @author nidongsheng
		 * @date 2016-05-17
		 * 
		 */
		events:{
			
		},
		//索引值,用于事件id
		index:1,
		/**
		 * @description 事件绑定函数，支持批量绑定
		 * @param String eventName 事件名称
		 * @param Function fn 事件函数
		 * @param Object  事件执行人
		 * @param params  事件接收的参数 
		 * @author 倪东省
		 * @date 2016-05-17
		 * @public 对外函数
		 * examples：
		 * 1.单个事件绑定
		 * 	object.on("itemclick", onItemClick, objectb,{p1:1,p2:2});
		 * 2.批量事件绑定
		 * 	object.on({
    	 *		cellclick: {fn: onCellClick, scope: objectC},
    	 *		viewready: {fn: onViewReady, scope: panel,params:{p1:1,p2:2}}
    	 *	});
		 */
		on:function(eventName,fn,scope,params){
			
			if(Kyee.isEmpty(eventName)){
				Kyee.Logger.error("事件名称为空，无法进行本次事件注册。");return;
			}
			//当未指定事件函数时，事件绑定失败，给出明确提示
			if(Kyee.isString(eventName)&&!Kyee.isFunction(fn)){
				Kyee.Logger.error("未指定事件函数，无法进行本次事件注册。");return;
			}
			
			if(Kyee.isObject(eventName)){
				var evts = eventName;
				for(var ename in evts){
					var evt = evts[ename];
					if(!Kyee.isFunction(evt.fn)){
						Kyee.Logger.error("有事件'"+ename+"'未指定事件函数，当前事件注册失败。");continue;
					}
					EventUtil.attachEvent(ename,evt.fn,evt.scope,evt.params);
				}
			}else if(Kyee.isString(eventName)){
				EventUtil.attachEvent(eventName,fn,scope,params);
			}
			
		},
		/**
		 * @description 事件绑定，内部用，数据安全已在on函数检查完毕
		 * @author 倪东省
		 * @date 2016-05-17
		 * @return String eventId
		 */
		attachEvent:function(eventName,fn,scope,params){
			var eventCache = EventUtil.events[eventName];
			if(Kyee.isEmpty(eventCache)){
				eventCache = EventUtil.events[eventName] = [];
			}
			var evtId = eventName+EventUtil.index;
			eventCache.push({
				fn:fn,
				scope:scope,
				params:params,
				eventId:evtId
			});
		},
		/**
		 * @description 触发事件
		 * @param:事件名称
		 * @param:args 传递给接收者的参数
		 * 
		 */
		fireEvent:function(eventName){
			if(!Kyee.isString(eventName)){
				Kyee.Logger.error("事件名应该是字符类型");return;
			}
			
			var eventCache = EventUtil.events[eventName];
			if(Kyee.isEmpty(eventCache)){
				return;
			}
			for(var i=0;i<eventCache.length;i++){
				var evt = eventCache[i],
					params = Array.prototype.slice.call(arguments,1);
				
				if(Kyee.isEmpty(evt.params)){
					params.push(evt.params)
				}
				if(Kyee.isEmpty(params)){
					evt.fn.apply(evt.scope||window);
				}else{
					evt.fn.apply(evt.scope||window,params);
				}
			}
		},
		/**
		 * 解除事件绑定
		 */
		un:function(eventName,eventId){
			if(Kyee.isEmpty(eventName)){
				Kyee.Logger.error("事件名称为空，不能移除事件。");return;
			}
			if(Kyee.isEmpty(eventId)){
				Kyee.Logger.error("事件id为空，不能移除事件。");return;
			}
			var eventCache = EventUtil.events[eventName];
			if(Kyee.isEmpty(eventCache)){
				return;
			}
			for(var i=0;i<eventCache.length;i++){
				var evt = eventCache[i];
				if(evt.eventId==eventId){
					eventCache.splice(i,1);
					break;
				}
			}
		}
	}
	
	Kyee.EventUtil = EventUtil;
	/**
	 * 支持事件能力
	 */
	Kyee.supportEvent = function(dest){
		$.extend(dest,EventUtil);
	}
	
})(window)
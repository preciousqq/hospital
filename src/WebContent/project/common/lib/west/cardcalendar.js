
//日历组件
(function(win){
	//图片轮播组件
	function CardCalendar(config){
		if(Kyee.isEmpty(config)){
			return;
		}
		if(Kyee.isEmpty(config.element)){
			Kyee.Logger.error("未指定容器，无法设置出calendar");return;
		}
		this.container = config.element;
		if(Kyee.isString(config.element)){
			this.container = $(config.element);
		}
		this.schedules = config.schedules||[];
		this.doctor = config.doctor||null;
		
		this.renderCalender();
		
		this.tooltip = $("<div class='kyee-tooltip-bg'></div>");
		$(document.body).append(this.tooltip);
	};
	
	//创建原点
	CardCalendar.prototype.renderCalender = function(){
		var me = this;
		
		me.ULContainer =$("<ul class='kyee-cardcalendar-ul'>" +
				"<li class='kyee-cardcalendar-ul-schedule-am'>" +
					"<ul></ul>"+
				"</li>"+
				"<li class='kyee-cardcalendar-ul-schedule-pm'>" +
					"<ul></ul>"+
				"</li>"+
				"</ul>");
		me.firstUL = me.ULContainer.find(".kyee-cardcalendar-ul-schedule-am >ul");
		me.secondUL = me.ULContainer.find(".kyee-cardcalendar-ul-schedule-pm >ul");
		me.firstUL.append("<li class='am-text' >上午</li>");
		me.secondUL.append("<li class='pm-text' >下午</li>");
		for(var i=0;i<7;i++){
			me.firstUL.append("<li index="+i+" class='kyee-cardcalendar-disable-circle'></li>");
			me.secondUL.append("<li index="+i+" class='kyee-cardcalendar-disable-circle'></li>");
		}
		
		me.container.append(me.ULContainer);
		
		me.firstUL.on("click","li",function(){
			if(!$(this).hasClass("kyee-cardcalendar-enable-circle"))return;
			var code = $(this).attr("code");
			var schedule = me.findScheduleByCode(code);
			me.fireEvent("appoint",me,me.doctor,schedule);
		});
		me.secondUL.on("click","li",function(){
			if(!$(this).hasClass("kyee-cardcalendar-enable-circle"))return;
			var code = $(this).attr("code");
			var schedule = me.findScheduleByCode(code);
			me.fireEvent("appoint",me,me.doctor,schedule);
		});
		//预约按钮的浮动效果
		me.ULContainer.on("mouseover mouseout","li[class*=kyee-cardcalendar-enable-circle]",function(event){
			var target = $(this);
			if(event.type == "mouseover"){
				target.addClass("kyee-cardcalendar-enable-circle-hover");
				var offset = target.offset(),
					width = target.width(),
					height = target.height();
				me.tooltip.css({
					display:"block",
					top:offset.top+height-3,
					left:offset.left+width/2-me.tooltip.width()/2
				});
				me.tooltip.html("<span style='color:#aaa'>挂号费：</span>     <span style='color:#059981'>￥"+($(this).attr("sumFee")-0).toFixed(2)+"元</span>");
			}
			else{
				target.removeClass("kyee-cardcalendar-enable-circle-hover");
				me.tooltip.css("display","none");
			}
		});
	}
	/**
	 * 更新排成状态
	 */
	CardCalendar.prototype.updateSchedule = function(dates){
		var me = this;
		me.firstUL.find("li").removeClass("kyee-cardcalendar-enable-circle kyee-cardcalendar-appoint-booked")
		.attr("title","").attr("sumFee","");
		me.secondUL.find("li").removeClass("kyee-cardcalendar-enable-circle kyee-cardcalendar-appoint-booked")
		.attr("title","").attr("sumFee","");
		
		for(var i=0;i<dates.length;i++){
			var date = dates[i],
				dateString = date.date.getFullYear()+"/"+date.dateStr;
			for(var j=0;j<me.schedules.length;j++){
				var schedule = me.schedules[j],
					scheduleDateStr = schedule.clinicDate.substring(0,10);
				if(dateString==scheduleDateStr){
					var target = schedule.clinicDuration=="上午"?me.firstUL:me.secondUL;
					if(schedule.isTime==0){//约满
						target.find("li[index="+i+"]").addClass("kyee-cardcalendar-appoint-booked");
					}else if(schedule.isTime==1){//可以预约
						target.find("li[index="+i+"]").addClass("kyee-cardcalendar-enable-circle")
						.attr("sumFee",schedule.sumFee)
						.attr("code",schedule.clinicDate+schedule.clinicDuration);
					}else if(schedule.isTime==2){//停诊
						target.find("li[index="+i+"]").addClass("kyee-cardcalendar-out-service");
					}
				}
			}
		}
	}
	CardCalendar.prototype.findScheduleByCode = function(code){
		var me = this;
		for(var j=0;j<me.schedules.length;j++){
			var schedule = me.schedules[j];
			if(code==(schedule.clinicDate+schedule.clinicDuration+"")){
				return schedule;
			}
		}
	}
	
	//开始事件能力
	Kyee.supportEvent(CardCalendar.prototype);
	Kyee.CardCalendar = CardCalendar;
})(window)
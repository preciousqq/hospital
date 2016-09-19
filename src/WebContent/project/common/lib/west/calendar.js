//日历组件
(function(win){
	//图片轮播组件
	function Calendar(config){
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
		this.index = 0;
		//默认14天时间间隔
		this.dateInterval = config.dateInterval||14;
		this.startDate = config.startDate||new Date();
		
		this.data = this.initDate();
		
		this.renderCalender();
		
		this.changeSliderState();
	};
	/**
	 * 初始化日期数据
	 */
	Calendar.prototype.initDate = function(){
		var me = this;
		var dateArr =[],
			startDate = me.startDate;
		for(var i=0;i<me.dateInterval;i++){
			var newDate = new Date(startDate.valueOf() + i*24*60*60*1000),
				month = newDate.getMonth()+1,
				dateStr = (month>9?month:("0"+month))+"/"+(newDate.getDate()>9?newDate.getDate():("0"+newDate.getDate())),
				day = newDate.getDay(),
				dayName = Kyee.getShortWeekName(newDate);
			var dat = {
				date:newDate,
				dateStr :dateStr,
				day:day,
				dayName:dayName
			}
			dateArr.push(dat);
		}
		return dateArr;
	}
	//创建原点
	Calendar.prototype.renderCalender = function(){
		var me = this;
		
		me.lastBtn = $("<a class='kyee-calendar-last-btn-disable'></a>");
		me.nextBtn = $("<a class='kyee-calendar-next-btn-disable'></a>");
		
		me.calendarContainer = $("<ul class='kyee-calendar-container'></ul>");
		me.calendarContainer.empty();
		var start = me.index*7,end = (me.index+1)*7;
			end = end>me.data.length?me.data.length:end;
		for(var i=start;i<end;i++ ){
			var data = me.data[i];
			var li = $("<li>" +
					"<p class='kyee-calendar-day'>"+data.dateStr+"</p>"+
					"<p class='kyee-calendar-week'>"+data.dayName+"</p>"+
			"</li>");
			me.calendarContainer.append(li);
		}
		
		me.container.append(me.lastBtn).append(me.calendarContainer).append(me.nextBtn);
		
		me.lastBtn.on("click",function(){
			if($(this).hasClass("kyee-calendar-last-btn-enable")){
				me.index--;
				me.renderDay();
				me.changeSliderState();
			}
		});
		
		me.nextBtn.on("click",function(){
			if($(this).hasClass("kyee-calendar-next-btn-enable")){
				me.index++;
				me.renderDay();
				me.changeSliderState();
			}
		});
		//浮动样式
		me.lastBtn.on("mouseover mouseout",function(event){
			if($(this).hasClass("kyee-calendar-last-btn-enable")){
				me.lastBtn[(event.type == "mouseover")?"addClass":"removeClass"]("kyee-calendar-last-btn-hover");
			}
		});
		//浮动样式
		me.nextBtn.on("mouseover mouseout",function(event){
			if($(this).hasClass("kyee-calendar-next-btn-enable")){
				me.nextBtn[(event.type == "mouseover")?"addClass":"removeClass"]("kyee-calendar-next-btn-hover");
			}
		});
	}
	/**
	 * 渲染日期
	 */
	Calendar.prototype.renderDay = function(){
		var me = this;
		
		me.calendarContainer.empty();
		var start = me.index*7,end = (me.index+1)*7;
			end = end>me.data.length?me.data.length:end;
		for(var i=start;i<end;i++){
			var data = me.data[i];
			var li = $("<li>" +
					"<p class='kyee-calendar-day'>"+data.dateStr+"</p>"+
					"<p class='kyee-calendar-week'>"+data.dayName+"</p>"+
			"</li>");
			me.calendarContainer.append(li);
		}
	}
	
	/**
	 * 修改slider状态
	 */
	Calendar.prototype.changeSliderState = function(){
		var me = this;
		me.lastBtn.removeClass("kyee-calendar-last-btn-hover");
		me.lastBtn[me.index==0?"removeClass":"addClass"]("kyee-calendar-last-btn-enable");
		
		me.nextBtn.removeClass("kyee-calendar-next-btn-hover");
		var endFlag = (Math.ceil(me.data.length/7)-1)==me.index;
		me.nextBtn[endFlag?"removeClass":"addClass"]("kyee-calendar-next-btn-enable");
		
		me.fireEvent("sliderchange",me,me.index,me.getCurrentDates());
	}
	
	/**
	 * 修改slider状态
	 */
	Calendar.prototype.getCurrentDates = function(){
		var me = this;
		var start = me.index*7,end = (me.index+1)*7;
			end = end>me.data.length?me.data.length:end;
		var data = [];
		for(var i=start;i<end;i++){
			data.push(me.data[i]);
		}
		return data;
	}
	
	//开始事件能力
	Kyee.supportEvent(Calendar.prototype);
	Kyee.Calendar = Calendar;
})(window)
(function(win){
	//图片轮播组件
	function Slider(config){
		if(Kyee.isEmpty(config)){
			return;
		}
		if(Kyee.isEmpty(config.element)){
			Kyee.Logger.error("未指定容器，无法设置slider");return;
		}
		this.container = config.element;
		if(Kyee.isString(config.element)){
			this.container = $(config.element);
		}
		if(!Kyee.isEmpty(config.banner)){
			this.banner = $(config.banner);
		}
		this.speed = config.speed?config.speed*1000:5000;
		this.speed2 = 800;//滑动时间未1.5秒
		this.autoPlay = config.autoPlay===true;
		//是否显示圆点
		this.dots = (config.dots===false)?false:true;
		this.index = 0;
		//设定播放器最大轮播10幅图片，在大，则丢弃剩下的数据
		this.maxDataLength = config.maxDataLength||10;
		this.link = config.link;
		
		//创建slider
		this.container.css({"overflow":"hidden","position":'relative'});
		this.data = config.data;
		//当轮播图片数量过多时，截除超出的数据
		if(this.data.length>this.maxDataLength){
			this.data.splice(this.maxDataLength);
		}
		
		this.createImages();
		
		this.createDots();
		
		this.timeout = null;
		
		if(this.autoPlay){
			this.play();
		}
	};
	
	//创建原点
	Slider.prototype.createDots = function(){
		var me = this;
		//创建原点对象
		if(!me.dots)return;
		var length = me.data.length,
			width = me.container.width();
		me.dotsUl = $("<ul/>").css({
			"width":48*length,
			"height":20,
			"position":'absolute',
			"left":(width-(length-1)*48)/2,
			"bottom":44
		});
		for(var i=0;i<length;i++){
			var dat = me.data[i];
			
			li = $("<li index='"+i+"' class='kyee-slider-dot-b'></li>");
			me.dotsUl.append(li);
		}
		me.container.append(me.dotsUl);
		
		me.activeDot(0);
		
		me.dotsUl.on('click','li',function(){
			var ele = $(this);
			clearTimeout(me.timeout);//清空定时
			me.play((ele.attr("index")-0),1);
		});
	}
	//创建图片对象
	Slider.prototype.createImages = function(){
		var me = this;
		var length = me.data.length,
			width = me.container.width(),
			height = me.container.height();
		
		me.ul = $("<ul/>").css({
			"width":width*length,
			"height":height,
			"position":'absolute',
			"left":0
		});
		for(var i=0;i<length;i++){
			var dat = me.data[i],
				li = $("<li style='cursor:pointer'><img src='"+dat.src+"' width='"+width+"px' height='"+height+"'/></li>");
				li.css({"display":"inline-block"});
				me.ul.append(li);
				if(me.link){
					li.on("click",function(){
						Kyee.goTo(me.link);
					});
				}
		}
		me.container.append(me.ul);
	}
	
	//播放
	Slider.prototype.play = function(index,speed){
		var me = this;
		var width = me.container.width(),
			height = me.container.height(),
			length = me.data.length-1;
			desLeft = 0,finalIndex = -1;
		if(!Kyee.isEmpty(index)){
			finalIndex = (index>length)?0:index;
		}else{
			finalIndex = (me.index>=length)?0:(me.index+1);
		}
		desLeft = width*finalIndex;
		
		me.timeout = setTimeout(function(){
			me.activeDot(finalIndex);
			me.ul.animate({"left":-desLeft},me.speed2,'swing',function(){
				if(me.autoPlay){
					me.play();
				}
			});
		},speed||me.speed);
		
	}
	//激活dot
	Slider.prototype.activeDot = function(index){
		var me = this;
		me.index = index-0;
		me.dotsUl.find(".kyee-slider-dot-w").addClass("kyee-slider-dot-b").removeClass("kyee-slider-dot-w");
		me.dotsUl.find("li[index="+index+"]").removeClass("kyee-slider-dot-b").addClass("kyee-slider-dot-w");
		
		if(me.banner){
			me.banner.css("background",me.data[me.index].color);
		}
	}
	
	Kyee.Slider = Slider;
})(window)
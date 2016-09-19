(function(win){
	//图片轮播组件
	function Message(config){
		if(Kyee.isEmpty(config)){
			return;
		}
		//ALERT、CONFIRM、MESSAGE
		this.type=config.type||"MESSAGE";
		this.type = this.type.toUpperCase();
		this.message = config.message;
		this.cancelFn = config.cancelFn;
		this.confirmFn = config.confirmFn;
		this.title = config.title||"提示";
		if(this.type=="MESSAGE"){
			this.createMessage();
		}else{
			this.createBoxWin();
		}
		return this;
	};
	
	Message.prototype.createBoxWin=function(){
		var me = this;
		
		me.mask = $("<div class='kyee-message-mask'></div>");
		me.box = $("<div class='kyee-message-win'>" +
				"<div class='kyee-message-head'>" +
					"<div style='width:70px;margin:0 auto;'>" +
						"<div class='head-img'></div>" +
						"<div class='head-text'>"+me.title+"</div>" +
					"</div>"+
					"<div class='close-img'></div>" +
				"</div>"+
				"<div class='kyee-message-content'>"+me.message+"</div>"+
				"<div class='kyee-message-footer'></div>"+
		"</div>");
		
		$(document.body).append(me.mask).append(me.box);
		
		me.box.find(".close-img").on("click",function(){
			me.close();
		});
		
		if(me.type=="ALERT"){
			me.createAlertFoot();
		}else if(me.type=="CONFIRM"){
			me.createConfirmFoot();
		}
	}
	
	Message.prototype.createAlertFoot=function(){
		var me = this;
		var container = $("<div style='width:130px;margin:0 auto;'></div>");
		me.confirmBtn = $("<div class='kyee-message-confirm-button'>确定</div>");
		container.append(me.confirmBtn);
		me.box.find(".kyee-message-footer").append(container);
		
		Kyee.hover(me.confirmBtn,"kyee-message-confirm-button-hover");
		
		me.confirmBtn.on("click",function(){
			if(me.confirmFn){
				me.confirmFn();
			}
			me.close();
		});
	}
	
	Message.prototype.createConfirmFoot=function(){
		var me = this;
		var container = $("<div style='width:304px;margin:0 auto;'></div>")
		me.confirmBtn = $("<div class='kyee-message-confirm-button' style='margin-left:36px'>确定</div>");
		me.cancelBtn = $("<div class='kyee-message-cancel-button'>取消</div>");
		container.append(me.cancelBtn).append(me.confirmBtn);
		me.box.find(".kyee-message-footer").append(container);
		
		Kyee.hover(me.confirmBtn,"kyee-message-confirm-button-hover");
		Kyee.hover(me.cancelBtn,"kyee-message-cancel-button-hover");
		
		me.cancelBtn.on("click",function(){
			if(me.cancelFn){
				me.cancelFn();
			}
			me.close();
		});
		
		me.confirmBtn.on("click",function(){
			if(me.confirmFn){
				me.confirmFn();
			}
			me.close();
		});
	}
	
	Message.prototype.show=function(){
		var me = this;
		if(me.mask){
			me.mask.css("display","block");
		}
		me.box.css("display","block");
		me.refreshPosition();
		
		if(me.type=="MESSAGE"){
			setTimeout(function(){
				me.box.animate({
					opacity:0
				},1000,function(){
					me.box.remove();
					//delete this;
				});
			},1500);
		}
		return me;
	}
	
	Message.prototype.refreshPosition = function(){
		var me = this,
			browser = $(window),
			clientH = browser.height(),
			clientW = browser.width(),
			scrollH = $(document.body).height(),
			scrollW = $(document.body).width();
		me.box.css({
			left:(clientW-me.box.outerWidth())/2,
			top:(clientH-me.box.outerHeight())/2-(me.type=="MESSAGE"?0:120)
		});
		if(me.mask){
			me.mask.css({
				width:scrollW,
				height:scrollH
			});
		}
		return me;
	}
	Message.prototype.close = function(){
		var me = this;
		if(me.mask){
			me.mask.css("display","none");
		}
		me.box.css("display","none");
		return me;
	}
	
	Message.prototype.updateMessage = function(msg){
		var me =this;
		me.box.find(".kyee-message-content").text(msg);
		return me;
	}
	
	Message.prototype.updateConfirmFunction = function(fn){
		this.confirmFn = fn;
		return me;
	}
	
	Message.prototype.updateCancelFunction = function(msg){
		this.cancelFn = fn;
		return me;
	}
	
	Message.prototype.createMessage = function(msg){
		var me = this;
		
		me.box = $("<div class='kyee-message-message'>" +me.message+
		"</div>");
		
		$(document.body).append(me.box);
	}
	
	Kyee.Message = Message;
	
	//等待窗口
	function WaitingBox(config){
		if(Kyee.isEmpty(config)){
			return;
		}
		this.image=config.image;
		this.text=config.text;
		this.isShowing = false;
		this.createBox();
		return this;
	}
	WaitingBox.prototype.createBox = function(msg){
		var me = this;
		
		me.mask = $("<div class='kyee-waitingbox-mask'></div>");
		me.box = $(
				"<div class='kyee-waitingbox-container'>"+
				"<img class='kyee-waitingbox-img' src='"+me.image+"'></img>"+
				"<div style='margin-top:8px;padding-left:5px;'>"+me.text+"</div>"+
				"</div>"
			);
		$(document.body).append(me.mask).append(me.box);
		return me;
	}
	
	WaitingBox.prototype.show = function(msg){
		var me = this;
		if(me.isShowing){
			return;
		}
		me.mask.css("display","block");
		me.box.css({"display":"block"});
		me.refreshPosition();
		me.isShowing = true;
		return me;
	}
	WaitingBox.prototype.refreshPosition = function(){
		var me = this,
			browser = $(window),
			clientH = browser.height(),
			clientW = browser.width(),
			scrollH = $(document.body).height(),
			scrollW = $(document.body).width();
		me.box.css({
			left:(clientW-me.box.outerWidth())/2,
			top:(clientH-me.box.outerHeight())/2
		});
		me.mask.css({
			width:scrollW,
			height:scrollH
		});
		return me;
	}
	WaitingBox.prototype.close = function(){
		var me = this;
		if(!me.isShowing){
			return;
		}
		me.mask.css("display","none");
		me.box.css("display","none");
		me.isShowing = false;
		return me;
	}
	
	Message.WaitingBox = WaitingBox;
	
	Kyee.waitingBox = new Kyee.Message.WaitingBox({
		image:Kyee.CTX_PATH+"/system/portals/lib/kyee/resource/images/loading.gif",
		text:'努力加载中...'
	});
	Kyee.alertBox = new Kyee.Message({type:"alert"});
	Kyee.confirmBox = new Kyee.Message({type:"confirm"});
	
})(window)
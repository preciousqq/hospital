(function(win){
	//图片轮播组件
	function Combox(config){
		if(Kyee.isEmpty(config)){
			return;
		}
		if(Kyee.isEmpty(config.element)){
			Kyee.Logger.error("未指定容器，无法设置构建combox");return;
		}
		this.container = config.element;
		if(Kyee.isString(config.element)){
			this.container = $(config.element);
		}
		this.data = config.data||[];
		this.width = config.width||100;
		this.height = config.height||30;
		this.readOnly = config.readOnly||false;
		this.selectData = null;
		this.isListShow = false;
		this.value = config.value;
		
		this.createInput();
		this.createList();
		
		if(this.value||this.value==0){
			this.setValue(this.value);
		}
		
	};
	//创建输入框
	Combox.prototype.createInput = function(){
		var me = this;
		me.container.css({width:me.width,height:me.height});
		var readOnly = "";
		if(me.readOnly){
			readOnly = "readonly=\"true\"";
		}
		me.input = $("<input "+readOnly+" class='kyee-combox-input'></input>").css({
			width:me.width-20,height:me.height-10,lineHeight:me.height-10,"font-size":"16px"
		});
		var img = Kyee.CTX_PATH+"/system/portals/lib/kyee/resource/images/icon_put_down.png";
		me.dropDownBtn = $("<img src='"+img+"'>")
		
		me.container.append(me.input).append(me.dropDownBtn);
		
		me.container.on("click",$.proxy(me.showList,me));
		
	}
	//创建下拉列表
	Combox.prototype.createList = function(){
		var me = this;
		me.listUL = $("<ul class='kyee-combox-ul'></ul>").css({
			width:me.width,
		});
		for(var i=0;i<me.data.length;i++){
			var data = me.data[i];
			var li = $("<li class='kyee-combox-li' value="+data.value+">"+data.name+"</li>");
			me.listUL.append(li);
		}
		
		me.container.append(me.listUL);
		
		me.listUL.on("click","li",$.proxy(me.onLiClick,me));
		Kyee.hover(me.listUL,"li","kyee-combox-li-hover");
		
	}
	
	//创建下拉列表
	Combox.prototype.showList = function(){
		var me = this;
		if(me.isListShow){
			me.isListShow = false;
			me.listUL.css("display","none");
		}else{
			me.isListShow = true;
			me.listUL.css("display","block");
			me.refreshPosition();
		}
	}
	
	Combox.prototype.refreshPosition = function(){
		var me = this,
		position = me.container.position(),
			width = me.width,
			height = me.height;
		me.listUL.css({
			top:position.top+height+7,
			left:position.left
		});
		return me;
	}
	//数据选择
	Combox.prototype.onLiClick = function(event){
		var me = this;
		var target = $(event.target);
		Kyee.stopBubble(event);
		Kyee.stopDefault(event);
		
		var value = target.attr("value"),
			name = target.html();
		
		me.showList();
		me.setValue(value);
	}
	
	//数据选择
	Combox.prototype.setText = function(text){
		var me = this;
		me.input.val(text);
	}
	
	//数据选择
	Combox.prototype.setValue = function(value){
		var me = this;
		var oldData = me.selectData;
		var data = me.getDataByValue(value);
		if(data==null){
			//抛出发生修改事件
			if(oldData!=null){
				me.fireEvent("selectionchange",me,null,oldData);
			}
			return
		}
		me.setText(data.name);
		me.selectData = data;
		if(oldData==null||oldData.value!=data.value){
			me.fireEvent("selectionchange",me,data,oldData);
		}
	}
	
	//数据选择
	Combox.prototype.getDataByValue = function(value){
		var me = this;
		if(Kyee.isEmpty(value)){
			return null;
		}
		for(var i=0;i<me.data.length;i++){
			if(me.data[i].value==value){
				return me.data[i];
			}
		}
		return null;
	}
	
	//数据读取
	Combox.prototype.getSelectData = function(event){
		return this.data;
	}
	
	//读取选中值
	Combox.prototype.getSelectValue = function(event){
		return this.selectData==null?null:this.selectData.value;
	}
	
	//读取选中text
	Combox.prototype.getSelectName = function(event){
		return this.selectData==null?null:this.selectData.name;
	}
	//开始事件能力
	Kyee.supportEvent(Combox.prototype);
	Kyee.Combox = Combox;
})(window)
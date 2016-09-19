$(function(){
	$.ajax({
		url:"http://localhost:8081/web-jsonp/home/news",
		//data:{},
		method:"get",
		dataType:"jsonp",
		jsonp:"jsoncallback",
		data:{name:"yuanqi",sex:"female"},
		timeout:5000,
		success:function(data){
			renderNews(data);
		}
	})
	$.ajax({
		url:Kyee.CTX_PATH+"/home/doctors",
		method:"post",
		dataType:"json",
		data:{name:"qiqi",sex:"nv"},
		success:function(data){
			renderDoctors(data);
		}
	})
})

function renderDoctors(data){
	$(".doctor-list").empty();
	if(Kyee.isEmpty(data)){
		$(".no-doctor-txt").css("display","block");
	}else{
		$(".no-doctor-txt").css("display","none");
		var len = data.length>5?5:data.length;
		for(i=0;i<len;i++){
			var doctor = data[i];
			var li = $(
					'<li class="clear pad-l-14">'+
					   '<img width="60px" height="80px" class="float-l" src="'+Kyee.CTX_PATH+doctor.image+'"  onerror="javascript:this.src=\''+Kyee.CTX_PATH+'/project/resource/images/default_man.png\' ">'+
					   		'<div class="float-l mar-l-12">'+
					   		'<ul class="float-l">'+
								'<li class="clear mar-t-5">'+
									'<img src="'+Kyee.CTX_PATH+'/project/resource/images/level'+(i+1)+'.png" width="21px" height="28px" class="float-l">'+
									'<div class="name font18 float-l mar-l-8">'+doctor.name+'</div>'+
									'<div class="level font12 float-l mar-t-8">'+doctor.level+'</div>'+
								'</li>'+
								'<li class="mar-t-10">'+
									'[科室]'+doctor.room+
								'</li>'+
							'</ul>'+
					   		'</div>'+
						'</li>'
					)
				$(".doctor-list").append(li);
		}
		
	}
}
$(".step-content .step").on("mouseover mouseout",function(event){
	var li = $(event.target).closest(".step");
	var img = li.find(">div:first-child");
	var textContent = li.find(".text-content");
	var lookUp = li.find(".lookup");

	var className = img.attr("class");
	className = className.split(" ")[0];
	var hoverClass = className+"-hover";
	if(event.type == "mouseover"){
		img.addClass(hoverClass);
		if(textContent.is(":animated")){
			textContent.stop().animate({
				"margin-top":"20px"
			},300);
		}else{
			textContent.animate({
				"margin-top":"20px"
			},300);
		}
		if(lookUp.is(":animated")){
			lookUp.stop().animate({
				"height":"40px",
				"line-height":"40px"
			},300);
		}else{
			lookUp.animate({
				"height":"40px",
				"line-height":"40px"
			},300);
		}
	}else{
		img.removeClass(hoverClass);
		if(textContent.is(":animated")){
			textContent.stop().animate({
				"margin-top":"60px"
			},300);
		}else{
			textContent.animate({
				"margin-top":"60px"
			},300);
		}
		if(lookUp.is(":animated")){
			lookUp.stop().animate({
				"height":"0px",
				"line-height":"0px"
			},300);
		}else{
			lookUp.animate({
				"height":"0px",
				"line-height":"0px"
			},300);
		}
	}
});

function renderNews(data){
	if(!data){
		return;
	}
	//读取主推新闻
	var mainNew = null;
	for(var i=0;i<data.length;i++){
		if(data[i].isRecommond){
			mainNew = data[i];
			data.splice(i,1);
			break;
		}
	}
	//渲染主推新闻
	var mainNewDom = $(".left-container .home-banner");
	mainNewDom.attr("src",Kyee.CTX+mainNew.image);
    mainNewDom.attr("onerror","javascript:this.src='"+Kyee.CTX_PATH+"/project/resource/images/home_banner.png'");
    mainNewDom.attr("title",mainNew.name);
	var firstNew = data[0];
	
	$(".news-container .news-text .title").html(firstNew.name);
	$(".news-container .news-text .new-content").html(firstNew.body);
	$(".news-container .news-text .new-content").readmore({
		substr_len:45
	});
	var smallImgDom = $(".news-container .news-picture");
	smallImgDom.attr("src",Kyee.CTX+firstNew.image);
	smallImgDom.attr("onerror","javascript:this.src='"+Kyee.CTX_PATH+"/project/resource/images/home_new_icon.png'")
	
	var listContainer = $(".news-container .news-list");
	for(i=1;i<data.length;i++){
		var li = $("<li>"+data[i].body+"</li>");
		listContainer.append(li);
		$(li).readmore({
			substr_len:28
		});
	}
}

$(".left-container .module").on("mouseover mouseout",onModuleOver);
$(".left-container .small > div").on("mouseover mouseout ",onSubModuleOver);

function onModuleOver(event){
	Kyee.stopBubble(event);Kyee.stopDefault(event);
	var li = $(this);
	var className = li.attr("class");
	if(className.indexOf("small")>=0){
		return;
	}
	if(event.type == "mouseover"){
		li.addClass("module-hover");
	}else{
		li.removeClass("module-hover");
	}
}
function onSubModuleOver(event){
	Kyee.stopBubble(event);Kyee.stopDefault(event);
	var div = $(this);
	if(event.type == "mouseover"){
		div.addClass("module-hover");
	}else{
		div.removeClass("module-hover");
	}
}
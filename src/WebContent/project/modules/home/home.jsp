<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<title>网站</title>
	<%@ include file="../../common/include.jsp" %>
	<%-- <link rel="shortcut icon" href="/templates/images/favicon.ico" />
	<link rel="Bookmark" href="/templates/images/favicon.ico">--%>
	<link rel="stylesheet" type="text/css" href="${CTX_PATH}/project/modules/home/css/home.css"/>
</head>
<body>
	<div class="mainContent mar-lr-auto font14 mar-b-80">
		<div class="title-card color-white float-l mar-t-20">
			<div class="title-card-text">预约指南</div>
		</div>
		<%-- 预约流程 --%>
		<div class="step-content float-l mar-l-10">
			<ul class="mar-t-40">
				<li class="step border-r-dashed-1 float-l">
					<div class="key-icon mar-l-10"></div>
					<div class="text-content color-333 font18 txt-a-c">
						<div>患者</div>
						<div>注册/登录</div>
					</div>
					<div class="lookup font14 button bg-btn color-white mar-t-14 txt-a-c"
						onclick="Kyee.goTo('${CTX_PATH}/system/portals-login.next')"> 
						查看
					</div>
				</li>
				<li class="step border-r-dashed-1 float-l">
					<div class="appoint-dept-icon mar-l-10"></div>
					<div class="text-content color-333 font18 txt-a-c">
						<div>选择</div>
						<div>预约科室</div>
					</div>
					<div class="lookup font14 button bg-btn color-white mar-t-14 txt-a-c"
						onclick="Kyee.goTo('${CTX_PATH}/system/portals-appoint.next')"> 
						查看
					</div>
				</li>
				<li class="step border-r-dashed-1 float-l">
					<div class="appoint-doctor-icon mar-l-10"></div>
					<div class="text-content color-333 font18 txt-a-c">
						<div>选择</div>
						<div>预约医生</div>
					</div>
					<div class="lookup font14 button bg-btn color-white mar-t-14 txt-a-c"
						onclick="Kyee.goTo('${CTX_PATH}/system/portals-doctor.next')"> 
						查看
					</div> 
				</li>
				<li class="step border-r-dashed-1 float-l">
					<div class="appoint-date-icon mar-l-10"></div>
					<div class="text-content color-333 font18 txt-a-c">
						<div>选择</div>
						<div>预约时间</div>
					</div>
					<div class="lookup font14 button bg-btn color-white mar-t-14 txt-a-c"> 
						查看
					</div>
				</li>
				<li class="step float-l">
					<div class="appoint-complete-icon mar-l-10"></div>
					<div class="text-content color-333 font18 txt-a-c">
						<div>预约</div>
						<div>完成</div>
					</div>
					<div class="lookup font14 button bg-btn color-white mar-t-14 txt-a-c"
						onclick="Kyee.goTo('${CTX_PATH}/system/portals-user-center.next')"> 
						我的预约
					</div>
				</li>
			</ul>
		</div>
		<%-- 电话预约通道 --%>
		
		<div class="phone-appoint-gate float-l">
			<div class="telephone color-theme font18">
				<div style="line-height:32px;">029 - 8321 5321</div>
				<div>116114  (联通)</div>
				<div>10018  (联通VIP)</div>
				<div>12580  (移动)</div>
			</div>
			<div class="onwork-time color-999 font18">
				<div class="text">
					<div>周一至周日  08:00-12:00</div>
					<div class="float-r pad-r-3">13:00-16:30</div>
				</div>
			</div>
		</div>
		
		<div class="left-container float-l mar-b-80">
			<%-- 网站功能&用户登录 --%>
			<div class="title-card color-white float-l mar-t-14">
				<div class="title-card-text">网站功能</div>
			</div>
			
			<ul class="float-l mar-l-10 mar-t-14">
				<li class="module module-appoint-bg" title="网上预约 " onclick="Kyee.goTo('${CTX_PATH}/system/portals-appoint.next')">
					<div class="text-content">
						<div class="color-333 font18">网上预约</div>
						<div class="color-999 font15">足不出户的便捷</div>
					</div>
				</li>
				<li class="module mar-l-5 small txt-a-c">
					<div title="出诊信息" onclick="Kyee.goTo('${CTX_PATH}/system/protals-personal-info.next?subPage=visit_info')">
						<div class="color-333 font18">出诊信息</div>
						<div class="color-999 font15">随时查看</div>
					</div>
					<div title="停诊通知" class="mar-t-6" onclick="Kyee.goTo('${CTX_PATH}/system/protals-personal-info.next?subPage=stop_notice')">
						<div class="color-333 font18">停诊通知</div>
						<div class="color-999 font15">停诊及时掌握</div>
					</div>
				</li>
				<li title="医生介绍" class="module module-doctor-bg mar-l-5" onclick="Kyee.goTo('${CTX_PATH}/system/portals-doctor.next')">
					<div class="text-content">
						<div class="color-333 font18">医生介绍</div>
						<div class="color-999 font15">准确全面的了解</div>
					</div>
				</li>
				<li title="门诊公告" class="module module-notice-bg mar-l-5" onclick="Kyee.goTo('${CTX_PATH}/system/protals-news.next')">
					<div class="text-content">
						<div class="color-333 font18">门诊公告</div>
						<div class="color-999 font15">门诊信息通告</div>
					</div>
				</li>
				<li title="常见问题" class="module module-question-bg mar-l-5" onclick="Kyee.goTo('${CTX_PATH}/system/protals-personal-info.next')">
					<div class="text-content">
						<div class="color-333 font18">常见问题</div>
						<div class="color-999 font15">疑问在线帮助</div>
					</div>
				</li>
			</ul>
			
			<%-- 用户登录 --%>
			<div class="title-card color-white float-l mar-t-14">
				<div class="title-card-text">医院新闻</div>
			</div>
			
			<ul class="float-l mar-l-10 mar-t-14">
				<li class="news-container float-l">
		   			<div class="news-title clear">
		   				<div class="font24 font-w-b color-333 float-l">新闻动态</div>
		   				<div class="float-r pad-t-12 color-theme cursor-p" onclick="Kyee.goTo('${CTX_PATH}/system/protals-news.next')">查看更多&gt;&gt;</div>
		   			</div>
		   			<div class="pad-tb-14 news-detail clear cursor-p">
		   				<img class="news-picture float-l" src="">
		   				<div class="pad-l-14 float-r news-text">
		   					<p class="font18 font-w-b pad-t-8 title">暂无新闻</p>
		   					<p class="pad-t-14 new-content"></p>
		   				</div>
		   			</div>
		   			<div>
		   				<ul class="news-list cursor-p">
		   				</ul>
		   			</div>
		   		</li>
				<li class="news-bg float-r mar-l-5 cursor-p">
					<img width="324px" height="312px"  src="">
				</li>
			</ul>
		</div>
		<%-- 专家排行 --%>
		<div class="doctor-range-container float-l">
			<div class="title txt-a-c font20 color-a9 lineh60 mar-lr-14 clear">
				<div class="short-l-dash-line mar-t-30 float-l mar-l-30"></div>
				<div class="inline_block color-theme mar-lr-12 font-w-b float-l">预约专家排行</div>
				<div class="short-l-dash-line mar-t-30 float-l"></div>
			</div>
			<%--专家信息 --%>
			<ul class="doctor-list mar-lr-14">
			  <%--  <li class="clear pad-l-14">
			   <img width="56px" height="80px" class="float-l" src="${CTX_PATH}/project/resource/images/default-man-doc.png">
			   		<div class="float-l mar-l-12">
			   		<ul class="float-l">
						<li class="clear">
							<img src="${CTX_PATH}/project/resource/images/level1.png" width="21px" height="28px" class="float-l">
							<div class="name font18 float-l mar-l-8">樊代明</div>
							<div class="level font12 float-l mar-t-8">副教授</div>
						</li>
						<li class="mar-t-10">
							[科室]消化内科
						</li>
					</ul>
			   		</div>
				</li> --%>
			</ul>
			 <div class="no-doctor-txt txt-a-c w100 font18 lineh60 color-999">
			没有专家信息
			</div>
		</div>
		
	</div>
	
	<script type="text/javascript" src="${CTX_PATH}/project/modules/home/js/home.js"></script>
</body>
</html>
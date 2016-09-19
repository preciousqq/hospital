package com.west.modules.home;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class HomeController extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
	             throws ServletException, IOException {
		      System.out.println("name:"+request.getParameter("name"));
		      System.out.println("sex:"+request.getParameter("sex"));
	         response.setContentType("text/html;charset=UTF-8");
	         PrintWriter out = response.getWriter();
	         

	         ArrayList<String> nameArr = new ArrayList<String>();
	         nameArr.add("国家新闻");
	         nameArr.add("省级新闻");
	         nameArr.add("市级新闻");
	         nameArr.add("县级新闻");
	         
	         ArrayList<String> urlArr = new ArrayList<String>();
	         urlArr.add("country.jsp");
	         urlArr.add("province.jsp");
	         urlArr.add("city.jsp");
	         urlArr.add("xianji.jsp");
	         
	         ArrayList<String> bodyArr = new ArrayList<String>();
	         bodyArr.add("G20峰会开幕，习近平接见哈萨克斯坦总统库里扎耶夫，两国表达了要继续睦邻友好的愿望。");
	         bodyArr.add("陕西省公积金中心表示，将开启新的提取住房公积金政策，更方便群众");
	         bodyArr.add("西安市前几日暴雨袭击，导致小寨附近存留雨水较多，车辆和行人难以通行");
	         bodyArr.add("礼泉县水果今年丰收，但是果农们普遍担忧水果销路问题，县政府、县农业办积极讨论对策，帮助农民增收创收");
	         
	         ArrayList<New> arr = new ArrayList<New>();
	         for(int i=0;i<4;i++){
	        	 New news = new New(i+1+"",nameArr.get(i),urlArr.get(i),bodyArr.get(i));
	        	 arr.add(news);
	         }
	         Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
						.disableHtmlEscaping().create();
				String json = gson.toJson(arr);
				
	         out.print(json);
	         out.flush();
	         out.close();
	}
}

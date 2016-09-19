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
	         nameArr.add("��������");
	         nameArr.add("ʡ������");
	         nameArr.add("�м�����");
	         nameArr.add("�ؼ�����");
	         
	         ArrayList<String> urlArr = new ArrayList<String>();
	         urlArr.add("country.jsp");
	         urlArr.add("province.jsp");
	         urlArr.add("city.jsp");
	         urlArr.add("xianji.jsp");
	         
	         ArrayList<String> bodyArr = new ArrayList<String>();
	         bodyArr.add("G20��ῪĻ��ϰ��ƽ�Ӽ�������˹̹��ͳ������Ү�����������Ҫ���������Ѻõ�Ը����");
	         bodyArr.add("����ʡ���������ı�ʾ���������µ���ȡס�����������ߣ�������Ⱥ��");
	         bodyArr.add("������ǰ���ձ���Ϯ��������Сկ����������ˮ�϶࣬��������������ͨ��");
	         bodyArr.add("��Ȫ��ˮ��������գ����ǹ�ũ���ձ鵣��ˮ����·���⣬����������ũҵ��������۶Բߣ�����ũ�����մ���");
	         
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

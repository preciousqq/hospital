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

public class DoctorController extends HttpServlet{
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        ArrayList<String> nameArr = new ArrayList<String>();
        nameArr.add("������");
        nameArr.add("۬��");
        nameArr.add("����");
        nameArr.add("������");
        nameArr.add("��СԶ");
        
        ArrayList<String> levelArr = new ArrayList<String>();
        levelArr.add("����");
        levelArr.add("����");
        levelArr.add("����");
        levelArr.add("������");
        levelArr.add("������");
        
        ArrayList<String> roomArr = new ArrayList<String>();
        roomArr.add("������");
        roomArr.add("������");
        roomArr.add("���");
        roomArr.add("�ڿ�");
        roomArr.add("�Կ�");
        
        ArrayList<String> imageArr = new ArrayList<String>();
        imageArr.add("/project/resource/images/default-man-doc.png");
        imageArr.add("/project/resource/images/default-woman-doc.png");
        imageArr.add(null);
        imageArr.add("custom.png");
        imageArr.add("/project/resource/images/default-woman-doc.png");
        
        ArrayList<Doctor> arr = new ArrayList<Doctor>();
        for(int i=0;i<5;i++){
        	Doctor doctor = new Doctor(i+1+"",nameArr.get(i),levelArr.get(i),roomArr.get(i),imageArr.get(i));
       	 	arr.add(doctor);
        }
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
					.disableHtmlEscaping().create();
			String json = gson.toJson(arr);
			
        out.print(json);
        out.flush();
        out.close();
	}
}

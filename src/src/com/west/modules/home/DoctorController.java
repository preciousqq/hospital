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
        nameArr.add("穆明明");
        nameArr.add("郜林");
        nameArr.add("曲波");
        nameArr.add("孙晓峰");
        nameArr.add("张小远");
        
        ArrayList<String> levelArr = new ArrayList<String>();
        levelArr.add("教授");
        levelArr.add("教授");
        levelArr.add("教授");
        levelArr.add("副教授");
        levelArr.add("副教授");
        
        ArrayList<String> roomArr = new ArrayList<String>();
        roomArr.add("消化科");
        roomArr.add("妇产科");
        roomArr.add("外科");
        roomArr.add("内科");
        roomArr.add("脑科");
        
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

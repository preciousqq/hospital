package com.west.modules.home;

public class New {
	private String id;
	private String name;
	private String url;
	private String body;
	
	public New(String id,String name,String url,String body){
		this.id = id;
		this.name = name;
		this.url = url;
		this.body = body;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	
	
}

package com.west.modules.home;

public class Doctor {
	private String id;
	private String name;
	private String level;
	private String room;
	private String image;
	
	public Doctor(String id,String name,String level,String room,String image){
		this.id = id;
		this.name = name;
		this.level = level;
		this.room = room;
		this.image = image;
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
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getRoom() {
		return room;
	}
	public void setRoom(String room) {
		this.room = room;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
}

package com.niit.dao;

import com.niit.model.ProfilePicture;

public interface ProflePictureDao {

	void uploadProfilePicture(ProfilePicture profilePicture);
	ProfilePicture getImage(String email);
}

package com.niit.dao;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.model.ProfilePicture;

@Repository
@Transactional
public class ProfilePictureDaoImpl implements ProflePictureDao {

	@Autowired
    private SessionFactory sessionFactory;
	Session session;
	
	public void uploadProfilePicture(ProfilePicture profilePicture) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		/*insert into profpic values(?,?) 
		OR
		update  profpic set image=? where email=?*/
		session.saveOrUpdate(profilePicture);
	}

	public ProfilePicture getImage(String email) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		//select * from profilepic where email=?
		ProfilePicture profilePicture=(ProfilePicture) session.get(ProfilePicture.class, email);
		return profilePicture;

		
	}

}

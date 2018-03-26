package com.niit.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.model.Notification;


@Repository
@Transactional
public class NotificationDaoImpl implements NotificationDao {

	@Autowired
    private SessionFactory sessionFactory;
	Session session;
	
	public List<Notification> getNotificationNotViewed(String email) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		
		Query query= session.createQuery("from Notification where email=? and viewed=0");
		query.setString(0, email);
		List<Notification> notificationNotViewed= query.list();
		return notificationNotViewed;
		
	}

}

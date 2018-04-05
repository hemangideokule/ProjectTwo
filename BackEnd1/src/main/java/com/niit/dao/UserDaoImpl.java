package com.niit.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Repository;


import com.niit.model.User;

@Repository("UserDao")
@Transactional

public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;
	Session session;
	
	public UserDaoImpl() {
System.out.println("UserDaoImpl bean created");
	}
	
	public void registerUser(User user) {
		System.out.println("registerUser in dao"+user);
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		session.persist(user);
	
		
		
	}
	public boolean isEmailUnique(String email) {
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		User user =(User) session.get(User.class, email);
	
	if(user==null)
        return  true;
	else
		return false;
	
	}
	public User login(User user) {
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		Query query = session.createQuery("from User where email=? and password=?");
				query.setString(0, user.getEmail());
		query.setString(1, user.getPassword());
		return (User)query.uniqueResult();
	}
	public void update(User validUser) {
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		session.update(validUser);
		
	}
	public User getUser(String email) {
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		User user=(User)session.get(User.class, email);
		return user;
	}
	public void updateUser(User user) {
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		session.update(user);
	}

	public List<User> searchUser(String name){
		System.out.println(name);
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		Query query=session.createQuery("from User u where u.firstname like ? or u.lastname like ? or u.email like ?");
		query.setString(0,"%"+name+"%");
		query.setString(1,"%"+name+"%");
		query.setString(2,"%"+name+"%");
		List<User> users=query.list();
		return users;
	}
}

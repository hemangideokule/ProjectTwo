package com.niit.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.model.Friend;
import com.niit.model.User;

@Repository
@Transactional
public class FriendDaoImpl implements FriendDao {

	@Autowired
    private SessionFactory sessionFactory;
	Session session;
	public List<User> suggestedUsers(String email) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		
		String queryString="select * from userdetail where email in "
				+ "(select email from userdetail where email!=?"
				+ " minus "
				+ "(select toId_email from friend where fromId_email=? "
				+ "union"
				+ " select fromId_email from friend where toId_email=?))";
		SQLQuery query=session.createSQLQuery(queryString);
		query.setString(0,email);
		query.setString(1,email);
		query.setString(2,email);
		query.addEntity(User.class);
		List<User> suggestedUsers=query.list();
		return suggestedUsers;
		
	}
	public void addFriend(Friend friend) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
	
		session.save(friend);
		System.out.println("friend daoImpl");
		
	}
	public List<Friend> pendingRequests(String toIdEmail) {

		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		Query query=session.createQuery("from Friend where status=? and toId.email=?");
		query.setCharacter(0, 'P');
		query.setString(1, toIdEmail);
		List<Friend>pendingRequests=query.list();
		return pendingRequests;
	}
	
	
}

package com.niit.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.model.BlogPost;
import com.niit.model.Notification;

@Repository
@Transactional
public class BlogPostDaoImpl implements BlogPostDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	Session session;
	public void addBlogPost(BlogPost blogPost)
	{
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){
				 session= sessionFactory.openSession();
				 }
		session.save(blogPost);
		
	}
	public List<BlogPost> listOfBlogs(int approved) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		
		Query query=session.createQuery("from BlogPost where approved="+approved);
		List<BlogPost> blogs=query.list();
		return blogs;
	}

	public BlogPost getBlog(int id) {
		
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){ session= sessionFactory.openSession();}
		BlogPost blogPost= (BlogPost) session.get(BlogPost.class, id);	
	    return blogPost;
	}
	public void approve(BlogPost blog) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		blog.setApproved(true);
		session.update(blog);
		Notification notification = new Notification();
		notification.setBlogTitle(blog.getBlogTitle());
		notification.setApprovalStatus("Approved");
		notification.setEmail(blog.getPostedBy().getEmail());
		session.save(notification);
	}
	
	public void reject(BlogPost blog , String rejectionReason) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){ session= sessionFactory.openSession();}
		Notification notification = new Notification();
		notification.setBlogTitle(blog.getBlogTitle());
		notification.setApprovalStatus("Rejected");
		notification.setEmail(blog.getPostedBy().getEmail());
		notification.setRejectionReason(rejectionReason);
		session.save(notification);
	session.delete(blog);
	}
}

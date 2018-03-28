package com.niit.dao;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.model.BlogPost;
import com.niit.model.BlogPostLikes;
import com.niit.model.User;

@Repository
@Transactional
public class BlogPostLikesDaoImpl implements BlogPostLikesDao {

	
	@Autowired
	private SessionFactory sessionFactory;
	Session session;
	
	public BlogPostLikes hasUserLikedBlog(int blogId, String email) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		Query query=session.createQuery("from BlogPostLikes where blogpost.id=? and user.email=?");
		query.setInteger(0, blogId);
		query.setString(1, email);
		BlogPostLikes blogPostLikes=(BlogPostLikes) query.uniqueResult();
		return blogPostLikes;
		
	}

	public BlogPost updateLikes(int id, String email) {
		try {session =sessionFactory.getCurrentSession();}
		catch (HibernateException e){session= sessionFactory.openSession();}
		
		BlogPostLikes blogPostLikes=hasUserLikedBlog(id, email);
		BlogPost blogPost=(BlogPost) session.get(BlogPost.class, id);
		
		if(blogPostLikes==null)
		{//insert
			blogPostLikes=new BlogPostLikes();
			User user=(User)session.get(User.class, email);
			blogPostLikes.setBlogpost(blogPost);
			blogPostLikes.setUser(user);
			session.save(blogPostLikes);
			
			blogPost.setLikes(blogPost.getLikes()+1);
			System.out.println("blogPost.getLikes()"+blogPost.getLikes());
			session.update(blogPost);
			
		}
		else {//delete
			
			session.delete(blogPostLikes);
			blogPost.setLikes(blogPost.getLikes()-1);
			session.update(blogPost);
	         }
		return blogPost;
	}

}

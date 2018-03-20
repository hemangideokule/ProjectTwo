package com.niit;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.niit.dao.BlogPostDao;
import com.niit.dao.UserDao;
import com.niit.model.BlogPost;
import com.niit.model.ErrorClazz;
import com.niit.model.User;

@Controller
public class BlogPostController {
	
	@Autowired
	private BlogPostDao blogPostDao;
	@Autowired
	private UserDao userDao;
	
	@RequestMapping(value="/addblogpost", method=RequestMethod.POST)
	public ResponseEntity<?> addBlogPost(@RequestBody BlogPost blogPost, HttpSession session)
	{
		System.out.println("entering in BlogPostController");
		String email=(String) session.getAttribute("loginId");
	if(email==null) {
		System.out.println("error clazz");
		ErrorClazz error= new ErrorClazz(4,"Unauthorized Access..");
	 return new ResponseEntity<ErrorClazz>(error, HttpStatus.UNAUTHORIZED);
	}
	
	blogPost.setPostedOn(new Date());
	User postedBy=userDao.getUser(email);
	blogPost.setPostedBy(postedBy);
	try
	{
        blogPostDao.addBlogPost(blogPost);
        return new ResponseEntity<BlogPost>(blogPost,HttpStatus.OK);
	}
	catch(Exception e)
	{	ErrorClazz error= new ErrorClazz(6,"Unable to post a blog"+e.getMessage());
	 return new ResponseEntity<ErrorClazz>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}
		
		
	}
	@RequestMapping(value="/getblogs/{approved}", method=RequestMethod.GET)
	public ResponseEntity<?> getAllBlogs(@PathVariable int approved, HttpSession session){

		String email=(String) session.getAttribute("loginId");
		if(email==null) {
			System.out.println("error clazz");
			ErrorClazz error= new ErrorClazz(4,"Unauthorized Access..");
		 return new ResponseEntity<ErrorClazz>(error, HttpStatus.UNAUTHORIZED);
		}
		if(approved==0)
		{
			User user=userDao.getUser(email);
			if(!user.getRole().equals("ADMIN")) {
				ErrorClazz error= new ErrorClazz(7,"Access Denied..");
				 return new ResponseEntity<ErrorClazz>(error, HttpStatus.UNAUTHORIZED);
			}
		}
		List<BlogPost> blogs=blogPostDao.listOfBlogs(approved);
	   return new ResponseEntity<List<BlogPost>>(blogs, HttpStatus.OK);
	}
	

	
	

}
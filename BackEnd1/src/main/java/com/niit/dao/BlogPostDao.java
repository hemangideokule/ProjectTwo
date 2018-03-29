package com.niit.dao;

import java.util.List;

import com.niit.model.BlogComment;
import com.niit.model.BlogPost;

public interface BlogPostDao {
	void addBlogPost(BlogPost blogPost);
    List<BlogPost> listOfBlogs(int approved);
    //if(0)=select * from blogpost where approved=0(waiting)
   //if(1)=select * from blogpost where approved=1(approved)
	BlogPost getBlog(int id);
	void approve(BlogPost blog);
	void reject(BlogPost blog, String rejectionReason);
	void addBlogComment(BlogComment blogComment);
	List<BlogComment> getAllBlogComments(int blogPostId);
}

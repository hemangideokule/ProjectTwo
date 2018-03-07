package com.niit;

import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.niit.dao.JobDao;
import com.niit.dao.UserDao;
import com.niit.model.ErrorClazz;
import com.niit.model.Job;
import com.niit.model.User;
@Controller
public class JobController {
	@Autowired
	private UserDao userDao;
	@Autowired
	private JobDao jobDao;
	@RequestMapping(value="/addjob", method=RequestMethod.POST)
	public ResponseEntity<?> addJob(@RequestBody Job job, HttpSession session)
	{
		
		String email=(String) session.getAttribute("loginId");
	//String email="admin@gmail.com";
		if(email==null) {
			ErrorClazz error= new ErrorClazz(5,"Unauthorized Access..");
		 return new ResponseEntity<ErrorClazz>(error, HttpStatus.UNAUTHORIZED);
		}
		User user= userDao.getUser(email);
		if(!user.getRole().equals("ADMIN"))
		{
			System.out.println("add job");
			ErrorClazz error= new ErrorClazz(5,"Access Denied..");
			 return new ResponseEntity<ErrorClazz>(error, HttpStatus.UNAUTHORIZED);
		}
		try
		{
			System.out.println("try");
			jobDao.addJob(job);
			return new ResponseEntity<Job>(job, HttpStatus.OK);
		}
		catch(Exception e)
		{
			System.out.println("catch");
			
			ErrorClazz error= new ErrorClazz(6,"Unable to Add Job Details.."+e.getMessage());
			 return new ResponseEntity<ErrorClazz>(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		}
	}



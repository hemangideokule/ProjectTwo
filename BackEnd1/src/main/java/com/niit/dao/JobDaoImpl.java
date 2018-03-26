package com.niit.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.niit.model.Job;

@Repository
@Transactional
public class JobDaoImpl implements JobDao {

	@Autowired
	private SessionFactory sessionFactory;
	Session session;
	public void addJob(Job job) {
		try {
		 session =sessionFactory.getCurrentSession();
		}
		catch (HibernateException e){
			 session= sessionFactory.openSession();
		}
		session.save(job);
	
		
	}

	@SuppressWarnings("unchecked")
	@Autowired
	public List<Job> getAllJobs() {
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		Query query =session.createQuery("from Job");
	
		return query.list();
		
	}

	public Job getJob(int id) {
		try {
			 session =sessionFactory.getCurrentSession();
			}
			catch (HibernateException e){
				 session= sessionFactory.openSession();
			}
		Job job= (Job) session.get(Job.class, id);
	
		return job;
	}
}

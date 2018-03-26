package com.niit.configurations;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer
{
	 public WebAppInitializer(){
	    	System.out.println("WebAppInitializer class is loaded and Instantiated");
	    }
		
		@Override
		protected Class<?>[] getRootConfigClasses() {
			return new Class[]{DbConfiguration.class};
		}

		@Override
		protected Class<?>[] getServletConfigClasses() {

			return new Class[]{WebAppConfig.class};
		}

		@Override
		protected String[] getServletMappings() {
		
			return new String[]{"/"};// <url-pattern>/</url-pattern> Any requests,it will forwarded to DispatcherServlet
		}

}

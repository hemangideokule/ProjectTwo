package com.niit.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages="com.niit")
public class WebAppConfig {
    
	public WebAppConfig(){
    	System.out.println("WebAppConfig is instantiated");
    }
	
	@Bean(name="multipartResolver")
	public CommonsMultipartResolver commonsMultipartResolver() {
		CommonsMultipartResolver commonsMultipartResolver= new CommonsMultipartResolver();
		return commonsMultipartResolver;
	}
    
    
    
}

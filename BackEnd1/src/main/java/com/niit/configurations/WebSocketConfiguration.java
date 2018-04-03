package com.niit.configurations;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@ComponentScan(basePackages="com.niit")
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer{

	public void configureClientInboundChannel(ChannelRegistration registration) {
		
		
	}

	public void configureClientOutboundChannel(ChannelRegistration registartion) {
		
	}

	public void configureMessageBroker(MessageBrokerRegistry registry) {
		//destinationPrefixes used to send msg from server to browser
		registry.enableSimpleBroker("/queue/","/topic");
		registry.setApplicationDestinationPrefixes("/app");
		
	}

	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// TODO Auto-generated method stub
		registry.addEndpoint("/chatmodule").withSockJS();
	}

}

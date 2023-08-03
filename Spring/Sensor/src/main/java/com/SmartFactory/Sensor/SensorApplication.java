package com.SmartFactory.Sensor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SensorApplication {

	public static void main(String[] args) {
		SpringApplication.run(SensorApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corConfigurer(){
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("*")
						.allowedOrigins("*")
						.allowedHeaders("*")
						.maxAge(3600);
			}
		};
	}
}

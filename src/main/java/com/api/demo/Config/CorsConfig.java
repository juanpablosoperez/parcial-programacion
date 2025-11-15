package com.api.demo.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
// Configura  para permitir que el frontend pueda llamar a la API
public class CorsConfig implements WebMvcConfigurer {

	@Override
	// Acá definimos qué rutas y métodos HTTP aceptan peticiones desde otros orígenes
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
				// Permite cualquier origen (incluye "null" cuando se abre index.html con doble click)
				.allowedOriginPatterns("*")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*");
	}
}



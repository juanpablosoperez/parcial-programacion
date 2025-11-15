package com.api.demo;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

// Clase para inicializar la app cuando se despliega como WAR en un servidor
public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	// Configura la clase principal al desplegar como WAR
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ParcialApplication.class);
	}

}

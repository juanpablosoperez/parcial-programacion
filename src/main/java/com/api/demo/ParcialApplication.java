package com.api.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// Clase principal que arranca la aplicación Spring Boot
public class ParcialApplication {

	public static void main(String[] args) {
		// Inicia el servidor y carga todo el contexto de Spring
		SpringApplication.run(ParcialApplication.class, args);
	}

}

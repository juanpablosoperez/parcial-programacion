package com.api.demo.Modelo;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table(name = "ganador")
// Esta clase guarda los datos del Ganador de un sorteo.
public class Ganador {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_ganador")
	// Identificador del ganador
	private long id;
	
	@Column(name = "dni", length = 15)
	// Documento del ganador
	private String dni;
	
	@Column(name = "nombre_apellido", length = 100)
	// Nombre y apellido del ganador
	private String nombre_apellido;
	
	@Column(name = "nro_serie_carton", length = 20)
	// Número de serie del cartón ganador
	private String nro_serie_carton;
	
	@Column(name = "telefono", length = 25)
	// Teléfono de contacto del ganador
	private String telefono;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getNombre_apellido() {
		return nombre_apellido;
	}

	public void setNombre_apellido(String nombre_apellido) {
		this.nombre_apellido = nombre_apellido;
	}

	public String getNro_serie_carton() {
		return nro_serie_carton;
	}

	public void setNro_serie_carton(String nro_serie_carton) {
		this.nro_serie_carton = nro_serie_carton;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	

	
}
